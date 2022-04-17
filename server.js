const fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();


app.use(cors());
app.options('*', cors());

app.get('/stations', (req, res) => {
    fs.readFile('./src/api/stations.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            setTimeout(() => {
                res.send(data);
            }, 100);
        }
    });
});

app.get('/stations/:stationId/bookings/:bookingId', (req, res) => {
    fs.readFile('./src/api/stations.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const stations = JSON.parse(data);
            const station = stations.find(station => station.id === req.params.stationId);
            if (station) {
                const bookings = station.bookings.filter(booking => booking.id === req.params.bookingId);
                if(bookings.length > 0) {
                    res.send(bookings);
                } else {
                    res.status(404).send('No bookings found');
                }   
            } else {
                res.status(404).send('Station not found');
            }
        }
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});