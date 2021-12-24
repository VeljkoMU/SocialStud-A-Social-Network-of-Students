const express = require('express');
const neo4j = require('../neo4jsConnection');
const profileRouter = express.Router();
const md5Encrypt = require('md5');

profileRouter.get("/profile", async (req, res)=>{
    let username = req.query.username;
    let password = md5Encrypt(req.query.password);

    await neo4j.run(`
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
            console.log("Good!");
        else res.status(405).end();
    });

    let profileUsername = req.query.prof;

    neo4j.run(`
        MATCH (n:USER {username: "${profileUsername}"})
        RETURN n
    `)
    .then(results=>{
        res.json(results.records[0]._fields[0].properties).end();
        return;
    })
    .catch(err=>{
        console.log(err);
        res.status(500).end();
    });
    //Izbaci password iz rezulata
    //Poboljsaj autorizaciju
});

module.exports = profileRouter;