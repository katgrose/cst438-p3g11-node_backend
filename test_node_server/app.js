const http = require("http");
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

// test get users
// userRef.get().then((querySnapshot) => {
//     querySnapshot.forEach(document => {
//         console.log(document.data())
//     })
// })
//
// // test get public plants
// publicPlantRef.get().then((querySnapshot) => {
//     querySnapshot.forEach(document => {
//         console.log(document.data())
//     })
// })
//
// // test get user plants
// userPlantRef.get().then((querySnapshot) => {
//     querySnapshot.forEach(document => {
//         console.log(document.data())
//     })
// })
//
// getting a specific file from the db (.doc() is the key element here)
// userRef.doc('testuser1').get().then((querySnapshot) => {
//         console.log(querySnapshot.data())
// })

<<<<<<< HEAD
//
userRef.get().then((querySnapshot) => {
    querySnapshot.forEach(document => {
        console.log(document.data())
    })
})

// add new user

// send user

// test user


=======
//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
>>>>>>> master

    res.setHeader('Content-Type', 'text/plain');
    if(req.url == '/getUsers') {
        // replace 'testuser1' with data from the request body
        userRef.doc('testuser1').get().then((querySnapshot) => {
            // important to have statusCode and .end() within each route as it's an async task
            res.statusCode = 200;
            res.write(querySnapshot.data().username);
            res.write(querySnapshot.data().password)
            res.end();
        })
    };

    // add new user

    // send user

    // test user

    // login

    // logout

    // delete user

    // add plant to private list

    // add plant to public list

    // delete plant from private list

    // delete plant from public list
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
    console.log(`Server myPlants running at http://${hostname}:${port}/`);
});