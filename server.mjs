import express from 'express';
import mongoose from 'mongoose';
import { MongoURI } from './config/db.mjs';
import productRoutes from './routes/product.route.mjs';

const app = express();
const PORT = process.env.PORT || 5000;
const localhost = '127.0.0.1';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	console.log(req.url, req.method);
	res.send('CRUD API with Express and MongoDB');
});

app.use(
	'/api/v1/products',
	(req, res, next) => {
		console.log(req.url, req.method);
		next();
	},
	productRoutes
);

mongoose
	.connect(MongoURI)
	.then(() => {
		console.log('Connected to Database');
		app.listen(PORT, localhost, () =>
			console.log(`Listening to ${localhost}:${PORT}`)
		);
	})
	.catch(() => console.log('Connection failed'));
