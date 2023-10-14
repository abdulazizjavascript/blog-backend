// const asyncHandler = (func) => (req, res, next) => {
//   Promise.resolve(func(req, res, next)).catch(next);
// };

// module.exports = asyncHandler;

const asyncHandler = (func) => (req, res, next) =>
  func(req, res, next).catch(next);

module.exports = asyncHandler;
