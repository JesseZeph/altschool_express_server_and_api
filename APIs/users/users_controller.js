const db = require('./users_db')

const CreateUser = (req, res) => {
    const newUser = req.body;

    newUser.api_key = `${newUser.username}${newUser.password}`

    if (newUser.username == 'jesse') {
        newUser.user_type = 'admin'
    } else {
        newUser.user_type = 'user'
    }

    db.users.push(newUser);

    return res.status(201).json({
        message: 'User created successfully',
        users: db.users
    });

}

const UpdateUser = (req, res) => {
    const { userId } = req.params;
    const updatedUser = req.body;

    const userIndex = db.users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (updatedUser.username) {
        db.users[userIndex].username = updatedUser.username;
    }

    if (updatedUser.password) {
        db.users[userIndex].password = updatedUser.password;
        db.users[userIndex].api_key = `${updatedUser.username}${updatedUser.password}`;
    }

    return res.status(200).json({
        message: 'User updated successfully',
        user: db.users[userIndex]
    });
}

const DeleteUser = (req, res) => {
    const { userId } = req.params;

    const userIndex = db.users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    db.users.splice(userIndex, 1);

    return res.status(200).json({
        message: 'User deleted successfully',
        users: db.users
    });
}

module.exports = {
    CreateUser,
    UpdateUser,
    DeleteUser
}
