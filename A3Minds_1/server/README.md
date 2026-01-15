# A3 Minds - Backend Server

Node.js/Express backend API server for A3 Minds application.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the `server` directory with the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://harinizoe9_db_user:LYdUvP2UBVgruMiO@cluster0.bkcklfd.mongodb.net/?appName=Cluster0
JWT_SECRET=a3minds_secret_key_2024_secure_random_string
NODE_ENV=development
```

**Important**: The `.env` file is already created with the MongoDB connection string. If you need to recreate it, copy the content above.

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user (protected)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (protected - will be added in future)

### Health Check
- `GET /api/health` - Server health check

## Admin Credentials

- **Email**: admin123@gmail.com
- **Password**: a3admin@123

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── eventController.js  # Event CRUD operations
├── middlewares/
│   └── auth.js              # JWT authentication middleware
├── models/
│   └── Event.js             # Event MongoDB schema
├── routes/
│   ├── authRoutes.js        # Authentication routes
│   └── eventRoutes.js       # Event routes
├── server.js                # Main server file
└── package.json
```

## Database

The application uses MongoDB Atlas. The connection string is configured in the `.env` file.

### Event Schema

```javascript
{
  title: String (required),
  date: Date (required),
  location: String (required),
  description: String (required),
  participants: Number (required),
  beneficiaries: Number (required),
  status: String (enum: 'upcoming', 'past', 'cancelled'),
  createdAt: Date,
  updatedAt: Date
}
```

## Notes

- CORS is enabled for frontend communication
- JWT tokens expire in 7 days
- All API responses follow a consistent format with `success`, `message`, and `data` fields

