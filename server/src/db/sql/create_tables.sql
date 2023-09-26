CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  description TEXT,
  lat REAL,
  lon REAL,
  date_from TEXT NOT NULL,
  date_to TEXT NULL
);

CREATE TABLE IF NOT EXISTS keywords (
  keyword_id INTEGER PRIMARY KEY AUTOINCREMENT,
  keyword TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS keywords_list (
  item_id INTEGER,
  keyword_id INTEGER,
  PRIMARY KEY (item_id, keyword_id),
  FOREIGN KEY (item_id) REFERENCES items (id),
  FOREIGN KEY (keyword_id) REFERENCES keywords (keyword_id)
);