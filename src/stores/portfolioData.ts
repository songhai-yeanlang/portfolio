import avatarPhoto from '@/assets/images/songhai Yeanlang.jpg'
import posCafeImg from '@/assets/images/projects/Untitled-1.png'
import tgSenderImg from '@/assets/images/projects/Untitled-2.png'
import antForumImg from '@/assets/images/projects/Untitled-3.png'
import phsarYerngImg from '@/assets/images/projects/Untitled-4.png'

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
      subtitle: 'Manage Cafe shop',
      timeline: 'Oct 2026 – Nov 2026',
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
      liveUrl: '',
      frontendRepoUrl: 'https://github.com/songhai-yeanlang/telegram-auto-sender-frontend.git',
      backendRepoUrl: 'https://github.com/songhai-yeanlang/telegram-auto-sender-backend.git',
      demoVideoUrl: '',
      screenshots: [
        { image: tgSenderImg, caption: 'Broadcast composer & recipient list' },
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
        'A community website for discussing, sharing knowledge, and showcasing various software development projects.',
      stack: ['Vue.js', 'Booystrap', 'ExpressJS', 'MySQL'],
      liveUrl: 'https://github.com/songhai-yeanlang',
      frontendRepoUrl: 'https://github.com/songhai-yeanlang',
      backendRepoUrl: 'https://github.com/songhai-yeanlang',
      demoVideoUrl: '',
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
        'is a sample blog post website for my practice full-stack development.',
      stack: ['Vue.js', 'ExpressJS', 'PostgreSQL'],
      liveUrl: 'https://github.com/songhai-yeanlang',
      frontendRepoUrl: 'https://github.com/songhai-yeanlang',
      backendRepoUrl: 'https://github.com/songhai-yeanlang',
      demoVideoUrl: '',
      screenshots: [],
    },
    {
      id: 'phsar-yerng-1',
      title: 'phsar yerng ',
      subtitle: ' Website Ecommunce ',
       timeline: 'Jam 2026 – Mar 2026',
      category: 'Frontend',
      featured: true,
      image: phsarYerngImg,
      summary:
        'all in one website that allow user can buy and sell in here !',
      stack: ['Node.js', 'ExpressJS', 'PostgreSQL', 'Postman'],
      liveUrl: 'https://github.com/songhai-yeanlang',
      frontendRepoUrl: 'https://github.com/songhai-yeanlang',
      backendRepoUrl: 'https://github.com/songhai-yeanlang',
      demoVideoUrl: '',
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
}
