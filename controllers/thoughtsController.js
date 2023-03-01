const { Thought, User } = require('../models');

module.exports = {

    // Get all Thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.status(200).json(thoughts))
        .catch((err) => res.status(500).json(err))
    },
    // Get a single Thought
    getSingleThought(req, res) {
        Thought.findOne( {_id: req.params.thoughtId})
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought found, try again!'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create a Thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId},
                { $addToSet: { thoughts: thought._id }},
                { new: true}
            );
        })
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'Please sign in to save thought'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err)); 
    },
    // update a thought 
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought 
            ? res.status(404).json( { message: 'No thoughts found'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'Unable to find thought' })
            : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true })
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user found' })
            : res.json({ message: 'Thought deleted successfully' })
        )
        .catch((err) => res.status(500).json(err));
    },
   // create a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true }   
        )
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thoughts found!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // delete a reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: {reactions: {reactionId: req.params.reactionId }}},
        { runValidators: true, new: true }   
        )
        .then((thought) => 
        !thought
            ? res.status(404).json({ message: 'No thought found!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
}