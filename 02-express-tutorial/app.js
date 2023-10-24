const cookieParser = require("cookie-parser");
const { products, people } = require("./data");
const peopleRouter = require("./routes/people");

const express = require("express");
const app = express();

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

const auth = (req, res, next) => {
  const name = req.cookies.name;

  if (name) {
    req.user = { name: name };
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.use(logger);
app.use("/api/v1/people", peopleRouter);

app.listen(3000, () => {
  console.log("server is listening on port 3000...");
});

app.post("/logon", (req, res) => {
  const { name } = req.body;
  if (name) {
    res.cookie("name", req.body.name);
    res.status(201).json({ message: `Hello, ${name}.` });
  } else {
    res.status(400).json({ error: "Please provide a name." });
  }
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ message: "You have been logged off." });
});

app.get("/test", auth, (req, res) => {
  res.status(200).json({ message: `Hello, ${req.user.name}.` });
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
  const { search, limit, minPrice, maxPrice } = req.query;

  let filteredProducts = products;

  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }

  if (minPrice && maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= parseInt(minPrice) &&
        product.price <= parseInt(maxPrice)
    );
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }

  res.json(filteredProducts);
});

// app.get("/api/v1/people", (req, res) => {
//   res.json(people);
// });

// app.post("/api/v1/people", (req, res) => {
//   if (!req.body.name) {
//     res.status(400).json({ success: false, message: "Please provide a name." });
//   } else {
//     const newPerson = {
//       id: people.length + 1,
//       name: req.body.name,
//     };
//     people.push(newPerson);

//     res.status(201).json({ success: true, name: req.body.name });
//   }
// });
