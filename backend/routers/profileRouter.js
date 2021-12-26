const express = require('express');
const neo4j = require('../neo4jsConnection');
const profileRouter = express.Router();
const md5Encrypt = require('md5');
const { auth } = require('neo4j-driver-core');

profileRouter.get("/profile", async (req, res)=>{
    let username = req.query.username;
    let password = md5Encrypt(req.query.password);

    let profileUsername = req.query.prof;

    authenticate(username, password)
    .then(()=>{
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
    })
    .catch(()=>{
        res.status(405).end();
    });
  
    //Izbaci password iz rezulata
});

profileRouter.post("/request", async (req, res)=>{
    let username = req.body.sourceUser.username;
    let password = md5Encrypt(req.body.sourceUser.password);
    let destUsername = req.body.destUser.username;

    authenticate(username, password)
    .then(()=>{
        neo4j.run(`
            MATCH (n:USER {username: "${username}"}), (m:USER {username: "${destUsername}"})
            CREATE (n)-[r:REQUEST]->(m)
        `)
        .then(()=>{
            res.status(200).end();
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).end();
        })
    })
    .catch(()=>{
        res.status(405).end();
    });
});

profileRouter.get("/request", async (req, res)=>{
    let username = req.query.username;
    let password = md5Encrypt(req.query.password);

    authenticate(username, password)
    .then(()=>{
        neo4j.run(`
            MATCH (n:USER {username: "${username}"})<-[r:REQUEST]-(m:USER)
            RETURN m
        `)
        .then((results)=>{
            res.json(results.records[0]._fields).end();
        })
        .catch(err=>{
            console.log(err);
            res.status(500).end();
        });
    })
    .catch(()=>{
        res.status(405).end();
    });
});

profileRouter.put("/accept", async (req, res)=>{
    let username = req.body.destUser.username;
    let password = md5Encrypt(req.body.destUser.password);
    let srcUsername = req.body.srcUser.username;

    authenticate(username, password)
    .then(()=>{
        neo4j.run(`
            MATCH (n:USER {username: "${srcUsername}"})-[r:REQUEST]->(m:USER {username: "${username}"})
            detach delete r
        `)
        .then((results)=>{
            neo4j.run(`
                MATCH (n:USER {username: "${srcUsername}"}), (m:USER {username: "${username}"})
                CREATE (n)-[r:CONTACT]->(m)
            `).then((resultss)=>{
                neo4j.run(`
                MATCH (n:USER {username: "${srcUsername}"}), (m:USER {username: "${username}"})
                CREATE (n)<-[r:CONTACT]-(m)
                `)
                .then(resultssss=>{
                    res.status(200).end();
                    return;
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).end();
                    return;
                });
            })
            .catch(err=>{
                console.log(err);
                res.status(500).end();
                return;
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).end();
            return;
        });
    })
    .catch(()=>res.status(405).end());
});
async function authenticate(username, password){
    return new Promise(async (res, rej)=>{
    await neo4j.run(`MATCH (n:USER {username:"${username}"})
    RETURN n
    `).then(userRes=>{
        if(userRes.records.length===0){
            rej();
            return;
        }

        passInDB = userRes.records[0]._fields[0].properties.password;
        if(password==passInDB)
            res();
        else rej();
    });

});
}

module.exports = profileRouter;