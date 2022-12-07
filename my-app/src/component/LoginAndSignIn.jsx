import "../css/LoginAndSignIn.css";
import { TfiClose } from "react-icons/tfi";
import { useRef } from "react";
import authApi from "../api/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function LoginAndSignIn({
  setGuest,
  hideLogin,
  changeHideLogin,
  loginAndSign,
  loginSignin,
  handleLogin
}) {
  const navi = useNavigate()
  const userName = useRef(0)
  const userPass = useRef(0)
  const checkLogin = async () => {
    try {
      const data = await authApi.login({
        userName: userName.current.value,
        userPass: userPass.current.value
      })
      if (data.status ===200) {
        alert('Sai tên tài khoản hoặc mật khẩu!')
        console.log("faild")
        return
      }
      if (data) {
        localStorage.setItem('auth', JSON.stringify(data));
        if (data.roleID === 1) {
          setGuest(false)
          navi('/admin')
        }
        if (data.roleID === 2) {
          setGuest(false)
          navi('/admin')
        }
        changeHideLogin()
        handleLogin(true)
      }
    } catch (e) {
      console.log("Đăng nhập thất bại!")
    }
  }
  return (
    <div
      className={
        hideLogin ? "max-device-wh active-login-signin" : "max-device-wh "
      }
    >
      <div className="login-signin-container"></div>
      <div className="login-signin">
        <div className="fix-padding">
          <TfiClose
            onClick={function () {
              changeHideLogin();
            }}
            className="close-icon hoverCommon"
          />
          <div className="title-account">Tài khoản</div>
        </div>
        <div className="fix-padding">
          <div
            className="login-signin-opt login activeLoginSignin hoverCommon hoverLoginSignIn"
            onClick={() => {
              loginSignin(1);
            }}
          >
            đăng nhập
          </div>
          <div
            className="login-signin-opt signin hoverCommon hoverLoginSignIn"
            onClick={() => {
              loginSignin(2);
            }}
          >
            đăng ký
          </div>
        </div>
        <div className="fix-padding">
          {!loginAndSign && <LoginComponent userName={userName} userPass={userPass} checkLogin={checkLogin} />}
          {loginAndSign && <SignInComponent changeHideLogin={changeHideLogin} handleLogin={handleLogin} />}
        </div>
      </div>
    </div>
  );
}
function LoginComponent({ userName, userPass, checkLogin }) {
  return (
    <form>
      <input ref={userName}
        type="text"
        className="input-text-field"
        placeholder="Email hoặc số điện thoại"
      ></input>
      <input ref={userPass}
        type="password"
        className="input-text-field"
        placeholder="Mật khẩu *"
      ></input>
      <a href="http://localhost" className="forgot-password">
        Quên mật khẩu ?
      </a>
      <button type="button" className="submit-btn" onClick={() =>
        checkLogin()}>
        đăng nhập
      </button>
    </form>
  );
}

function SignInComponent({ changeHideLogin, handleLogin }) {

  const navi = useNavigate()
  const userName = useRef(0)
  const userPass = useRef(0)
  const userNameDetail = useRef(0)
  const userPhone = useRef(0)
  const userAddress = useRef(0)
  const errorPass = useRef(0)
  function addEventForInput() {
    userName.current.onclick = () => {
      userName.current.value = ''
      userName.current.style.color = 'black'
    }
    userPass.current.onclick = () => {
      userPass.current.value = ''
      userPass.current.style.color = 'black'
      errorPass.current.innerHTML = ''
    }
    userNameDetail.current.onclick = () => {
      userNameDetail.current.value = ''
      userNameDetail.current.style.color = 'black'
    }
    userPhone.current.onclick = () => {
      userPhone.current.value = ''
      userPhone.current.style.color = 'black'
    }
    userAddress.current.onclick = () => {
      userAddress.current.value = ''
      userAddress.current.style.color = 'black'
    }
  }
  async function sendSignInRequest() {
    let checkEmpty = false
    if (userName.current.value.trim() === '') {
      userName.current.style.color = 'red'
      userName.current.value = 'Không được để trống tên tài khoản!'
      checkEmpty = true
    }
    if (userNameDetail.current.value.trim() === '') {
      userNameDetail.current.style.color = 'red'
      userNameDetail.current.value = 'Không được để trống tên!'
      checkEmpty = true
    }
    if (userAddress.current.value.trim() === '') {
      userAddress.current.style.color = 'red'
      userAddress.current.value = 'Không được để trống địa chỉ!'
      checkEmpty = true
    }
    if (userPass.current.value.trim() === '') {
      userPass.current.style.color = 'red'
      userPass.current.value = 'Không được để trống password!'
      checkEmpty = true
    }
    if (userPhone.current.value.trim() === '') {
      userPhone.current.style.color = 'red'
      userPhone.current.value = 'Không được để trống số điện thoại!'
      checkEmpty = true
    }
    if (checkEmpty) {
      return
    }
    if (userName.current.value.trim().length < 8) {
      userName.current.style.color = 'red'
      userName.current.value = 'Tên tài khoản ít nhất 8 ký tự!'
      return
    }
    if (userPass.current.value.trim().length < 8) {
      errorPass.current.style.color = 'red'
      errorPass.current.innerHTML = 'Mật khẩu ít nhất 8 ký tự!'
      return
    }
    var sdtRegex = "^0[0-9]+$"
    if (!userPhone.current.value.trim().match(sdtRegex) || userPhone.current.value.trim().length > 11 || userPhone.current.value.trim().length < 11) {
      errorPass.current.innerHTML = "SDT không hợp lệ!"
        return
    }
    const acountData = {
      "userName": userName.current.value.trim(),
      "userPass": userPass.current.value.trim(),
      "sdt": userPhone.current.value.trim(),
      "name": userNameDetail.current.value.trim(),
      "address": userAddress.current.value.trim()
    }
    const result = await authApi.signin(acountData)
    if (result.status === 1) {
      errorPass.current.style.color = 'red'
      errorPass.current.innerHTML = 'Tên tài khoản đã tồn tại!'
      return
    }
    const data = await authApi.login({
      userName: result.userName,
      userPass: userPass.current.value.trim()
    })
    localStorage.setItem('auth', JSON.stringify(data))
    changeHideLogin()
    handleLogin(true)
    navi("/")
  }
  useEffect(() => {
    addEventForInput()
  }, [])
  return (
    <form>
      <input ref={userName}
        type="text"
        className="input-text-field"
        placeholder="Nhập user của bạn *"
      ></input>
      <input ref={userPhone}
        type="text"
        className="input-text-field"
        placeholder="Nhập số điện thoại của bạn *"
      ></input>
      <input ref={userNameDetail}
        type="text"
        className="input-text-field"
        placeholder="Nhập họ và tên *"
      ></input>
      <input ref={userAddress}
        type="text"
        className="input-text-field"
        placeholder="Nhập địa chỉ *"
      ></input>
      <input ref={userPass}
        type="password"
        className="input-text-field"
        placeholder="Mật khẩu *"
      ></input>
      <p ref={errorPass} className="error-password"></p>
      <button type="button" className="submit-btn margin-top20" onClick={() => {
        sendSignInRequest()
      }}>
        đăng ký
      </button>
    </form>
  );
}
export default LoginAndSignIn
