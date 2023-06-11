const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Product model
const Product = {
  create: (name, price, callback) => {
    // Insert product into the database
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    connection.query(query, [name, price], (err, results) => {
      if (err) {
        console.error('Error creating product:', err);
        callback(err, null);
        return;
      }
      callback(null, results.insertId);
    });
  },

  update: (productId, name, price, callback) => {
    // Update product in the database
    const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    connection.query(query, [name, price, productId], (err, results) => {
      if (err) {
        console.error('Error updating product:', err);
        callback(err, null);
        return;
      }
      callback(null, results.affectedRows > 0);
    });
  },

  delete: (productId, callback) => {
    // Delete product from the database
    const query = 'DELETE FROM products WHERE id = ?';
    connection.query(query, [productId], (err, results) => {
      if (err) {
        console.error('Error deleting product:', err);
        callback(err, null);
        return;
      }
      callback(null, results.affectedRows > 0);
    });
  },


    getAll: (callback) => {
        // Retrieve all products from the database
        const query = 'SELECT * FROM products';
        connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving products:', err);
            callback(err, null);
            return;
        }
        callback(null, results);
        });
    },

    purchase: (productId, callback) => {
        // Perform the purchase logic here
        // For example, update the product status to "purchased" in the database

        // Update product status in the database
        const query = 'UPDATE products SET status = "purchased" WHERE id = ?';
        connection.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error purchasing product:', err);
            callback(err, null);
            return;
        }
        callback(null, results.affectedRows > 0);
        });
    },
};

module.exports = Product;

   