import { Context } from "../deps.ts";
import * as itemModel from "../models/itemModel.ts";

export const getItems = ({ response }: Context) => {
  response.body = itemModel.getAllItems();
};

export const getItem = ({ params, response }: Context) => {
  const item = itemModel.getItemById(Number(params.itemId));
  if (item) {
    response.body = item;
  } else {
    response.status = 404;
    response.body = { message: "Item not found." };
  }
};

export const addItem = async ({ request, response }: Context) => {
  const body = request.body();
  console.log(body);
  const newItem = await body.value;
  console.log(newItem);
  const item_id = itemModel.addItem(newItem);
  response.status = 201;
  response.body = itemModel.getItemById(item_id);
};

export const deleteItem = ({ params, response }: Context) => {
  itemModel.deleteItem(Number(params.itemId));
  response.status = 204;
};
