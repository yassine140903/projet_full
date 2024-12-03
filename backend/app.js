const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();

// 1) MIDDLEWARES
//security http headers
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:4200' // Angular default dev port
}));
//
// hedhi solution mt3 error l images
const path = require('path');

// Middleware to allow cross-origin resource sharing for static files
app.use('/public', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Allow cross-origin access
  next();
});

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));


// developpement  logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// limit request from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 5 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an 5 min!',
});
app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(express.json());

// serving static files
// app.use(express.static(`/public`));

// data sanitization against nosql query injection
app.use(mongoSanitize());
// data sanitization against xss attacks (cross site scripting) fot html injections
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'title',
      'price',
      'category',
      'createdAt',
      'createdBy',
      'location',
    ],
  })
);

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

// 3) ROUTES
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
