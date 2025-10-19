const appConstant = {
  name: 'Headless CMS',
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development',

  // Marketing description
  tagline: 'Build your website or blog easily and quickly with Headless CMS',
  slogan: 'Full control of your content from anywhere, with ready-to-use APIs.',

  description: 'A modern Headless CMS built with Node.js, Express, and Sequelize. It allows easy management of content, blogs, projects, and portfolios with powerful APIs.',

  features: [
    'Easily manage projects and tasks',
    'Quickly publish blogs and articles',
    'Ready-to-use API for integration with any app or website',
    'User and permission management',
    'Add certificates, experiences, and team members',
    'Responsive design compatible with any device or screen',
  ],

  benefits: [
    'Save time and focus on content creation',
    'Full control of your site and content without restrictions',
    'Increase your website visibility on search engines (SEO)',
    'Easy integration with external apps and services',
  ],

  author: {
    name: 'Youssef Osama',
    email: 'osama74454@gmail.com',
    github: 'https://github.com/YoussefOsama12345',
    linkedin: 'https://www.linkedin.com/in/youssef-osama-ai/',
    facebook: 'https://www.facebook.com/profile.php?id=61581195410098',
    instagram: 'https://www.instagram.com/youssef_7625a',
    youtube: 'https://www.youtube.com/@Youssef-Osama-ai',
    tiktok: 'https://www.tiktok.com/@youssefai_pro',
    threads: 'https://www.threads.net/@youssef_7625a',
    X: 'https://x.com/youssef732327',
  },

  repository: {
    type: 'git',
    url: 'https://github.com/YoussefOsama12345/headless-cms',
  },

  api: {
    baseUrl: '/api/v1',
    timeout: 10000,
  },

  security: {
    jwtExpiresIn: '7d',
    bcryptSaltRounds: 10,
  },

  contact: {
    supportEmail: 'osama74454@gmail.com',
    reportIssue: 'https://github.com/YoussefOsama12345/headless-cms/issues',
  },

};

module.exports = appConstant;
