// AWS Lambda (Node.js 20+) behind its own Function URL. Handles Welsh 25k Tech Giveaway entries only:
// the contact form is a separate function (backend/contact-form) with its own URL, so deploying one
// can never break the other. Entries are sent through Resend: a notification to the team, plus a
// confirmation email to the entrant.
//
// Environment variables:
//   RESEND_API_KEY   Required. Lives only in the Lambda; never ship it to the browser.
//   FROM_EMAIL       Optional. Defaults to "Blundell Technologies <noreply@blundell-labs.com>" (Resend-verified domain)
//   TO_EMAIL         Optional. Defaults to jackjblundell@gmail.com
//   SEND_AUTO_REPLY  Optional. Set to "false" to stop the entrant confirmation email
//
// CORS is handled in this file (see ALLOWED_ORIGINS), not on the Function URL. Leave the Function
// URL's CORS configuration empty, because when it is set AWS overrides what this function returns.

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_FROM_EMAIL = 'Blundell Technologies <noreply@blundell-labs.com>';
const DEFAULT_TO_EMAIL = 'jackjblundell@gmail.com';
const SITE_URL = 'https://blundell-labs.com';
const LOGO_URL = `${SITE_URL}/img/brand/logo-on-light.png`;

// Rejects characters that could break out of the mailto: links and HTML attributes below
const EMAIL_PATTERN = /^[^\s@<>"'()]+@[^\s@<>"'()]+\.[^\s@<>"'()]+$/;

// Entries close at 23:59 UK time on 30 November 2026 (GMT, so UTC). Keep in step with src/data/giveaway.ts.
const GIVEAWAY_CLOSES_AT = Date.parse('2026-11-30T23:59:59Z');
const GIVEAWAY_CLOSING_LABEL = '30 November 2026';
const GIVEAWAY_WINNER_LABEL = '18 December 2026';
const MAX_LENGTHS = {
  name: 100,
  email: 200,
  phone: 40,
  startupName: 120,
  location: 100,
  walesConnection: 60,
  stage: 60,
  platform: 40,
  pitch: 200,
  problem: 3000,
  features: 3000,
  team: 3000,
  links: 500,
  videoUrl: 500,
};
const REQUIRED_FIELDS = ['name', 'startupName', 'location', 'walesConnection', 'stage', 'platform', 'pitch', 'problem', 'features', 'team'];
// The video link becomes an href in the team email, so only plain http(s) URLs are accepted
const VIDEO_URL_PATTERN = /^https?:\/\/[^\s<>"']+$/i;

const COLORS = {
  brand: '#E2A531',
  brandText: '#9A6508',
  heading: '#0B1426',
  text: '#334155',
  muted: '#64748B',
  border: '#E2E8F0',
  panel: '#F8FAFC',
};
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";


/* ---------- CORS ---------- */

const ALLOWED_ORIGINS = [
  'https://blundell-labs.com',
  'https://www.blundell-labs.com',
  'http://localhost:3000',
];
// Amplify build previews, e.g. https://main.d1a2b3c4d5e6f7.amplifyapp.com
const ALLOWED_ORIGIN_PATTERN = /^https:\/\/[a-z0-9-]+\.[a-z0-9]+\.amplifyapp\.com$/;

const corsHeaders = (origin) =>
  origin && (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGIN_PATTERN.test(origin))
    ? {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Max-Age': '86400',
        // The allowed origin is chosen per request, so caches must key on it
        Vary: 'Origin',
      }
    : {};


const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const singleLine = (value) => value.replace(/[\r\n]+/g, ' ');

/* ---------- Email templates (table layout + inline styles for email client support) ---------- */

function emailLayout({ preheader, content, footerNote }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>Blundell Technologies</title>
</head>
<body style="margin:0;padding:0;background:#FFFFFF;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFFFFF;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FFFFFF;border:1px solid ${COLORS.border};border-radius:14px;">
        <tr>
          <td style="height:4px;background:${COLORS.brand};border-radius:14px 14px 0 0;font-size:0;line-height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:36px 44px 0;">
            <a href="${SITE_URL}" style="text-decoration:none;">
              <img src="${LOGO_URL}" width="112" alt="Blundell Technologies" style="display:block;width:112px;height:auto;border:0;">
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 44px 44px;font-family:${FONT};font-size:15px;line-height:1.65;color:${COLORS.text};">
            ${content}
          </td>
        </tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
        <tr>
          <td style="padding:24px 44px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${COLORS.muted};text-align:center;">
            Blundell Technologies &middot; Cardiff, UK &middot; <a href="${SITE_URL}" style="color:${COLORS.muted};">blundell-labs.com</a>
            ${footerNote ? `<br>${footerNote}` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

const eyebrow = (label) =>
  `<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${COLORS.brandText};">${label}</p>`;

const heading = (text) =>
  `<h1 style="margin:0 0 12px;font-size:26px;line-height:1.25;font-weight:800;letter-spacing:-0.01em;color:${COLORS.heading};">${text}</h1>`;

const button = (href, label) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 0;">
  <tr>
    <td style="border-radius:8px;background:${COLORS.brand};">
      <a href="${href}" style="display:inline-block;padding:13px 26px;font-family:${FONT};font-size:15px;font-weight:700;color:${COLORS.heading};text-decoration:none;border-radius:8px;">${label}</a>
    </td>
  </tr>
</table>`;

const notProvided = (label = 'Not provided') => `<span style="color:${COLORS.muted};">${label}</span>`;

// Label/value rows; values must already be escaped
const detailsTable = (rows) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${COLORS.border};">
  ${rows
    .map(
      ([label, value]) => `<tr>
    <td width="110" style="padding:12px 0;border-bottom:1px solid ${COLORS.border};font-size:13px;color:${COLORS.muted};vertical-align:top;">${label}</td>
    <td style="padding:12px 0;border-bottom:1px solid ${COLORS.border};font-size:15px;color:${COLORS.heading};font-weight:500;">${value}</td>
  </tr>`
    )
    .join('\n  ')}
</table>`;

// A titled block of the sender's own words, escaped here
const answerPanel = (title, value) => `<p style="margin:32px 0 10px;font-size:13px;font-weight:700;color:${COLORS.heading};">${title}</p>
<div style="padding:18px 20px;background:${COLORS.panel};border-left:3px solid ${COLORS.brand};border-radius:8px;color:${COLORS.heading};white-space:pre-wrap;">${escapeHtml(value)}</div>`;

const stepsTable = (steps) => `<p style="margin:0 0 14px;font-size:13px;font-weight:700;color:${COLORS.heading};">What happens next</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  ${steps
    .map(
      ([title, description], index) => `<tr>
    <td width="44" style="padding:0 0 18px;vertical-align:top;">
      <div style="width:28px;height:28px;line-height:28px;border-radius:14px;background:${COLORS.brand};color:${COLORS.heading};font-size:13px;font-weight:700;text-align:center;">${index + 1}</div>
    </td>
    <td style="padding:2px 0 18px;vertical-align:top;">
      <p style="margin:0;font-size:15px;font-weight:700;color:${COLORS.heading};">${title}</p>
      <p style="margin:2px 0 0;font-size:14px;color:${COLORS.muted};">${description}</p>
    </td>
  </tr>`
    )
    .join('\n  ')}
</table>`;

const signOff = `<p style="margin:16px 0 0;color:${COLORS.heading};"><strong>Jack Blundell</strong><br><span style="color:${COLORS.muted};">Founder, Blundell Technologies</span></p>`;

function giveawayEntryEmail(fields) {
  const firstName = escapeHtml(singleLine(fields.name.split(' ')[0]));
  const safeEmail = escapeHtml(fields.email);
  const phoneDigits = fields.phone.replace(/[^\d+]/g, '');
  const safeVideoUrl = escapeHtml(fields.videoUrl);
  const rows = [
    ['Name', escapeHtml(fields.name)],
    ['Email', `<a href="mailto:${safeEmail}" style="color:${COLORS.heading};">${safeEmail}</a>`],
    ['Phone', phoneDigits ? `<a href="tel:${phoneDigits}" style="color:${COLORS.heading};">${escapeHtml(fields.phone)}</a>` : notProvided()],
    ['Based in', escapeHtml(fields.location)],
    ['Wales', escapeHtml(fields.walesConnection)],
    ['Stage', escapeHtml(fields.stage)],
    ['Wants built', escapeHtml(fields.platform)],
    ['Links', fields.links ? `<span style="white-space:pre-wrap;">${escapeHtml(fields.links)}</span>` : notProvided()],
    ['Video', fields.videoUrl ? `<a href="${safeVideoUrl}" style="color:${COLORS.heading};">${safeVideoUrl}</a>` : notProvided()],
  ];
  const replySubject = encodeURIComponent('Re: Your Welsh 25k Tech Giveaway entry');

  const content = `${eyebrow('Welsh 25k Tech Giveaway entry')}
${heading(`${escapeHtml(fields.startupName)} <span style="color:${COLORS.muted};font-weight:600;">from ${escapeHtml(fields.name)}</span>`)}
<p style="margin:0 0 28px;color:${COLORS.muted};">${escapeHtml(fields.pitch)}</p>
${detailsTable(rows)}
${answerPanel('The problem, and who has it', fields.problem)}
${answerPanel('What the first version needs to do', fields.features)}
${answerPanel('The team, and the plan after launch', fields.team)}
${button(`mailto:${safeEmail}?subject=${replySubject}`, `Reply to ${firstName}`)}`;

  const text = `Welsh 25k Tech Giveaway entry

Startup: ${fields.startupName}
In one sentence: ${fields.pitch}

Name: ${fields.name}
Email: ${fields.email}
Phone: ${fields.phone || 'Not provided'}
Based in: ${fields.location}
Connection to Wales: ${fields.walesConnection}
Stage: ${fields.stage}
Wants built: ${fields.platform}
Links: ${fields.links || 'Not provided'}
Video: ${fields.videoUrl || 'Not provided'}

The problem, and who has it:
${fields.problem}

What the first version needs to do:
${fields.features}

The team, and the plan after launch:
${fields.team}`;

  return {
    subject: singleLine(`Giveaway entry: ${fields.startupName} (${fields.name})`),
    html: emailLayout({ preheader: singleLine(`${fields.startupName}: ${fields.pitch}`), content }),
    text,
  };
}

// Like confirmationEmail, this only uses the entrant's first name, never the rest of what they typed
function giveawayConfirmationEmail(fields) {
  const firstName = singleLine(fields.name.split(' ')[0]);
  const steps = [
    ['Entries close', `The giveaway closes at 23:59 UK time on ${GIVEAWAY_CLOSING_LABEL}.`],
    ['We read every entry', 'We invite a shortlist to a video call in early December to talk through their idea.'],
    ['We announce the winner', `We email the winner by ${GIVEAWAY_WINNER_LABEL}, then announce them on our website.`],
  ];

  const content = `${eyebrow('Entry received')}
${heading(`Thanks for entering, ${escapeHtml(firstName)}`)}
<p style="margin:0 0 28px;">Your entry for the Welsh 25k Tech Giveaway is in. Good luck!</p>
${stepsTable(steps)}
${button(`${SITE_URL}/giveaway`, 'View the giveaway')}
<p style="margin:32px 0 0;padding-top:24px;border-top:1px solid ${COLORS.border};">Need to change something? Reply to this email before entries close.</p>
${signOff}`;

  const text = `Hi ${firstName},

Thanks for entering the Welsh 25k Tech Giveaway. Your entry is in. Good luck!

What happens next:
${steps.map(([title, description], index) => `${index + 1}. ${title}: ${description}`).join('\n')}

View the giveaway: ${SITE_URL}/giveaway

Need to change something? Reply to this email before entries close.

Jack Blundell
Founder, Blundell Technologies
${SITE_URL}`;

  return {
    subject: 'Your Welsh 25k Tech Giveaway entry is in',
    html: emailLayout({
      preheader: `Your entry is in. Entries close on ${GIVEAWAY_CLOSING_LABEL}.`,
      content,
      footerNote: 'You received this because you entered the Welsh 25k Tech Giveaway on blundell-labs.com.',
    }),
    text,
  };
}

/* ---------- Handler ---------- */

// Trimmed string values for each allowed key, or an error naming the first field over its limit
function readFields(data, maxLengths) {
  const fields = {};
  for (const [key, maxLength] of Object.entries(maxLengths)) {
    const value = typeof data[key] === 'string' ? data[key].trim() : '';
    if (value.length > maxLength) {
      return { error: `${key} is too long` };
    }
    fields[key] = value;
  }
  return { fields };
}

// Sends the team notification, then the visitor's confirmation. Only a failed notification fails the request.
async function deliver({ fromEmail, toEmail, fields, notification, confirmation }) {
  try {
    await sendEmail({ from: fromEmail, to: [toEmail], reply_to: fields.email, ...notification });
  } catch (error) {
    console.error('Failed to send notification email', error);
    return json(502, { error: 'Could not send your message' });
  }

  if (process.env.SEND_AUTO_REPLY !== 'false') {
    try {
      await sendEmail({ from: fromEmail, to: [fields.email], reply_to: toEmail, ...confirmation });
    } catch (error) {
      // The notification already reached us, so a failed confirmation shouldn't fail the request
      console.error('Failed to send confirmation email', error);
    }
  }

  return json(200, { ok: true });
}

async function sendEmail(payload) {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

async function handleEntry(event) {
  if (event.requestContext?.http?.method !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Giveaway form is missing RESEND_API_KEY');
    return json(500, { error: 'The entry form is not configured' });
  }
  const fromEmail = process.env.FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const toEmail = process.env.TO_EMAIL || DEFAULT_TO_EMAIL;

  let data;
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body ?? '', 'base64').toString('utf8')
      : event.body ?? '';
    data = JSON.parse(raw);
  } catch {
    return json(400, { error: 'Invalid request' });
  }

  // Bots fill in the hidden "website" field; report success so they don't retry
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return json(200, { ok: true });
  }

  if (Date.now() > GIVEAWAY_CLOSES_AT) {
    return json(403, { error: 'Entries have closed' });
  }

  const { fields, error } = readFields(data, MAX_LENGTHS);
  if (error) {
    return json(400, { error });
  }
  if (REQUIRED_FIELDS.some((key) => !fields[key]) || !EMAIL_PATTERN.test(fields.email) || data.agreed !== true) {
    return json(400, { error: 'Please answer every required question and agree to the terms' });
  }
  if (fields.videoUrl && !VIDEO_URL_PATTERN.test(fields.videoUrl)) {
    return json(400, { error: 'The video link must start with http:// or https://' });
  }

  return deliver({
    fromEmail,
    toEmail,
    fields,
    notification: giveawayEntryEmail(fields),
    confirmation: giveawayConfirmationEmail(fields),
  });
}

export const handler = async (event) => {
  const cors = corsHeaders(event.headers?.origin || event.headers?.Origin);

  // Preflight reaches the function because CORS isn't configured on the Function URL
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 204, headers: cors };
  }

  const response = await handleEntry(event);
  return { ...response, headers: { ...response.headers, ...cors } };
};
