// EagleOnly: our own platform for UK golf clubs. Each club gets a member app under its own name,
// colours and crest, plus one system to run the club from.
//
// This file is the source of truth for the /eagleonly pages, the home page section and the footer.
// Copy follows the EagleOnly tone of voice: a golfer talking to a club, British English, plain
// words, specific numbers over adjectives, no em dashes, and never knocking a competitor's quality
// (compare on price and ownership only).
//
// Deliberately left off the site until they are settled: the setup fee, any savings figure,
// the referral rate, WHS ISV approval, the 30% booking uplift and the sponsor income estimate.

export const EO_NAME = 'EagleOnly';
export const EO_PATH = '/eagleonly';
export const EO_TAGLINE = 'Putting your club ahead of par.';
export const EO_HERO_LINE = 'Your club. Your app. Your revenue.';
export const EO_SUMMARY =
  'EagleOnly gives UK golf clubs their own branded member app and one system to run the club from, with payments going straight to the club.';

export const EO_EMAIL = 'jack@blundell-technologies.co.uk';
export const EO_WEBSITE = 'https://eagleonly.co.uk';

// The eagle-and-club icon. Small copies are made from public/img/assets/icon-eagle-only.png (1024px).
export const EO_ICON = '/img/eagleonly/icon-192.webp';
export const EO_ICON_PNG = '/img/eagleonly/icon-192.png';
export const EO_ICON_FULL = '/img/assets/icon-eagle-only.png';
export const EO_FAVICON = '/img/eagleonly/favicon-96.png';
// 1200x630 share image: the icon centred on its own green
export const EO_OG_IMAGE = '/img/eagleonly/og-eagleonly.jpg';
export const EO_OG_ALT = 'EagleOnly by Blundell Technologies';
export const EO_DEMO_MAILTO = `mailto:${EO_EMAIL}?subject=${encodeURIComponent(
  'EagleOnly demonstration request'
)}`;

// Primary call to action used across the EagleOnly pages and the home page section
export const EO_CTA_LABEL = 'Book a demo';
export const EO_CTA_TEXT =
  "Arrange a short demonstration and we will show you how EagleOnly would look and work under your club's name and colours.";

// Founding Partner places close at 23:59 UK time on 31 December 2026 (GMT, so also UTC)
export const FOUNDING_CLOSES_AT = '2026-12-31T23:59:59Z';
export const FOUNDING_CLOSING_LABEL = '31 December 2026';
export const FOUNDING_PLACES = 5;
export const FOUNDING_PRICE = '£129.99';
// Founding Partners keep their rate for this many months from the day they switch
export const FOUNDING_LOCK_MONTHS = 36;
export const FOUNDING_LOCK_LINE = `Locked in for ${FOUNDING_LOCK_MONTHS} months from the day you switch.`;
export const ALBATROSS_PRICE = '£100';
export const TRANSACTION_FEE = '10p';
export const GO_LIVE_SEASON = '2027';

export const isFoundingOpen = (now: number = Date.now()): boolean =>
  now <= Date.parse(FOUNDING_CLOSES_AT);

// The sub-pages, in the order they appear in the EagleOnly sub-navigation
export const EO_PAGES = [
  { path: EO_PATH, label: 'Overview' },
  { path: `${EO_PATH}/features`, label: 'Features' },
  { path: `${EO_PATH}/opentee`, label: 'OpenTee' },
  { path: `${EO_PATH}/pricing`, label: 'Pricing' },
  { path: `${EO_PATH}/switching`, label: 'Switching' },
];

export type EoTier = 'Eagle' | 'Albatross';

export interface EoFeature {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  tier: EoTier;
}

// The full product suite. The Eagle package is the core platform; Albatross adds hardware and back office.
export const EO_FEATURES: EoFeature[] = [
  {
    slug: 'member-app',
    title: 'Your own member app',
    summary:
      "An iOS and Android app in the App Store and Google Play under your club's name, colours and crest. Members see your club, not ours.",
    points: [
      'Tee booking',
      'Notices, news and a members’ feed',
      'Gallery and events calendar',
      'Leaderboards and member directory',
      'Push notifications',
    ],
    tier: 'Eagle',
  },
  {
    slug: 'admin-crm',
    title: 'Admin panel and CRM',
    summary:
      "Runs in the browser on a subdomain of your club's website, so there is nothing to install. Staff get access to the parts they need.",
    points: [
      'Members and renewals',
      'Tee sheet and competitions',
      'News, events and gallery',
      'Course status',
      'Role-based staff access',
    ],
    tier: 'Eagle',
  },
  {
    slug: 'tee-sheet',
    title: 'Tee sheet and visitor booking',
    summary:
      'An online tee sheet, plus a public visitor booking page that plugs into the website you already have.',
    points: [
      'Online tee sheet with your own booking rules',
      "Visitor booking page on your club's website",
      'Kiosk mode on a reception tablet with a paired card reader',
    ],
    tier: 'Eagle',
  },
  {
    slug: 'opentee',
    title: 'OpenTee',
    summary:
      'Anyone, member or visitor, can open their tee time for others to join, so two-balls and three-balls fill to a four-ball.',
    points: [
      'Open a booked tee time to other golfers',
      'Members and visitors can join',
      'One slot earns more green fees',
    ],
    tier: 'Eagle',
  },
  {
    slug: 'competitions',
    title: 'Competitions and WHS',
    summary:
      'Paid competitions and events for members and non-members, with results and handicaps handled for you.',
    points: [
      'Custom pricing, eligibility, entry windows and caps',
      'Tee times block out automatically',
      'Live leaderboard and admin-verified results',
      'Automatic Course Handicap',
      'Members submit general play scores to WHS from the app',
    ],
    tier: 'Eagle',
  },
  {
    slug: 'marketplace',
    title: 'Clubhouse marketplace',
    summary: 'Members order or request items from the bar, the pro shop and buggy hire in the app.',
    points: ['Bar orders', 'Pro shop requests', 'Buggy hire'],
    tier: 'Eagle',
  },
  {
    slug: 'advertising',
    title: 'In-app sponsors',
    summary:
      'Pick up to three golf-related sponsors a month in the CRM, or switch on automated Google Ads. Sponsors pay the club directly.',
    points: [
      'Up to three sponsor slots a month',
      'Curated by the club in the CRM',
      'Or automated Google Ads',
      'Sponsor payments go to the club through Stripe Connect',
    ],
    tier: 'Eagle',
  },
  {
    slug: 'retention',
    title: 'Retention automation',
    summary: 'Automatic emails and notifications that bring members back to the club.',
    points: [
      "A drink on the club for members who haven't visited lately",
      'Upcoming competitions',
      'A nudge when the weather is good',
    ],
    tier: 'Eagle',
  },
  {
    slug: 'payments',
    title: 'Payments that go to the club',
    summary:
      'Each club has its own Stripe Connect account, so money goes straight to the club. Membership direct debits run through GoCardless.',
    points: [
      'Your own Stripe Connect account',
      `A flat ${TRANSACTION_FEE} per transaction plus standard Stripe fees`,
      'Never a percentage of club revenue',
      'Membership direct debits via GoCardless (UK Bacs)',
    ],
    tier: 'Eagle',
  },
  {
    slug: 'support',
    title: 'Support from the people who build it',
    summary:
      'Same-day response, 7am to 7pm, seven days a week. UK-based, with a direct line to the development team.',
    points: ['7am to 7pm, seven days a week', 'Same-day response', 'UK-based', 'Direct line to the developers'],
    tier: 'Eagle',
  },
  {
    slug: 'albatross',
    title: 'Albatross Package',
    summary:
      'Clubhouse and pro shop tills, card terminals and stock control, so the whole club runs on one system.',
    points: [
      'Clubhouse and pro shop EPOS',
      'Stripe card terminals',
      'In-app food and drink ordering',
      'Inventory management in the CRM',
      'Replaces separate till systems',
    ],
    tier: 'Albatross',
  },
];

export const EAGLE_FEATURES = EO_FEATURES.filter((f) => f.tier === 'Eagle');
export const ALBATROSS_FEATURE = EO_FEATURES.find((f) => f.tier === 'Albatross')!;

// The three promises behind "Your club. Your app. Your revenue."
export const EO_PILLARS = [
  {
    title: 'Your club',
    text: 'One system for members, tee sheet, competitions, events and the clubhouse. Your staff work from one place instead of several.',
  },
  {
    title: 'Your app',
    text: "Members download an app under your club's name, colours and crest. EagleOnly stays in the background.",
  },
  {
    title: 'Your revenue',
    text: `Payments go straight to your club's own Stripe account. OpenTee fills tee times, sponsors pay the club, and we take a flat ${TRANSACTION_FEE} a transaction, never a percentage.`,
  },
];

export const OPENTEE_LINE =
  'OpenTee fills your tee sheet by letting anyone open their tee time for others to join.';

export const OPENTEE_STEPS = [
  {
    title: 'Book as normal',
    text: 'A member or visitor books a tee time for two or three players, in the app or on the club website.',
  },
  {
    title: 'Open it up',
    text: 'With one tap they open the spare places in their group for other golfers to join.',
  },
  {
    title: 'Others join',
    text: 'Members and visitors looking for a game see the open tee time and book the spare place.',
  },
  {
    title: 'The slot fills',
    text: 'A two-ball or three-ball becomes a four-ball. Same slot on the tee sheet, more green fees for the club.',
  },
];

export const OPENTEE_FAQS = [
  {
    question: 'Who can open a tee time?',
    answer:
      'Anyone who has booked one, member or visitor. They choose whether to open the spare places in their group.',
  },
  {
    question: 'Who can join an open tee time?',
    answer:
      "Members and visitors. The club's own booking rules still apply, so visitor times and green fees work the way the club has set them up.",
  },
  {
    question: 'Does OpenTee cost extra?',
    answer: 'No. OpenTee is part of the core Eagle package.',
  },
];

export const PRICING_ITEMS = [
  {
    name: 'Eagle (core platform)',
    price: `${FOUNDING_PRICE}/month`,
    note: `Founding Partner rate for the first ${FOUNDING_PLACES} clubs. Branded app, admin panel and CRM, tee sheet, OpenTee, competitions, marketplace, sponsors, retention, payments and support.`,
  },
  {
    name: 'Albatross Package',
    price: `+${ALBATROSS_PRICE}/month`,
    note: 'Clubhouse and pro shop EPOS, card terminals, in-app food and drink ordering and inventory management.',
  },
  {
    name: 'Card readers (Albatross)',
    price: 'From about £49 + VAT',
    note: 'Stripe Reader M2 about £49 + VAT, or WisePOS E about £179 + VAT, per reader.',
  },
  {
    name: 'Transaction fee',
    price: `${TRANSACTION_FEE} per transaction`,
    note: 'Plus standard Stripe processing. No percentage of club revenue.',
  },
];

export const SWITCHING_GUARANTEE =
  'Already with ClubV1, intelligentgolf or HowDidIDo? Pay the one-off setup cost, get three months completely free, and if EagleOnly does not deliver for your club, we will refund it in full. No risk. No tie-in.';

export const SWITCHING_STEPS = [
  {
    title: 'Members',
    text: 'Your member list imports from a CSV export of your current system.',
  },
  {
    title: 'Handicaps',
    text: "WHS handicap records belong to Wales Golf and England Golf, not to your software provider, so your members' handicaps are not tied to your current system.",
  },
  {
    title: 'History',
    text: 'Old booking and competition history stays in your previous system as an archive.',
  },
  {
    title: 'Your app',
    text: "We set up your club's app with your name, colours and crest, ready for members to download before the season starts.",
  },
];

// How EagleOnly differs, compared on ownership and price only
export const SWITCHING_COMPARISONS = [
  {
    name: 'ClubV1',
    text: "Covers tee sheet, EPOS, WHS and competitions, events and members, with members using the shared Members Hub app. EagleOnly covers the same ground with an app under your club's own name.",
  },
  {
    name: 'intelligentgolf',
    text: "Covers WHS, competitions and tee booking through the igMember app, with payments through its own provider. EagleOnly gives the club its own app, and the Albatross Package covers tills and card payments through the club's own Stripe account.",
  },
  {
    name: 'BRS Golf',
    text: 'Clubs are listed inside the BRS app. With EagleOnly the club has its own app, and can earn from it through OpenTee and sponsors.',
  },
];

export const EO_FAQS = [
  {
    question: 'What is EagleOnly?',
    answer:
      "EagleOnly is a club platform for UK golf clubs, made by Blundell Technologies. It gives a club its own branded member app on iOS and Android, plus an admin panel and CRM, tee sheet, visitor booking, competitions, payments and retention tools, all in one system.",
  },
  {
    question: 'Will our members see the EagleOnly name?',
    answer:
      "No. The member app is published under your club's own name, colours and crest. EagleOnly's branding only appears on our own materials, never in your members' app.",
  },
  {
    question: 'How much does EagleOnly cost?',
    answer: `Founding Partner clubs pay ${FOUNDING_PRICE} a month for the core platform, fixed for ${FOUNDING_LOCK_MONTHS} months from the day they switch. The Albatross Package, which adds tills, card terminals and stock control, is ${ALBATROSS_PRICE} a month more. There is a flat ${TRANSACTION_FEE} per transaction plus standard Stripe fees, never a percentage.`,
  },
  {
    question: 'Who gets the money members pay?',
    answer:
      'Your club. Each club has its own Stripe Connect account and payments go straight into it. Membership direct debits run through GoCardless.',
  },
  {
    question: 'What is OpenTee?',
    answer: OPENTEE_LINE + ' Two-balls and three-balls fill to a four-ball, so one slot earns more green fees.',
  },
  {
    question: 'Can we move across from our current system?',
    answer:
      'Yes. Your member list imports from a CSV, WHS handicap records sit with Wales Golf and England Golf rather than your software provider, and your old booking and competition history stays in your previous system as an archive.',
  },
  {
    question: 'Which clubs is EagleOnly for?',
    answer:
      "UK private members' clubs first, starting in Cardiff and South Wales, with pay and play courses to follow.",
  },
  {
    question: 'What is a Founding Partner?',
    answer: `One of the first ${FOUNDING_PLACES} clubs on EagleOnly. Founding Partners pay ${FOUNDING_PRICE} a month for the core platform, and that rate is locked in for ${FOUNDING_LOCK_MONTHS} months from the day the club switches, so it will not go up while you settle in. Places close on ${FOUNDING_CLOSING_LABEL}, ready to go live for the ${GO_LIVE_SEASON} season.`,
  },
];

// Short facts shown in a strip under the overview hero
export const EO_PROOF_POINTS = [
  { value: 'Your name', label: 'In the App Store and Google Play' },
  { value: TRANSACTION_FEE, label: 'Flat per transaction, never a percentage' },
  { value: '7am to 7pm', label: 'UK support, seven days a week' },
  { value: `${FOUNDING_PLACES} places`, label: `Founding Partners for ${GO_LIVE_SEASON}` },
];
