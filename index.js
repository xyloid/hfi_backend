const app = require('./app') // the actual Express application
const http = require('http')

const server = http.createServer(app)

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
