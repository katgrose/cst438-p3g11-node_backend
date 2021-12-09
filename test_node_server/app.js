const http = require("http");
const url = require("url");
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKeys.json");

const hostname = '127.0.0.1';
const port = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://myplants-438p3g11-default-rtdb.firebaseio.com/',
    projectId: 'myplants-438p3g11'
});

// database collection paths
const db = admin.firestore();
let userRef = db.collection("User");
let publicPlantRef = db.collection("public_plants")
let userPlantRef = db.collection("user_plants")

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url,true).query;
    let apiCall = req.url.split("?");

    res.setHeader('Content-Type', 'text/plain');
    if(apiCall[0] === '/') {
        res.end("myPlants server running!");
    }

    // login
    if(apiCall[0] === '/login') {
        userRef.doc(queryObject.username.toString()).get().then((querySnapshot) => {
            res.statusCode = 200;
            console.log(querySnapshot.data());
            res.write(querySnapshot.data().username + " ");
            res.write(querySnapshot.data().password)
            res.end();
        }).catch((error) => {
            res.write("");
            res.end();
        })
    }

    //add new user
    if(apiCall[0] === '/addNewUser') {
        userRef.doc(queryObject.username.toString()).set({
            username:queryObject.username,
            password:queryObject.password
        }).then(()=> {
            res.write("New user added");
        }).catch((error)=> {
            res.write("Error adding user");
        })
        res.end();
    }

    // delete user
    if(apiCall[0] === '/deleteUser') {
        userPlantRef.doc(queryObject.username.toString()).delete().then(()=> {
            res.write("user deleted.");
        }).catch((error) => {
            res.write("Cannot delete user");
        });
    }

    // get private plants
    if(apiCall[0] === '/getMyPlants') {
        userPlantRef.get().then((querySnapshot) => {
            querySnapshot.forEach(document => {
                res.statusCode = 200;
                res.write(document.data().plantName + ";" +
                                document.data().username + ";" +
                                document.data().description + ";" +
                                document.data().notes + ";" +
                                document.data().waterCycle + ";" +
                                document.data().fertilizeCycle + "/");
            })
            res.end();
        })
    }

    // add or update plant in private list
    if(apiCall[0] === '/addMyPlants') {
        userPlantRef.doc(queryObject.plantName.toString()).set({
            description:queryObject.description,
            plantName:queryObject.plantName,
            username:queryObject.username,
            notes:queryObject.notes,
            fertilizeCycle:queryObject.fertilizeCycle,
            waterCycle:queryObject.waterCycle
        }).then(()=> {
            res.write("Private plant added!");
        }).catch((error)=> {
            res.write("Error adding plant.");
        })
        res.end();
    }

    // delete plant from private list
    if(apiCall[0] === '/deleteMyPlants') {
        userPlantRef.doc(queryObject.plantName.toString()).delete().then(()=> {
            res.write("Plant successfully deleted.");
        }).catch((error) => {
            res.write("Problem deleting plant.");
        });
    }

    // get public plants
    if(apiCall[0] === '/getPlants') {
        publicPlantRef.get().then((querySnapshot) => {
            querySnapshot.forEach(document => {
                res.statusCode = 200;
                res.write(document.data().plantName + ";" +
                                document.data().plantID + ';' +
                                document.data().username + ";" +
                                document.data().description + '/');
            })
            res.end();
        })
    }

    // add or update plant in public list
    if(apiCall[0] === '/addPlants') {
        publicPlantRef.doc(queryObject.plantName.toString()).set({
            description:queryObject.description,
            plantID:queryObject.plantID,
            plantName:queryObject.plantName,
            username:queryObject.username
        }).then(()=> {
            res.write("Plant added!");
        }).catch((error)=> {
            res.write("Error adding plant.");
        })
        res.end();
    }

    // delete plant from public list
    if(apiCall[0] === '/deletePlants') {
        publicPlantRef.doc(queryObject.plantName.toString()).delete().then(()=> {
            res.write("Plant successfully deleted.");
        }).catch((error) => {
            res.write("Problem deleting plant.");
        });
    }
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
    console.log(`Server myPlants running at http://${hostname}:${port}/`);
});