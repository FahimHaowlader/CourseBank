// const asyncHandler = (fn) => {
//   return (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((error) =>{next(error)});
//   };
// }

// Another way to do this is to use async/await syntax
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//      return await fn(req, res, next);
//     } catch (error) {
//       res.status(error.code|| 500).json({
//         success: false,
//         message: error.message || 'Internal Server Error',
//     })
//   };

// }


// best way to do it 
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    // Ensure the status code is valid (between 100–599)
    const statusCode = (typeof error.code === 'number' && error.code >= 400 && error.code < 600)
      ? error.code
      : 510;

    res.status(statusCode).json({
      success: false,
      message: error.message || 'Internal Server code Error catched by AsyncHandler',
    });
  }
};

export default asyncHandler;