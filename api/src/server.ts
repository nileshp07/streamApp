import 'module-alias/register';
import express, {Express} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from '@routes/routes';

const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`server running on port: ${port}`);
});
