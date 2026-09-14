export interface Service {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  benefits: string[];
  technologies: string[];
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    name: 'Custom Software Development',
    slug: 'custom-software-development',
    shortDescription:
      'Bespoke software solutions engineered to solve your unique business challenges and drive operational efficiency.',
    longDescription:
      'Every business has processes and challenges that off-the-shelf software simply cannot address. At Blundell Technologies, we design and build custom software solutions from the ground up — tailored precisely to your workflows, data requirements, and growth trajectory.\n\nOur approach begins with a deep understanding of your business objectives. We then architect scalable, maintainable systems using modern technologies and industry best practices. Whether you need an internal tool to streamline operations, a customer-facing platform, or a complex data processing pipeline, we deliver production-ready software that integrates seamlessly with your existing infrastructure.\n\nFrom initial discovery through to deployment and ongoing support, we work as a strategic partner — not just a vendor. The result is software that gives your business a genuine competitive advantage.',
    icon: 'Code',
    benefits: [
      'Solutions designed around your specific business requirements',
      'Scalable architecture that grows with your organisation',
      'Seamless integration with existing systems and workflows',
      'Ongoing support and maintenance included',
      'Full ownership of source code and intellectual property',
      'Agile development with regular progress updates',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
    seoTitle: 'Custom Software Development UK',
    seoDescription:
      'Custom and bespoke software built around how your business works: platforms, portals and internal tools, designed and engineered in the UK.',
  },
  {
    name: 'Web Application Development',
    slug: 'web-application-development',
    shortDescription:
      'Modern, responsive web applications built with cutting-edge frameworks for performance, scalability, and exceptional user experience.',
    longDescription:
      'The modern web demands more than static pages. Businesses today need dynamic, interactive web applications that deliver seamless experiences across every device and browser. At Blundell Technologies, we specialise in building high-performance web applications using React, TypeScript, and Node.js.\n\nWe build single-page applications, progressive web apps, admin dashboards, customer portals, and SaaS platforms — all engineered for speed, security, and scale. Our front-end expertise ensures pixel-perfect interfaces with intuitive navigation, while our back-end engineering delivers robust APIs, real-time data synchronisation, and enterprise-grade security.\n\nEvery web application we build is optimised for search engines, accessible to all users, and designed to convert visitors into customers. We handle everything from initial UX research through to deployment on scalable cloud infrastructure.',
    icon: 'Globe',
    benefits: [
      'Responsive design that works flawlessly on every device',
      'SEO-optimised architecture for maximum organic visibility',
      'Fast load times with modern performance optimisation',
      'Secure authentication and data protection',
      'Real-time features and interactive user interfaces',
      'Scalable cloud deployment and monitoring',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    seoTitle: 'Web Application Development UK',
    seoDescription:
      'Web application development for UK businesses: customer portals, admin consoles and SaaS platforms, built to scale on secure cloud backends.',
  },
  {
    name: 'Mobile App Development',
    slug: 'mobile-app-development',
    shortDescription:
      'Native and cross-platform mobile applications for iOS and Android, built to engage users and drive business results.',
    longDescription:
      'Mobile is where your customers are. At Blundell Technologies, we build native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android. Using React Native alongside native Swift and Kotlin development, we choose the right approach for each project based on your budget, timeline, and technical requirements.\n\nOur mobile development expertise spans consumer apps, enterprise tools, marketplace platforms, and IoT companion applications. We handle the full lifecycle — from UX design and prototyping through to App Store and Google Play submission, including push notifications, in-app purchases, analytics integration, and ongoing updates.\n\nWe have shipped apps that serve thousands of active users, integrating complex features like real-time location tracking, payment processing, biometric authentication, and offline-first architectures. Every app we build is optimised for performance, battery efficiency, and the latest platform guidelines.',
    icon: 'Smartphone',
    benefits: [
      'Cross-platform development for iOS and Android from a single codebase',
      'Native performance with platform-specific optimisations',
      'App Store and Google Play submission and optimisation',
      'Push notifications and real-time messaging',
      'Offline-first architecture for reliable user experience',
      'Analytics and user behaviour tracking',
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'RevenueCat', 'Mapbox'],
    seoTitle: 'iOS & Android App Developers UK',
    seoDescription:
      'UK app developers building iOS, Android and React Native apps, from personal safety apps with Apple Watch support to fire risk assessment tools.',
  },
  {
    name: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    shortDescription:
      'Intelligent solutions powered by artificial intelligence — from conversational AI and automation to predictive analytics and computer vision.',
    longDescription:
      'Artificial intelligence is transforming how businesses operate, compete, and serve their customers. At Blundell Technologies, we help organisations harness the power of AI and machine learning to automate processes, extract insights from data, and build intelligent products.\n\nOur AI capabilities span conversational AI and chatbots, natural language processing, predictive analytics, recommendation engines, computer vision, and process automation. We work with leading AI platforms including OpenAI, and open-source frameworks like TensorFlow and PyTorch to deliver solutions that are both powerful and practical.\n\nWhether you want to add AI-powered features to an existing product, build an intelligent automation pipeline, or develop a standalone AI application, we bring the technical expertise and pragmatic approach needed to deliver real business value — not just proof-of-concept demos.',
    icon: 'Brain',
    benefits: [
      'Conversational AI and intelligent chatbot development',
      'Predictive analytics and data-driven decision making',
      'Process automation to reduce manual workload',
      'Natural language processing for text analysis',
      'Integration with existing systems and workflows',
      'Ongoing model training and performance optimisation',
    ],
    technologies: ['Python', 'OpenAI', 'TensorFlow', 'PyTorch', 'LangChain', 'PostgreSQL'],
    seoTitle: 'AI Software Development Company UK',
    seoDescription:
      'Practical AI for your product: LLM features, automation and machine learning built into web and mobile apps by a UK software team.',
  },
  {
    name: 'Cloud Infrastructure & DevOps',
    slug: 'cloud-devops',
    shortDescription:
      'Scalable cloud architecture and streamlined DevOps pipelines that ensure your applications are fast, reliable, and cost-efficient.',
    longDescription:
      'Reliable infrastructure is the foundation of every successful software product. At Blundell Technologies, we design and implement cloud infrastructure that scales with your business while keeping costs under control. Our DevOps expertise ensures your team can ship code faster, with confidence.\n\nWe work primarily with AWS and Google Cloud Platform, architecting solutions that leverage managed services for maximum reliability and minimum operational overhead. From containerised microservices and serverless functions to managed databases and content delivery networks, we choose the right tools for your workload.\n\nOur DevOps services include CI/CD pipeline design, infrastructure-as-code, monitoring and alerting, security hardening, and disaster recovery planning. We help teams move from manual deployments to fully automated pipelines that catch issues before they reach production.',
    icon: 'Cloud',
    benefits: [
      'Scalable cloud architecture designed for growth',
      'Automated CI/CD pipelines for faster deployments',
      'Infrastructure-as-code for repeatable environments',
      'Monitoring, alerting, and incident response',
      'Cost optimisation and resource management',
      'Security best practices and compliance',
    ],
    technologies: ['AWS', 'Docker', 'Terraform', 'GitHub Actions', 'CloudWatch', 'PostgreSQL'],
    seoTitle: 'Cloud & Firebase App Development UK',
    seoDescription:
      'Scalable cloud backends for web and mobile apps: Firebase, APIs, CI/CD and monitoring, set up and supported by a UK development team.',
  },
  {
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    shortDescription:
      'User-centered design that drives engagement, simplifies complexity, and converts visitors into loyal customers.',
    longDescription:
      'Great software starts with great design. At Blundell Technologies, our UI/UX design process is grounded in user research, data analysis, and iterative testing. We create interfaces that are not only visually refined but functionally intuitive — reducing friction, increasing engagement, and driving measurable business outcomes.\n\nOur design process begins with understanding your users: their goals, pain points, and contexts of use. We then create information architectures, wireframes, and interactive prototypes that validate design decisions before a single line of code is written. This approach reduces development risk and ensures the final product meets real user needs.\n\nFrom responsive web interfaces to mobile app experiences, we deliver design systems that maintain consistency across platforms and scale with your product. Every design decision is informed by accessibility standards, conversion optimisation principles, and platform-specific best practices.',
    icon: 'Palette',
    benefits: [
      'User research and data-driven design decisions',
      'Wireframing and interactive prototyping',
      'Responsive design across all devices and platforms',
      'Design systems for consistency at scale',
      'Accessibility-first approach (WCAG compliance)',
      'Conversion rate optimisation',
    ],
    technologies: ['Figma', 'React', 'CSS', 'Tailwind', 'Storybook', 'Framer'],
    seoTitle: 'UI/UX & App Design Agency UK',
    seoDescription:
      'User research, wireframes and polished interfaces for web and mobile apps, designed alongside the engineers who build them.',
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug);
};
