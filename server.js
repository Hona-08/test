const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const Product = require('./models/product');

const app = express();
app.use(bodyParser.json());

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


// Serve static assets (CSS, JavaScript, etc.)
app.use(express.static('static'));

// // Set up a route to serve the HTML file
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/static/index.html');
// });


// User registration API
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  // Perform basic validation
  if (!username || !email || !password) {
    res.status(400).json({ error: 'Please provide username, email, and password' });
    return;
  }

  // Insert user into the database
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'Failed to register user' });
      return;
    }

    // User registration successful
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Admin registration API
app.post('/api/admin/register', (req, res) => {
  const { username, email, password } = req.body;

  // Perform basic validation
  if (!username || !email || !password) {
    res.status(400).json({ error: 'Please provide username, email, and password' });
    return;
  }

  // Insert admin into the database
  const query = 'INSERT INTO admins (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Error registering admin:', err);
      res.status(500).json({ error: 'Failed to register admin' });
      return;
    }

    // Admin registration successful
    res.status(200).json({ message: 'Admin registered successfully' });
  });
});

// Admin login API
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Perform basic validation
  if (!username || !password) {
    res.status(400).json({ error: 'Please provide username and password' });
    return;
  }

  // Check if admin credentials are valid
  const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error logging in admin:', err);
      res.status(500).json({ error: 'Failed to login admin' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    // Admin login successful
    res.status(200).json({ message: 'Admin login successful' });
  });
});

// User login API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

 // Perform basic validation
 if (!email || !password) {
  res.status(400).json({ error: 'Please provide email and password' });
  return;
}

// Check if user credentials are valid
const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
connection.query(query, [email, password], (err, results) => {
  if (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Failed to login user' });
    return;
  }

  if (results.length === 0) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  // User login successful
  res.status(200).json({ message: 'User login successful' });
});
});

// Start the server
const port = 3000;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

//Product section
// Admin creates a product
app.post('/api/admin/products', (req, res) => {
  const { name, price } = req.body;

  // Perform basic validation
  if (!name || !price) {
    res.status(400).json({ error: 'Please provide name and price for the product' });
    return;
  }

  // Create product using the Product model
  Product.create(name, price, (err, productId) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create product' });
      return;
    }

    // Product creation successful
    res.status(200).json({ message: 'Product created successfully', productId });
  });
});

// Admin edits a product
app.put('/api/admin/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const { name, price } = req.body;

  // Perform basic validation
  if (!name || !price) {
    res.status(400).json({ error: 'Please provide name and price for the product' });
    return;
  }

  // Update product using the Product model
  Product.update(productId, name, price, (err, success) => {
    if (err) {
      res.status(500).json({ error: 'Failed to edit product' });
      return;
    }

    if (!success) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Product editing successful
    res.status(200).json({ message: 'Product edited successfully' });
  });
});

// Admin deletes a product
app.delete('/api/admin/products/:productId', (req, res) => {
  const productId = req.params.productId;

  // Delete product using the Product model
  Product.delete(productId, (err, success) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete product' });
      return;
    }

    if (!success) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Product deletion successful
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});

// Admin gets all products
app.get('/api/products', (req, res) => {
  // Retrieve all products using the Product model
  Product.getAll((err, products) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve products' });
      return;
    }

    // Return the list of products
    res.status(200).json({ products });
  });
});

// Purchase a product
app.post('/api/products/:productId/purchase', (req, res) => {
  const productId = req.params.productId;

  // Perform any necessary validation or authorization checks here

  // Purchase the product using the Product model
  Product.purchase(productId, (err, success) => {
    if (err) {
      res.status(500).json({ error: 'Failed to purchase product' });
      return;
    }

    if (!success) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    // Product purchase successful
    res.status(200).json({ message: 'Product purchased successfully' });
  });
});


 
