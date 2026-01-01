import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db.js'; // your db.js file
import app from './app.js'; // your app.js file
    


connectDB()
.then(() => {
    app.listen(process.env.PORT || 5100, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})




