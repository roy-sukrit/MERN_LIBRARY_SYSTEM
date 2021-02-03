//&1. <------------Dependencies-------------->
const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const passport = require('./passport');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const app=express();
//Environment Variable
require('dotenv').config()


const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  });
  


app.use(cors());
app.use(express.json())

app.use(express.static('./uploads'))
app.use(expressSession)



// Passport
app.use(passport.initialize())
app.use(passport.session()) 

//^2. <------------------MONGODB CONNECTION-------------------->
const uri=process.env.COMPASS_URI;

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB connection successful for Library-APP")
})

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', 
		store: new MongoStore({ mongooseConnection: connection }),
		resave: false, 
		saveUninitialized: false 
	})
)




//&3. <------------------NODE JS SERVER-------------------------->
const port=process.env.PORT|| 8080
app.listen(port,()=>{
    console.log(`Server is Running on Port : ${port}`)
})


//^Router


const bookRouter=require('./routes/bookDetail.route')
app.use('/books', bookRouter);

const userRouter=require('./routes/userDetail.route')
app.use('/user', userRouter);

const operationRouter=require('./routes/operationDetail.route')
app.use('/operation', operationRouter);


const authRouter=require('./routes/authRouter.route')
app.use('/auth', authRouter)



module.exports = app;
//&3. <--------------------------End---------------------------->