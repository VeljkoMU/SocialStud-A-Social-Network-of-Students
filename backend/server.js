const express = require('express');
const loginRouter = require('./routers/loginRouter.js');
const profileRouter = require('./routers/profileRouter.js');
const cors = require('cors');
const neo4j = require('./neo4jsConnection.js');

const app = express();
app.use(express.json());
 app.use(cors({
     origin: "http://localhost:4200",
     methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
 }));



app.use('/login', loginRouter);
app.use('/', profileRouter);
app.listen(5000, ()=>console.log("Listening at port: " + 5000));