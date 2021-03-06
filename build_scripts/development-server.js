const express = require('express');
const path = require('path');
const open = require('open');
const webpack = require('webpack');
const config = require('../webpack.config.dev');

process.env.NODE_ENV = 'development';

const port = 3000;
const app = express();
const compiler = webpack(config);
const { log } = console;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', (req, res) => {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {
      id: 1, firstName: 'Bob', lastName: 'Smith', email: 'bob@gmail.com',
    },
    {
      id: 2, firstName: 'Tammy', lastName: 'Norton', email: 'tnorton@yahoo.com',
    },
    {
      id: 3, firstName: 'Tina', lastName: 'Lee', email: 'lee.tina@hotmail.com',
    },
  ]);
});


app.listen(port, (err) => {
  if (err) {
    log(err);
  } else {
    open(`http://localhost${port}`);
  }
});
