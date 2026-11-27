import avatarPhoto from '@/assets/images/songhai Yeanlang.jpg'
import posCafeImg from '@/assets/images/projects/Untitled-1.png'
import tgSenderImg from '@/assets/images/projects/Untitled-2.png'
import antForumImg from '@/assets/images/projects/Untitled-3.png'
import phsarYerngImg from '@/assets/images/projects/Untitled-4.png'
import posCafeImg2 from '@/assets/images/projects/Untitled-5.png'
import posCafeImg3 from '@/assets/images/projects/Untitled-6.png'
import posCafeImg4 from '@/assets/images/projects/Untitled-7.png'
import posCafeImg5 from '@/assets/images/projects/Untitled-9.png'
import posCafeImg6 from '@/assets/images/projects/Untitled-10.png'
import tgSenderImg2 from '@/assets/images/projects/Untitled-8.png'
import menImg2 from '@/assets/images/memories/mem-2.jpg'
import menImg3 from '@/assets/images/memories/men-3.jpg'
import menImg1 from '@/assets/images/memories/men-1.png'


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

export interface ProjectScreenshot {
  image: string
  caption?: string
}

export interface ProjectItem {
  id: string
  title: string
  subtitle: string
  timeline?: string
  category: ProjectCategory
  featured?: boolean
  image?: string
  summary: string
  description?: string
  stack: string[]
  liveUrl?: string
  frontendRepoUrl?: string
  backendRepoUrl?: string
  repoUrl?: string
  demoVideoUrl?: string
  screenshots?: Array<string | ProjectScreenshot>
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string
}

export interface EducationItem {
  id: string
  degree: string
  school: string
  location?: string
  period: string
  description?: string
}

export interface MemoryItem {
  id: string
  image?: string
  title: string
  date?: string
  caption?: string
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
  education: EducationItem[]
  memories: MemoryItem[]
}

export const portfolioData: PortfolioProfile = {
  handle: 'yeanlang',
  fullName: 'Songhai Yeanlang',
  avatarUrl: avatarPhoto,
  bio: " I'm Songhai Yeanlang, a Junior Web Developer based in Phnom Penh who enjoys learning and building web applications that work across all devices. I'm also interested in designing mobile UIs that look and feel like native apps while continuously improving my skills through hands-on projects.",
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
      id: 'Retail POS System',
      title: 'Retail POS System',
      subtitle: 'Comming soon...',
      timeline: 'Nov 2026 – Nov 2026',
      category: 'Full-Stack',
      featured: true,
      image: '',
      summary:
        '',
      stack: ['TypeScript', 'Vue.js', 'Node.js','Bootstrap', 'ExpressJS', 'MySQL'],
      liveUrl: '',
      frontendRepoUrl: '',
      backendRepoUrl: '',
      demoVideoUrl: '',
      screenshots: [

      ],
    },
    {
      id: 'pos-system-cafe',
      title: 'pos system cafe',
      subtitle: 'Manage Cafe shop',
      timeline: 'Nov 2026 – Nov 2026',
      category: 'Full-Stack',
      featured: true,
      image: posCafeImg,
      summary:
        'A modern Cafe POS system with dual-currency checkout, automatic stock deduction, and analytics.',
      stack: ['Bootstrap', 'Vue.js', 'Node.js', 'ExpressJS', 'MySQL'],
      liveUrl: 'https://pos-cafe-demo.vercel.app/',
      frontendRepoUrl: 'https://github.com/songhai-yeanlang/POS-system-Cafe--Frontend.git',
      backendRepoUrl: 'https://github.com/songhai-yeanlang/POS-system-Cafe--Backend.git',
      demoVideoUrl: '',
      screenshots: [
        { image: posCafeImg, caption: 'POS order & checkout screen' },
        { image: posCafeImg2, caption: 'Dashboard for admin' },
        { image: posCafeImg3, caption: 'page promote code for admin' },
        { image: posCafeImg4, caption: 'system for staff' },
        { image: posCafeImg5, caption: 'Mobile Screen' },
        { image: posCafeImg6, caption: 'Ipad Screen' },
      ],
    },

    {
      id: 'tg-sender',
      title: 'tg sender',
      subtitle: 'Telegram Tool',
      timeline: 'Aug 2026 – Aug 2026',
      category: 'Full-Stack',
      featured: true,
      image: tgSenderImg,
      summary: 'TG-Sender is a tool that can send messages to Telegram users.',
      stack: ['Bootstrap', 'Vue 3', 'ExpressJS', 'MySQL'],
      liveUrl: 'https://telegram-sender-sandy.vercel.app/',
      frontendRepoUrl: 'https://github.com/songhai-yeanlang/telegram-auto-sender-frontend.git',
      backendRepoUrl: 'https://github.com/songhai-yeanlang/telegram-auto-sender-backend.git',
      demoVideoUrl: '',
      screenshots: [
        { image: tgSenderImg, caption: 'Broadcast composer & recipient list' },
        { image: tgSenderImg2, caption: 'page manage users ' },
      ],
    },
    {
      id: 'ant-forum-community',
      title: 'ant forum commity',
      subtitle: ' Website Community',
      timeline: 'April 2026 – July 2026',
      category: 'Backend & DevOps',
      featured: true,
      image: antForumImg,
      summary:
        '(Academic project) – A community website for discussing, sharing knowledge, and showcasing various software development projects.',
      stack: ['Vue.js', 'Booystrap', 'ExpressJS', 'MySQL'],
      liveUrl: 'https://front-end-ant-forum.vercel.app/',
      frontendRepoUrl: 'https://github.com/ant-forum',
      backendRepoUrl: 'https://github.com/ant-forum',
      demoVideoUrl: 'https://www.youtube.com/watch?v=Gr_JCYQpSoU',
      screenshots: [antForumImg],
    },
    {
      id: 'blog-post',
      title: 'blog post website',
      subtitle: 'Sample blog post website',
      timeline: 'July 2026 – July 2026',
      category: 'Full-Stack',
      featured: true,
      image: '',
      summary:
        'is a sample blog post website for my first practice full-stack development.',
      stack: ['Tailwind CSS', 'ExpressJS', 'MySQL', 'Vue 3'],
      liveUrl: 'https://blog-platform-frontend-eta.vercel.app/',
      frontendRepoUrl: 'https://github.com/songhai-yeanlang/Blog-Platform-Frontend.git',
      backendRepoUrl: 'https://github.com/songhai-yeanlang/Blog-Platform-Backend.git',
      demoVideoUrl: '',
      screenshots: [],
    },
    {
      id: 'phsar-yerng',
      title: 'phsar yerng ',
      subtitle: ' Website Ecommunce ',
      timeline: 'Jam 2026 – Mar 2026',
      category: 'Frontend',
      featured: true,
      image: phsarYerngImg,
      summary:
        '(Academic project) – all in one website that allow user can buy and sell in here !',
      stack: [' fetch api ', 'Vue.js', 'Bootstrap'],
      liveUrl: 'https://vue-e-commerce-ant.vercel.app/',
      frontendRepoUrl: 'https://github.com/Alchemyyyy/Vue-E-Commerce-ANT.git',
      backendRepoUrl: '',
      demoVideoUrl: 'https://youtu.be/qX9gBAeHBM4?si=UkAWDPAaPXoHfWNt',
      screenshots: [phsarYerngImg],
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
        'Building web applications and REST APIs for clients using Vue, TypeScript, Node.js, and SQL databases.',
    },
  ],
  education: [

    {
      id: 'edu-1',
      degree: 'Bachelor of Management Information System (MIS)',
      school: 'at Setec Institute',
      location: 'Phnom Penh, Cambodia',
      period: '2023 – Present',
      description:
        '',
    },
    {
      id: 'edu-2',
      degree: 'Web Application Development with Node.js',
      school: 'at ANT Technology Training Center',
      location: 'Phnom Penh, Cambodia',
      period: '2025 – 2026',
      description:
        '100% Scholarship (700-hour program), sponsored by the Ministry of Post and Telecommunications and the CBRD Fund.',
    },
  ],
  memories: [

    {
      id: 'mem-1',
      image: menImg1,
      title: 'certificate.',
      date: 'july 2026',
      caption: 'Web Application Development with Node.js',
    },
    {
      id: 'mem-2',
      image: menImg2,
      title: 'Scholarship.',
      date: 'july 2026',
      caption: 'at ANT Technology Training Center ',
    },
    {
      id: 'mem-3',
      image: menImg3,
      title: 'Scholarship.',
      date: 'july 2026',
      caption: 'at ANT Technology Training Center ',
    },

  ],
}
