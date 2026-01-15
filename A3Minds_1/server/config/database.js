import mongoose from 'mongoose'

/**
 * Database Connection Configuration
 * Connects to MongoDB Atlas using the provided connection string
 */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables')
    }

    // Connect to MongoDB - removed deprecated options (not needed in Mongoose 7+)
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    console.log(`📊 Database: ${conn.connection.name}`)
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.error('\n🔐 Authentication Error:')
      console.error('   - Check your MongoDB Atlas username and password')
      console.error('   - Ensure the password is correctly URL-encoded if it contains special characters')
      console.error('   - Verify the database user has proper permissions')
      console.error('   - Check if your IP address is whitelisted in MongoDB Atlas')
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n🌐 Network Error:')
      console.error('   - Check your internet connection')
      console.error('   - Verify MongoDB Atlas cluster is running')
    }
    
    console.error('\n💡 Tip: Get a fresh connection string from MongoDB Atlas:')
    console.error('   1. Go to MongoDB Atlas Dashboard')
    console.error('   2. Click "Connect" on your cluster')
    console.error('   3. Choose "Connect your application"')
    console.error('   4. Copy the connection string and update your .env file\n')
    
    process.exit(1)
  }
}

export default connectDB

