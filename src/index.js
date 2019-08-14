'use strict';

// Require index.html so it gets copied to dist
require('./index.html');

const {Elm} = require('./Main.elm');

Elm.Main.init({
  node: document.getElementById('main')
});