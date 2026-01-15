# Quick Start Guide - Fix Connection Error

## Issue: ERR_CONNECTION_REFUSED

If you're seeing `ERR_CONNECTION_REFUSED` when trying to login, it means the **backend server is not running**.

## Solution: Start the Backend Server

### Step 1: Open a New Terminal

Keep your frontend running in one terminal, and open a **new terminal window** for the backend.

### Step 2: Navigate to Server Directory

```bash
cd server
```

### Step 3: Create .env File (if not exists)

Create a file named `.env` in the `server` directory with this content:

```env
PORT=5000
MONGO_URI=mongodb+srv://harinizoe9_db_user:LYdUvP2UBVgruMiO@cluster0.bkcklfd.mongodb.net/?appName=Cluster0
JWT_SECRET=a3minds_secret_key_2024_secure_random_string
NODE_ENV=development
```

### Step 4: Install Dependencies (First Time Only)

```bash
npm install
```

### Step 5: Start the Backend Server

```bash
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: ...
```

### Step 6: Verify Backend is Running

Open your browser and go to: `http://localhost:5000/api/health`

You should see a JSON response like:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "..."
}
```

## Now Try Login Again

1. Go back to your frontend (http://localhost:3000)
2. Click "Admin Login"
3. Use credentials:
   - Email: `admin123@gmail.com`
   - Password: `a3admin@123`

## Running Both Servers

You need **TWO terminals** running:

**Terminal 1 - Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

## Troubleshooting

### Port 5000 Already in Use
If port 5000 is busy, either:
1. Stop the other application using port 5000
2. Change the PORT in `.env` file to a different port (e.g., 5001)
3. Update `VITE_API_URL` in `client/.env` to match

### MongoDB Connection Error
- Check your internet connection
- Verify the MongoDB Atlas connection string is correct
- Ensure MongoDB Atlas cluster is running

### Still Having Issues?
1. Check both terminals for error messages
2. Verify `.env` file exists in `server` directory
3. Make sure all dependencies are installed (`npm install` in both client and server)
4. Check that ports 3000 and 5000 are not blocked by firewall

## React Router Warnings (Fixed)

The React Router future flag warnings have been fixed. You should no longer see those warnings after the update.

