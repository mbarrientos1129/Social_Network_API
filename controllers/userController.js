const { User, Thought } = require('../models');

module.exports = {
    // Get all Users
    getUser(req, res) {
        User.find()
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    // Get a single User
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user associated with this ID.' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    // create a new User
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user and remove their thought
    deleteUser(req, res) {
        Student.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user associated with this ID.' })
                    : Thought.deleteMany({ _id: { $in: user.thought } })
            )
            .then( () => res.json({ message: 'User and thought have been deleted.'}))
            .catch((err) => res.status(500).json(err));
        },
    // Remove thought from a user
    removeThought(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { thoughts: { thoughtsId: req.params.thougtsId } } }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No thought associated with this user.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};