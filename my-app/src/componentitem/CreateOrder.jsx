import '../css/CreateOrder.css'
import { ImLocation } from "react-icons/im";
import { useEffect } from 'react';
import getApiProduct from '../api/ProductAPI';
import { useState, useRef } from 'react';
import { ImFileText } from "react-icons/im";
import { useNavigate } from 'react-router-dom'
import shipApi from '../api/ShipApi';
function CreateOrder() {
    useEffect(() => {
        localStorage.removeItem('shipPrice')
        localStorage.removeItem('shipOpt')
        localStorage.removeItem('choseContact')
    }, [])
    const isAccountOnline = localStorage.getItem('auth')
    const navi = useNavigate()
    useEffect(() => {
        if (!isAccountOnline) {
            navi('/')
        }
    }, [])

    const listPay = JSON.parse(localStorage.getItem('listPay'))
    //   const account = JSON.parse(localStorage.getItem('auth'))
    const [calculResult, setCalculResult] = useState()
    const [priceAfterShip, setPriceAfterShip] = useState(0)
    const [shipPriceFix,setShipPriceFix] = useState(0)
    useEffect(() => {
        const getCalcul = async () => {
            const data = await getApiProduct.getCalculBag(listPay)
            setCalculResult(data)
        }
        getCalcul()
    }, [])
    const [shipComponent, setShowShip] = useState(false)
    const [voucherComponent, setShowVoucher] = useState(false)
    const [shipContact, setShipContact] = useState(false)
    const [fisrtTimeShow, setFisrtTimeShow] = useState(true)

    const [shipContactChose, setContactChose] = useState(JSON.parse(isAccountOnline).shipContacts.filter((item) => {
        return item.accountShipContactId === JSON.parse(localStorage.getItem('choseContact'))
    }))
    async function handleChose(chose) {
        localStorage.setItem('choseContact', JSON.stringify(chose.accountShipContactId))
        setContactChose([chose])
        const service = await shipApi.getServices(chose.districtID)
        const shipPrice = await shipApi.calculFee(service.data[0].service_id, priceAfterShip, chose.districtID, chose.wardID)
        localStorage.setItem('ghn', shipPrice.data.total)
    }
    let total = 0
    if (fisrtTimeShow && calculResult) {
        total = calculResult.orderItems.reduce((total, next) => {
            return total + next.product.shellPrice * next.quantity
        }, 0)
        setPriceAfterShip(total + calculResult.shipMethods[0].price)
        setFisrtTimeShow(false)
    }
    async function chooseShipOpt(opt) {
        localStorage.setItem('shipOpt', calculResult.shipMethods[opt].shipMethodId)
        if (opt === 0) {
            total = calculResult.orderItems.reduce((total, next) => {
                return total + next.product.shellPrice * next.quantity
            }, 0)
            // if (!shipContactChose) {
            //     setPriceAfterShip(total)
            //     return
            // }
            console.log(shipContactChose)
            const service = await shipApi.getServices(shipContactChose[0].districtID)
            const shipPrice = await shipApi.calculFee(service.data[0].service_id, priceAfterShip, shipContactChose[0].districtID, shipContactChose[0].wardID)
            localStorage.setItem('shipPrice', shipPrice.data.total)
            setPriceAfterShip(total + shipPrice.data.total)
            setShipPriceFix(shipPrice.data.total)
        }
        if (opt === 1) {
            total = calculResult.orderItems.reduce((total, next) => {
                return total + next.product.shellPrice * next.quantity
            }, 0)
            localStorage.setItem('shipPrice', calculResult.shipMethods[1].price)
            setPriceAfterShip(total + calculResult.shipMethods[1].price)
            setShipPriceFix(199000)
        }
    }
    const [showShipName, setShowShipName] = useState('')
    const [voucherName, setVoucherName] = useState('Chọn mã giảm giá!')
    const [voucherShipName, setVoucherShipName] = useState('Chọn mã FreeShip')
    const [shipVoucher, setShipVoucher] = useState(undefined)
    const [voucherVoucher, setVoucherVoucher] = useState(undefined)
    return (
        <>
            {shipContact === true ? <ShipContact setCalculResult={setCalculResult} setShipContact={setShipContact} id={JSON.parse(isAccountOnline).id} /> : ""}
            {shipComponent === true ? <OptionShip setShowShipName={setShowShipName} shipContactChose={shipContactChose} chooseShipOpt={chooseShipOpt} setShowShip={setShowShip} calculResult={calculResult} /> : ""}
            {voucherComponent === true ? <OptionVoucher setVoucherShipName={setVoucherShipName} setVoucherName={setVoucherName} setShipVoucher={setShipVoucher} setVoucherVoucher={setVoucherVoucher} setShowVoucher={setShowVoucher} calculResult={calculResult} /> : ""}
            <div className='fix-header'></div>
            <div className='create-order-container'>
                <div className='location-detail'>
                    <ImLocation className='icon-fixmargin' />
                    <span > địa chỉ nhận hàng</span>
                    {calculResult ? <ListContact handleChose={handleChose} listContacts={calculResult.accountShipContacts} key={Math.random()} /> : ""}
                    <span onClick={() => {
                        setShipContact(true)
                    }} className='location-choose'>Thêm địa chỉ nhận hàng</span>
                </div>
                {calculResult ? <ListProduct calculResult={calculResult} key={Math.random()} /> : ""}
                <ShipMethod showShipName={showShipName} priceAfterShip={priceAfterShip} setPriceAfterShip={setPriceAfterShip} setShowShip={setShowShip} calculResult={calculResult} />
                <AddVoucherBill voucherShipName={voucherShipName} voucherName={voucherName} setShowVoucher={setShowVoucher} />
                <ConfirmContainer priceAfterShip={priceAfterShip} shipPriceFix={shipPriceFix}/>
            </div>
        </>
    )
}
function ShipContact({ setShipContact, id, setCalculResult }) {
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
        getDistrist()
        getWardByProvinceID(districts[0].DistrictID)
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
            "accountId": id,
            "accountPhoneNumber": sdt.current.value,
            "districtID": district.current.value,
            "provinceID": province.current.value,
            "receiverName": name.current.value,
            "wardCode": ward.current.value
        }
        const listPay = JSON.parse(localStorage.getItem('listPay'))
        await getApiProduct.addNewShipContact(data)
        setShipContact(false)
        setCalculResult(await getApiProduct.getCalculBag(listPay))
    }
    const error = useRef(0)
    return (
        <>
            <div className='add-new-ship-contact'>
                <div className='add-new-ship-contact-container'>
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
                            <span className='add-contact-title'>Tên người nhận: </span>
                            <input ref={name} type="text" className='add-contact-input' />
                            <span className='add-contact-title'>SĐT người nhận: </span>
                            <input ref={sdt} type="text" className='add-contact-input' />
                            <span className='add-contact-title'>Số nhà, đường phố: </span>
                            <input ref={detail} type="text" className='add-contact-input' />
                        </div>
                        <span ref={error}></span>
                        <div className='add-ship-contact-btn-container'>

                            <div className='btn-add-new-contact add-btn-ship-contact' onClick={() => {
                                addNewShipContact()
                            }}>Thêm</div>
                            <div onClick={() => {
                                setShipContact(false)
                            }} className='btn-add-new-contact back-btn-ship-contact'>Trở Lại</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
function ShipMethod({ showShipName, priceAfterShip, setShowShip, calculResult }) {
    const noti = useRef(0)
    function setNotifi() {
        localStorage.setItem('noti', noti.current.value)
    }
    return (
        <>
            <div className='ship-method-container'>
                <div className='order-mes'>
                    <span className='order-mes-title'>Lời nhắn:</span>
                    <input ref={noti} onChange={() => {
                        setNotifi()
                    }} type="text" className='order-mes-input' />
                </div>
                <div className='ship-detail'>
                    <div className='column-fix-4'>
                        <span className='ship-title inline-marginleft12px'>Đơn vị vận chuyển:</span>
                    </div>
                    <div className='column-fix-4'><span className='inline-marginleft12px'>{showShipName}
                    </span></div>
                    <div className='column-fix-4 '><span className='inline-marginleft12px change-ship' onClick={() => {
                        setShowShip(true)
                    }}>Chọn phương thức</span></div>
                    <div className='column-fix-4'><span className='inline-marginleft12px add-left12px'>₫{calcul(priceAfterShip)}</span></div>
                </div>
                <div className='total-price-container'>
                    <div className='total-price'>
                        <span className='notification-aftership'>Tổng số tiền ({calculResult ? calculResult.orderItems.length : ""} sản phẩm):  </span>
                        <span className='price-after-ship'>₫{calcul(priceAfterShip) + "đ"}</span>
                    </div>
                </div>
            </div>
        </>)
}
function AddVoucherBill({ voucherName, voucherShipName, setShowVoucher }) {
    return (
        <>
            <div className='voucher-bill-container'>
                <div className='voucher-logo'>
                    <ImFileText className='icon-voucher' />
                    <span className='voucher-title'>SIXDO Voucher</span>
                </div>
                <div className='chose-opt'>
                    <span className='chose-voucher'>{voucherShipName}</span>
                    <span className='chose-voucher'>{voucherName}</span>
                </div>
                <div className='chosse-voucher'></div>
                <div onClick={() => {
                    setShowVoucher(true)
                }} className='btn-chosse'><span>Chọn voucher</span></div>
            </div>
        </>
    )
}
function ConfirmContainer({ priceAfterShip,shipPriceFix }) {
    const navi = useNavigate()
    const ghn = JSON.parse(localStorage.getItem('ghn'))
    function checkNull() {
        if (JSON.parse(localStorage.getItem("choseContact")) === null) {
            alert("chọn địa chỉ giao hàng!")
            return false
        }
        if (JSON.parse(localStorage.getItem("listPay")) === null) {
            alert("mất sản phẩm rồi :(((")
            return false
        }
        if (JSON.parse(localStorage.getItem('shipOpt')) === null) {
            alert("chọn phương thức giao hàng!")
            return false
        }
        if (JSON.parse(localStorage.getItem('shipPrice')) === null) {
            alert("GHN chưa tính được phí!")
            return false
        }
        alert("Thành Công.!")
        return true
    }
    const freeShipVoucher = JSON.parse(localStorage.getItem('freeshipvoucher'))
    let free = 0
    if (freeShipVoucher > 0 && freeShipVoucher < 100) {
        free = priceAfterShip * freeShipVoucher / 100
    } else {
        free = freeShipVoucher
    }
    const sixdoVoucher = JSON.parse(localStorage.getItem('sixdovoucher'))
    let sixdo = 0
    if (sixdoVoucher > 0 && sixdoVoucher < 100) {
        sixdo = priceAfterShip * sixdoVoucher / 100
    } else {
        sixdo = sixdoVoucher
    }
    async function createOrder() {
        if (!checkNull()) {
            return
        }
        const data = {
            "accountShipContactId": JSON.parse(localStorage.getItem("choseContact")),
            "shipOptId": JSON.parse(localStorage.getItem('shipOpt')),
            'buyOptId': 2,
            "shipVoucher": JSON.parse(localStorage.getItem('shipVoucher')),
            "voucherVoucher": JSON.parse(localStorage.getItem('voucherVoucher')),
            "buyerNotification": localStorage.getItem('noti'),
            "accountBags": JSON.parse(localStorage.getItem('listPay')),
            "shipPrice": JSON.parse(localStorage.getItem('shipPrice'))
        }
        const result = await getApiProduct.createBill(data)
        localStorage.removeItem('shipOpt')
        localStorage.removeItem('shipVoucher')
        localStorage.removeItem('voucherVoucher')
        localStorage.removeItem('noti')
        localStorage.removeItem('listPay')
        localStorage.removeItem('shipPrice')
        if (result === null) {
            alert("faild")
            return
        }
        navi('/my-order')
    }
    return (
        <>
            <div className='confirm-container'>
                <div className='buy-method-container'>
                    <div className='buy-method-title'><span className='buy-method-title-createorder'>Phương thức thanh toán</span></div>
                    <div className='buy-method-opt-createorder'><span className='buy-method-opt-createorder-detail'>Thanh toán khi nhận hàng</span></div>
                    <div className='btn-change-buy-method'><span className='btn-change-buy-method-btn'> </span></div>
                </div>
                <div className='confirm-show'>
                    <div className='show-opt-confirm'><span>Tổng tiền hàng: </span>
                        <span className='fix-confirm-price'>{calcul(priceAfterShip) + "đ"}</span></div>
                    <div className='show-opt-confirm'><span>Phí vận chuyển: </span>
                        <span className='fix-confirm-price'>{(ghn ? calcul(shipPriceFix) : "0") + "đ"}</span></div>
                    <div className='show-opt-confirm'><span>Tổng thanh toán: </span>
                        <span className='price-result-createorder fix-confirm-priceresult'>{calcul(priceAfterShip + ghn - free - sixdo) + "đ"}</span></div>
                </div>
                <div className='create-order-btn'>
                    <div className='create-order-btn-div' onClick={() => {
                        createOrder()
                    }}>Đặt Hàng</div>
                </div>
            </div>
        </>
    )
}
function ListProduct({ calculResult }) {
    return (
        <>
            <div className='list-container'>
                <div className='table-title-row'>
                    <div className='sanpham'><span className='fix-margin-sanpham'>Sản phẩm</span></div>
                    <div className='dongia'>Đơn giá</div>
                    <div className='soluong'>số lượng</div>
                    <div className='thanhtien'>thành tiền</div>
                </div>
                {calculResult.orderItems.map((item) => {
                    return <Product item={item} sales={calculResult.salesOfBillDetail} key={Math.random()} />
                })}
            </div>
        </>
    )
}
function Product({ item }) {
    return (
        <>
            <div className='item-container'>
                <div className='category-location'>{item.categoryType.categoryTypeDetail + " / " + item.product.productName}</div>
                <div className='order-detail'>
                    <div className='product-detail'>
                        <img src={"data:image/jpeg;base64," + item.product.productImgs[0].productImg} alt="" className='product-img' />
                        <div className='product-name'>{item.product.productDetail}</div>
                    </div>
                    <div className='dongia row-item'>{"đ" + calcul(item.product.shellPrice)}</div>
                    <div className='soluong row-item'><span className='fix-alittlebit'>
                        {item.quantity}</span></div>
                    <div className='thanhtien row-item'>{calcul(item.product.shellPrice * item.quantity)}</div>

                </div>
            </div>
        </>
    )
}
function ListContact({ listContacts, handleChose }) {
    return (
        <>
            {listContacts.map((contact) => {
                return <Contact handleChose={handleChose} contact={contact} key={Math.random()} />
            })}
        </>
    )
}
function Contact({ contact, handleChose }) {
    const chose = JSON.parse(localStorage.getItem('choseContact'))
    let isSelected
    if (chose === contact.accountShipContactId) {
        isSelected = true
    }
    return (
        <>
            <div className='contact-container'>
                <input checked={isSelected} type="radio" name="contact" className='check-contact' onChange={() => {
                    handleChose(contact)
                }} />
                <div className='name-sdt'>{contact.receiverName + " " + contact.accountPhoneNumber}</div>
                <span className='contact-detail-create'>{contact.accountDetailAddress}</span>
            </div>
        </>
    )
}
function OptionShip({ setShowShipName, setShowShip, calculResult, chooseShipOpt }) {
    const ghn = JSON.parse(localStorage.getItem('ghn'))
    const opt1 = useRef(undefined)
    const opt2 = useRef(undefined)
    let shipMethods
    if (calculResult) {
        shipMethods = calculResult.shipMethods
    }
    let option = 0
    function chooseShipMethod(opt) {
        if (opt === 0) {
            opt1.current.classList.add('ship-method-creaete-order-active')
            opt2.current.classList.remove('ship-method-creaete-order-active')
            option = 0

        }
        if (opt === 1) {
            opt2.current.classList.add('ship-method-creaete-order-active')
            opt1.current.classList.remove('ship-method-creaete-order-active')
            option = 1
        }
    }
    return (
        <>
            <div className='full-device'>
                <div className='ship-method-container-create-order'>
                    <div className='ship-method-create-order-container'>
                        <div className='ship-method-create-order-title'>
                            <p className='create-order-ship-title-main'>Chọn đơn vị vận chuyển</p>
                            <span className='create-order-ship-title-main2'>Kệnh vận chuyển được hỗ trợ bởi SIXDO</span>
                            <span className='create-order-ship-title-main3'>Khi nhận hàng vui lòng xác nhận hàng với Shipper:</span>
                        </div>
                        <div className='ship-create-order-opt'>
                            <div ref={opt1} onClick={() => {
                                chooseShipMethod(0)
                            }} className='ship-create-order ship-method-creaete-order-active'>
                                <div className='ship-create-order-content '>
                                    <span className='ship-opt-name'>{calculResult ? shipMethods[0].shipMethodName : ""}</span>
                                    <span className='ship-opt-receive-date'>Dự kiến nhận hàng sau 5 ngày kể từ ngày đặt.</span>
                                    <span className='ship-opt-price'>{calculResult ? calcul(ghn) + 'đ' : ""}</span>
                                </div>
                            </div>
                            <div ref={opt2} onClick={() => {
                                chooseShipMethod(1)
                            }} className='ship-create-order'>
                                <div className='ship-create-order-content'>
                                    <span className='ship-opt-name'>{calculResult ? shipMethods[1].shipMethodName : ""}</span>
                                    <span className='ship-opt-receive-date'>Dự kiến nhận hàng trong ngày hoặc từ 1-2 ngày chỉ áp dụng với nội thành Hà Nội.</span>
                                    <span className='ship-opt-price'>{calculResult ? calcul(shipMethods[1].price) + 'đ' : ""}</span>
                                </div>
                            </div>
                        </div>
                        <div className='ship-method-btn-create-order'>
                            <div onClick={() => {
                                chooseShipOpt(option)
                                setShowShipName(calculResult.shipMethods[option].shipMethodName)
                                setShowShip(false)
                            }} className='create-order-btn-ship create-order-ship-finish-btn'>hoàn thành</div>
                            <div onClick={() => {
                                setShowShip(false)
                            }} className='create-order-btn-ship create-order-ship-comback-btn'>trở lại</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
function OptionVoucher({ setVoucherShipName, setVoucherName, setShowVoucher, calculResult, setShipVoucher, setVoucherVoucher }) {
    let shipVoucher = 0
    let voucherVoucher = 0
    function setShip(opt) {
        shipVoucher = opt
    }
    function setVoucherOpt(opt) {
        voucherVoucher = opt
    }
    function returnOptVoucher2CreateOrder() {
        if (shipVoucher) {
            localStorage.setItem('shipVoucher', shipVoucher)
            setShipVoucher(shipVoucher)
        }
        if (voucherVoucher) {
            localStorage.setItem('voucherVoucher', voucherVoucher)
            setVoucherVoucher(voucherVoucher)
        }
    }
    function clearAndSetActive(type, index) {
        if (type === 1) {
            let listShip = document.querySelectorAll('.voucher-ship')
            let itemActive = document.querySelector(".active-shipVoucher")
            if (itemActive) {
                itemActive.classList.remove('active-shipVoucher')
            }
            listShip[index].classList.add('active-shipVoucher')
        }
        if (type === 2) {
            let listSixDO = document.querySelectorAll('.voucher-voucher')
            let itemActive = document.querySelector(".active-voucher")
            if (itemActive) {
                itemActive.classList.remove('active-voucher')
            }
            listSixDO[index].classList.add('active-voucher')
        }
    }
    return (
        <>
            <div className='full-device'>
                <div className='voucher-method-container-create-order'>
                    <div className='voucher-method-create-order-container'>
                        <div className='ship-method-create-order-title'>
                            <p className='create-order-ship-title-main'>Chọn SIXDO Voucher</p>
                            <span className='create-order-ship-title-main2'>Kệnh vận chuyển được hỗ trợ bởi SIXDO</span>
                            <span className='create-order-ship-title-main3'>Khi nhận hàng vui lòng xác nhận hàng với Shipper:</span>
                        </div>
                        <div>
                            {calculResult.salesOfBill.filter((item) => {
                                const today = new Date()
                                return item.saleTypeId === 1  && new Date(item.endDate) > today
                            }).map((item, index) => {
                                return <VoucherItem index={index} clearAndSetActive={clearAndSetActive} item={item} type={1} setShip={setShip} setVoucherOpt={setVoucherOpt} />
                            })}
                        </div>
                        <div className='ship-method-create-order-title'>
                            <span className='create-order-ship-title-main2'>Giảm giá và khuyến mãi</span>
                            <span className='create-order-ship-title-main3'>Có thể chọn 1 voucher</span>
                        </div>
                        <div>
                            {calculResult.salesOfBill.filter((item) => {
                                  const today = new Date()
                                return item.saleTypeId === 2 && new Date(item.endDate) > today
                            }).map((item, index) => {
                                return <VoucherItem clearAndSetActive={clearAndSetActive} item={item} index={index} type={2} setShip={setShip} setVoucherOpt={setVoucherOpt} />
                            })}
                        </div>
                        <div className='ship-method-btn-create-order'>
                            <div onClick={() => {
                                console.log(calculResult.salesOfBill)
                                returnOptVoucher2CreateOrder()
                                let ship = calculResult.salesOfBill.find((item) => {
                                    return item.salesId === shipVoucher
                                })
                                let voucher = calculResult.salesOfBill.find((item) => {
                                    return item.salesId === voucherVoucher
                                })
                                if (ship) {
                                    setVoucherShipName(ship.salesCode)
                                }
                                if (voucher) {
                                    setVoucherName(voucher.salesCode)
                                }
                                setShowVoucher(false)
                            }} className='create-order-btn-ship create-order-ship-finish-btn'>hoàn thành</div>
                            <div onClick={() => {
                                setShowVoucher(false)
                            }} className='create-order-btn-ship create-order-ship-comback-btn'>trở lại</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
function VoucherItem({ clearAndSetActive, item, index, type, setShip, setVoucherOpt }) {
    return (
        <>
            <div className={type === 1 ? 'voucher-ship-item-container voucher-ship' : 'voucher-item-container voucher-voucher'} onClick={() => {
                if (type === 1) {
                    setShip(item.salesId)
                    clearAndSetActive(1, index)
                    localStorage.setItem('freeshipvoucher', item.salesInt + item.salesPercent)
                }
                if (type === 2) {
                    setVoucherOpt(item.salesId)
                    clearAndSetActive(2, index)
                    localStorage.setItem('sixdovoucher', item.salesInt + item.salesPercent)
                }
            }}>
                <div className='voucher-item-icon'>
                    {type === 1 ? <img src={require("../resour/free-shipping-icon.png")} alt="" className='img-icon-voucher-free-ship' /> : <img src={require("../resour/logosixdovoucher.jpeg")} alt="" className='img-icon-voucher-free-ship' />}
                </div>
                <div className='voucher-item-content'>
                    <div className='voucher-content'>
                        <span className='voucher-content-title'>{item.salesCode}</span>
                        <span className='voucher-content-detail'>{item.salesName}</span>
                        <span className='voucher-content-detail'>Hạn sử dụng đến {item.endDate}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
function calcul(number) {
    let price = number + "";
    let resultPrice = "";
    let counter = 0;
    for (let i = price.length - 1; i >= 0; i--) {
        if (counter === 3) {
            resultPrice += ".";
            counter = 0;
        }
        resultPrice += price[i];
        counter++;
    }
    return resultPrice.split("").reverse().join("");
}
export default CreateOrder