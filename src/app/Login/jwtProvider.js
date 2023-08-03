// 토큰 생성, 검증 등과 같이 보안과 관련된 기능을 제공합니다.

const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

exports.generateToken = (userId, username) => {
  return jwt.sign({ userId, username }, secretKey, { expiresIn: '1h' });
};
