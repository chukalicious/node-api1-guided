// import the server and start it

const server = require("./api/server");

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
