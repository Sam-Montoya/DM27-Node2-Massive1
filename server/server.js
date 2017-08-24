//npm install body-parser cors express massive

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const massive = require('massive');

app.use(bodyParser.json());
app.use(cors());


massive('postgres://postgres:@localhost/class-demo').then(DB => {
    app.set('DB', DB);

    //Initialize Database with Seed File
    app.get('DB').init.seed_file()
    .catch(err => console.log(err));
});

app.get('/api/getAllFromTest', (request, response) => {
    request.app.get('DB').getAllFromTest().then(data => {
        response.status(200).send(data);
    });
});

app.post('/api/postData', (request, response) => {
    request.app.get('DB').postData(request.body.name).then(data => {
        response.status(200).send('Name has been added.');
    });
});

app.post('/api/newUser', (request, response) => {
    let { name, age, country } = request.body;
    request.app.get('DB').addUser([name, age, country]).then(data => {
        response.status(200).send(name + ' info has been added!');
    });
});

app.get('/api/users', (request, response) => {
    request.app.get('DB').getAllUsers().then(data => {
        if(request.query.name){
            user = data.filter(e => {
                return e.name === request.query.name;
            });
        }
        if(request.query.age){
            user = data.filter(e => {
                return e.age === +request.query.age;
            });
        }
        response.status(200).send(user);
    })
});

app.delete('/api/deleteUser/:id', (request, response) => {
    console.log(request.params.id);
    request.app.get('DB').deleteUser(request.params.id).then(data => {
        response.status(200).send(request.params.id + ' has been deleted.');
    });
});

app.listen(3030, () => console.log('Im listening on port 3030'));