# A3 Minds Chennai - Web Application

A comprehensive web platform for A3 Minds, Chennai - featuring both a public-facing website and an admin dashboard for internal management.

## 📋 Project Overview

This project consists of:
- **Public Website**: For users, volunteers, visitors, and potential donors
- **Admin Dashboard**: For organization internal use (to be implemented in Phase 2)

See [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for complete architecture and planning details.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
A3Minds_1/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── App.jsx         # Main app with routing
│   └── package.json
├── PROJECT_OVERVIEW.md      # Complete project architecture
└── README.md               # This file
```

## 🎨 Features

### Public Website (Current Phase)

- ✅ **Home Page**: Hero section, statistics, highlights, and call-to-action
- ✅ **About Page**: Organization history, values, milestones, and team information
- ✅ **Vision & Mission Page**: Clear statements of vision, mission, and goals
- ✅ **Events & Activities Page**: Upcoming and past events with filtering
- ✅ **Volunteer Page**: Information and registration form
- ✅ **Contact Page**: Contact form and organization details

### Admin Dashboard (Future Phase)

- ⏳ Authentication and authorization
- ⏳ Dashboard with metrics
- ⏳ Event management
- ⏳ Volunteer management
- ⏳ Participant tracking
- ⏳ Feedback management
- ⏳ Impact analysis

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios (for future API integration)

## 📝 Notes

- Content is based on reference information from https://a3minds.com/
- This is a reference implementation, not an official rewrite
- All forms currently log to console - backend integration pending
- Images use placeholder URLs - replace with actual images in production

## 🔄 Next Steps

1. Set up Node.js/Express backend server
2. Configure MongoDB database
3. Implement authentication system
4. Connect frontend to backend APIs
5. Build admin dashboard
6. Add image upload functionality
7. Implement email notifications

## 📄 License

This project is for A3 Minds, Chennai organization use.

## 👥 Contributing

This is an internal project for A3 Minds. For questions or contributions, please contact the organization.

---

**Note**: This application is currently in Phase 1 (Public Website). The admin dashboard and backend will be implemented in subsequent phases.

