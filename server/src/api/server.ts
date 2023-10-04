import express from "express";
import morgan from "morgan";
import cors from "cors";

export const app: express.Application = express();

// Import routers from here
// import route from "path";


// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('<h1>API WORKING!</h1>');
});


// app.use('route/to/api', importedRoute)


export default app;
