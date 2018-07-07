
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const ctrl = require('./controller');
const app = express();
const PORT = 4000;


app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
.then(database => {
    
    app.set('db', database);
}).catch(err => console.log('Database Connection Error--------------', err));
app.get('/api/inventory', ctrl.readInventory);
app.post('/api/inventory', ctrl.createInventory);
app.put('/api/inventory/:id', ctrl.updateInventory);
app.delete('/api/inventory/:id', ctrl.deleteInventory);



app.listen(PORT, () => console.log('Listening on Port:', PORT));