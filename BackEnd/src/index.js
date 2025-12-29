import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import connectDB from './db.js'; // your db.js file
import app from './app.js';          // your Express app

let server; // declared outside for access in shutdown()

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ MongoDB connected.');

    const PORT = process.env.PORT || 3000;

    // Start the server
    server = app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });

    // Listen for server errors
    server.on('error', (err) => {
      console.error('❌ Server error:', err);
      shutdown();
    });

    // Handle graceful shutdown signals
    process.on('SIGINT', shutdown);   // Ctrl+C
    process.on('SIGTERM', shutdown);  // Docker stop or kill

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown handler
async function shutdown() {
  console.log('\n🛑 Gracefully shutting down...');

  try {
    // Close MongoDB connection first
    if (mongoose.connection.readyState === 1) { // connected
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed.');
    }

    // Then close the server
    if (server) {
      server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
}

// Start the server
startServer();
