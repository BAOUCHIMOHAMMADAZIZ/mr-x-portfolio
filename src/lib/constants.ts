// Color palette - Black & White Theme
export const COLORS = {
  background: '#0a0a0a',
  darkBg: '#000000',
  cardBg: '#1a1a1a',
  textPrimary: '#ffffff',
  textSecondary: '#d0d0d0',
  accentPrimary: '#ffffff',
  accentSecondary: '#cccccc',
  border: '#404040',
  success: '#00ff88',
  error: '#ff3366',
};

// Form validation
export const FORM_LIMITS = {
  EMAIL_MAX_LENGTH: 254,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 500,
};

// Rate limiting
export const RATE_LIMIT = {
  MAX_REQUESTS: 5,
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
};

// Email configuration
export const EMAIL_CONFIG = {
  FROM_NAME: 'Mohammed (Mr X) Studio',
  SUBJECT_PREFIX: 'New Contact Form Submission from',
};

// API endpoints
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
};

// Navigation sections
export const SECTIONS = {
  ABOUT: 'about',
  TECH_STACK: 'tech-stack',
  SERVICES: 'services',
  CONTACT: 'contact',
};

// Tech stack data
export const TECH_ARSENAL = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '💻',
    technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
  },
  {
    id: 'ai',
    title: 'AI Engineering',
    icon: '🧠',
    technologies: ['LLMs', 'OpenAI', 'LangChain', 'Vector DBs'],
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: '⚙️',
    technologies: ['Python', 'Scripting', 'Cron Jobs'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '🗄️',
    technologies: ['Node.js', 'PostgreSQL', 'Supabase', 'Redis'],
  },
];

// Services data
export const SERVICES = [
  {
    id: 'automation',
    title: 'Business Automation',
    icon: '🔄',
    description:
      'Automate repetitive tasks by connecting your favorite apps, building workflow that eliminates manual labor, powered by modern automation tools.',
    features: ['n8n Integrations', 'API Integrations', 'Automated Reporting'],
  },
  {
    id: 'saas',
    title: 'Full-Stack SaaS',
    icon: '🚀',
    description:
      'Full-featured, production-ready SaaS applications. From database architecture to responsive design, I build complete solutions.',
    features: ['Next.js Applications', 'API Development', 'Database Architecture'],
  },
];

// Stats
export const STATS = [
  { value: '5+', label: 'YEARS EXP.' },
  { value: '30+', label: 'AI MODELS TRIED' },
  { value: '50+', label: 'PROJECTS SHIPPED' },
  { value: '100%', label: 'CLIENT SATISFACTION' },
];
