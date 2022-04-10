const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});

    process.exit(0);
});