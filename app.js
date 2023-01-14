const express = require('express')
const connectDB = require('./config/db');
const app = express()

require('dotenv').config()
app.use(express.json())

// Connect Database
connectDB();

const taskRouter = require('./routes/api/onboarding')
app.use('/api/', taskRouter)

// app.get('/', async(req, res) => {
//   try{
//     res.send('Hello, Dolly! This is your father.')
//   }
//   catch(err){res.send('Error: ' + err)}
// })

const server = app.listen(process.env.PORT || 8000, () => {
    const port = server.address().port
    console.log(`Server running on port: ${port}`);
})