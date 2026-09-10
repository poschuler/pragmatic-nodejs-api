import { config } from "./config/config.js";
import { appRoutes } from "./routes.js";
import { Server } from "./server.js";

async function main() {
  const server = new Server({
    port: config.app.port,
    routes: appRoutes(),
  });

  server.start();
}

main();
