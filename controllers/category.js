const asyncHandler = require("../middleware/async");
const Category = require("../models/Category");
const Post = require("../models/Post");
const ErrorResponse = require("../utils/errorResponse");

exports.getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate("photo");
  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json(category);
});

exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({ ...req.body, user: req.user._id });
  res.status(201).json(category);
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { ...req.body, user: req.user._id },
    {
      new: true,
    }
  );
  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json(category);
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${categoryId}`, 404)
    );
  }

  const posts = await Post.find({ category: categoryId });

  console.log(posts);

  if (posts.length !== 0) {
    return next(
      new ErrorResponse(
        `Before delete posts of the category with id of ${categoryId}`,
        404
      )
    );
  } else {
    await Category.findByIdAndDelete(categoryId);
  }

  res.status(200).json(null);
});
