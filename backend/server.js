const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const USERS_JSON = 'users.json';

app.use(cors());
app.use(bodyParser.json());

// Recuperar tots els usuaris
app.get('/users', (req, res) => {
    fs.readFile(USERS_JSON, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading users file');
        }
        res.send(JSON.parse(data));
    });
});

// Guardar usuaris al JSON
app.post('/users', (req, res) => {
    const newUser = req.body;
    fs.readFile(USERS_JSON, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error llegint el json dels usuaris');
        }

        let users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile(USERS_JSON, JSON.stringify(users, null, 2), err => {
            if (err) {
                return res.status(500).send('Error guardant l\'usuari');
            }
            res.send({ message: 'S\'ha registrat l\'usuari nou' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionant a: http://localhost:${PORT}`);
});
