const app = require('./app');

//ide kerülhet:
// database config
//error handling stuff
//env variables

const port = 9001;
app.listen(port, (_) => console.log(`http://127.0.0.1:${port}`));
