import type { BlogPost } from '../blogTypes';

const post: BlogPost = {
  title: 'Making the Most of AI in Your App',
  slug: 'making-the-most-of-ai-in-your-app',
  excerpt:
    'AI has never been easier to add to a product, or easier to get wrong. Our take on keeping your API keys safe, your costs predictable, and your users happy.',
  hero: {
    src: '/img/blogs/17-09-2026/1.webp',
    social: '/img/blogs/17-09-2026/1.jpg',
    alt: 'A humanoid robot deep in thought against a wall of handwritten equations and formulae',
  },
  content: `If you believe the headlines, AI is going to be the end of us all. We're a bit more optimistic. Most of what we see it doing day to day is far less dramatic, like writing up summaries and answering support questions.

ChatGPT had [900 million weekly users](https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users) by February 2026, and that's before you count everyone using coding agents like Claude Code or the AI features built into their favourite apps.

In our opinion, it's the glory days of Artificial Intelligence, and it's never been easier to add it to your own product. We've been building AI features into apps for our clients, so this article is our take on how to go about it without running into trouble.

## So, how do we do this safely?

Usually AI is connected to your software through an API. Your app sends a request to the AI provider's servers, and they send a response back to your user.

You'll need a secret key to use that API. We've seen developers put the key in an environment variable and assume that makes it private, but if that variable gets bundled into a mobile app or website, anyone who goes looking can pull it out and run requests on your account. The key should only ever live on your server. We route requests through a backend function (usually a Firebase Cloud Function, though AWS Lambda works just as well) and store the key with Firebase secrets or AWS Secrets Manager. Keep it out of your repo and your logs.

Only send the AI the data it actually needs, and check your privacy policy and UK GDPR obligations cover it.

Most providers charge per request, so make sure you accurately measure the potential cost of an active user, and don't be afraid to put limits in place so no one abuses the system. Your monthly subscription needs to cover those costs. Sounds simple, but it's often forgotten. And don't count on prices staying low, [Gartner expects](https://www.gartner.com/en/newsroom/press-releases/2026-01-26-gartner-predicts-genai-cost-per-resolution-for-customer-service-will-exceed-offshore-human-agent-costs-by-2030) AI to cost over $3 per resolved customer service query by 2030.

## Chat Agents

Our advice with chat agents is to use AI as your first wall for support, not your only one. If you're building something like an in-app "Coach", go for it. But for anything where a customer needs real help, there should always be a way through to a person, and someone on your team should be keeping an eye on what the bot is telling people.

![The Recovery Coach chat agent in the BetBlock app, with quick replies and a typing indicator](/img/betblock/screen7.webp "An in-app AI coach we built for BetBlock.")

Klarna learned this the hard way. When they [launched their AI assistant](https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/) in 2024, it handled two-thirds of their customer service chats in the first month, the workload of 700 full-time agents, and cut the time to resolve an issue from 11 minutes to under 2. By mid-2025 though, their CEO [admitted](https://www.fortune.com/2025/05/09/klarna-ai-humans-return-on-investment) the push to cut costs had hurt their service quality, and they started investing in human support again.

Customers aren't always keen either. A [Gartner survey](https://www.gartner.com/en/newsroom/press-releases/2024-07-09-gartner-survey-finds-64-percent-of-customers-would-prefer-that-companies-didnt-use-ai-for-customer-service) found 64% would prefer companies didn't use AI for customer service at all, mostly because they worry it'll be harder to reach a human. And you're responsible for what your chatbot says. Air Canada found that out when a [tribunal](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html) made them pay a customer after their bot gave him the wrong information about bereavement fares.

Done properly, chat agents can still do a lot for sales. [Salesforce found](https://www.salesforce.com/ap/news/press-releases/2026/07/06/as-ai-agents-transform-commerce-salesforce-unleashes-its-biggest-agentforce-commerce-release-yet/) retailers with their own AI shopping assistants grew sales 59% faster over the 2025 holiday season than retailers without one.

## AI Automation

For us, this is where AI is most useful.

Take one of our clients, [Safentia](https://www.safentia.co.uk). Hundreds of assessors use their mobile app to answer questions on a form and compile evidence during an assessment. At the end, they have to write a summary explaining the answers they gave and a general overview. All the information for that summary is already sitting in the app, so we used AI to write it for them. We deliberately made it a draft rather than something that gets submitted automatically, so the assessor always reads it and makes changes before it goes in.

![Safentia assessor app with offline assessments, floor plan flagging and AI-drafted narrative](/img/safentia/2.webp "Safentia's assessor app. The summary is drafted for the assessor, who reads it and makes changes before it goes in.")

Google did something similar with [Google Forms](https://workspaceupdates.googleblog.com/2025/06/summarize-responses-with-gemini-google-forms.html) in June 2025, adding AI summaries that pick out the key themes from responses. Plenty of support teams now use Zapier to summarise customer conversations into Intercom or HubSpot, and developers use GitHub Copilot to write up their code changes before review.

In a [study published in *Science*](https://www.science.org/doi/10.1126/science.adh2586), professionals using ChatGPT for writing tasks got them done 40% faster.

We went with a draft partly because AI still gets things wrong. In [Stack Overflow's 2025 survey](https://survey.stackoverflow.co/2025/ai), 46% of developers said they don't trust the accuracy of AI output, and they're the people using it every day.

If there's a repetitive, text-heavy job in your app that your users dread, that's probably the best place to start.

---

## Sources

1. TechCrunch, "ChatGPT reaches 900M weekly active users" (27 Feb 2026): https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users
2. Gartner, "Gartner Predicts GenAI Cost Per Resolution for Customer Service Will Exceed Offshore Human Agent Costs by 2030" (26 Jan 2026): https://www.gartner.com/en/newsroom/press-releases/2026-01-26-gartner-predicts-genai-cost-per-resolution-for-customer-service-will-exceed-offshore-human-agent-costs-by-2030
3. Klarna, "Klarna AI assistant handles two-thirds of customer service chats in its first month" (Feb 2024): https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/
4. Fortune, "As Klarna flips from AI-first to hiring people again..." (9 May 2025): https://www.fortune.com/2025/05/09/klarna-ai-humans-return-on-investment
5. Gartner, "Gartner Survey Finds 64% of Customers Would Prefer That Companies Didn't Use AI For Customer Service" (9 Jul 2024): https://www.gartner.com/en/newsroom/press-releases/2024-07-09-gartner-survey-finds-64-percent-of-customers-would-prefer-that-companies-didnt-use-ai-for-customer-service
6. Moffatt v. Air Canada, 2024 BCCRT 149 (the tribunal decision, via CanLII): https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html
7. Salesforce, "As AI Agents Transform Commerce, Salesforce Unleashes Its Biggest Agentforce Commerce Release Yet" (6 Jul 2026): https://www.salesforce.com/ap/news/press-releases/2026/07/06/as-ai-agents-transform-commerce-salesforce-unleashes-its-biggest-agentforce-commerce-release-yet/
8. Google Workspace Updates, "Use Gemini in Google Forms to summarize form responses" (Jun 2025): https://workspaceupdates.googleblog.com/2025/06/summarize-responses-with-gemini-google-forms.html
9. Noy & Zhang, "Experimental evidence on the productivity effects of generative artificial intelligence", *Science* (Jul 2023): https://www.science.org/doi/10.1126/science.adh2586
10. Stack Overflow, 2025 Developer Survey, AI section: https://survey.stackoverflow.co/2025/ai`,
  date: '2026-09-16',
  author: 'Jack Blundell',
  category: 'Artificial Intelligence',
  cta: {
    heading: 'Talk to us about AI in your next project',
    body: 'We build AI features into web and mobile apps for businesses across the UK — from drafting and summaries to support agents that know when to hand over.',
  },
  readTime: '5 min read',
  seoTitle: 'Making the Most of AI in Your App | Blundell Technologies',
  seoDescription:
    'How to add AI features to your app without running into trouble: keeping API keys safe, controlling costs, and knowing when a chatbot helps and when it hurts.',
};

export default post;
