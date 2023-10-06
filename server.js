const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, './app/public')));

require('./routes/apiRoutes.js')(app);

require('./routes/htmlRoutes.js')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));