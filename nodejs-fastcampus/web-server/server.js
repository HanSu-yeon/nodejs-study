const http = require('http');
port = 4000;
const targetObject = {
  a: 'a',
  b: 'b',
};
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/home') {
    req.on('data', data => {
      console.log(data);
      const stringifiedData = data.toString();
      console.log(stringifiedData);
      Object.assign(targetObject, JSON.parse(stringifiedData));
    });
  } else {
    if (req.url == '/home') {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      //end는 문자열을 받음
      res.end(
        JSON.stringify({
          a: 'a',
          b: 'b',
        })
      );
    } else if (req.url == '/about') {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<body>');
      res.write('<h3>about page</h3>');
      res.write('</body>');
      res.write('</html>');
    } else {
      res.statusCode = 404;
      res.end();
    }
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
