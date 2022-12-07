import "../css/AccountProfile.css";
import { useState, useEffect, useRef } from "react";
import getApiProduct from "../api/ProductAPI";
import shipApi from "../api/ShipApi";
import { useNavigate } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
function AccountProfile() {
  const isAccountOnline = localStorage.getItem('auth')
  const navi = useNavigate()
  useEffect(() => {
    if (!isAccountOnline) {
      navi('/')
    }
  }, [])
  let id = 0
  if (isAccountOnline) {
    id = JSON.parse(isAccountOnline).id
  }
  const [opt, setOpt] = useState(0);
  function handleOpt(opt) {
    setOpt(opt);
  }
  const [account, setContacts] = useState(undefined);
  useEffect(() => {
    const getContacts = async () => {
      const data = await getApiProduct.getContacts(id);
      setContacts(data);
    };
    getContacts();
  }, [id]);
  const [remakeInfo, setShowInfo] = useState(false)
  const [remakePass, setNewPass] = useState(false)
  function setHigh(opt){
    const navs = document.querySelectorAll('.sethigh')
    for(const nav of navs){
      nav.classList.remove('active-myorder')
    }
    navs[opt].classList.add('active-myorder')
  }
  return (
    <>
      {remakeInfo ? <RemakeInfo setContacts={setContacts} setShowInfo={setShowInfo} id={id} /> : ""}
      {remakePass ? <RemakePassword setNewPass={setNewPass} id={id} /> : ""}
      <div className="fix-header"></div>
      <div className="my-profile-container">
        <div className="left-nav">
          <div className="profile-manager">Quản lý tài khoản</div>
          <div
            className="profile-nav sethigh active-myorder"
            onClick={() => {
              handleOpt(0);
              setHigh(0)
            }}
          >
            Thông tin cá nhân
          </div>
          <div
            className="profile-nav sethigh"
            onClick={() => {
              handleOpt(1);
              setHigh(1)
            }}
          >
            Địa chỉ nhận hàng
          </div>

          <div
            className="profile-nav sethigh"
            onClick={() => {
              handleOpt(2);
              setHigh(2)
            }}
          >
            Thêm địa chỉ nhận hàng
          </div>
        </div>
        <div className="right-profile-status">
          {account ? (
            opt === 0 ? (
              <Profile setNewPass={setNewPass} setShowInfo={setShowInfo} account={account} />
            ) : opt === 1 ? (
              account.shipContacts.map((contact) => {
                return <AccountShipContact setContacts={setContacts} contact={contact} />;
              })
            ) :
              <ShipContact setContacts={setContacts}/>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
function Profile({ setNewPass, setShowInfo, account }) {
  let name = "";
  let born = "";
  let address = "";
  let sdt = ''
  if (account) {
    name = account.name;
    born = account.born;
    address = account.address;
    sdt = account.sdt
  }
  return (
    <>
      <div className="profile-container">
        <div className="fix-margin-left">
          <div className="accountDetail ">
            <span className="title">Tên: </span>
            <span className="detail">{name}</span>
          </div>
          <div className="accountDetail add-margin">
            <span className="title">Ngày sinh: </span>
            <span className="detail">{born}</span>
          </div>
          <div className="accountDetail add-margin">
            <span className="title">Địa chỉ: </span>
            <span className="detail">{address}</span>
          </div>
          <div className="accountDetail add-margin">
            <span className="title">Số điện thoại: </span>
            <span className="detail">{sdt}</span>
          </div>
          <div className="remkeinfo-btn" onClick={() => {
            setShowInfo(true)
          }}>Thay Đổi Thông Tin</div>
          <div className="remkeinfo-btn" onClick={() => {
            setNewPass(true)
          }}>Đổi mật khẩu</div>
        </div>

      </div>
    </>
  );
}
function RemakePassword({ setNewPass, id }) {
  const oldPass = useRef(undefined)
  const newPass = useRef(undefined)
  const confirmPass = useRef(undefined)
  const error = useRef(undefined)
  function checkNullAndEmpty() {
    error.current.style.color = 'red'
    if (oldPass.current.value.trim().length === 0) {
      error.current.innerHTML = "Không được để trống!"
      return false
    }
    if (newPass.current.value.trim().length === 0) {
      error.current.innerHTML = "Không được để trống!"
      return false
    }
    if (confirmPass.current.value.trim().length === 0) {
      error.current.innerHTML = "Không được để trống!"
      return false
    }
    if (newPass.current.value.trim().length <8 ) {
      error.current.innerHTML = "Mật khẩu lớn hơn 8 ký tự!"
      return false
    }
    if (!(newPass.current.value.trim() === confirmPass.current.value.trim())) {
      error.current.innerHTML = "Xác nhận không khớp!"
      return false
    }
    error.current.innerHTML = ''
    return true
  }
  async function remake() {
    if (!checkNullAndEmpty()) {
      return
    }
    const data = {
      "accountId": id,
      "oldPass": oldPass.current.value.trim(),
      "newPass": newPass.current.value.trim()
    }
    const result = await getApiProduct.remakepassword(data)
    error.current.style.color = 'red'
    if (result.status === 1) {
      error.current.innerHTML = result.detail
      return
    }
    if (result.status === 2) {
      error.current.innerHTML = result.detail
      return
    }
    if (result.status === 3) {
      error.current.style.color = 'green'
      error.current.innerHTML = result.detail
      return
    }
  }
  return (
    <>
      <div className="full-device-pro5">
        <div className="remake-info-container">
          <div className="remake-info-title">
            <span className="remake-title-content">Thay đổi thông tin người dùng.</span>
          </div>
          <div className="remake-info-input-pass">
            <div className="input-content">
              <span>Mật khẩu cũ:</span>
              <input type="password" ref={oldPass} />
            </div>
            <div className="input-content">
              <span>Mật khẩu mới:</span>
              <input type="password" ref={newPass} />
            </div>
            <div className="input-content">
              <span>Xác nhận mật khẩu:</span>
              <input type="password" ref={confirmPass} />
            </div>
            <div ref={error} className="error-remake-info"></div>
          </div>
          <div className="remake-btn">
            <div className="remake-btn-content remake-btn-confirm" onClick={() => {
              remake()
            }}><span>Thay Đổi</span></div>
            <div className="remake-btn-content remake-btn-cancel" onClick={() => {
              setNewPass(false)
            }}><span>Hủy</span></div>
          </div>
        </div>
      </div></>
  )
}
function RemakeInfo({ setShowInfo, id, setContacts }) {
  const name = useRef(undefined)
  const date = useRef(undefined)
  const detail = useRef(undefined)
  const sdt = useRef(undefined)
  const error = useRef(undefined)
  function checkNullAndEmpty() {
    error.current.style.color = 'red'
    if (name.current.value.trim().length === 0) {
      error.current.innerHTML = "Không được để trống họ tên!"
      return false
    }
    if (detail.current.value.trim().length === 0) {
      error.current.innerHTML = "Không được để trống địa chỉ!"
      return false
    }
    if (sdt.current.value.trim().length === 0) {
      error.current.innerHTML = "Không được để trống sdt!"
      return false
    }
    if (date.current.value.trim().length === 0) {
      error.current.innerHTML = "Chọn ngày tháng năm sinh!"
      return false
    }
    var sdtRegex = "^0[0-9]+$"
    if (!sdt.current.value.trim().match(sdtRegex) || sdt.current.value.trim().length > 11 || sdt.current.value.trim().length < 11) {
      error.current.innerHTML = "SDT không hợp lệ!"
      return
    }
    error.current.innerHTML = ''
    return true
  }
  async function remake() {
    if (!checkNullAndEmpty()) {
      return
    }
    const data = {
      "accountId": id,
      "address": detail.current.value.trim(),
      "sdt": sdt.current.value.trim(),
      "born": date.current.value.trim(),
      "name": name.current.value.trim()
    }
    await getApiProduct.remakeAccountInfo(data)
    setContacts(await getApiProduct.getContacts(id))
  }
  return (
    <>
      <div className="full-device-pro5">
        <div className="remake-info-container">
          <div className="remake-info-title">
            <span className="remake-title-content">Thay đổi thông tin người dùng.</span>
          </div>
          <div className="remake-info-input">
            <div className="input-content">
              <span>Họ tên:</span>
              <input type="text" ref={name} />
            </div>
            <div className="input-content">
              <span>Ngày tháng năm sinh:</span>
              <input type="date" ref={date} />
            </div>
            <div className="input-content">
              <span>Địa chỉ:</span>
              <input type="text" ref={detail} />
            </div>
            <div className="input-content">
              <span>SDT:</span>
              <input type="text" ref={sdt} />
            </div>
            <div ref={error} className="error-remake-info"></div>
          </div>
          <div className="remake-btn">
            <div className="remake-btn-content remake-btn-confirm" onClick={() => {
              remake()
            }}><span>Thay Đổi</span></div>
            <div className="remake-btn-content remake-btn-cancel" onClick={() => {
              setShowInfo(false)
            }}><span>Hủy</span></div>
          </div>
        </div>
      </div></>
  )
}
function AccountShipContact({ contact, setContacts }) {
  let name = contact.receiverName;
  let address = contact.accountDetailAddress;
  let sdt = contact.accountPhoneNumber;
  async function removeAccountShipContact() {
    await getApiProduct.removeAccountShipContact(contact.accountShipContactId)
    setContacts(await getApiProduct.getContacts(JSON.parse(localStorage.getItem('auth')).id))
  }
  return (
    <>
      <div className="profile-container">
        <div className="fix-margin-left">
          <div className="accountDetail">
            <span className="title">Người nhận: </span>
            <span className="detail">{name}</span>
          </div>
          <div className="accountDetail add-margin">
            <span className="title">địa chỉ nhận hàng: </span>
            <span className="detail">{address}</span>
          </div>
          <div className="accountDetail add-margin">
            <span className="title">Số điện thoại: </span>
            <span className="detail">{sdt}</span>
          </div>
          <div className="delete-contact" onClick={() => {
            removeAccountShipContact()
          }}>Xóa địa chỉ</div>
        </div>
      </div>
    </>
  );
}


function ShipContact({ setContacts}) {
  const province = useRef(0)
  const district = useRef(0)
  const ward = useRef(0)
  const name = useRef(0)
  const sdt = useRef(0)
  const detail = useRef(0)
  const [provinces, setProvince] = useState(undefined)
  const [districts, setDistrists] = useState(undefined)
  const [wards, setWards] = useState(undefined)
  useEffect(() => {
    const getProvince = async () => {
      const data = await shipApi.getProvince()
      setProvince(data.data)
    }
    getProvince()
  }, [])
  async function getDistristByProvinceID(provinceID) {
    const getDistrist = async () => {
      const data = await shipApi.getDistrist(provinceID)
      setDistrists(data.data)
    }
    await getDistrist()
    getWardByProvinceID(districts[0]?.DistrictID)
  }
  async function getWardByProvinceID(districtID) {
    const getWard = async () => {
      const data = await shipApi.getWard(districtID)
      setWards(data.data)
    }
    getWard()
  }
  async function addNewShipContact() {
    error.current.style.color = 'red'
    error.current.innerHTML = ""
    if (district.current.value === '' || province.current.value === '' || ward.current.value === '') {
      error.current.innerHTML = 'Vui lòng chọn địa chỉ nhận hàng!'
      return
    }
    if (name.current.value.trim().length === 0 || sdt.current.value.trim().length === 0 || detail.current.value.trim().length === 0) {
      error.current.innerHTML = 'Không được để trống thông tin!'
      return
    }
    var sdtRegex = "^0[0-9]+$"
    if (!sdt.current.value.trim().match(sdtRegex) || sdt.current.value.trim().length > 11 || sdt.current.value.trim().length < 11) {
      error.current.innerHTML = "SDT không hợp lệ!"
      return
    }
    let data = {
      "accountDetailAddress": detail.current.value.trim(),
      "accountId": JSON.parse(localStorage.getItem('auth')).id,
      "accountPhoneNumber": sdt.current.value,
      "districtID": district.current.value,
      "provinceID": province.current.value,
      "receiverName": name.current.value,
      "wardCode": ward.current.value
    }
    await getApiProduct.addNewShipContact(data)
    name.current.value = ""
    sdt.current.value = ''
    detail.current.value = ''
    setContacts(await getApiProduct.getContacts(JSON.parse(localStorage.getItem('auth')).id))
    alert("Thêm thành công!")
  }
  const error = useRef(0)
  return (
    <>
      <div className='add-new-ship-contact-container-pro5'>
        <div className='add-new-ship-titlt'><span>Thêm địa chỉ nhận hàng</span></div>
        <div className='add-new-ship-cbb'>
          <select ref={province} name="" id="" className='add-province-cbb' onChange={() => {
            getDistristByProvinceID(province.current.value)
          }}>
            {provinces ? provinces.map((item) => {
              return <option value={item.ProvinceID}>{item.ProvinceName}</option>
            }) : ""}
          </select>
          <select ref={district} name="" id="" className='add-distrist-cbb' onChange={() => {
            getWardByProvinceID(district.current.value)
          }}>
            {districts ? districts.map((item) => {
              return <option value={item.DistrictID}>{item.DistrictName}</option>
            }) : ""}
          </select>
          <select ref={ward} name="" id="" className='add-ward-cbb'>
            {wards ? wards.map((item) => {
              return <option value={item.WardCode}>{item.WardName}</option>
            }) : ""}
          </select>
          <div className='add-ship-contact-input-container'>
            <span className='add-contact-title-pro5'>Tên người nhận: </span>
            <input ref={name} type="text" className='add-contact-input-pro5' />
            <span className='add-contact-title-pro5'>SĐT người nhận: </span>
            <input ref={sdt} type="text" className='add-contact-input-pro5' />
            <span className='add-contact-title-pro5'>Số nhà, đường phố: </span>
            <input ref={detail} type="text" className='add-contact-input-pro5' />
          </div>
          <span ref={error}></span>
          <div className='add-ship-contact-btn-container'>

            <div className='btn-add-new-contact-pro5 add-btn-ship-contact' onClick={() => {
              addNewShipContact()
            }}>Thêm</div>
            <div onClick={() => {
            }} className='btn-add-new-contact-pro5 back-btn-ship-contact'>Trở Lại</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AccountProfile;
