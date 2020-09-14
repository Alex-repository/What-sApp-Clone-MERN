//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors'
//app config

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
	appId: '1071515',
	key: '86e691ef0614fece6b8c',
	secret: '1e2e1896c4352825210e',
	cluster: 'mt1',
	encrypted: true
});

//middleware

app.use(express.json());
app.use(cors());
// app.use((req,res,next)=>{
//     res.setHeader("Acess-Control-Allow-Origin",'*');
//     res.setHeader("Acess-Control-Allow-Headers",'*');
//     next();
// })

//db config
const conection_url =
	'mongodb+srv://admin:elsuperlex1@cluster0.fmqox.gcp.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(conection_url, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
	console.log('DB conected');
	const msgCollection = db.collection('messagecontents');
	const changeStream = msgCollection.watch();

	changeStream.on('change', (change) => {
		console.log(change);
		if (change.operationType === 'insert') {
			const messageDetails = change.fullDocument;
			pusher.trigger('messages', 'inserted', {
				name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.rreceived,
			});
		} else {
			console.log('error triggering pusher');
		}
	});
});

//api routes

app.get('/', (req, res) => res.status(200).send('hello world'));
app.get('/api/messages/sync', (req, res) => {
	Messages.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.post('/api/messages/new', (req, res) => {
	const dbMessage = req.body;

	Messages.create(dbMessage, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

//listener

app.listen(port, () => console.log(`listening on localhost:${port}`));
