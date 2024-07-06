const express = require('express');
const bodyParser = require('body-parser');

const patients = [
    {
        name: 'Aditya',
        number: '8175826846',
        dob: '29/09/2001',
        city: 'Mirzapur',
        roomNo: '1',
    }
];

const availableBeds = 2;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('home', {
        data: patients
    });
});

app.post('/', (req, res) => {
    const { name, number, dob, city } = req.body;

    if (patients.length < availableBeds) {
        const roomNo = patients.length + 1;

        patients.push({
            name: name,
            number: number,
            dob: dob,
            city: city,
            roomNo: roomNo
        });

        res.render('home', {
            data: patients
        });
    } else {
        res.send('No room available');
    }
});

app.get('/discharge', (req, res) => {
    const name = req.body.name;

    // Filter out the patient to be discharged
    const updatedPatients = patients.filter(patient => patient.name !== name);
    patients.length = 0; // Clear the original array
    Array.prototype.push.apply(patients, updatedPatients); // Push updated patients back

    res.render('home', {
        data: patients
    });
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
});
