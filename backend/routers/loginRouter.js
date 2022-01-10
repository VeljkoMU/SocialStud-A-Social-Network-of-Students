const express = require('express');
const md5Encrypt = require('md5');
const neo4j = require('../neo4jsConnection');

const loginRouter = express.Router();

loginRouter.post("/register", async (req, res)=>{
    console.log(req.body);
    let username = req.body.username;
    let password = md5Encrypt(req.body.password);

    //check if usernamer exists
    neo4j.run(`
        MATCH (n:USER {username:"${username}"})
        RETURN n
    `)
    .then((users)=>{
        console.log(users);
        if(users.records.length!=0){
            res.status(409).end();
            return;
        }

        neo4j.run(`
            CREATE (n:USER {
                username:"${username}",
                password: "${password}",
                name: "${req.body.name}",
                surname: "${req.body.surname}",
                location: "${req.body.location}",
                faculty: "${req.body.faculty}",
                birthdate: "${req.body.birthdate}",
                year: "${req.body.year}",
                email: "${req.body.email}"
            })
        `)
        .then((results)=>{
            neo4j.run(`
            MATCH
                (a:USER),
                (b:FACULTY)
            WHERE a.username = '${username}' AND b.name = '${req.body.faculty}'
            CREATE (a)-[r:STUDIES_IN]->(b)
            RETURN type(r)
        `)
        .then((results)=>{
            neo4j.run(`
            MATCH
                (a:USER),
                (b:LOCATION)
            WHERE a.username = '${username}' AND b.name = '${req.body.location}'
            CREATE (a)-[r:IS_IN]->(b)
            RETURN type(r)
        `)
        .then((results)=>{
            res.status(200).end();
        })
        .catch(err=>{
            console.log(err);
            res.status(500).end();
        });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).end();
        });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).end();
        });
    });
});

loginRouter.get("/", async (req, res)=>{
    let username = req.query.username;
    let password = md5Encrypt(req.query.password);

    neo4j.run(`
    MATCH (n:USER {username:"${username}"})
    RETURN n
    `)
    .then(userRes=>{
        if(userRes.records.length===0){
            res.status(404).end();
            return;
        }

        passInDB = userRes.records[0]._fields[0].properties.password;
        if(password==passInDB)
            res.status(200).end();
        else res.status(405).end();
    });
});
module.exports = loginRouter;