import 'reflect-metadata';
import express ,{Response, Request, NextFunction} from 'express';
import 'express-async-errors';

import routes from './routes';
import cors from 'cors';
import uploadConfig from './config/upload';
import AppError from './Error/AppError';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.json({
            status: 'error',
            message: err.message
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
})

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333!')
});