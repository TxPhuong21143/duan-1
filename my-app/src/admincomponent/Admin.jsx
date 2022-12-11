import '../css/Admin.css'
import lengua from './Langue'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import analysis from './Analysis'
import productAdmin from './ProductAdmin'
import billAdmin from './BillAdmin'
import voucher from './Voucher'
import inShop from './InShop'
import adminApi from '../api/AdminApi'
import CreateBill from './CreateBill'
function Admin({ setGuest, setLogin }) {
    const isAuth = JSON.parse(localStorage.getItem('auth'))
    const navi = useNavigate()
    useEffect(() => {
        if (isAuth) {
            if (isAuth.roleID === 3) {
                setGuest(true)
                navi("/")
            }
        }
        navi('/')
    }, [])
    const [lenguage, setLengua] = useState(lengua.vietnamese)
    const lenguaOpt = useRef(undefined)
    const lenguaOptShow = useRef(undefined)
    const accountOpt = useRef(undefined)
    const accountOptShow = useRef(undefined)
    useEffect(() => {
        lenguaOpt.current.onmouseover = () => {
            lenguaOptShow.current.classList.add('active')
        }
        lenguaOpt.current.onmouseout = () => {
            lenguaOptShow.current.classList.remove('active')
        }
        accountOpt.current.onmouseover = () => {
            accountOptShow.current.classList.add('active')
        }
        accountOpt.current.onmouseout = () => {
            accountOptShow.current.classList.remove('active')
        }
    }, [])
    function logOut() {
        localStorage.removeItem('auth')
        setGuest(true)
        setLogin(false)
        navi("/")
    }
    const [bodyOpt, setBodyOpt] = useState(1)
    const [dataBillDetail, setDataBillDetail] = useState({})
    return (
        <>
            <div className='admin-container'>
                <div className='navigator-admin'>
                    <div className='navigator-admin-title xy-center'>
                        <img src={require('../resour/cat-icon.png')} alt="" className='admin-icon-title' />
                        <span>SIXDO - ADMIN</span>
                    </div>
                    <NavTitle title={lenguage.sixdo.title} />
                    <NavRow content={lenguage.sixdo.shop} setBodyOpt={setBodyOpt} opt={1} />
                    <div className='fix-magrin-botton'></div>
                    <NavTitle title={lenguage.product.title} />
                    <NavRow content={lenguage.product.product} setBodyOpt={setBodyOpt} opt={2} />
                    <NavRow content={lenguage.product.addNew} setBodyOpt={setBodyOpt} opt={3} />
                    <NavRow content={lenguage.product.AddProperty.color.name} setBodyOpt={setBodyOpt} opt={4} />
                    <NavRow content={lenguage.product.AddProperty.producer.name} setBodyOpt={setBodyOpt} opt={5} />
                    <NavRow content={lenguage.product.AddProperty.brand.name} setBodyOpt={setBodyOpt} opt={6} />
                    <NavRow content={lenguage.product.AddProperty.size.name} setBodyOpt={setBodyOpt} opt={7} />
                    <div className='fix-magrin-botton'></div>
                    <NavTitle title={lenguage.bill.title} />
                    <NavRow content={lenguage.bill.wait} setBodyOpt={setBodyOpt} opt={8} />
                    <NavRow content={lenguage.bill.shipping} setBodyOpt={setBodyOpt} opt={9} />
                    <NavRow content={lenguage.bill.shipped} setBodyOpt={setBodyOpt} opt={10} />
                    {/* <NavRow content={lenguage.bill.back} setBodyOpt={setBodyOpt} opt={11} /> */}
                    <div className='fix-magrin-botton'></div>
                    <NavTitle title={lenguage.account.title} />
                    <NavRow content={"Khuyến Mại"} setBodyOpt={setBodyOpt} opt={11} />
                    <NavRow content={'Thêm Khuyến Mại'} setBodyOpt={setBodyOpt} opt={12} />
                    <div className='fix-magrin-botton'></div>
                    <NavTitle title={"Mua Tại Quầy"} />
                    <NavRow content={'Tạo HĐ'} setBodyOpt={setBodyOpt} opt={13} />
                    <NavRow content={'Hóa Đơn Chờ'} setBodyOpt={setBodyOpt} opt={15} />
                </div>
                <div className='header-admin'>
                    <div className='admin-icon-header'></div>
                    <div className='admin-header-navigator'>
                        <div ref={lenguaOpt} className='admin-lengua-icon xy-center'>
                            <img src={require('../resour/vietnam.png')} alt="" className='admin-lengua-icon-img' />
                            <div ref={lenguaOptShow} className='lengua-option'>
                                <div onClick={() => {
                                    setLengua(lengua.vietnamese)
                                }} className='admin-lengua-opt'><img src={require('../resour/vietnam.png')} alt="" className='admin-lengua-icon-img-opt' /> <span>Tiếng Việt</span></div>
                                <div onClick={() => {
                                    setLengua(lengua.english)
                                }} className='admin-lengua-opt'><img src={require('../resour/america.webp')} alt="" className='admin-lengua-icon-img-opt' /> <span>Tiếng Anh</span></div>
                            </div>
                        </div>
                        <div ref={accountOpt} className='admin-account xy-center'>{isAuth ? isAuth.name : ""}
                            <div ref={accountOptShow} className='account-option'>
                                <div className='account-opt'><span>Tài khoản</span></div>
                                <div className='account-opt' onClick={() => {
                                    logOut()
                                }}><span>Đăng xuất</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='fix-header-admin'></div>
                <div className='full-body'>
                    <div className='body-admin-content'>
                        {bodyOpt === 99 ? <billAdmin.BillDetail item={dataBillDetail} lenguage={lenguage} /> : ''}
                        {bodyOpt === 1 ? <analysis.Analysis lenguage={lenguage} /> : ''}
                        {bodyOpt === 2 ? <productAdmin.Product lenguage={lenguage} /> : ''}
                        {bodyOpt === 3 ? <productAdmin.AddProduct lenguage={lenguage} setBodyOpt={setBodyOpt} /> : ''}
                        {bodyOpt === 4 ? <productAdmin.AddProperty lenguage={lenguage} type={1} /> : ''}
                        {bodyOpt === 5 ? <productAdmin.AddProperty lenguage={lenguage} type={2} /> : ''}
                        {bodyOpt === 6 ? <productAdmin.AddProperty lenguage={lenguage} type={3} /> : ''}
                        {bodyOpt === 7 ? <productAdmin.AddProperty lenguage={lenguage} type={4} /> : ''}
                        {bodyOpt === 8 ? <billAdmin.WaitingBill setDataBillDetail={setDataBillDetail} lenguage={lenguage} setBodyOpt={setBodyOpt} /> : ''}
                        {bodyOpt === 9 ? <billAdmin.ShippingBill setDataBillDetail={setDataBillDetail} lenguage={lenguage} setBodyOpt={setBodyOpt} /> : ''}
                        {bodyOpt === 10 ? <billAdmin.ShippedBill setDataBillDetail={setDataBillDetail} lenguage={lenguage} setBodyOpt={setBodyOpt} /> : ''}
                        {bodyOpt === 11 ? <voucher.Voucher /> : ''}
                        {bodyOpt === 12 ? <voucher.CreateVoucher /> : ''}
                        {bodyOpt === 13 ? <CreateBill setBodyOpt={setBodyOpt} /> : ''}
                        {bodyOpt === 15 ? <inShop.HoldingBill setBodyOpt={setBodyOpt} /> : ''}
                        {bodyOpt === 16 ? <CreateBill setBodyOpt={setBodyOpt} billIdUpdate={JSON.parse(localStorage.getItem('holdbillid'))}/> : ''}
                    </div>
                </div>
            </div>
        </>
    )
}
function NavTitle({ title }) {
    return (
        <>
            <div className='admin-navigator-title'>
                <span>{title}</span>
            </div>
        </>
    )
}
function NavRow({ icon, content, setBodyOpt, opt }) {

    return (
        <>
            <div className='admin-navigator-row-container' onClick={() => {
                if (opt == 13) {
                    const createBill = async () => {
                        // const data = await adminApi.createBillInShop(JSON.parse(localStorage.getItem('auth')).id)
                        // localStorage.setItem('holdbillid', data.billId)
                    }
                    createBill()
                  
                }
                setBodyOpt(opt)
            }}>
                <span>{content}</span>
            </div>
        </>
    )
}
export default Admin