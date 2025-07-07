const mongoose = require("mongoose");
const productsModel = require("../models/productsModel");
const categoryModel = require("../models/categoryModel");

mongoose.connect("mongodb://localhost:27017/grocery_store", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const categories = [
  {
    name: "Fruits",
    imageUrl: "https://example.com/images/fruits.jpg",
    discount: "10% off",
  },
  {
    name: "Bakery",
    imageUrl: "https://example.com/images/bakery.jpg",
    discount: "5% off",
  },
  {
    name: "Dairy",
    imageUrl: "https://example.com/images/dairy.jpg",
    discount: "15% off",
  },
  {
    name: "Grains",
    imageUrl: "https://example.com/images/grains.jpg",
    discount: "8% off",
  },
  {
    name: "Oils",
    imageUrl: "https://example.com/images/oils.jpg",
    discount: "12% off",
  },
];

categoryModel
  .insertMany(categories)
  .then((insertedCategories) => {
    console.log("Categories inserted successfully!");

    const categoryMap = {
      Fruits: insertedCategories.find((cat) => cat.name === "Fruits")._id,
      Bakery: insertedCategories.find((cat) => cat.name === "Bakery")._id,
      Dairy: insertedCategories.find((cat) => cat.name === "Dairy")._id,
      Grains: insertedCategories.find((cat) => cat.name === "Grains")._id,
      Oils: insertedCategories.find((cat) => cat.name === "Oils")._id,
    };

    const groceryProducts = [
      {
        name: "Organic Apples",
        price: 2.99,
        ratings: 4.5,
        imageUrl: "https://example.com/images/apples.jpg",
        category: categoryMap.Fruits,
        stock: 100,
      },
      {
        name: "Whole Wheat Bread",
        price: 3.49,
        ratings: 4.2,
        imageUrl: "https://example.com/images/bread.jpg",
        category: categoryMap.Bakery,
        stock: 50,
      },
      {
        name: "Fresh Milk",
        price: 1.99,
        ratings: 4.8,
        imageUrl: "https://example.com/images/milk.jpg",
        category: categoryMap.Dairy,
        stock: 200,
      },
      {
        name: "Brown Eggs",
        price: 4.99,
        ratings: 4.6,
        imageUrl: "https://example.com/images/eggs.jpg",
        category: categoryMap.Dairy,
        stock: 80,
      },
      {
        name: "Rice (5kg)",
        price: 12.99,
        ratings: 4.7,
        imageUrl: "https://example.com/images/rice.jpg",
        category: categoryMap.Grains,
        stock: 120,
      },
      {
        name: "Olive Oil (1L)",
        price: 9.99,
        ratings: 4.9,
        imageUrl: "https://example.com/images/olive_oil.jpg",
        category: categoryMap.Oils,
        stock: 60,
      },
    ];

    return productsModel.insertMany(groceryProducts);
  })
  .then(() => {
    console.log("Grocery products inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting data:", err);
    mongoose.connection.close();
  });
