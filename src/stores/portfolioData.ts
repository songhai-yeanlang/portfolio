import avatarPhoto from '@/assets/images/songhai Yeanlang.jpg'

export type SchematicKind =
  | 'sql-client'
  | 'btree'
  | 'screen-crop'
  | 'code-diff'
  | 'ecommerce'
  | 'rest-api'
  | 'dashboard'
  | 'vps-deploy'

export type ProjectCategory = 'Full-Stack' | 'Frontend' | 'Backend & DevOps'

export type SkillIconName =
  | 'html5'
  | 'css3'
  | 'javascript'
  | 'typescript'
  | 'vuejs'
  | 'reactjs'
  | 'nodejs'
  | 'expressjs'
  | 'mysql'
  | 'postgresql'
  | 'git'
  | 'github'
  | 'postman'
  | 'contabo'
  | 'aapanel'
  | 'vercel'

export interface SkillItem {
  name: string
  icon: SkillIconName
}

export interface SkillGroup {
  id: string
  category: string
  items: SkillItem[]
}

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  category: ProjectCategory
  featured?: boolean
  schematic: SchematicKind
  imageUrl?: string
  summary: string
  stack: string[]
  liveUrl?: string
  repoUrl?: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string
}

export interface PortfolioProfile {
  handle: string
  fullName: string
  avatarUrl?: string
  bio: string
  email: string
  githubUrl: string
  telegramUrl: string
  resumeUrl?: string
  skillGroups: SkillGroup[]
  projects: ProjectItem[]
  experience: ExperienceItem[]
}

export const portfolioData: PortfolioProfile = {
  handle: 'yeanlang',
  fullName: 'Songhai Yeanlang',
  avatarUrl: avatarPhoto,
  bio: "I'm Songhai Yeanlang, a Junior Web Developer in Phnom Penh who enjoys turning practical ideas into clean, responsive interfaces and reliable backend services. I focus on building useful web apps while continually learning through hands-on projects. ",
  email: 'langofficial19@gmail.com',
  githubUrl: 'https://github.com/songhai-yeanlang',
  telegramUrl: 'https://t.me/songhai_yeanlang',
  skillGroups: [
    {
      id: 'fullstack',
      category: 'Full-Stack Development',
      items: [
        { name: 'HTML5', icon: 'html5' },
        { name: 'CSS3', icon: 'css3' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Vue.js', icon: 'vuejs' },
        { name: 'ReactJS', icon: 'reactjs' },
        { name: 'Node.js', icon: 'nodejs' },
        { name: 'ExpressJS', icon: 'expressjs' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'PostgreSQL', icon: 'postgresql' },
      ],
    },
    {
      id: 'tools',
      category: 'Other & Tools',
      items: [
        { name: 'Git', icon: 'git' },
        { name: 'GitHub', icon: 'github' },
        { name: 'Postman', icon: 'postman' },
        { name: 'Contabo (VPS)', icon: 'contabo' },
        { name: 'aaPanel', icon: 'aapanel' },
        { name: 'Vercel', icon: 'vercel' },
      ],
    },
  ],
  projects: [
    {
      id: 'pos-system-cafe',
      title: 'pos system cafe',
      subtitle: 'for mediem shop',
      category: 'Full-Stack',
      featured: true,
      schematic: 'sql-client',
      summary:
        'A browser-based SQL workspace for inspecting schemas, editing rows inline, and running parameterized queries against PostgreSQL and MySQL.',
      stack: ['Bootstrap','Vue.js','Node.js', 'ExpressJS', 'MySQL'],
      liveUrl: 'https://github.com/songhai-yeanlang',
      repoUrl: 'https://github.com/songhai-yeanlang',
    },
    {
      id: 'tg-sender',
      title: 'tg sender',
      subtitle: 'Full-stack e-commerce platform',
      category: 'Full-Stack',
      featured: true,
      schematic: 'ecommerce',
      summary:
        'TG-Sender is a tool that can send messages to Telegram users.',
      stack: ['Bootstrap', 'Vue 3', 'ExpressJS', 'MySQL'],
      liveUrl: 'https://github.com/songhai-yeanlang',
      repoUrl: 'https://github.com/songhai-yeanlang',
    },
    {
      id: 'ant-forum-community',
      title: 'ant forum commity',
      subtitle: 'Screenshot & annotation editor',
      category: 'Frontend',
      featured: true,
      schematic: 'screen-crop',
      summary:
        'A lightweight capture and annotation tool in the browser for cropping regions, redacting sensitive text, and exporting crisp documentation images.',
      stack: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://github.com/songhai-yeanlang',
      repoUrl: 'https://github.com/songhai-yeanlang',
    },
    {
      id: 'blog-post',
      title: 'blog post website',
      subtitle: 'Sample blog post website',
      category: 'Full-Stack',
      featured: true,
      schematic: 'dashboard',
      summary:
        'Real-time inventory tracking and daily revenue reporting system built for retail shops, featuring barcode lookup and low-stock alerts.',
      stack: ['Vue.js', 'ExpressJS', 'PostgreSQL'],
      liveUrl: 'https://github.com/songhai-yeanlang',
      repoUrl: 'https://github.com/songhai-yeanlang',
    },
    {
      id: 'phsar-yerng',
      title: 'phsar yerng ',
      subtitle: 'ecommunce website ',
      category: 'Backend & DevOps',
      featured: true,
      schematic: 'rest-api',
      summary:
        'Modular RESTful backend service handling JWT refresh rotation, rate limiting, request validation, and Postman-documented endpoints.',
      stack: ['Node.js', 'ExpressJS', 'PostgreSQL', 'Postman'],
      liveUrl: 'https://github.com/songhai-yeanlang',
      repoUrl: 'https://github.com/songhai-yeanlang',
    },
   
   
    
   
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Full-Stack Web Developer',
      company: 'Freelancer',
      location: 'Remote',
      period: '2026 – Present',
      description:
        'Designing and shipping web interfaces, developer utilities, and component systems with Vue, TypeScript, and modern browser APIs.',
    },
   
   
  ],
}
