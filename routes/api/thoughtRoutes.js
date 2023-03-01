const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtsController');//need to make controllers

//  /api/users
router.route('/').get(getThoughts).post(createThought);

// /api/user/:userId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/users/:userId/friends/:friendId
router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions').delete(removeReaction);

module.exports = router;
