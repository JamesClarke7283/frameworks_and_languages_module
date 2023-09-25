import { Router} from "../deps.ts";
import * as itemController from "../controllers/itemController.ts";

const router = new Router();

router
  .get("/items", itemController.getItems)
  .get("/item/:itemId", itemController.getItem)
  .post("/item", itemController.addItem)
  .delete("/item/:itemId", itemController.deleteItem);

export default router;
