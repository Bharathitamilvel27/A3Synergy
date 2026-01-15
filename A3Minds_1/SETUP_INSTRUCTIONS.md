# Setup Instructions - A3 Minds Event Management

Complete setup guide for running the A3 Minds application with Event Management feature.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (already configured)

## Step 1: Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
   - The `.env` file should already exist with the MongoDB connection string
   - If not, create it with this content:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://harinizoe9_db_user:LYdUvP2UBVgruMiO@cluster0.bkcklfd.mongodb.net/?appName=Cluster0
   JWT_SECRET=a3minds_secret_key_2024_secure_random_string
   NODE_ENV=development
   ```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Step 2: Frontend Setup

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional - for custom API URL):
   - Create `.env` in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   - If not created, it defaults to `http://localhost:5000/api`

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Step 3: Access the Application

### Public Website
- Open `http://localhost:3000` in your browser
- Navigate to the Events page to see events (initially empty)

### Admin Dashboard
1. Click "Admin Login" in the header or footer
2. Use these credentials:
   - **Email**: admin123@gmail.com
   - **Password**: a3admin@123
3. After login, you'll be redirected to the Event Management page
4. Create events using the form
5. Events will appear on the public Events page automatically

## Features Implemented

### ✅ Admin Features
- Admin login with JWT authentication
- Protected admin routes
- Event Management page with:
  - Create new events form
  - View all events list
  - Real-time updates

### ✅ Public Features
- Events page fetches data from backend API
- Displays events in cards with all details
- Tabs for Upcoming and Past events
- Shows participants and beneficiaries count

### ✅ Backend Features
- MongoDB Atlas integration
- RESTful API endpoints
- JWT authentication
- Event CRUD operations
- Error handling and validation

## API Endpoints

- `POST /api/auth/login` - Admin login
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event

## Troubleshooting

### Backend Issues
- Ensure MongoDB Atlas connection string is correct
- Check that port 5000 is not in use
- Verify all dependencies are installed

### Frontend Issues
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify API URL in `.env` file

### Database Issues
- Verify MongoDB Atlas cluster is running
- Check network connectivity
- Ensure connection string is correct

## Next Steps

This implementation focuses on Event Management only. Future enhancements can include:
- Update and delete events
- Volunteer management
- Participant tracking
- Feedback system
- Analytics dashboard

## Support

For issues or questions, refer to the main README.md or PROJECT_OVERVIEW.md files.

