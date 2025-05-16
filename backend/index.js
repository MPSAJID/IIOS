const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
import { errorHandler, notFound } from "./src/middleware/errorMiddleware.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/lecturer', require('./src/routes/lecturerRoutes'));
app.use('/api/study-programs',require('./src/routes/studyprogramRoutes'));
app.use('/api/online-courses', require('./src/routes/onlinecourseRoutes'));

app.use(notFound);       // 404 handler
app.use(errorHandler);   // General error handler

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});




