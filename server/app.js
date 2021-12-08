const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

var items = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    },
];

// Here we are configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    var status = JSON.stringify({status: 'ok'});
    res.status(200).send(JSON.parse(status));
});

app.get('/api/TodoItems', (req, res) => {
    var todoItems = JSON.stringify(items);
    res.status(200).send(JSON.parse(todoItems));
});

app.get('/api/TodoItems/:number', (req, res) => {
    for(let i = 0; i < items.length; i++) {
        if(items[i]['todoItemId'] == Number(req.params.number)) {
            res.status(200).send(items[i]);
        }
    }
});

app.post('/api/TodoItems', (req, res) => {
    let present = false;

    for(let i = 0; i < items.length; i++) {
        if(items[i]['todoItemId'] == req.body['todoItemId']) {
            present = true;
            items[i] = req.body;
            res.status(201).send(req.body);
        }
    }

    if(!present) {
        items.push(req.body);
        res.status(201).send(req.body);
    }
});

app.delete('/api/TodoItems/:number', (req, res) => {
    for(let i = 0; i < items.length; i++) {
        if(items[i]['todoItemId'] == Number(req.params.number)) {
            let deletedItem = items.splice(i,1);
            res.status(200).send(deletedItem[0]);
        }
    }
});




module.exports = app;
