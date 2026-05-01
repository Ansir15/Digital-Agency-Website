export const staticTeamMembers = [
  {
    _id: 'team-1',
    name: 'Aliza Khan',
    role: 'Company CEO',
    bio: 'Visionary leader driving DevAgency with strong values and business strategy.',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    socialLinks: {
      linkedin: 'https://www.linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    },
    order: 1
  },
  {
    _id: 'team-2',
    name: 'Ansir Ali',
    role: 'Lead Developer',
    bio: 'Expert full-stack developer leading technical architecture and ensuring projects are delivered with high quality.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    socialLinks: {
      linkedin: 'https://www.linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    },
    order: 2
  },
  {
    _id: 'team-3',
    name: 'Khurram Shah',
    role: 'Senior Product Manager',
    bio: 'Focused on product strategy, roadmaps, and client collaboration to turn ideas into successful digital products.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    socialLinks: {
      linkedin: 'https://www.linkedin.com',
      github: '',
      twitter: ''
    },
    order: 3
  },
  {
    _id: 'team-4',
    name: 'Iqra Jawed',
    role: 'UI/UX Lead',
    bio: 'Design leader dedicated to crafting elegant and intuitive user experiences across web and mobile applications.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    socialLinks: {
      linkedin: 'https://www.linkedin.com',
      github: '',
      twitter: ''
    },
    order: 4
  },
  {
    _id: 'team-5',
    name: 'Sarfraz Khan',
    role: 'DevOps Engineer',
    bio: 'Ensuring stable deployments, scalable infrastructure, and smooth operations for all client projects.',
    photo: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400',
    socialLinks: {
      linkedin: 'https://www.linkedin.com',
      github: 'https://github.com',
      twitter: ''
    },
    order: 5
  }
]

export const staticProjects = [
  {
    _id: 'project-1',
    title: 'E-Commerce Platform',
    category: 'E-Commerce',
    description: 'A full-featured e-commerce platform with payment integration, inventory management, and a real-time analytics dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    _id: 'project-2',
    title: 'SaaS Dashboard',
    category: 'Web App',
    description: 'Modern SaaS analytics dashboard with real-time data visualization, user management, and customizable widgets.',
    techStack: ['Vue.js', 'Express', 'PostgreSQL', 'Chart.js', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    _id: 'project-3',
    title: 'Mobile Banking App',
    category: 'Mobile',
    description: 'Secure mobile banking application with biometric authentication, transaction history, and instant transfers.',
    techStack: ['React Native', 'Node.js', 'Firebase', 'Plaid API'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    _id: 'project-4',
    title: 'Brand Identity System',
    category: 'UI-UX',
    description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines for a tech startup.',
    techStack: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800',
    liveUrl: 'https://example.com',
    githubUrl: '',
    featured: false
  },
  {
    _id: 'project-5',
    title: 'Real Estate Platform',
    category: 'Web App',
    description: 'Property listing and management platform with virtual tours, mortgage calculators, and agent matching system.',
    techStack: ['Next.js', 'MongoDB', 'Mapbox', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false
  },
  {
    _id: 'project-6',
    title: 'Healthcare Portal',
    category: 'Web App',
    description: 'Patient management system with appointment scheduling, medical records, and telemedicine features.',
    techStack: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Socket.io'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false
  }
]

export const staticBlogPosts = [
  {
    _id: 'post-1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    slug: 'future-of-web-development-trends-2024',
    excerpt: 'Explore the cutting-edge trends shaping web development in 2024, from AI-powered tools to edge computing and WebAssembly.',
    author: 'Sarah Chen',
    category: 'Technology',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    publishedAt: '2024-03-12T08:30:00.000Z',
    readTime: 8,
    tags: ['Web Development', 'AI', 'Trends', '2024'],
    content: `<p>The web development landscape is constantly evolving. In 2024, we're seeing exciting new trends that are reshaping how we build and interact with web applications.</p>
      <h2>1. AI-Powered Development</h2>
      <p>Artificial Intelligence is revolutionizing how developers write code. From intelligent code completion to automated bug detection, AI tools are becoming indispensable.</p>
      <h2>2. Edge Computing</h2>
      <p>Edge computing brings processing power closer to users, reducing latency and improving performance. Frameworks like Next.js and Cloudflare Workers are leading this charge.</p>
      <h2>3. WebAssembly</h2>
      <p>WebAssembly enables high-performance applications in the browser, opening doors for complex games, video editing, and scientific computing on the web.</p>`
  },
  {
    _id: 'post-2',
    title: 'Building Accessible React Applications',
    slug: 'building-accessible-react-applications',
    excerpt: 'Learn essential techniques for creating inclusive React applications that work for users of all abilities.',
    author: 'Michael Torres',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    publishedAt: '2024-04-08T10:00:00.000Z',
    readTime: 6,
    tags: ['React', 'Accessibility', 'A11y', 'Frontend'],
    content: `<p>Accessibility is not an afterthought—it's a fundamental aspect of building quality web applications. Let's explore how to make your React apps accessible to everyone.</p>
      <h2>Semantic HTML</h2>
      <p>Using proper HTML elements provides built-in accessibility features. Buttons should be buttons, links should be links, and form elements need proper labels.</p>
      <h2>ARIA Attributes</h2>
      <p>When semantic HTML isn't enough, ARIA attributes help screen readers understand your interface. Use them sparingly and correctly.</p>
      <h2>Keyboard Navigation</h2>
      <p>Ensure all interactive elements are keyboard accessible. Test your app using only Tab, Enter, and Space keys.</p>`
  },
  {
    _id: 'post-3',
    title: 'SEO Best Practices for Modern Web Applications',
    slug: 'seo-best-practices-modern-web-apps',
    excerpt: 'Master the SEO techniques that matter for modern web apps, from SSR to Core Web Vitals optimization.',
    author: 'Emma Wilson',
    category: 'Marketing',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800',
    publishedAt: '2024-05-02T09:00:00.000Z',
    readTime: 7,
    tags: ['SEO', 'Web Performance', 'Marketing', 'Core Web Vitals'],
    content: `<p>Search engine optimization remains crucial for web success. Here's how to optimize your modern web applications for better search visibility.</p>
      <h2>Server-Side Rendering</h2>
      <p>SSR ensures search engines can crawl your content effectively. Frameworks like Next.js and Nuxt.js make SSR accessible to all developers.</p>
      <h2>Core Web Vitals</h2>
      <p>Google's Core Web Vitals metrics—LCP, FID, and CLS—are now ranking factors. Monitor and optimize these metrics for better SEO performance.</p>
      <h2>Structured Data</h2>
      <p>Schema markup helps search engines understand your content. Implement rich snippets for better visibility in search results.</p>`
  },
  {
    _id: 'post-4',
    title: 'Design Systems: Creating Consistency at Scale',
    slug: 'design-systems-consistency-at-scale',
    excerpt: 'Discover how to build and maintain a design system that scales with your organization and keeps products consistent.',
    author: 'Alex Kim',
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    publishedAt: '2024-06-15T11:30:00.000Z',
    readTime: 5,
    tags: ['Design Systems', 'UI/UX', 'Components', 'Documentation'],
    content: `<p>A well-crafted design system is the foundation of consistent, scalable product development. Learn how to build one that actually works.</p>
      <h2>Components First</h2>
      <p>Start with your most used UI elements. Buttons, inputs, and cards form the building blocks of your design system.</p>
      <h2>Documentation is Key</h2>
      <p>Your design system is only as good as its documentation. Use tools like Storybook to document components and their usage patterns.</p>
      <h2>Versioning and Governance</h2>
      <p>Treat your design system like a product. Establish clear versioning, contribution guidelines, and a governance model.</p>`
  },
  {
    _id: 'post-5',
    title: 'Mobile-First Design: Why It Matters in 2024',
    slug: 'mobile-first-design-2024',
    excerpt: 'Understand why mobile-first design is critical in 2024 and how to build responsive, fast, and touch-friendly web experiences.',
    author: 'Nina Patel',
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    publishedAt: '2024-07-20T12:15:00.000Z',
    readTime: 6,
    tags: ['Mobile', 'Design', 'Responsive', 'UX'],
    content: `<p>Mobile devices are now the primary way many users interact with the web. Mobile-first design ensures your product looks great and works smoothly on every screen.</p>
      <h2>Start with the Smallest Screen</h2>
      <p>Designing from mobile up helps prioritize the most important content and interactions first.</p>
      <h2>Performance Matters</h2>
      <p>Fast load times and efficient layouts are essential for mobile users, especially on slower networks.</p>
      <h2>Touch-Friendly Interfaces</h2>
      <p>Buttons, forms, and navigation should be comfortable to use with fingers and thumbs.</p>`
  },
  {
    _id: 'post-6',
    title: 'Essential Web Security Practices for Every App',
    slug: 'essential-web-security-practices',
    excerpt: 'Learn the core security practices every web application needs, from HTTPS to authentication and input validation.',
    author: 'Omar Rahman',
    category: 'Technology',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    publishedAt: '2024-08-10T14:00:00.000Z',
    readTime: 7,
    tags: ['Security', 'Authentication', 'Web App', 'Best Practices'],
    content: `<p>Security should be built in from the start. Learn the essential practices that protect your web application from common threats.</p>
      <h2>Use HTTPS Everywhere</h2>
      <p>HTTPS is the foundation of secure communication and trust on the web.</p>
      <h2>Protect Against Injection</h2>
      <p>Validate input and sanitize data to prevent SQL injection, XSS, and other attacks.</p>
      <h2>Secure Authentication</h2>
      <p>Use strong password policies, token-based authentication, and secure session handling.</p>`
  },
  {
    _id: 'post-7',
    title: 'Scaling SaaS Startups with Smarter Architecture',
    slug: 'scaling-saas-startups-smarter-architecture',
    excerpt: 'Get practical guidance on building scalable SaaS architecture with automation, modularity, and observability.',
    author: 'Priya Singh',
    category: 'Business',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    publishedAt: '2024-09-01T09:45:00.000Z',
    readTime: 8,
    tags: ['SaaS', 'Architecture', 'Scaling', 'DevOps'],
    content: `<p>Scalable architecture keeps startups ready for growth. Discover the patterns and infrastructure decisions that make SaaS products easier to scale.</p>
      <h2>Microservices and Modularity</h2>
      <p>Breaking systems into smaller services reduces complexity and improves flexibility.</p>
      <h2>Automated Deployment</h2>
      <p>Continuous deployment pipelines ensure new features reach customers faster and more reliably.</p>
      <h2>Observability</h2>
      <p>Logging, metrics, and tracing help you understand system behavior and respond quickly to issues.</p>`
  }
]
