This post is a technical translation of the contact tracing specification [Apple and Google recently released](https://www.apple.com/newsroom/2020/04/apple-and-google-partner-on-covid-19-contact-tracing-technology/), aimed at folks that are interested in understanding the implications for security, privacy, and usage.

If you are not familiar with contact tracing, I suggest you first read [this blog post](http://joekent.nyc/contact-tracing) that explains the topic and the various methodologies that are being used and developed globally.

At a high level, the way this technology works is by having an app on your phone broadcast a random, unique identifier over the device bluetooth antenna, and simultaneously listen for other phones broadcasting their identifiers.

Your phone keeps a log of everyone you come into contact with who is running this app and is broadcasting advertisements over the Bluetooth service. It is important to note, Bluetooth is not the same as GPS, it cannot determine your physical location. Your contact list is simply a giant list of random numbers representing other devices that were near you at some point.

If you are infected with COVID-19, your list of contacts can be uploaded securely to the cloud, and all of those people can then be notified they were in contact with someone who tested positive for COVID-19, and they should self-isolate themselves and follow CDC guidelines.

The following sections are an in-depth look at each component of this contact-tracing specification. It is important to note this is just a specification for an API, this code being described is not live on your phone, yet.

At the end there is also an FAQ section if you want to skip over the technical explanations but still have some burning questions about how this wide-ranging surveillance would work and how it could impact your privacy.

## Broadcasting your device to other devices

The first step in using a smartphone for contact tracing is being able to tell other nearby smartphones that you’re in proximity to them. How do we accomplish that?

The contact tracing protocol Apple & Google jointly released operates over Bluetooth Low Energy (Bluetooth LE), which as the name implies is a low power consumption protocol for sending and receiving data over a Bluetooth antenna.

When two Bluetooth devices want to exchange data, they do it over a “service”. The contact tracing service has its own universally unique identifier (UUID) that all contact tracing apps can use to both send and receive data between devices. You can think of it like programming two devices to tune to the same radio frequency.

Your phone will periodically advertise itself over the contact tracing service by sending out data other devices can listen for and keep a log of. The specification for the contact tracing service calls for sending this advertisement every 200-270 milliseconds, or approximately 5 times a second. These advertisements will run indefinitely if you have the app running and your phone is on.

To do this securely, your app will create a “Rolling Proximity Identifier” approximately every ~15 minutes, and will put this unique identifier in the data payload it sends out over the Bluetooth service. I will explain later in this post how the rolling proximity identifier is used to trace who you came in contact with and why it can be safely advertised.

When your phone advertises data over any Bluetooth service, it has to also include an address for the device, as if it were a piece of mail that had a return address. To prevent people from associating the device address with a list of rolling proximity identifiers, the contact tracing specification calls for making the device address random, and to change it every ~15 minutes at the same time the rolling proximity identifier changes.

To retrieve nearby rolling proximity identifiers, approximately every 5 minutes the device will scan the Bluetooth service and log all of the identifiers it discovers. This log of rolling proximity identifiers is stored only on your device. Additionally, the specification calls for using hardware filters when available on the device to limit the amount of duplicate information being processed, especially in large settings where there might be hundreds of nearby rolling proximity identifiers.

## How the rolling proximity identifier is cryptographically generated

The rolling proximity identifier is sent to every nearby device. If someone was able to reverse engineer who an identifier belonged to, it could pose a risk to someone's privacy. So how does the specification guarantee these rolling proximity identifiers are safe to transmit to other anonymous devices?

When you installed the contact tracing app on your phone, the first thing it did was create a unique “Tracing Key”. This tracing key is a secret, it never leaves your device.

The tracing key is then used to create a “Daily Tracing Key” every 24 hours. To create the daily tracing key, your tracing key is put through the following algorithm,

```
dtki ← HKDF(tk , NULL, (UTF8("CT-DTK")||Di),16)
```

I know it looks complicated, but it’s actually quite simple.

The daily tracing key (dtk), for a given 24 hour interval (i), is equal to a hash key derivation function (HKDF) of your tracing key (tk) and the current day (Di).

A cryptographic hash function, in this case the SHA-256 hash function, takes an arbitrary amount of data and spits out a fixed amount of data that appears totally random. What is awesome about these algorithms is that they will always spit out the same random looking data for a given input value, and there is no way to reverse engineer what the random bytes originally were. You could attempt to brute force every possible combination of characters and see if they generate the same SHA-256 hash, but good luck with that.

For example, if you run the words “contact tracing” through SHA-256 you get the following output,

```
04d07402e5a502fb7ae0a7847853f1ac5d2a280729901a29738fb3b017135934
```

However, the daily tracing key is computed with an HMAC key derivation function (HKDF), which is different from just using a pure hash key derivation function like SHA-256 because it adds another layer of cryptographic security called “key stretching”.

The HKDF function uses a secret key, in this case the unique tracing key on your phone, along with the SHA-256 cryptographic hash function, to create a Message Authentication Code (or “HMAC”). It then extracts a pseudorandom key (“PRK”) from the HMAC, and uses this in conjunction with the data you supplied (in this case a number representing which day it is) to make a cryptographically strong output (your daily tracing key, “dtk”).

In short, if you have a tracing key, you can compute any of your daily tracing keys by supplying your tracing key and the number of the day you want to make the daily tracing key for. And it is impossible to take a daily tracing key and find the tracing key it belongs to. This is important, because it means we can share the daily tracing key without revealing our device, this will come up again in the next section.

But remember, your phone does not emit the daily tracing key. As we previously discussed, it advertises the rolling proximity identifier which changes every 15 minutes to ensure additional privacy. The rolling proximity identifier is computed with the following algorithm,

```
RPIi, j ← Truncate(HMAC(dkti , (UTF8("CT-RPI") || TINj)),16)
```

The rolling proximity identifier (RPI) for a given 24 hour interval (i) and 10 minute window in a 24 hour period (j) is equal to the HMAC hash of the daily tracing key (dkti) and the 10 minute window of the day representing when the rolling proximity identifier had to change (TINj). This value is then shortened down, or “truncated”, to 16 bytes so it uses less space but is still random enough that it is extremely unlikely another nearby device would also generate the same rolling proximity identifier.

## Determining if you came into contact with someone who tested positive for COVID-19

You’ve been walking around for a few days and have a list of contacts, which is a long list of rolling proximity identifiers. How do you find out if any of those identifiers match someone that tested positive? After all, we just went through why it was impossible to turn a rolling proximity identifier into a tracing key, how could we possibly alert our contacts?

When you test positive for COVID-19, your mobile app uploads a diagnosis key to a central server. _Oh god, another key._ Don’t worry, the diagnosis key is just a collection of your daily tracing keys and the numbers representing the day they were created for.

Your mobile app will frequently fetch the diagnosis keys from the central server, and use them to generate all of the possible rolling proximity identifiers. It does this by taking a daily tracing key from the diagnosis key, and using the rolling proximity identifier algorithm we previously discussed, plugging in every 10 minute window of a 24 hour period (this adds up to creating 144 possible rolling proximity identifiers for just one daily tracing key within a diagnosis key).

The software on your phone can then compare your list of contacts with the list you generated from the diagnosis key, and check if you matched. The matches and the processing involved all happens locally on your phone, and is never reported back to a central server.

## FAQ’s

**Could the government use this data against me in the future in a prosecution or criminal investigation?**

Legally, yes, but practically speaking it would be impossible.

For starters, realistically the only subpoena they could make would be against the central server with diagnosis keys of those who reported themselves as testing positive, and to individuals with contact lists they want.

Without contact lists it would be impossible to use diagnosis keys on their own to place you near anyone. The contact lists on your device will likely not last on your phone longer than 14 days because not only are they no longer scientifically relevant, but you also need to consider practical storage constraints and added computational time it would take to compare a list that long. It’s also unclear how long diagnosis keys would remain on cloud servers, which would greatly reduce the timeline they could be subpoenaed.

**Could a stalker trace my movements if they know the signal my phone is giving off?**

Bluetooth based tracing does not indicate direction or sufficient enough location information to realistically follow an individual.

Even if you had a sophisticated multi-person operation to triangulate someone, the rolling proximity identifier would make it impossible to pin them down. Or figure out which device they are to begin with.

**Could Apple or Google use this data to target advertising?**

Nope!

**Does this use GPS at all?**

No.

The specification does note that applications could ask users to voluntarily collect GPS data as well, which practically speaking would be useful for doctors and medical researchers. But GPS is not part of this specification.

**Will using this app all day impact my battery life?**

It’s hard to predict the exact impact this will have on battery life.

The constant use of Bluetooth LE is surprisingly the least energy intensive part of this, even though individuals travelling around high density areas such as New York City will be potentially collecting thousands of contacts.

The greatest battery hit of this process will be fetching diagnosis keys, generating the thousands of proximity keys, and comparing them to the contact list on the device, every few minutes for the entire day.

In short, it is likely a proximity tracing app following this specification would drain your battery, but should not be knocking your phone out by noon.

**Will this work if my phone is off or I uninstall the app?**

Nope.

**How far away can people trace I was near them?**

Depends on the environment and the hardware in your phone. A modern iPhone in open space could potentially broadcast and receive Bluetooth signals for several hundred feet. But the software will likely filter out contacts that far away as they are not scientifically relevant.

**Can hackers use this to transmit malicious code?**

No!

**Who is making the apps? Google & Apple? The Federal government? State governments?**

Apple and Google released a specification for a contact tracing API that both companies will be building into their respective mobile operating systems. This means apps will have to be built on top of the API.

According to their press release Apple and Google are working with public health officials to release this underlying API and apps in May. It is not clear from the press release which public health official(s) are working on app(s) to coincide with the release of the API.

Apple also noted in the coming months both companies intend to bake this contact tracing functionality into Android and iOS.

**Will apps from different sources be cross compatible?**

All apps following this specification and using the respective API’s should be cross compatible.

**Who runs the central server(s) that all of this data reports back too?**

This isn’t totally clear from the press release or the specification. Presumingly Apple and/or Google are running them.
