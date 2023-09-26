import { Router } from "../deps.ts";
import * as itemController from "../controllers/itemController.ts";
import * as mainController from "../controllers/mainController.ts";

const router = new Router();

router
  .get("/", mainController.home)
  .options("/", mainController.options)
  .options("/items", mainController.options)
  .get("/items", itemController.getItems)
  .get("/item/:itemId", itemController.getItem)
  .post("/item", itemController.addItem)
  .delete("/item/:itemId", itemController.deleteItem);
export default router;
