import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import { Router } from './routes/index';

const app = express();
app.use(json());

app.use(Router);

mongoose.connect('mongodb://localhost:27017/node-interview', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('conectado a base de datos');
});

app.listen(3000, () => {
    console.log('app running in port 3000');
});