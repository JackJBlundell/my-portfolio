// The Welsh 25k App Giveaway: one startup based in Wales wins an MVP designed and built by us.
// Entries are sent through the contact form Lambda (backend/contact-form), which enforces the
// same closing time, so update GIVEAWAY_CLOSES_AT there too if the date moves.

export const GIVEAWAY_NAME = 'Welsh 25k App Giveaway';
export const GIVEAWAY_PATH = '/giveaway';
export const PRIZE_VALUE = '£25,000';

// 23:59 UK time on 30 November 2026. The UK is on GMT in November, so this is also UTC.
export const ENTRIES_CLOSE_AT = '2026-11-30T23:59:59Z';
export const CLOSING_DATE_LABEL = '30 November 2026';
export const CLOSING_DATE_SHORT_LABEL = '30 Nov';
export const WINNER_ANNOUNCED_LABEL = '18 December 2026';

export const isGiveawayOpen = (now: number = Date.now()): boolean =>
  now <= Date.parse(ENTRIES_CLOSE_AT);

export const PRIZE_INCLUDES = [
  'Discovery and scoping sessions to decide what your MVP needs to do',
  'UX and interface designs you can click through before development starts',
  'Development of your MVP as an iOS and Android app, a web app, or both',
  'The backend, database and admin tools your MVP needs to run',
  'Help releasing to the App Store, Google Play or the web',
  'Ownership of the code and designs we create for your MVP',
];

export const ELIGIBILITY = [
  'Your startup is based in Wales: it is registered in Wales, or at least one founder lives in Wales',
  'You don\'t need a registered company yet. An idea and the commitment to see it through is enough',
  'You are 18 or over and can enter on behalf of your startup',
  'One entry per startup',
];

export const JUDGING_CRITERIA = [
  {
    title: 'A Real Problem',
    text: 'Who has the problem, how they deal with it today, and why your app would do it better.',
  },
  {
    title: 'The Right Team',
    text: 'Why you are the people to build this business, and how much time you can put into it.',
  },
  {
    title: 'A Focused First Version',
    text: `An MVP we can design and build within the ${PRIZE_VALUE} prize, focused on the features that prove the idea.`,
  },
  {
    title: 'A Plan Beyond Launch',
    text: 'How you will reach your first users once the app is live, and what you will do next.',
  },
];

export const TIMELINE = [
  { when: 'Now', title: 'Entries open', text: 'Tell us about your startup and the app you want to build.' },
  { when: CLOSING_DATE_LABEL, title: 'Entries close', text: 'The form closes at 23:59 UK time.' },
  { when: 'Early December', title: 'Shortlist calls', text: 'We invite a shortlist to a video call to talk through their idea.' },
  { when: `By ${WINNER_ANNOUNCED_LABEL}`, title: 'Winner announced', text: 'We email the winner, then announce them here and on our social channels.' },
  { when: 'Early 2027', title: 'The build begins', text: 'We scope the MVP together, then design and build it.' },
];

export const PLATFORM_OPTIONS = ['iOS & Android app', 'Web app', 'Both', 'Not sure yet'];

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
    answer: `Yes. It costs nothing to enter, and the winner pays nothing for the design and development covered by the ${PRIZE_VALUE} prize. The only costs are running costs such as hosting, domain names and app store developer accounts, which the winner pays directly.`,
  },
  {
    question: 'What counts as a Welsh startup?',
    answer:
      'Your startup is registered in Wales, or at least one founder lives in Wales. You don\'t need to have registered a company yet.',
  },
  {
    question: 'Who owns the app?',
    answer:
      'You do. Once the build is finished, the code and designs we create for your MVP belong to you.',
  },
  {
    question: `What if my idea is bigger than ${PRIZE_VALUE}?`,
    answer: `Most good ideas are. We work with you to choose the features that prove the idea and fit within the ${PRIZE_VALUE} prize. If you want to go further afterwards, we can quote for that separately, and you are under no obligation to use us.`,
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
  'The Welsh 25k App Giveaway (the "giveaway") is run by Blundell Technologies, Cardiff, UK ("we", "us"). Questions about the giveaway can be sent to jackjblundell@gmail.com.',
  'The giveaway is free to enter. No purchase is necessary.',
  `Entries open when this page is published and close at 23:59 UK time on ${CLOSING_DATE_LABEL}. Entries received after this time will not be considered.`,
  'The giveaway is open to startups based in Wales, meaning the startup is registered in Wales or at least one founder lives in Wales. Startups that are not yet registered as a company may enter.',
  'The person entering must be 18 or over and have the authority to enter on behalf of the startup. Employees of Blundell Technologies and their immediate families may not enter.',
  'Entries must be made through the form on this page. One entry is allowed per startup. The idea entered must belong to the entrant, and must not infringe anyone else\'s rights.',
  `The prize is the design and development of one minimum viable product (MVP) by Blundell Technologies, valued at up to ${PRIZE_VALUE} at our standard rates. The scope of the MVP will be agreed with the winner in writing before work starts.`,
  'The prize does not include third-party running costs such as hosting, domain names, Apple and Google developer accounts, or paid third-party services, which the winner pays directly. Ongoing maintenance and new features after the agreed MVP is delivered are not included.',
  'The prize has no cash alternative, cannot be transferred, and any value not used within the agreed scope cannot be exchanged or carried over.',
  'Entries will be judged by the Blundell Technologies team on the problem the app solves, the team behind it, whether a focused MVP can be delivered within the prize value, and the plan beyond launch. Shortlisted entrants may be invited to a video call. Our decision is final.',
  `The winner will be contacted by email by ${WINNER_ANNOUNCED_LABEL}. If the winner does not respond within 14 days, or does not meet these terms, we may choose another entrant.`,
  'The build will start at a date agreed with the winner in early 2027. The winner must take part in regular check-ins and give feedback in good time. If the winner stops responding for more than 30 days, we may end the prize.',
  'On completion, the winner will own the intellectual property in the code and designs we create specifically for their MVP. We keep ownership of our own general tools and libraries, and grant the winner a licence to use any that are part of the MVP.',
  'By accepting the prize, the winner agrees that we may announce their name and startup, and feature the project as a case study on our website and social channels.',
  'Entries are confidential. We use the details in an entry only to run the giveaway, and we delete entries that do not win within 6 months of the winner being announced.',
  'We may change, suspend or cancel the giveaway if circumstances outside our control make this necessary.',
  'These terms are governed by the laws of England and Wales.',
];
