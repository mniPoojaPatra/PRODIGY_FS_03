// db.js
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./store.db", (err) => {
  if (err) console.error(err.message);
  console.log("✅ Connected to SQLite database");
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    image TEXT
  )`);

  db.run(`INSERT INTO products (name, description, price, image) VALUES
    ('Coffee Beans', 'Fresh roasted beans', 300, '/images/coffee.jpg'),
    ('Green Tea', 'Organic green tea', 200, '/images/tea.jpg'),
    ('Cookies', 'Handmade butter cookies', 150, '/images/cookies.jpg')
  `);
});

module.exports = db;
