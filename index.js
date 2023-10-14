const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cors = require("cors");
const errorHandler = require("./middleware/error");

// routes
const category = require("./routes/category");
const post = require("./routes/post");
const comment = require("./routes/comment");
const photo = require("./routes/photo");
const auth = require("./routes/auth");
const user = require("./routes/user");

// Connect mongo
const connectDB = require("./config/db");
const ErrorResponse = require("./utils/errorResponse");

// Env
dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/category", category);
app.use("/api/v1/post", post);
app.use("/api/v1/comment", comment);
app.use("/api/v1/upload", photo);
app.use("/api/v1/user", user);
app.use("/api/v1/auth", auth);

app.all("*", (req, res, next) => {
  next(new ErrorResponse(`Can't find ${req.originalUrl} on the server !`, 404));
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
