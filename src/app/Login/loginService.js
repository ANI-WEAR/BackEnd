// 비즈니스 로직을 처리합니다. 데이터베이스나 외부 API와의 통신, 데이터 검증 등을 수행합니다.

const userDao = require('../User/userDao');
const jwtProvider = require('./jwtProvider');

exports.authenticateUser = (username, password) => {
  const user = userDao.getUserByUsername(username);

  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  return jwtProvider.generateToken(user.id, user.username);
};
