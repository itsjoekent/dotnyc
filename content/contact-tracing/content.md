When the coronavirus cases started spiking in America, leaders around the country had only one option: _shut everything down_.

Preventing everyone from being around others is a simple brute force solution, and it seems to be working. But the thought of having to stay like this for another 12 months until a vaccine is widely available gives me extreme anxiety.

Thankfully- there is a way to engineer ourselves out of this crisis, already proven to be effective by China, Hong Kong and Singapore, it’s a practice called contact tracing.

Instead of telling everyone to stay home, we locate the people that have had prolonged interactions with those who have been confirmed to be infected with COVID-19, and just isolate those people.

During the Ebola outbreak, contact tracing was successfully employed to contain the virus. But the interview practices used for that pandemic cannot scale for this one. Ebola was not an airborne disease, and it was mostly contained to West Africa. This made it easier to interview what is known as the “index case” and find their “contacts”.

Because an interview style program is incredibly hard to scale, a handful of other countries are using technology to track interactions between individuals. When a case of an infected individual is identified, everyone that came in recent contact with that person can be notified to self-isolate themselves.

In the visualization below, you can see how a virus can quickly spread through the population, but if all of the contacts are quarantined when the index case is tested, it can stop the outbreak.

<div class="container-2x__flush">
  <iframe src="https://itsjoekent.s3.amazonaws.com/blog/contact-tracing/index.html" width="100%" height="600px" class="viz-embed"></iframe>
</div>

The key to contact tracing actually working is testing, which is why this tactic is also commonly referred to as “test and trace”.

[As I wrote at the end of March](https://joekent.nyc/probably-got-coronavirus), my entire household got sick with COVID-19 symptoms. It took the New York health department nearly two weeks to schedule us for testing at one of the drive through centers in New York City, by which point all of us had recovered and the test was no longer useful. Contact tracing will not work if we cannot improve the speed at which we’re testing people, especially with the amount of people spreading the virus without showing symptoms.

The other critical component for this will be the technology, using your phone to keep a digital log of everyone you get close to. If you get sick, medical professionals can replay the log of contacts to alert those individuals they need to self-isolate and get tested.

China, South Korea, and Singapore, all have apps doing this and other surveillance technology they are employing at great success, but most of these measures are all varying degrees of totalitarian that would not be tolerable to the American public or legal under the fourth amendment or other privacy laws.

There is an effort in the European Union, called the [Pan-European Privacy-Preserving Proximity Tracing (PEPP-PT)](https://www.pepp-pt.org/), to build a contact tracing app that would be more tolerable to EU nations and be considered legal under their heavily strict privacy regulations called GDPR. Germany is reportedly looking to [launch the app by mid-April](https://www.npr.org/sections/coronavirus-live-updates/2020/04/02/825860406/in-germany-high-hopes-for-new-covid-19-contact-tracing-app-that-protects-privacy).

The key to their mobile application is the use of the bluetooth antenna in your phone pinging other nearby phones that are also running the app. This means the app is never tracking GPS movements, just nearby phones.

In theory this data could still be used by Western governments for surveillance, by replaying all of the people you interacted with and even pairing it with other digital records of you and your contacts. In order to build public trust there needs to be strict regulations around data usage, access auditing, and destroying all of the data after it is no longer scientifically relevant.

North Dakota appears to be the first state in America [to launch a contact tracing app](https://bismarcktribune.com/news/local/health/officials-unveil-mobile-app-to-help-with-covid-19-contact-tracing-in-north-dakota/article_76e170b7-f68a-5797-b58b-640f2487956d.html) to contain the spread of COVID-19, but the app is developed by a small in-state private tech company, and seems based on GPS tracking. In order for this to be successful, we need a national solution that is developed by one of our government “swat teams” such as USDS or 18F, alongside a reputable tech firm such as Microsoft or Google that have the infrastructure necessary to collect this much data. This app then needs to be heavily promoted by all state and federal officials at every press conference possible.

Unfortunately, it seems like there is no federal effort to build a contact tracing app, or any real sense of urgency to scale our testing capacity. By all measures it seems like Donald Trump is employing the lightswitch strategy, where we just flip everything back on and hope for the best.

----

_This data visualization is not a scientifically accurate representation of pandemics, and I am not an epidemiologist. This is just meant to be an illustrative example of what contact tracing means._

_If you're interested in seeing the underlying code, you can [fork it here](https://github.com/itsjoekent/dotnyc-contact-tracing)._
