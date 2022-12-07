import "../css/Footer.css";
import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { BsTelephoneOutbound, BsShop, BsTruck } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { SiFacebook } from "react-icons/si";
import { SlSocialYoutube } from "react-icons/sl";
import { FaTiktok } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
function Footer({setGuest}) {
  const isAuth = JSON.parse(localStorage.getItem('auth'))
  const navi = useNavigate()
  useEffect(()=>{
    if(isAuth){
    if(isAuth.roleID===1||isAuth.roleID===2){
      setGuest(false)
      navi("/admin")
    }}
  },[])
  return (
    <div className="footer">
      <FooterConTact />
      <FooterSocial />
    </div>
  );
}
function FooterConTact() {
  return (
    <div className="footer-contact">
      <div className="contact-item">
        <AiOutlineReload className="footer-icons" />
        <p className="contact-title">SIXdo</p>
        <div className="contact-description">
          <span>Đổi trả sản phẩm trong 6 ngày</span>
        </div>
      </div>
      <div className="contact-item">
        <BsTelephoneOutbound className="footer-icons" />
        <p className="contact-title">hotline 1800 6655</p>
        <div className="contact-description">
          <span>5h00 - 21h00, T2 - CN nghỉ Tết Âm lịch</span>
        </div>
      </div>
      <div className="contact-item">
        <BsShop className="footer-icons" />
        <p className="contact-title">hệ thống cửa hàng</p>
        <div className="contact-description">
          <span>gần 60 cửa hàng trên toàn hệ thống</span>
        </div>
      </div>
      <div className="contact-item">
        <BsTruck className="footer-icons" />
        <p className="contact-title">vận chuyển</p>
        <div className="contact-description">
          <span>Đồng giá 25k toàn quốc</span>
        </div>
      </div>
    </div>
  );
}
function FooterSocial() {
  return (
    <>
      <div className="footer-social">
        <div className="social-item">
          <p className="social-title">SIXdo</p>
          <div className="social-description">
            <span>Sang trọng</span>
            <br></br>
            <span>Ứng dụng ở mức giá tầm trung</span>
          </div>
        </div>
        <div className="social-item">
          <p className="social-title">HỖ TRỢ KHÁCH HÀNG</p>
          <div className="social-description">
            <span>Chính sách vận chuyển</span>
            <br></br>
            <span>Chính sách đổi trả</span>
            <br></br>
            <span>Phương thức thanh toán</span>
          </div>
        </div>
        <div className="social-item">
          <p className="social-title">SOCIAL NETWORK</p>
          <SiFacebook className="social-icons"/>
          <RiInstagramFill className="social-icons"/>
          <SlSocialYoutube className="social-icons"/>
          <FaTiktok className="social-icons"/>
          <div className="social-description">
            <span className="des-social">2022</span>
          </div>
        </div>
      </div>
      <div className="footer-copy-right">@2022 Team 5</div>
    </>
  );
}
export default Footer;
