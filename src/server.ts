import express, { type Router } from "express";

// A type defining the properties required to initialize the server.
type ServerProps = {
  port: number;
  routes: Router;
};

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerProps) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
    this.configure();
  }

  getApp() {
    return this.app;
  }

  // Configures the Express application with necessary middleware.
  private configure() {
    // Middleware to parse incoming JSON requests.
    this.app.use(express.json());
    // Middleware to parse URL-encoded data.
    this.app.use(express.urlencoded({ extended: true }));
    // Mount the application routes.
    this.app.use(this.routes);
  }

  // Starts the server.
  public start() {
    return this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
