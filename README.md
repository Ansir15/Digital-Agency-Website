# DevAgency - Full-Stack MERN Digital Agency Website

A production-ready, fully responsive 6-page digital agency website built on the MERN stack with modern UI/UX design.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react)
![Tech Stack](https://img.shields.io/badge/Node.js-18-green?logo=nodedotjs)
![Tech Stack](https://img.shields.io/badge/MongoDB-6-green?logo=mongodb)
![Tech Stack](https://img.shields.io/badge/Tailwind-3-blue?logo=tailwindcss)

## Features

### Frontend
- **6 Public Pages**: Home, Services, Portfolio, About, Blog, Contact
- **Admin Dashboard**: Secure login with protected routes
- **CRUD Operations**: Manage projects, blog posts, team members, and messages
- **Animations**: Framer Motion page transitions and scroll reveals
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Elegant dark UI with accent colors
- **Contact Form**: With email notifications and validation

### Backend
- **RESTful API**: Express.js with proper route structure
- **Authentication**: JWT-based with bcrypt password hashing
- **Database**: MongoDB Atlas with Mongoose ODM
- **Email System**: Nodemailer with Gmail SMTP
- **File Uploads**: Cloudinary integration for images
- **Rate Limiting**: Protection against spam on contact form
- **Security**: CORS, helmet-ready, input validation

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Redux Toolkit |
| Styling | Tailwind CSS v3, Framer Motion |
| Forms | React Hook Form, Yup |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcrypt |
| Email | Nodemailer, Gmail SMTP |
| Uploads | Multer, Cloudinary |
| Icons | React Icons |

## Project Structure

```
devagency/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Main pages + Admin
│   │   ├── redux/             # State management
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils/             # Helper functions
│   ├── package.json
│   └── vite.config.js
│
└── server/                    # Node.js Backend
    ├── config/                # Database config
    ├── controllers/           # Route controllers
    ├── models/                # Mongoose schemas
    ├── routes/                # API routes
    ├── middleware/            # Auth, error handling
    ├── utils/                 # Email utilities
    ├── seed.js                # Database seeding
    └── server.js              # Entry point
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account (for images)
- Gmail account (for email)

### 1. Clone and Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Setup

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/devagency
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
AGENCY_EMAIL=hello@devagency.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed Database

```bash
cd server
npm run seed
```

This creates:
- Admin user: `admin@devagency.com` / `admin123`
- Sample projects, blog posts, and team members

### 4. Run Development

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm run dev
```

Visit `http://localhost:5173`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/profile` | Get profile |
| POST | `/api/auth/logout` | Logout |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contact` | Get all messages (admin) |
| POST | `/api/contact` | Submit contact form |
| PATCH | `/api/contact/:id/read` | Toggle read status |
| DELETE | `/api/contact/:id` | Delete message |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create project (admin) |
| PUT | `/api/projects/:id` | Update project (admin) |
| DELETE | `/api/projects/:id` | Delete project (admin) |

### Blog
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blog` | Get all posts |
| GET | `/api/blog/:slug` | Get single post |
| POST | `/api/blog` | Create post (admin) |
| PUT | `/api/blog/:id` | Update post (admin) |
| DELETE | `/api/blog/:id` | Delete post (admin) |

### Team
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/team` | Get all members |
| POST | `/api/team` | Add member (admin) |
| PUT | `/api/team/:id` | Update member (admin) |
| DELETE | `/api/team/:id` | Delete member (admin) |
| PUT | `/api/team/reorder` | Reorder members |

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add all environment variables
6. Deploy

### Frontend (Vercel)
1. Push client code to GitHub
2. Import project in Vercel
3. Set framework preset to Vite
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Add environment variable: `VITE_API_URL`
7. Deploy

## Design System

### Colors
- Primary: `#0F172A` (Deep Navy)
- Accent: `#6C63FF` (Electric Violet)
- Surface: `#1E293B`
- Text: `#F1F5F9`
- Muted: `#94A3B8`

### Fonts
- Display: Clash Display
- Body: Satoshi
- Mono: JetBrains Mono

## Features Checklist

### Frontend
- [x] React Router v6 with nested routes
- [x] Tailwind CSS + custom design tokens
- [x] Framer Motion animations
- [x] Redux Toolkit state management
- [x] React Hook Form + Yup validation
- [x] Lazy loading + code splitting
- [x] Responsive all 6 pages
- [x] Admin protected routes
- [x] Toast notifications
- [x] SEO with react-helmet

### Backend
- [x] Express REST API
- [x] MongoDB + Mongoose
- [x] JWT authentication
- [x] bcrypt password hashing
- [x] Nodemailer email system
- [x] Cloudinary image uploads
- [x] Rate limiting
- [x] CORS configuration
- [x] Global error handling

## License

MIT License - feel free to use for personal or commercial projects.

## Support

For issues or questions, please open a GitHub issue or contact us at hello@devagency.com

---

Built with passion by the DevAgency team.
"# Digital-Agency-Website" 
