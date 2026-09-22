// The Welsh 25k Tech Giveaway: one startup based in Wales wins a complete tech stack designed
// and built by us, worth up to £25,000. Not just an app or a website: mobile, wearables and
// tablets, web apps, backend and server functions, authentication and security, notifications,
// SEO and marketing, integrations, AI features, and the launch infrastructure underneath it.
//
// This file is the source of truth for the giveaway page, the home page banner and the footer.
// Entries are sent through the contact form Lambda (backend/contact-form), which enforces the
// same closing time, so update GIVEAWAY_CLOSES_AT there too if the date moves.

export const GIVEAWAY_NAME = 'Welsh 25k Tech Giveaway';
export const GIVEAWAY_PATH = '/giveaway';
export const PRIZE_VALUE = '£25,000';

// One sentence, used on the giveaway page and the home page banner so they can't drift apart
export const GIVEAWAY_TAGLINE =
  `We design and build the technology behind one Welsh startup, worth up to ${PRIZE_VALUE}: the app, the web app, the backend, and everything that has to work for real users to turn up.`;

// 23:59 UK time on 30 November 2026. The UK is on GMT in November, so this is also UTC.
export const ENTRIES_CLOSE_AT = '2026-11-30T23:59:59Z';
export const CLOSING_DATE_LABEL = '30 November 2026';
export const CLOSING_DATE_SHORT_LABEL = '30 Nov';
export const WINNER_ANNOUNCED_LABEL = '18 December 2026';

export const isGiveawayOpen = (now: number = Date.now()): boolean =>
  now <= Date.parse(ENTRIES_CLOSE_AT);

// The headline deliverables. The detail of what we can build is in TECH_STACK below.
export const PRIZE_INCLUDES = [
  'Discovery and scoping sessions to decide what your first release has to do',
  'The product itself: mobile apps, wearable and tablet apps, web apps, websites, or any mix of them',
  'The backend behind it: server functions, databases, integrations and admin tools',
  'Authentication, security and the data handling you need to run it properly',
  'Notifications, SEO and the marketing plumbing that gets you your first users',
  'Launch on the App Store, Google Play or the web, set up in accounts you own',
  'Ownership of the code, designs and infrastructure we create for you',
];

// What the prize can be spent on. This is the detailed answer to "what am I allowed to ask for?",
// and it is deliberately the work we do every week rather than a wish list.
export const TECH_STACK = [
  {
    title: 'Mobile Apps',
    text: 'iOS and Android, built from one React Native codebase, dropping into native Swift or Kotlin where a feature needs it.',
    items: [
      'Consumer apps, marketplaces and internal tools',
      'Offline-first behaviour and background sync',
      'Maps, location and live tracking',
      'Camera, media, scanning and file uploads',
      'In-app purchases and subscriptions',
      'App Store and Google Play submission',
    ],
  },
  {
    title: 'Wearables and Tablets',
    text: 'The screens people reach for when a phone is in a pocket. We have shipped Apple Watch alongside a live app.',
    items: [
      'Apple Watch and Wear OS companion apps',
      'iPad and Android tablet layouts',
      'Home screen widgets and complications',
      'Live Activities and Dynamic Island',
      'Health, fitness and sensor data',
    ],
  },
  {
    title: 'Web Apps and Websites',
    text: 'Anything from a marketing site that ranks to a full platform your customers log into every day.',
    items: [
      'Customer portals and SaaS dashboards',
      'Admin consoles and internal back offices',
      'Booking, ordering and marketplace flows',
      'Marketing sites and landing pages',
      'A CMS so you can edit content yourself',
      'Progressive web apps that install on a phone',
    ],
  },
  {
    title: 'Backend and Server Functions',
    text: 'The part nobody sees and everything depends on. Built serverless by default, so it costs little when quiet and scales when you are busy.',
    items: [
      'REST and GraphQL APIs',
      'Serverless functions and background workers',
      'Databases, schemas and data modelling',
      'Scheduled jobs, queues and webhooks',
      'File, image and document storage',
      'Payments, invoicing and payouts',
      'Search, reporting and data exports',
    ],
  },
  {
    title: 'Authentication and Security',
    text: 'Getting people into your product safely, and keeping their data where it belongs.',
    items: [
      'Email, social and passwordless sign-in',
      'Two-factor and biometric unlock',
      'User roles, teams and permissions',
      'Encryption in transit and at rest',
      'GDPR-ready data handling, consent and deletion',
      'Rate limiting, abuse protection and audit logs',
      'Secure secrets and key management',
    ],
  },
  {
    title: 'Notifications and Messaging',
    text: 'The systems that bring people back without annoying them.',
    items: [
      'Push notifications on iOS, Android and web',
      'Transactional email that lands in the inbox',
      'SMS and WhatsApp alerts',
      'In-app messages and activity feeds',
      'Scheduled digests and reminders',
      'Notification preferences people can control',
    ],
  },
  {
    title: 'SEO and Marketing',
    text: 'Built in from the first commit rather than bolted on after launch.',
    items: [
      'Technical SEO, structured data and sitemaps',
      'Page speed and Core Web Vitals',
      'Landing pages and conversion tracking',
      'Analytics dashboards you can actually read',
      'Email capture, onboarding and lifecycle emails',
      'App store listing copy, screenshots and ASO',
      'Referral and sharing mechanics',
    ],
  },
  {
    title: 'AI and Automation',
    text: 'Practical AI that removes work, not a demo. We build on the current Claude and OpenAI models.',
    items: [
      'Assistants and chat built into your product',
      'Document reading, extraction and summarising',
      'Semantic search and recommendations',
      'Classification, tagging and moderation',
      'Automations that replace manual admin',
    ],
  },
  {
    title: 'Integrations and Data',
    text: 'Connecting your product to the tools your business and your customers already use.',
    items: [
      'Stripe and other payment providers',
      'CRMs, accounting and spreadsheets',
      'Calendars, email and messaging platforms',
      'Third-party and government APIs',
      'Migrating the data you already hold',
    ],
  },
  {
    title: 'Design',
    text: 'Interface design for every screen we build, done alongside the engineering rather than thrown over a wall.',
    items: [
      'User flows and information architecture',
      'Interface design for each screen we build',
      'A design system so it stays consistent',
      'Accessibility to WCAG standards',
      'Brand basics and launch artwork',
    ],
  },
  {
    title: 'Launch and Infrastructure',
    text: 'Set up in your own cloud accounts, documented, and handed over so you are never locked to us.',
    items: [
      'AWS, Firebase or Google Cloud setup',
      'Deployment pipelines and staging environments',
      'Monitoring, error alerts and uptime checks',
      'Backups and disaster recovery',
      'Documentation and a handover walkthrough',
    ],
  },
];

// The honest version of "how far does £25,000 go?"
export const SCOPE_PROMISE = `The prize is up to ${PRIZE_VALUE} of our time, not a fixed menu. Bring us the whole idea, including the parts you assume are out of reach, and we will tell you straight away what fits. We build the things your product cannot work without first, then keep going down the list until the prize value is used. Whatever we can get built for you inside that, we will.`;

export const SCOPE_STEPS = [
  {
    title: 'Tell us everything',
    text: 'The whole idea, not a trimmed-down version of it. Nothing is ruled out before we have costed it.',
  },
  {
    title: 'We map it out together',
    text: `We turn it into a build plan, ordered by what your product needs most, and show you exactly where ${PRIZE_VALUE} runs out. You agree the scope in writing before anything starts.`,
  },
  {
    title: 'We build as much as the prize covers',
    text: 'The essentials first, then as far down the list as the time allows. Anything left over is yours to build later, with us or with anyone else.',
  },
];

// What the prize does not stretch to. Stated plainly so nobody finds out after they have won.
export const NOT_INCLUDED = [
  'Running costs: hosting, domain names, Apple and Google developer accounts, paid APIs and third-party subscriptions. We set these up in accounts you own, and you pay for what you use.',
  'Ad spend and paid media. We will build the landing pages and the tracking, but the budget is yours.',
  'Maintenance, support and new features once the agreed scope is delivered. We are happy to quote for that separately, and you are under no obligation to use us.',
  'Hardware, custom devices, firmware and anything that has to be manufactured.',
  'Licences, certification and regulatory approval, such as medical, financial or gambling permissions. We can build to the rules, but getting approved is on you.',
  'Legal and accounting work, including your terms of service and privacy policy. Send them over and we will wire them into the product.',
  'Your words, photos and video. We will design around them and help you place them.',
  'Rebuilding a large, mature system from scratch. We can extend, replace parts of, or build alongside something you already own, so tell us what exists and we will be honest about what fits.',
  'Anything illegal, unsafe, or that you do not have the right to build.',
];

export const ELIGIBILITY = [
  'Your startup is based in Wales: it is registered in Wales, or at least one founder lives in Wales',
  'You don\'t need a registered company yet. An idea and the commitment to see it through is enough',
  'Any stage is welcome: an idea on paper, a prototype, or something already live that needs building out properly',
  'You are 18 or over and can enter on behalf of your startup',
  'One entry per startup',
];

// How we pick the winner. Kept in step with the judging clause in GIVEAWAY_TERMS.
export const JUDGING_CRITERIA = [
  {
    title: 'Originality',
    text: 'How fresh the idea is. Something nobody has built yet, or a familiar problem solved in a way that has not been tried, beats another copy of what already exists.',
  },
  {
    title: 'Impact Potential',
    text: 'Who this changes things for, and by how much. We are looking for the ideas that make a real difference to the people who use them, and to Wales.',
  },
  {
    title: 'Success Potential',
    text: 'How likely this is to work: the people behind it, the time they can give it, whether there is a route to real users, and what happens once it is live.',
  },
  {
    title: 'A Focused First Release',
    text: `Whether we can design, build and launch a version within the ${PRIZE_VALUE} prize that is enough to prove the idea.`,
  },
];


export const TIMELINE = [
  { when: 'Now', title: 'Entries open', text: 'Tell us about your startup and what you want built.' },
  { when: CLOSING_DATE_LABEL, title: 'Entries close', text: 'The form closes at 23:59 UK time.' },
  { when: 'Early December', title: 'Shortlist calls', text: 'We invite a shortlist to a video call to talk through their idea.' },
  { when: `By ${WINNER_ANNOUNCED_LABEL}`, title: 'Winner announced', text: 'We email the winner, then announce them here and on our social channels.' },
  { when: 'Early 2027', title: 'The build begins', text: 'We agree the scope together, then design, build and launch it.' },
];

// Kept under 40 characters each: the Lambda rejects anything longer (GIVEAWAY_MAX_LENGTHS.platform)
export const PLATFORM_OPTIONS = [
  'Mobile app (iOS and Android)',
  'Web app or platform',
  'Website with a backend',
  'Mobile and web together',
  'Wearable or tablet app',
  'Something else',
  'Not sure yet, help us decide',
];

export const STAGE_OPTIONS = [
  'Just an idea',
  'Researching and talking to users',
  'Designs or a prototype',
  'Already launched something',
];

export const WALES_CONNECTION_OPTIONS = [
  'Registered in Wales',
  'A founder lives in Wales',
  'Both',
];

export const GIVEAWAY_FAQS = [
  {
    question: 'Is it really free?',
    answer: `Yes. It costs nothing to enter, and the winner pays nothing for the design, development and setup covered by the ${PRIZE_VALUE} prize. The only costs are running costs such as hosting, domain names, app store developer accounts and paid third-party services, which the winner pays directly.`,
  },
  {
    question: 'Is it just an app?',
    answer:
      'No, and that is the point. The prize covers the whole tech stack: mobile apps, wearable and tablet apps, web apps and websites, the backend and server functions behind them, authentication and security, notifications, SEO and marketing, AI features, integrations, and the hosting and monitoring it all runs on. If it is technology we build regularly, you can ask for it.',
  },
  {
    question: `What if my idea is bigger than ${PRIZE_VALUE}?`,
    answer: `Most good ideas are. Tell us the whole thing anyway. We work out together what your product cannot launch without, build that first, and keep going until the prize value is used. Whatever we can fit in, we will, and you will know where the line falls before we start rather than after. If you want to go further afterwards, we can quote separately, and you are under no obligation to use us.`,
  },
  {
    question: 'Can I use it on something I have already started?',
    answer:
      'Yes, as long as you own it. We can extend what you have, replace the parts that are holding you back, or build the missing half. A full rewrite of a large, mature system will not fit in the prize, so tell us what already exists and we will be honest about what we can do with it.',
  },
  {
    question: 'What counts as a Welsh startup?',
    answer:
      'Your startup is registered in Wales, or at least one founder lives in Wales. You don\'t need to have registered a company yet.',
  },
  {
    question: 'Who owns what you build?',
    answer:
      'You do. Once the build is finished, the code, designs and infrastructure we create for you belong to you, set up in accounts in your name. You are free to take it to any other developer.',
  },
  {
    question: 'What happens after the build is finished?',
    answer:
      'That is up to you. Maintenance, support and new features are not part of the prize, so we will quote for them if you want us to stay involved. If you would rather take it elsewhere, you leave with the code, the documentation and a handover walkthrough.',
  },
  {
    question: 'Do I need to send a video?',
    answer:
      'No, a video is optional. If you would like to include a short pitch, upload it to YouTube (unlisted is fine), Loom or Google Drive and paste the link into the form. Make sure anyone with the link can watch it.',
  },
  {
    question: 'Will you share my idea?',
    answer:
      'No. Only the Blundell Technologies team reads entries, and we don\'t share them with anyone else. The only entry we make public is the winner\'s, and only with their agreement.',
  },
  {
    question: 'Can I enter more than one idea?',
    answer: 'One entry per startup, so pick the idea you are most committed to.',
  },
  {
    question: 'Can I change my entry after sending it?',
    answer: `Yes. Reply to your confirmation email before ${CLOSING_DATE_LABEL} and tell us what to change.`,
  },
];

export const GIVEAWAY_TERMS = [
  'The Welsh 25k Tech Giveaway (the "giveaway") is run by Blundell Technologies, Cardiff, UK ("we", "us"). Questions about the giveaway can be sent to jackjblundell@gmail.com.',
  'The giveaway is free to enter. No purchase is necessary.',
  `Entries open when this page is published and close at 23:59 UK time on ${CLOSING_DATE_LABEL}. Entries received after this time will not be considered.`,
  'The giveaway is open to startups based in Wales, meaning the startup is registered in Wales or at least one founder lives in Wales. Startups that are not yet registered as a company may enter.',
  'The person entering must be 18 or over and have the authority to enter on behalf of the startup. Employees of Blundell Technologies and their immediate families may not enter.',
  'Entries must be made through the form on this page. One entry is allowed per startup. The idea entered must belong to the entrant, and must not infringe anyone else\'s rights.',
  `The prize is the design, development and launch of one product by Blundell Technologies, valued at up to ${PRIZE_VALUE} at our standard rates. It may include mobile apps, wearable and tablet apps, web apps and websites, backend and server functions, authentication and security, notifications, SEO and marketing setup, AI features, third-party integrations, and the hosting, deployment and monitoring these require.`,
  `The prize is a value of our time, not a fixed list of features. The scope of the work will be agreed with the winner in writing before work starts, and we will build as much of that scope as the ${PRIZE_VALUE} value covers, prioritising the features agreed as essential. Work outside the agreed scope is not included.`,
  'The prize does not include third-party running costs such as hosting, domain names, Apple and Google developer accounts, paid APIs and other paid third-party services, which the winner pays directly. It also excludes advertising spend, hardware and firmware, licensing, certification and regulatory approval, legal and accounting work, content such as copy, photography and video, and maintenance, support or new features after the agreed scope is delivered.',
  'The prize has no cash alternative, cannot be transferred, and any value not used within the agreed scope cannot be exchanged or carried over.',
  'Entries will be judged by the Blundell Technologies team on the originality of the idea, its potential impact, its potential for success, and whether a focused first release can be delivered within the prize value. Shortlisted entrants may be invited to a video call. Our decision is final.',
  `The winner will be contacted by email by ${WINNER_ANNOUNCED_LABEL}. If the winner does not respond within 14 days, or does not meet these terms, we may choose another entrant.`,
  'The build will start at a date agreed with the winner in early 2027. The winner must take part in regular check-ins and give feedback in good time. If the winner stops responding for more than 30 days, we may end the prize.',
  'On completion, the winner will own the intellectual property in the code, designs and configuration we create specifically for them. We keep ownership of our own general tools and libraries, and grant the winner a licence to use any that are part of the delivered work.',
  'By accepting the prize, the winner agrees that we may announce their name and startup, and feature the project as a case study on our website and social channels.',
  'Entries are confidential. We use the details in an entry only to run the giveaway, and we delete entries that do not win within 6 months of the winner being announced.',
  'We may change, suspend or cancel the giveaway if circumstances outside our control make this necessary.',
  'These terms are governed by the laws of England and Wales.',
];
