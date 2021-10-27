const jwt = require('jsonwebtoken');

const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

login = (req, res) => {

    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ "message": "Usuario y/o contraseña incorrectas" });
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '1d' });
    res.json({
        ...omitPassword(user),
        token
    });
}

register = (req, res) => {
    res.send({ 'test': 'test' });
}

omitPassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

module.exports = {
    register,
    login
}