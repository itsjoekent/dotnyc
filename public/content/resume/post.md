<Hero>Work</Hero>

Over the course of my short but ever-growing career, I've been fortunate to be apart of a number of projects focused on building tools to advocate for social or political change.

# Blue State Digital

Blue State Digital ("BSD") is an agency and technology company that's been helping clients create change since 2004. I've been a Senior UI Engineer since March 2018 on the BSD Tools, which is a platform that helps hundreds of organizations grow impactful digital programs—from fundraising to advocacy, with personalized communications and deep analysis.

Below are some of the projects I've been able to lead or contribute towards,

## Rebuilding the Wrappers Application

The Wrappers Application ("wrappers") is a tool used by BSD Tools clients to personalize their pages by enabling them to write custom CSS & Javascript that is injected onto a page. The wrappers application is specifically an instrument for managing, editing, storing and serving wrapper content.

<Image alt="Wrappers management interface" src="wrapper_manager.png" layout="outset" />

My responsibility on this project was to architect and rebuild the frontend UI in tandem with a backend developer rebuilding the backend API. For added complexity, I also had to merge data sources from different internal API's for a large set of objects within the frontend and keep the application feeling responsive to use.

This work involved coordinating API specifications between different teams, and communicating with the product team on necessary requirement changes or feature suggestions. Towards the end of the project it also became my responsibility to mentor another developer and onboard them to the project.

## Creating an internal Design Language System

One of the UI problems facing the BSD Tools team was an inconsistent designs across different applications. To solve this, I started building an internal Design Language System ("DLS") for all of the teams to share and use.

When deciding how to build the DLS, I pitched a novel but unorthodox idea to the team. We would build the application assigned to our team without any styling, just the required business logic. Afterwards, we would make the first iteration of the design system, and paint it onto the application.

The DLS has grown strong since it's inception, as it's now a managed product with over 60 patterns that can be imported into a project. The underlying architecture of the DLS is quite novel, in that it can work seamlessly with either React or pure HTML/CSS. It's styling architecture relies on atomic css, and much of it is generated programmatically based on a set of variables.

Today work on the DLS consists of ongoing maintenance, planning the increase of it's adoption and crafting a strong foundation of usage documentation. Alongside this I have also been responsible for designing the documentation interface.

<Image alt="Design Language System documentation sketch" src="dls_docs_sketch.png" layout="outset" />

## Fundraising components

One of the new product offerings by the BSD Tools team is a drag-n-drop, multi-step form builder, internally labeled as "Torchlight". For a portion of my time at Blue State Digital, I was asked to assist the Torchlight team by building out the first iteration of fundraising components which will be used in Torchlight forms.

This work involved creating multiple, complex components for both administrators and users.

(TODO: add form screenshot here)

Additionally, I had to build a custom process for converting custom CSS written by clients into a format suitable for the Stripe.js library.

# Let America Vote

Let America Vote ("LAV") was founded to fight back against proposals across the country that make it harder for eligible voters to exercise their constitutional right to cast a ballot. My volunteer & freelance work with Let America Vote ranged from the summer of 2017 to the summer of 2018 as various opportunities for digital projects came up.

## Cap, Gown, Vote!

Cap, Gown, Vote! is Let America Vote’s initiative partnering with mayors, students and activists across the country to get high-school seniors registered to vote in the 2018 election. You can read more about initiative here where it was covered in [Teen Vogue](https://www.teenvogue.com/story/cap-gown-vote-helping-register-eligible-high-school-students).

My involvement with this voter registration campaign was to build a digital platform to support the effort of organizers in states across the country.
This included conceptualizing the entire voter-registration user flow for high school students, designing the website, providing feedback on content, building the application, working with stakeholders on prioritization and ongoing operations support. I had to wear a few hats.

<Image alt="Cap Gown Vote homepage" src="capgownvote_home.png" credit="capgownvote.org" layout="outset" />

The registration flow is highly nuanced, as it accounts for the differing voter registrations laws of all 50 states. Additionally, the platform has a number of remarkable features, such as tracking which school registers the most students through the platform.

## Voting Rights House Party

Voting Rights House Party was an initiative by Let America Vote to host a number of house parties across the country to build an on-the-ground movement for defending voting rights.

My involvement with this event campaign was to build a digital platform that could showcase all of the house parties that were being hosted and provide a form for activists to sign up. (Note: The screenshot below is using placeholder event data)

<Image alt="Voting rights house party homepage" src="votingrightshouseparty_homepage.png" credit="votingrightshouseparty.com" layout="outset" />

The platform allowed activists to signup for an event in their area by logging in through Google. This allowed them to participate in a small community page where they could share ideas or articles around voting rights, and post comments or emoji reactions.

# DoSomething.org

DoSomething.org ("DoSomething") is mobilizing young people in every US area code and in 131 countries. I worked at DoSomething from July 2014 to January 2018 in a number of roles, moving from Web Developer Intern to Junior Software Engineer to Software Engineer.

Throughout my time at DoSomething, I got to work on a series of teams and projects and figure out what kinds of digital problems I found interesting to work on. These tasks ranged from chatbots, to collecting data on how young people interacted with the organizations products and even running custom live-tech for the organizations bi-annual events. There were some challenging problems as well, such as being apart of the team that made the legacy content platform support multiple languages.

## Rebuilding the Campaigns page

Some of the most important work I did at DoSomething was being apart of the application team that started rebuilding the core Campaigns website.

As part of this rebuild, I was responsible for building out a number of features such as custom quizzes and the underlying layout logic for a gallery of custom components showcasing the impact young people were making with the platform. (Note: The screenshots below are using example data)

<Image alt="DoSomething.org Quiz" src="dosomething_quiz.png" layout="column" />

<Image alt="DoSomething.org Feed" src="dosomething_feed.png" layout="column" />

I also spent a significant amount of time with product and design team members brainstorming and building out small scale experiments to improve the campaign conversion funnel. This process involved looking at data from multiple sources, and talking to staff members from various teams about their own ideas to improve the user flow.
