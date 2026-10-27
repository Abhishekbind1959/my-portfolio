export type NavLink = { label: string; href: string; id: string };

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Resume', href: '#resume', id: 'resume' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const PERSONAL = {
  name: 'Abhishek Bind',
  monogram: 'AB',
  title: 'Aspiring Web Developer',
  subtitle: 'IT Student • Aspiring Web Developer • Creative Problem Solver',
  heroTitle: 'EXPLORING THE DIGITAL UNIVERSE',
  heroHeading: 'ABHISHEK BIND',
  heroTagline: 'Building the future, one line of code at a time.',
  heroDescription:
    "I'm an Information Technology diploma student exploring web development, programming, and the intersection of technology and creativity.",
  aboutHeading: 'BEYOND THE SCREEN',
  aboutSubheading: 'A curious mind exploring technology and creativity.',
  aboutBody: [
    "I'm Abhishek Bind, a third-year Diploma student in Information Technology. I enjoy learning programming, exploring web technologies, and building creative digital experiences.",
    'My goal is to become a professional Web Developer who creates modern, responsive, and user-friendly applications.',
    'I believe in continuous learning, practical experimentation, and turning ideas into working projects.',
  ],
  education: {
    title: 'Diploma in Information Technology',
    year: 'Third Year',
    label: 'EDUCATION',
  },
  interests: ['Web Development', 'Programming', 'Interactive UI Design', 'Creative Technology'],
  careerGoal: 'Become a professional Web Developer.',
};

export const SKILLS = {
  heading: 'MY TECHNOLOGY CONSTELLATION',
  groups: [
    {
      category: 'Project Experience',
      accent: '#00e5ff',
      skills: [
        { name: 'HTML5', description: 'Semantic markup and modern page structure.' },
        { name: 'CSS3', description: 'Responsive layouts, flexbox, grid, and animations.' },
      ],
    },
    {
  category: 'Frontend Development',
  accent: '#00e5ff',
  skills: [
    { name: 'HTML5', description: 'Semantic HTML and accessible web page structure.' },
    { name: 'CSS3', description: 'Responsive layouts, Flexbox, Grid, and animations.' },
    { name: 'JavaScript', description: 'Interactive web applications and dynamic functionality.' },
    { name: 'TypeScript', description: 'Type-safe JavaScript development.' },
    { name: 'React', description: 'Reusable components and interactive user interfaces.' },
    { name: 'Tailwind CSS', description: 'Utility-first styling and responsive design.' },
    { name: 'Vite', description: 'Fast frontend development and build tooling.' },
    { name: 'Git & GitHub', description: 'Version control and project collaboration.' },
  ],
},
    {
      category: 'Familiar With',
      accent: '#4169ff',
      skills: [
        { name: 'Python', description: 'Scripting, automation, and problem solving.' },
        { name: 'C Programming', description: 'Foundational logic, data structures, and algorithms.' },
      ],
    },
    {
      category: 'Currently Learning',
      accent: '#9d4edd',
      skills: [
        { name: 'JavaScript', description: 'Adding interactivity to the web. (In progress)' },
        { name: 'More Tools', description: 'Editable placeholder for additional languages and tools.' },
      ],
    },
  ],
};

export const INTERNSHIPS = {
  heading: 'MISSIONS THAT SHAPED MY JOURNEY',
  items: [
    {
      index: '01',
      company: 'Indigo Consultancy Pvt. Ltd.',
      role: '[Add your internship role]',
      description:
        '[Add your responsibilities, tasks, and the technologies you worked with during this internship. Edit this in src/data/portfolio.ts]',
      tags: ['Placeholder'],
    },
    {
      index: '02',
      company: 'Nucleus Automations',
      role: '[Add your internship role]',
      description:
        '[Add your responsibilities, tasks, and the technologies you worked with during this internship. Edit this in src/data/portfolio.ts]',
      tags: ['Placeholder'],
    },
  ],
};

export const PROJECTS = {
  heading: 'PROJECTS FROM MY DIGITAL UNIVERSE',
  items: [
    {
      title: '3D Personal Developer Portfolio',
      description:
        'An interactive portfolio exploring 3D environments, cinematic animations, and modern frontend development.',
      technologies: ['React', 'TypeScript', 'Canvas API', 'CSS3'],
      github: '[Add GitHub repo URL]',
      demo: '[Add live demo URL if available]',
      status: 'Live',
    },
    {
      title: 'Hyperlocal Platform',
      description:
        'A web project focused on creating a local-service-oriented digital experience.',
      technologies: ['[Add technologies]'],
      github: '[Add GitHub repo URL]',
      demo: '[Add live demo URL if available]',
      status: 'In Progress',
    },
    {
      title: 'Coming Soon',
      description: 'A placeholder for my next development project. Check back soon.',
      technologies: ['TBD'],
      github: '',
      demo: '',
      status: 'Planned',
    },
  ],
};

export const RESUME = {
  heading: 'MY PROFESSIONAL PROFILE',
  fields: [
    { label: 'Name', value: 'Abhishek Bind' },
    { label: 'Education', value: 'Diploma in Information Technology' },
    { label: 'Current Year', value: 'Third Year' },
    { label: 'Internships', value: 'Indigo Consultancy Pvt. Ltd. · Nucleus Automations' },
    { label: 'Technical Skills', value: 'HTML, CSS, Python, C' },
    { label: 'Career Objective', value: 'Aspiring Web Developer' },
  ],
  // Place a real PDF at public/resume/abhishek-bind-resume.pdf to enable download
  pdfPath: '/resume/abhishek-bind-resume.pdf',
};

export const CONTACT = {
heading: "LET'S BUILD SOMETHING AMAZING",
subheading:
"Have an idea, a project, or an opportunity? Let's connect and turn it into reality.",
email: "baburajia42681@gmail.com(mailto:baburajia42681@gmail.com)",
github: "https://github.com/Abhishekbind1959",
linkedin: "https://www.linkedin.com/in/Abhishek-Bind/",
};


