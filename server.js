const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// routing connections for server use
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// formatting via express methods
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// use of routing connections by server
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// server start
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
