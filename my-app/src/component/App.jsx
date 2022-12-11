import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Body from "./Body";
import Bag from "../componentitem/Bag";
import Footer from "./Footer";
import LoginAndSignIn from "./LoginAndSignIn";
import { React, useState } from "react";
import AppItem from "../componentitem/AppItem";
import MyOrder from "../componentitem/MyOrder";
import CreateOrder from "../componentitem/CreateOrder";
import AccountProfile from "../componentitem/AccountProfile";
import Admin from "../admincomponent/Admin"
import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";
import PrintBill from "../admincomponent/PrintBill";
function App() {
  const [guest, setGuest] = useState(true)
  const isAuth = JSON.parse(localStorage.getItem('auth'))
  const navi = useNavigate()
  useEffect(()=>{
    if(isAuth){
    if(isAuth.roleID===1||isAuth.roleID===2){
      setGuest(false)
      navi("/admin")
    }}
  },[])
  let auth = JSON.parse(localStorage.getItem("auth"));
  if (auth === null) {
    auth = false;
  } else {
    auth = true;
  }
  const [isLoginInstance, setLogin] = useState(auth);
  function handleLogin(opt) {
    setLogin(opt)
  }
  const [hideLogin, setHideLogin] = useState(false);
  const changeHideLogin = () => {
    setHideLogin(!hideLogin);
  };
  const [loginAndSign, setLoginSignIn] = useState(false);
  const loginSignin = (type) => {
    if (type === 1) {
      const login = document.querySelector(".login");
      if (!login.classList.contains("activeLoginSignin")) {
        document.querySelector(".signin").classList.remove("activeLoginSignin");
        login.classList.add("activeLoginSignin");
        setLoginSignIn(false);
      }
    }
    if (type === 2) {
      const login = document.querySelector(".signin");
      if (!login.classList.contains("activeLoginSignin")) {
        document.querySelector(".login").classList.remove("activeLoginSignin");
        login.classList.add("activeLoginSignin");
        setLoginSignIn(true);
      }
    }
  };
  return (
    <>
      {guest ? <Header setGuest={setGuest} changeHideLogin={changeHideLogin} isLoginInstance={isLoginInstance} handleLogin={handleLogin} />:""}
      <Routes>
        <Route path="/admin" element={<Admin setLogin={setLogin} setGuest={setGuest}/>} />
        <Route path="/" element={<Body setGuest={setGuest}/>} />
        <Route path="/product-item" element={<AppItem changeHideLogin={changeHideLogin} />}></Route>
        <Route path="/account-bag/" element={<Bag />}></Route>
        <Route path="/my-order/" element={<MyOrder />}></Route>
        <Route path="/my-profile/" element={<AccountProfile />}></Route>
        <Route path="/create-order" element={<CreateOrder />}></Route>
        <Route path="/printf" element={<PrintBill />}></Route>
      </Routes>
      {<LoginAndSignIn
        setGuest={setGuest}
        hideLogin={hideLogin}
        changeHideLogin={changeHideLogin}
        loginAndSign={loginAndSign}
        loginSignin={loginSignin}
        handleLogin={handleLogin}
      />}
      {guest ? <Footer setGuest={setGuest} />:""}
    </>
  );
}
export default App;
