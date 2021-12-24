const express = require('express');
const loginRouter = require('./routers/loginRouter.js');
const profileRouter = require('./routers/profileRouter.js');
const cors = require('cors');
const neo4j = require('./neo4jsConnection.js');

const app = express();
app.use(express.json());
// app.use(cors({
//     origin: "http://127.0.0.1:5500",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
// }));

neo4j.run("MATCH (n) RETURN n")
.then((result)=>console.log(result.records[1]._fields[0].properties))
.catch(err=> console.log(err));


app.use('/login', loginRouter);
app.use('/', profileRouter);
app.listen(5000, ()=>console.log("Listening at port: " + 5000));