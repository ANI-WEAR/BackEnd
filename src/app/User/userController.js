const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
// exports.getTest = async function (req, res) {
//     return res.send(response(baseResponse.SUCCESS))
// }

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {email, password, nickname} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        email,
        password,
        nickname
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : userId, passsword
 */
exports.login = async function (req, res) {

    const {userId, password} = req.body;

    // TODO: email, password 형식적 Validation
    // 여기에서 사용자 정보 검증과 인증 로직을 수행하고 토큰을 생성하는 작업을 진행합니다.

    // 하드코딩된 사용자 정보
    const users = [
        { id: 1, userId: 'john', password: 'secret123' },
        { id: 2, userId: 'jane', password: 'mypassword' },
    ];

    // 입력된 사용자 정보와 일치하는 사용자 찾기
    const user = users.find((user) => user.userId === userId && user.password === password);

    if (user) {
        // 로그인 성공
        return res.status(200).json({ message: '로그인 성공', user });
    } else {
        // 로그인 실패
        return res.status(401).json({ message: '로그인 실패', user: null });
    }
    
    // try {
    //   const token = loginService.authenticateUser(username, password); // JWT 토큰 생성
    //   res.status(200).json({ token });
    // } catch (err) {
    //   res.status(400).json({ error : "You are unauthorized to make this request. please sing up." });
    // }

    // const signInResponse = await userService.postSignIn(userId, password);

    // return res.send(signInResponse);
};

/**
    Ryula
    2023.08.04
 */
/**
 * Ryula
 * 2023.08.04
 *
 * API No. 4
 * API Name : 아이디 찾기 API
 * [GET] /users/auth/id/{userEmail}
 */
exports.findUserId = async function (req, res) {

    /**
     * Path Variable: userEmail
     */
    const userEmail = req.params.userEmail;

    if (!userEmail) return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY));

    const findUserIdResponse = await userService.findUserId(userEmail);

    console.log(findUserIdResponse);
    
    return res.send(findUserIdResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};



/**
Sejun
 2023.08.07
 */
/**
 * Sejun
 * 2023.08.07
 *
 * API No. 6
 * API Name : 비밀번호 찾기 API
 * [GET] /users/auth/pw/{userId}
 */
exports.findUserPw = async function (req, res) {

    /**
     * Path Variable: userEmail
     */
    const userId = req.params.user_id;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const findUserPwResponse = await userService.findUserPw(userId);

    console.log(findUserPwResponse);

    return res.send(findUserPwResponse);
};







/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
