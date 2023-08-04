// 회원가입 API 서비스

// Service는 비즈니스 로직을 처리하는 역할을 합니다.
// Controller와 DAO 사이에서 데이터 처리를 담당합니다.
// 데이터베이스에 대한 로직을 포함하고 있으며, DAO를 호출하여 데이터베이스와 상호작용합니다.

const userDao = require('../User/userDao');

const signup = async (username, email, password) => {
  // 유효성 검사 등 필요한 로직 수행
  // 비밀번호 해싱 등 보안 로직 수행
  // userDao를 사용하여 데이터베이스에 사용자 정보 저장 등 데이터베이스 처리 수행

  const newUser = await userDao.createUser(username, email, password);
  return newUser;
};

module.exports = {
  signup,
};
