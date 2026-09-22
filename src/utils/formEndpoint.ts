// AWS Lambda that sends contact enquiries through Resend (backend/contact-form).
// The URL is public; the Resend API key only exists in the Lambda's environment.
export const CONTACT_FORM_URL =
  process.env.REACT_APP_CONTACT_FORM_URL ||
  'https://cbjc6rbm73uyko2nam5pxqkzhi0grsql.lambda-url.us-west-2.on.aws/';

// Giveaway entries go to their own Lambda (backend/giveaway-form) with its own Function URL, so
// deploying either form can never break the other. Paste the Function URL below once the function
// exists, or set REACT_APP_GIVEAWAY_FORM_URL in the Amplify environment.
export const GIVEAWAY_FORM_URL =
  process.env.REACT_APP_GIVEAWAY_FORM_URL ||
  'https://6iwdkjnunq3ai65lqrujmfuzfa0nfhmo.lambda-url.us-west-2.on.aws/';
