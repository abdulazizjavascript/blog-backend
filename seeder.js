const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const Post = require("./models/Post");
const Category = require("./models/Category");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON files
const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/posts.json`, "utf-8")
);
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/categories.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await Post.create(posts);
    await Category.create(categories);
    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Post.deleteMany();
    await Category.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
