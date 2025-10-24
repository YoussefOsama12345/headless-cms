const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const { connectDB, syncDB } = require('./config/database');
const env = require('./config/env');
const appConstant = require('./constants/app.constant');
const routes = require('./routes');
const { globalErrorHandler } = require('./middleware/error.middleware');

// Import all models
require('./models');

// Import passport configuration
require('./config/passport');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Connect and sync database
connectDB().then(() => {
  syncDB(false);
});

app.use('/api/v1', routes);

// Global error handler (must be last)
app.use(globalErrorHandler);

app.listen(env.PORT, () => {
  console.log(
    `${appConstant.name} v${appConstant.version} is running on port ${env.PORT}`,
  );
  console.log(`Environment: ${env.NODE_ENV}`);
});


app.get('/', (req, res) => {
  res.json({
    name: appConstant.name,
    version: appConstant.version,
    tagline: appConstant.tagline,
    description: appConstant.description,
    features: appConstant.features,
    benefits: appConstant.benefits,
    author: appConstant.author,
  });
});
