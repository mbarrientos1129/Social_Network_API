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
    //Update User
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => !user ?
                res.status(404).json({ message: 'No user with this id' }) :
                res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    // Delete a user and remove their thought
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user associated with this ID.' })
                    : Thought.deleteMany({ _id: { $in: user.thought } })
            )
            .then(() => res.json({ message: 'User and thought have been deleted.' }))
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
    //Add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with this id" })
                    : res.json(user)
            )
            .catch((err) => res.status(400).json(err));
    },
    //Delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with this id" })
                    : res.json(user)
            )
            .catch((err) => res.status(400).json(err));
    },
};