# MongoDB Connection Fix Guide

## Current Error: "bad auth : authentication failed"

This error means MongoDB Atlas is rejecting the credentials. Here are the solutions:

## Solution 1: Verify MongoDB Atlas Credentials

1. **Go to MongoDB Atlas Dashboard**: https://cloud.mongodb.com
2. **Navigate to**: Database Access (left sidebar)
3. **Check your user**: `harinizoe9_db_user`
4. **Verify the password** matches: `LYdUvP2UBVgruMiO`
5. **If password is different**: Update the `.env` file with the correct password

## Solution 2: URL Encode the Password

If your password contains special characters, they need to be URL-encoded in the connection string.

**Special characters that need encoding:**
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`
- `+` becomes `%2B`
- `/` becomes `%2F`
- `:` becomes `%3A`
- `?` becomes `%3F`
- `=` becomes `%3D`

**Example:**
If password is `pass@word#123`, the connection string should use `pass%40word%23123`

## Solution 3: Get Fresh Connection String

1. Go to MongoDB Atlas Dashboard
2. Click on your cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Select "Node.js" and version
6. Copy the connection string
7. Replace the `MONGO_URI` in `.env` file

**Format should be:**
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

## Solution 4: Check IP Whitelist

1. Go to MongoDB Atlas Dashboard
2. Navigate to: Network Access (left sidebar)
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (for development)
   OR
5. Add your current IP address

## Solution 5: Verify Database Name

The connection string should include the database name. Current format:
```
mongodb+srv://harinizoe9_db_user:LYdUvP2UBVgruMiO@cluster0.bkcklfd.mongodb.net/a3minds?retryWrites=true&w=majority&appName=Cluster0
```

Note: `/a3minds` is the database name. If your database has a different name, update it.

## Quick Test

After updating `.env`, restart the server:
```powershell
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Still Having Issues?

1. **Double-check credentials** in MongoDB Atlas Dashboard
2. **Try creating a new database user** with a simple password (no special characters)
3. **Verify cluster is running** (not paused)
4. **Check MongoDB Atlas status page** for any outages

## Updated Connection String Format

The `.env` file should have:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0
```

Make sure:
- ✅ Username is correct
- ✅ Password is correct (URL-encoded if needed)
- ✅ Database name is included
- ✅ Cluster URL is correct
- ✅ IP address is whitelisted

