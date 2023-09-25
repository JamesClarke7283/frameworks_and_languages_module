import { Application } from "./src/deps.ts";
import itemRoutes from "./src/routes/itemRoutes.ts";

const app = new Application();

app.use(itemRoutes.routes());
app.use(itemRoutes.allowedMethods());

console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
