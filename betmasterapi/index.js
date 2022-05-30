var http = require('http');
const app = require('./app');

var port = process.env.PORT || '5300';
app.set('port', port);


var server = http.createServer(app);
server.listen(port);

/* //tbm é uma opcao
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/

