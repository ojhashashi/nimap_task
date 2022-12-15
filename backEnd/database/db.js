const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/nimap_task');
}

connect()
    .then((res) => {
        console.log('Database Connected')
    })
    .catch((err) => {
        console.log(err);
        return;
    })
