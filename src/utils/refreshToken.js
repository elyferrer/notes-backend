const jwt = require('jsonwebtoken');

function generateRefreshToken(res, user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'None'
    });

    return refreshToken;
}

module.exports = {
    generateRefreshToken: generateRefreshToken,
};