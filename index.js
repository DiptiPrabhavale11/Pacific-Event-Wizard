const app = require("./app"); // the actual Express application
const http = require("http");
const config = require("./utils/config");

const server = http.createServer(app);

server.listen(config.PORT, () => {
    console.info(`Server running on port ${config.PORT}`);
});
