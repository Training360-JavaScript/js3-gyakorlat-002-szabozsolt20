const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
// const port = process.argv[2] || 9000;

let server = null;
const sockets = new Set();

const start = (indexFile = 'index.html', port = 9000) => {
  server = http.createServer(function (req, res) {
    // console.log(`${req.method} ${req.url}`);

    if (req.url === '/') {
      return fs.readFile(
        path.join(__dirname, indexFile),
        'utf-8',
        (err, data) => {
          res.setHeader('Content-type', 'text/html');
          res.end(data);
        }
      )
    }

    // parse URL
    const parsedUrl = url.parse(req.url);
    // extract URL path
    let pathname = `.${parsedUrl.pathname}`;
    // based on the URL path, extract the file extension. e.g. .js, .doc, ...
    let ext = path.parse(pathname).ext;
    // maps file extension to MIME typere
    const map = {
      '.ico': 'image/x-icon',
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.wav': 'audio/wav',
      '.mp3': 'audio/mpeg',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword'
    };

    fs.exists(pathname, function (exist) {
      if (!exist) {
        // if the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
      }

      // if is a directory search for index file matching the extension
      if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;
      if (/index$/.test(pathname)) {
        ext = '.html';
        pathname += ext;
      }

      // read file from file system
      fs.readFile(pathname, function (err, data) {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // if the file is found, set Content-type and send data
          res.setHeader('Content-type', map[ext] || 'text/plain');
          res.end(data);
        }
      });
    });


  }).listen(parseInt(port), () => {
    // console.log(`Server listening on port ${port}`);
  }).on('connection', (socket) => {
    sockets.add(socket);

    server.once('close', () => {
      sockets.delete(socket);
    });
  });
};

const stop = () => {
  return new Promise(res => {
    for (const socket of sockets) {
      socket.destroy();
      sockets.delete(socket);
    }

    server.close( res );
  });
};

// start();

module.exports = {
  start,
  stop,
};
