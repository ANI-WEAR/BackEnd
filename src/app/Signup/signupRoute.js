// 회원가입 API 라우팅

// Route는 Express나 다른 라우팅 라이브러리를 사용하여 API 엔드포인트를 등록하는 역할을 합니다.
// Controller를 호출하는 역할도 수행합니다.

const express = require('express');
const router = express.Router();
const { signupController } = require('../User/userController');

router.post('/signup', signupController);

module.exports = router;
