import db from "../db/database.ts";

// Retrieve all items along with their keywords
export const getAllItems = () => {
  const itemRows = [...db.query("SELECT * FROM items;")];
  console.log("Items Rows:",itemRows);
  const items = itemRows.map(
    ([id, user_id, description, image, lat, lon, date_from]) => {
      console.log("Item getAllItems():",id, user_id, description, image, lat, lon, date_from);
      const keywordRows = [...db.query(
        `
      SELECT k.keyword 
      FROM keywords_list kl 
      JOIN keywords k ON kl.keyword_id = k.keyword_id 
      WHERE kl.item_id = ?
    `,
        [id],
      )];
      const keywords = keywordRows.map(([keyword]) => keyword);
      return { id, user_id, description, image, lat, lon, keywords, date_from};
    },
  );
  return items;
};

// Retrieve a single item by its ID along with its keywords
export const getItemById = (id: number) => {
  const [itemRow] = [...db.query("SELECT * FROM items WHERE id = ?", [id])];
  if (itemRow) {
    const [id, user_id, description, image, lat, lon, date_from] = itemRow;
    const keywordRows = [...db.query(
      `
      SELECT k.keyword 
      FROM keywords_list kl 
      JOIN keywords k ON kl.keyword_id = k.keyword_id 
      WHERE kl.item_id = ?
    `,
      [id],
    )];
    const keywords = keywordRows.map(([keyword]) => keyword);
    return { id, user_id, description, image, lat, lon, keywords, date_from };
  }
  return null;
};

export const addItem = (item: any) => {
  // Validate required fields
  const requiredFields = ["user_id", "description", "lat", "lon", "keywords"];
  for (const field of requiredFields) {
    if (!item.hasOwnProperty(field)) {
      return false;
    }
  }

  // Proceed with adding the item
  db.query(
    "INSERT INTO items (user_id, description, lat, lon, date_from, image) VALUES (?, ?, ?, ?, ?, ?)",
    [
      item.user_id,
      item.description,
      item.lat,
      item.lon,
      new Date().toISOString(),
      item.image,
    ],
  );

  const itemId = db.lastInsertRowId as number; // Cast to number

  for (const keyword of item.keywords) {
    let keywordId: number;

    const existingKeywords = [
      ...db.query("SELECT keyword_id FROM keywords WHERE keyword = ?", [
        keyword,
      ]),
    ];

    if (existingKeywords.length > 0) {
      keywordId = existingKeywords[0][0] as number;
    } else {
      db.query("INSERT INTO keywords (keyword) VALUES (?)", [keyword]);
      keywordId = db.lastInsertRowId as number;
    }

    db.query("INSERT INTO keywords_list (item_id, keyword_id) VALUES (?, ?)", [
      itemId,
      keywordId,
    ]);
  }
  return itemId;
};

export const deleteItem = (id: number) => {
  // Query to check if the item with the given ID exists
  const [existingItem] = [
    ...db.query("SELECT id FROM items WHERE id = ?", [id]),
  ];

  // If the item exists, proceed with deletion
  if (existingItem) {
    // First, delete the associated records from the 'keywords_list' table
    db.query("DELETE FROM keywords_list WHERE item_id = ?", [id]);

    // Then delete the item itself from the 'items' table
    db.query("DELETE FROM items WHERE id = ?", [id]);
    return true;
  }

  // If the item doesn't exist, return false
  return false;
};
