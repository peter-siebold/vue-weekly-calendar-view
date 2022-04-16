const fs = require('fs');
const express = require('express');
const app = express();

app.get('/stations', (req, res) => {
    fs.readFile('./src/api/stations.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
});

// app.get('/stations/:id', (req, res) => {
//     fs.readFile('./src/api/stations.json', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             const stations = JSON.parse(data);
//             const station = stations.find(station => station.id === req.params.id);
//             if (station) {
//                 res.send(station);
//             } else {
//                 res.status(404).send('Station not found');
//             }
//         }
//     });
// });

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



app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});