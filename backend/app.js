const express = require('express')
const dotenv = require('dotenv')
const cookieSession = require('cookie-session')
const db = require('./helpers/connection')
const cors = require('cors')
const userRouter = require('./routes/user-routes')
const adminRouter = require('./routes/admin-routes')



const corsOptions = {
  origin: ["http://localhost:4200"],
  credentials: true
}   

const app = express()

app.use(cors(corsOptions))
    
app.use(express.json())

dotenv.config({path: './config.env'})

app.use(
    cookieSession({
    name: "auth-session",
    secret: process.env.COOKIE_SECRET,
    httpOnly: true
    })
)

db.connect()


app.use('/',userRouter)
app.use('/admin',adminRouter)


app.listen(process.env.PORT, () => {
  console.log('server is listening from the port .....!');
}); 

     