const express = require( "express" );
const router = express.Router();

const User = require( "../models/User" );

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require( "../controllers/user" );

const advancedResults = require( "../middleware/advancedResults" );
const { protect, authorize } = require( "../middleware/auth" );

router
  .route( "/" )
  .get(
    advancedResults( User, null, [ "first_name", "last_name", "username" ] ),
    getUsers
  )
  .post( protect, authorize( "admin" ), createUser );

router.route( "/:id" ).get( getUser )
  .put( protect, authorize( "admin" ), updateUser )
  .delete( protect, authorize( "admin" ), deleteUser );

module.exports = router;
