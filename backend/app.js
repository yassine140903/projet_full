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
// Security HTTP headers
// app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

// Middleware to allow cross-origin resource sharing for static files
app.use('/public/img/posts', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Allow cross-origin access
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  next();
});
app.use('/public/img/users', (req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Allow cross-origin access
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  next();
});
// Serve static files from the 'public' directory
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting: Limit requests to API
const limiter = rateLimit({
  max: 100,
  windowMs: 5 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in 5 minutes!',
});
app.use('/api', limiter);

// Body parser middleware
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks (cross-site scripting) for HTML injections
// app.use(xss());

// Prevent parameter pollution
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

// Example middleware logging
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
