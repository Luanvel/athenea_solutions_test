const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');

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

//Extra: Guardar backup del json a les 00.00h

cron.schedule('* * * * *', () => {
    const today = new Date().toISOString().split('T')[0];
    const backupFile = `users_${today}.json`;
    console.log("Començant a exportar l'arxiu del dia " + today + "...")

    fs.copyFile(USERS_JSON, path.join(__dirname, 'backup', backupFile), () => {
        console.log(`Backup creat: ${backupFile}`);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionant a: http://localhost:${PORT}`);
});
