import db from "../db/database.ts";

export const getAllItems = () => {
  const items = [...db.query("SELECT * FROM items")];
  return items;
};

export const getItemById = (id: number) => {
  const [item] = [...db.query("SELECT * FROM items WHERE id = ?", [id])];
  return item;
};

export const addItem = (item: any) => {
  db.query(
    "INSERT INTO items (user_id, keywords, description, lat, lon, date_from, date_to) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [item.user_id, item.keywords, item.description, item.lat, item.lon, item.date_from, item.date_to]
  );
};

export const deleteItem = (id: number) => {
  db.query("DELETE FROM items WHERE id = ?", [id]);
};
