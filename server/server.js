
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const pollRouter = require('./routes/poll.router');
const ideaRouter = require('./routes/idea.router');
const debugRouter = require('./routes/debug.router');
const voteRouter = require('./routes/vote.router');
const textRouter = require('./routes/text.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/poll', pollRouter);
app.use('/api/idea', ideaRouter);
app.use('/debug', debugRouter);
app.use('/api/vote',voteRouter);
app.use('/api/text',textRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
