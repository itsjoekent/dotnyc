This post is a dive into how ElizabethWarren.com was eventually able to re-render content updates from a headless CMS on the fly, cache everything, and serve the entire website from an S3 bucket. The post presumes a baseline understanding of web technologies such as React.

I wanted to share this post largely because throughout the campaign I was quite frustrated by the lack of content online (_that I could find_) about scaling React server side rendering in production, and I hope some of the ideas in this post help someone one day.

It's quite fascinating how the web has evolved from just being static files sitting on web servers, to monolithic web servers, to micro-services, and now the trend arriving back to deploying static files.

Static websites are wonderful from an operational perspective, they have virtually no cost compared to web servers and have the high uptime guarantee of the object storage provider you choose to use (most commonly AWS S3). A static site today just requires a build system that can build and push your website to object storage on command. If you want to get really fancy, you can even setup multiple buckets across regions or cloud providers for added redundancy. And if you need to maintain some light custom routing in conjunction with your static website, you can run code at the edge with a service like Cloudflare Workers or Lambda@Edge.

Often, the first hurdle in deploying your React application as a static website is server-side rendering all of the pages.

What is server-side rendering you ask? Rendering a React application within a NodeJS process is referred to as server side rendering (SSR), it's just a fancy way saying you want to generate all of the HTML on the page outside of a browser context. While not a requirement in every React project (for example, an internal dashboard would be sufficient with just client side rendering), server side rendering is necessary if you want your site visitors to see the content of the page immediately on load (eg: an article, or a landing page), or if you want Google to crawl your webpage.

React is fundamentally a UI library though, so you need to hook-up a few additional wires to server-side render your React components into static files. And there are many wonderful frameworks out there to choose from that make this very easy, such as NextJs and GatsbyJs.

But if your business requirements include being able to push out content updates as fast as humanly possible, you're going to run into a problem. Server side rendering an entire website is not an instantaneous process. And if your website is more than just a content site (eg: you have a million profile pages), exporting all of those user profiles as static pages with Next or Gatsby is not going to be a trivial problem to solve. So for the purposes of this post, let's just keep the scope to content websites.

There isn't really an average time for how long server side rendering takes, as it depends entirely on the components being rendered. But it's certainly possible a complex page could take well over 100ms to render. In the context of a static site, you can optimize this by having your build system divide work across multiple cores (eg: [take a look at how Gatsby does this](https://www.gatsbyjs.org/docs/multi-core-builds/)), but ultimately you're likely to run into another problem, the latency in fetching content.

Every web stack is different, but a common pattern in modern web development is using a headless cms. A headless cms simply means that the content management system storing all of your content is detached from the application(s) powering your interfaces, and content is fetched from the CMS via an API.

If you're using a headless cms, such as Contentful, your static build system can only render pages as quickly as it can fetch content from the CMS over the wire. In practice, this is adding a few hundred milliseconds before you can begin rendering a page.

A simple way to speed this up a little is utilizing pagination and requesting many pages at once. But if your website contains pages (or _plans_) with thousands of words, pagination starts to become problematic for both the network payload size and running out of memory in the NodeJS process.

Another way to reduce the time to get content is by caching these CMS responses in a database that the build system can access, but now you've just created an extremely "fun" cache invalidation problem to solve.

For example, imagine you had a content model for a blog post such as the following,

```
{
  "title": String,
  "publishedAt": Date,
  "content": String,
  "author": <Reference:Author>,
}
```

Every time the author changes, you'll need to invalidate the cache for every single blog post attributed to that author. And this is a simple one-to-many relationship, a sufficiently content-rich website will have content references that go several layers deep. And even if you put in all of that effort to maintain a tree of content relationships, the next time you go to rebuild the site, you're _still_ looking at a significant latency hit having to refetch all of that content again.

But all of this in the grand scheme of things is a super unnecessary optimization conversation to have. For most teams, as long as you can revert a bad deploy quickly, the difference between rendering your site in one minute or five doesn't really matter. But on elizebthwarren.com, we had to carefully coordinate our site updates at the same pace as the rest of the campaign (AKA, everything had to go out ASAP, and often without any significant heads-up).

This meant for most of the campaign, the website architecture was fundamentally a cache layer sitting in-front of web servers that would always spit out the latest version of the website. Clear the cache and _voilà_!

Over the course of the campaign we still went through several architecture evolutions as increased traffic, technical requirements and web content continued to force our stack to scale. Here is a brief overview,

Launch (Feb. 2019): Wordpress backend, React client side rendering

Spring 2019: Started integrating Contentful with client side React components

June 2019: NodeJS backend on Heroku, converted Wordpress templates to Mustache templates, continued client side rendering existing React components

Mid summer 2019: Redis caching Contentful data

Late summer 2019: Server side rendering React components

Fall 2019: Storing server-side-rendered pages in Redis

Dec. 2019: Background workers doing SSR, moved assets to cdn.

Feb. 2020: Moved to fully static website.

Once we left Wordpress, the common theme was to put more things in Redis and add more servers when we experienced high traffic (eg: debates or other viral moments). While it "worked" for the most part, I didn't like constantly worrying things were going to fall apart at the worst possible moment.

The overall SSR strategy we implemented was nevertheless still a success for our requirements of updating things as soon as possible, and ultimately continued to be the backbone of how rendering the static website would work.

The premise is that we should never attempt to re-render the entire website at once, and instead use site traffic to trigger incremental re-renders if cached content is stale. At a high level, it looks like the following:

1. Keep a set of key value pairs for the "build version" and "content version".
2. If anything is published in the CMS, a webhook fires and the "content version" is incremented.
3. If the website is deployed, increment the build version.
4. If the last time a page was rendered was for an older build or content version, re-render the page and clear the cache.

The "content version" is kind of naive, as it leads to lots of unnecessary re-rendering, but it's 10x simpler than trying to use Contentful webhooks to maintain a consistent graph database of our CMS content references that would be required to do more selective re-rendering (as I explained earlier with the "author" reference problem).

During the winter of 2019, mostly in anticipation of Iowa and the rest of the primaries kicking off, we started a series of architecture improvements.

First, we moved all of the frontend assets to a cdn subdomain. This is common practice already in high-traffic websites, and it's one of those things that was on my to-do list forever but never made it to the sprint.

We did something interesting, however. Every deploy created a new, uniquely named and immutable folder in the cdn that all of the assets would go in. For example,

```
https://cdn.elizabethwarren.com/deploy/1cc2e8207789dc8c0a3f83486cae16a3cd3effa8b970f6306c1435c31014a560890f5236722af8d7ed3cfec76107508ffd82b2eb872b00e3ddf3f88012ead904/build/6.5d30e50ab08bb11f9cf8.js
```

This ensured that regardless of whether you saw a stale version of the site from your browser cache, or a stale version of the site that was served on our end, the asset would always exist, as it was originally deployed. As we get more into the server side rendering strategy we used, this point will become increasingly more important.

The other benefit of this unique folder name is it allowed us to safely apply a high `max-age` value to the `cache-control` header, ensuring your browser kept the file for quite a long time instead of re-asking for it the next time you visit. Using max-age on files that change content between deploys, but don't necessarily change filenames is a quick way to bury your users in very bad cache problems. Our webpack configuration hashed the names of our Javascript chunk files, but certain files do not have uniquely hashed file names (in particular, webpack [manifest files](https://webpack.js.org/concepts/manifest/)). (_*I should also note, certain files such as fonts that did not change between deploys were kept in a consistent place, and not redeployed under unique build folders_).

Once we got all of the fonts, images, CSS and Javascript served by the CDN, the next step was to perform server-side rendering on background workers and store the html in Redis, making the web servers only responsible for serving HTML that was already put in Redis. The new SSR strategy looked like the following,

1. Keep a set of key value pairs for the "build version" and "content version".
2. If anything is published in the CMS, a webhook fires and the "content version" is incremented.
3. If the website is deployed, increment the build version and push build files to the CDN.
4. When a request comes in, web server immediately serves whatever page we have in Redis cache.**
5. If the page we served was stale, add an item to a Redis queue to notify a background worker the page needs to be re-rendered.
6. Background worker eventually re-renders the page, pushes the HTML to Redis cache and clears Cloudflare cache for that page.

_** It's possible that the stale pages were from a prior build of the site, which is why it's important we had the unique build folders I mentioned earlier! It's kind of like a mini wayback machine._

These two architectural changes had immediate, noticeable improvements that improved the stability of our stack. Due to how successful they were, this was supposed to be the last architectural change we made before primary season started early February. Unfortunately, Heroku experienced several significant outages during the month of January. This included service outages to important features such as logging that lasted over 24 hours, and complete platform failures. So just over a week before the Iowa caucuses, scared out of my mind Heroku was off the rails, I convened some members of the team to decide if we should move to a static website, and we ultimately decided to do so.

Part of the safety net in making the decision was that most of the work involved in making this switch was creating the edge routing on Cloudflare Workers, as our backend web servers merely had to point the data they were already generating at S3 instead of Redis. Here is what the new SSR strategy was, and the last architectural change we shipped to production.

1. Keep a set of key value pairs for the "build version" and "content version".
2. If anything is published in the CMS, a webhook fires and the "content version" is incremented.
3. If the website is deployed, increment the build version and push build files to the CDN.
4. When a request comes in, Cloudflare Worker pulls the HTML from the CDN (*also had simple retry logic, as S3 requests rarely but occasionally fail*).
5. After serving the request, the Cloudflare Worker forwards the request to the web server.
6. Web server receives the request, if the page is marked as stale, web server adds an item to a Redis queue to notify a background worker the page needs to be re-rendered.
6. Background worker eventually re-renders the page, pushes the HTML to the CDN and clears Cloudflare cache for that page.

This strategy solidified every aspect of the website was served from a CDN first, and all of the computational and network load of server side rendering was off-loaded to background workers. Just as important, it continued to fulfill our goal of allowing CMS editors to publish changes and see the update made to production in seconds.

And then it came, the night of the Iowa caucuses. As we were in the thick of prime-time, just before 9pm Eastern to be exact, Heroku experienced another [major platform failure](https://status.heroku.com/incidents/1954)... but jokes on them because ElizabethWarren.com was fully static! 😎

----

If you'd like to read more about the work we did on ElizabethWarren.com, checkout [this Twitter thread](https://twitter.com/itsjoekent/status/1236323746035699713)!
