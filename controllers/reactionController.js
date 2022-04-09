const { Thought } = require('../models')

module.exports = {
    //Post reaction
    addReaction(req, res) {
        Reaction.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then((thought) => 
            !thought
            ?res.status(404).json({ message: "No thought has been found with this id but a reaction has been created."})
            :res.json(thought)
            )
            .catch(err => res.json(err));
    },
    //Delete Reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.body } },
            { new: true }
        )
            .then((thought) => {
                !thought
                ?res.status(404).json({ message: "Reaction has been deleted but there was no thought found."})
                :res.json({ message: "Your reaction has been deleted!"})
            })
            .catch(err => res.json(err));
    }
};