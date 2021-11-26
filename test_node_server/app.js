const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKeys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://myplants-438p3g11-default-rtdb.firebaseio.com/',
    projectId: 'myplants-438p3g11'
});

const db = admin.firestore();
let userRef = db.collection("User");

userRef.get().then((querySnapshot) => {
    querySnapshot.forEach(document => {
        console.log(document.data())
    })
})

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


//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

    //Set the response HTTP header with HTTP status and Content type
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Connected to myPlants Node Server\n');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
    console.log(`Server myPlants running at http://${hostname}:${port}/`);
});