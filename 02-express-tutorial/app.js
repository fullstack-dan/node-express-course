const { products } = require("./data");

const express = require("express");

const app = express();

app.use(express.static("./public"));

app.listen(3000, () => {
  console.log("server is listening on port 3000...");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    res.status(404).json({ message: "That product was not found." });
  } else {
    res.json(product);
  }
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;

  let filteredProducts = products.filter((product) =>
    product.name.startsWith(search)
  );

  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  res.json(filteredProducts);
});

app.get("/api/v1/products/price/:minPrice/:maxPrice", (req, res) => {
  const minPrice = parseInt(req.params.minPrice);
  const maxPrice = parseInt(req.params.maxPrice);

  const filteredProducts = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  res.json(filteredProducts);
});
