import { Context } from "../deps.ts";

export const home = async ({ response }: Context) => {
  response.body = await Deno.readTextFile("./index.html");
  response.headers.set("Content-Type", "text/html");
  response.status = 200;
};

export const options = ({ response }: Context) => {
  response.status = 204;
  response.headers.set(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, DELETE",
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Allow-Origin", "*");
};
