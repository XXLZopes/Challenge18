const router = require('express').Router();

const {
    addThought, addReaction, deleteThought, deleteReaction
} = require('../../controllers/thought-controller')

router
    .route('/:id')
    .post(addThought)  

router 
    .route('/:userId/:thoughtId')
    .delete(deleteThought)

router
    .route('/reaction/:id')
    .put(addReaction)

router
    .route('/reaction/:thoughtId/:reactionId')
    .delete(deleteReaction)

module.exports = router;