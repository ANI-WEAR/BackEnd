// 회원가입 API 컨트롤러

// Controller는 클라이언트로부터 요청을 받아 처리하는 역할을 합니다.
// API 엔드포인트와 관련된 로직을 담당합니다.
// 사용자 입력값을 검증하고, 서비스 레이어를 호출하여 비즈니스 로직을 수행합니다.
// 요청에 대한 응답을 생성하고 클라이언트에 반환합니다.

const userService = require('../User/userService');

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userService.signup(username, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signupController,
};
