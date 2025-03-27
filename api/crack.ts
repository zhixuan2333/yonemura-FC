import jwt from 'jsonwebtoken';

const admin = "admin"

const token = jwt.sign({admin}, "yone", { expiresIn: '1h' });
console.log(token);