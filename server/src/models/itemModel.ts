import db from "../db/database.ts";

// Retrieve all items along with their keywords
export const getAllItems = () => {
  const itemRows = [...db.query("SELECT * FROM items")];
  const items = itemRows.map(([id, user_id, description, lat, lon]) => {
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
    return { id, user_id, description, lat, lon, keywords };
  });
  return items;
};

// Retrieve a single item by its ID along with its keywords
export const getItemById = (id: number) => {
  const [itemRow] = [...db.query("SELECT * FROM items WHERE id = ?", [id])];
  if (itemRow) {
    const [id, user_id, description, lat, lon] = itemRow;
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
    return { id, user_id, description, lat, lon, keywords };
  }
  return null;
};

export const addItem = (item: any) => {
  // Insert item into 'items' table
  db.query(
    "INSERT INTO items (user_id, description, lat, lon, date_from) VALUES (?, ?, ?, ?, ?)",
    [
      item.user_id,
      item.description,
      item.lat,
      item.lon,
      new Date().toISOString(),
    ],
  );

  // Get the newly inserted item's ID and cast to number
  const itemId = db.lastInsertRowId as number;

  // Insert keywords into 'keywords' table and link in 'keywords_list'
  for (const keyword of item.keywords) {
    let keywordId: number;

    // Check if keyword already exists
    const existingKeywords = [...db.query(
      "SELECT keyword_id FROM keywords WHERE keyword = ?",
      [keyword],
    )];
    if (existingKeywords.length > 0) {
      keywordId = existingKeywords[0][0] as number; // Explicitly cast to number
    } else {
      // Insert new keyword
      db.query("INSERT INTO keywords (keyword) VALUES (?)", [keyword]);
      keywordId = db.lastInsertRowId as number; // Explicitly cast to number
    }

    // Insert into 'keywords_list' table
    db.query("INSERT INTO keywords_list (item_id, keyword_id) VALUES (?, ?)", [
      itemId,
      keywordId,
    ]);
  }
  return itemId;
};

export const deleteItem = (id: number) => {
  db.query("DELETE FROM items WHERE id = ?", [id]);
};
