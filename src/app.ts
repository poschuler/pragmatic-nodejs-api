import { config } from "./config/config";
import { appRoutes } from "./routes";
import { Server } from "./server";

async function main() {
  const server = new Server({
    port: config.app.port,
    routes: appRoutes(),
  });

  server.start();
}

main();
