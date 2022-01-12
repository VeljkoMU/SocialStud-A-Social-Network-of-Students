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

profileRouter.get("/contacts", async (req, res)=>{
    username = req.query.username;
    password = md5Encrypt(req.query.password);
    profile = req.query.prof;

    authenticate(username, password)
    .then(()=>{
        neo4j.run(`
            MATCH (n:USER {username: "${profile}"})-[r:CONTACT]->(m:USER)
            RETURN m
        `)
        .then((results)=>{
            let contacts = results.records[0]._fields;
            res.json(contacts).end();
            return;
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).end();
            return;
        });
    })
    .catch(()=>{
        res.status(405).end();
    })
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

//Vraca 5 random profila
profileRouter.get('/recomended', async(req, res)=>{
    let username = req.query.username;
    let password = md5Encrypt(req.query.password);

    authenticate(username, password)
    .then(()=>{
        neo4j.run(`    
        CALL {MATCH (n:USER{username:"${username}"})-[:IS_IN]->(l:LOCATION)<-[:IS_IN]-(u:USER) return u union match(n:USER{username:"${username}"})-[:HAS_INTEREST]->(i:INTEREST)<-[:HAS_INTEREST]-(u:USER) return u union match (n:USER {username:"${username}"})-[:STUDIES_IN]->(f:FACULTY)<-[:STUDIES_IN]-(u:USER) return u} return u, rand() as r order by r limit 5
        `)
        .then((result)=>{
            let recomended_profiles =[]
            result.records.forEach(record=>recomended_profiles.push(record._fields[0].properties));
            console.log(recomended_profiles);
            res.json(recomended_profiles).end(); //JSON.stringify
        })
        .catch(err=>{
            console.log(err);
            res.status(500).end();
        })
    })

})

profileRouter.post('/addInterest', async(req,res)=>{
    //logged user
    let username = req.body.user;
    // let username =  req.body.username;
    // let password =  req.body.password;

    let interest = req.body.interest;

    const interest_query = await neo4j.run(`MATCH(n :INTEREST {name:'${interest}'}) return n`)
    const interest_exist = interest_query.records.length;
    console.log(interest_exist);

    if(interest_exist){
        //if user hasn't relationship
        const user_relationsip = await neo4j.run(`MATCH(n:INTEREST {name:'${interest}'}) <- [r:HAS_INTEREST] - (x:USER {username:'${username}'}) return n`)
        const user_relationship_exists = user_relationsip.records.length;

        console.log("relationship:" + user_relationship_exists);
        if(!user_relationship_exists){

            await neo4j.run(`MATCH (a:USER),(b:INTEREST) WHERE a.username = '${username}' AND b.name = '${interest}' CREATE (a)-[r:HAS_INTEREST]->(b) RETURN type(r)`), async (err, result)=>{                
            
                console.log(`Username: ${username} has ${interest}`);
                if(err){
                    console.log(err);
                    res.status(500).end();
                    return;
                }
            }
            console.log("end");
        }
        else{
            console.log('The user: ' + username + ' already has interest:' + interest);
            return;
            
        }
    }
    else{
        //create node(interest) and connect it with a username
       await neo4j.run(`CREATE (n:INTEREST {name:"${interest}"})`)
       await neo4j.run(`MATCH (a:USER),(b:INTEREST) WHERE a.username = '${username}' AND b.name = '${interest}' CREATE (a)-[r:HAS_INTEREST]->(b) RETURN type(r)`)

   }
    

});

profileRouter.get('/interestList', async(req,res)=>{
    let username = req.query.username;
    console.log("Evo me!");
        neo4j.run(`    
            MATCH (n:USER{username:'${username}'})-[:HAS_INTEREST]->(i:INTEREST) return i
        `)
        .then((result)=>{
            let profile_interests =[];
            result.records.forEach(record=>profile_interests.push(record._fields[0].properties));
            console.log(profile_interests);
            res.json(profile_interests).end(); //JSON.stringify
        })
        .catch(err=>{
            console.log(err);
            res.status(500).end();
        })
});

profileRouter.get('/search/location', async(req,res)=>{
    let username = req.query.username;
    let password = md5Encrypt(req.query.password);
	let location= req.query.location;

    authenticate(username, password)
    .then(()=>{
        neo4j.run(`    
            MATCH (l:LOCATION{name:'${location}'})<-[:IS_IN]-(u:USER) 
			WHERE u.username<>{username:'${username}'} return u
        `)
        .then((result)=>{
            let profile_locations =[]
            result.records.forEach(record=>profile_locations.push(record._fields[0].properties));
            console.log(profile_locations);
            res.json(profile_locations).end(); //JSON.stringify
        })
        .catch(err=>{
            console.log(err);

            res.status(500).end();
        })
    })
})
profileRouter.get('/search/interest', async(req,res)=>{
    let username = req.query.username;
    let password = md5Encrypt(req.query.password);
	let interest =req.query.interest;

    authenticate(username, password)
    .then(()=>{
        neo4j.run(`    
            MATCH (i:INTEREST{name:'${interest}'})<-[:HAS_INTEREST]-(u:USER)
			WHERE u.username<>{username:'${username}'} return u
        `)
        .then((result)=>{
            let profile_interests =[];
            result.records.forEach(record=>profile_interests.push(record._fields[0].properties));
            console.log(profile_interests);
            res.json(profile_interests).end(); //JSON.stringify
        })
        .catch(err=>{
            console.log(err);
            res.status(500).end();
        })
    })
})
profileRouter.get('/search/faculty', async(req, res)=>{
    let username = req.query.username;
    let password = md5Encrypt(req.query.password);
	let faculty=req.query.faculty;

    authenticate(username, password)
    .then(()=>{
        neo4j.run(`    
            MATCH (f:FACULTY{name:'${faculty}'})<-[:STUDIES_IN]-(u:USER) 
			WHERE u.username<>{username:'${username}'} return u
        `)
        .then((result)=>{
            let profile_faculties =[]
            result.records.forEach(record=>profile_faculties.push(record._fields[0].properties));
            console.log(profile_faculties);
            res.json(profile_faculties).end(); //JSON.stringify
        })
        .catch(err=>{
            console.log(err);
            res.status(500).end();
        })
    })

})



module.exports = profileRouter;