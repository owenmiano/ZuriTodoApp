const express=require('express')
const app=express();
require('dotenv').config()
const mongoose=require('mongoose')
const routes=require('./routes/taskRoutes')
const connectDB=require('./DBconn')
const port=process.env.PORT;
// Connect To MongoDB
connectDB();


// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))    //handles form submission

//Todo API
app.use('/',routes)

// Test DB Connection
mongoose.connection.once('open',()=>{
    console.log('Connected successfully to MongoDB')
    app.listen(port,()=>console.log(`Server is using port:${port}`))
})


