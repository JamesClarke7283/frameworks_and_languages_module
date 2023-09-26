import { Context } from "../deps.ts";
import * as itemModel from "../models/itemModel.ts";

export const getItems = ({ response }: Context) => {
  response.body = itemModel.getAllItems();
  response.headers.set("Content-Type", "application/json");
  response.headers.set("Access-Control-Allow-Origin", "*");
};

export const getItem = ({ params, response }: Context) => {
  const item = itemModel.getItemById(Number(params.itemId));
  if (item) {
    response.body = item;
  } else {
    response.status = 404;
    response.body = { message: "Item not found." };
  }
  response.headers.set("Content-Type", "application/json");
};

export const addItem = async ({ request, response }: Context) => {
  const body = request.body();
  console.log(body);
  const newItem = await body.value;
  console.log(newItem);
  const item_id = itemModel.addItem(newItem);
  if (item_id) {
    response.status = 201;
    response.body = itemModel.getItemById(item_id);
  } else {
    response.status = 405;
  }
};

export const deleteItem = ({ params, response }: Context) => {
  const delStatus = itemModel.deleteItem(Number(params.itemId));
  if (delStatus) {
    response.status = 204;
  } else {
    response.status = 404;
  }
};
