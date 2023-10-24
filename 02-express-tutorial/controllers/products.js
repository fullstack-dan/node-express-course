const { products } = require("../data");

const getProducts = (req, res) => {
  res.json(products);
};

const getProduct = (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send("Product Does Not Exist");
  }
  res.json(singleProduct);
};

const addProduct = (req, res) => {
  const { name, price } = req.body;
  const product = { id: products.length + 1, name, price };
  if (!name || !price) {
    return res.status(400).send("Please Provide Name and Price");
  }
  products.push(product);
  res.status(201).json(product);
};
