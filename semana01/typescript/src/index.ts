import express from 'express';
import { myRoute } from './routes';

const app = express();

app.get('/', myRoute);

app.listen(3333, () => {
    console.log('🐺 Server is running on port 3333');
});