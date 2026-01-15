# Quick Setup Guide

## First Time Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL shown in the terminal

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── Header.jsx      # Navigation header
│   │       └── Footer.jsx      # Site footer
│   ├── pages/
│   │   └── public/
│   │       ├── Home.jsx        # Landing page
│   │       ├── About.jsx       # About page
│   │       ├── VisionMission.jsx  # Vision & Mission
│   │       ├── Events.jsx      # Events listing
│   │       ├── Volunteer.jsx   # Volunteer registration
│   │       └── Contact.jsx     # Contact form
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles + Tailwind
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── package.json                # Dependencies
```

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
- `primary`: Main brand color (currently blue)
- `secondary`: Accent color (currently purple)

### Content
- Update page content in `src/pages/public/`
- Replace placeholder images with actual images
- Update contact information in Footer and Contact page

### Styling
- Global styles: `src/index.css`
- Component-specific styles: Use Tailwind classes directly in components
- Custom utility classes: Add to `@layer components` in `index.css`

## Notes

- Forms currently log to console (backend integration pending)
- Images use placeholder URLs - replace with actual images
- All content references a3minds.com as a reference source

