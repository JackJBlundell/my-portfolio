// AWS Lambda that sends contact enquiries and giveaway entries through Resend (backend/contact-form).
// The URL is public; the Resend API key only exists in the Lambda's environment.
export const CONTACT_FORM_URL =
  process.env.REACT_APP_CONTACT_FORM_URL ||
  'https://cbjc6rbm73uyko2nam5pxqkzhi0grsql.lambda-url.us-west-2.on.aws/';
