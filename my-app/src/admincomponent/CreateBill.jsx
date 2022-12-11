import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import adminApi from '../api/AdminApi'
import { useNavigate } from 'react-router'
import inShop from './InShop'
function CreateBill({ setBodyOpt, billIdUpdate = null }) {
    localStorage.removeItem('customerName')
    localStorage.removeItem('customerSdt')
    localStorage.removeItem('customerAddress')
    localStorage.setItem('totalsum', 0)
    const [bill, setBill] = useState(undefined)
    const [billId, setBillId] = useState(0)
    // const [bill, setBill] = useState(undefined)
    useLayoutEffect(() => {
        const getData = async () => {
            let data;
            if (billIdUpdate) {
                data = await adminApi.getAllBillDetailOfBill(billIdUpdate)
                setBillId(billIdUpdate)
                setBill(data)
            }
            else {
                const dataId = await adminApi.createBillInShop(JSON.parse(localStorage.getItem('auth')).id)
                data = await adminApi.getAllBillDetailOfBill(dataId.billId)
                setBillId(dataId.billId)
                setBill(data)
            }
        }
        getData()
    }, [])

    const [totalProduct, setTotalProduct] = useState(0)
    // localStorage.setItem('totalHodling', 0)
    const customName = useRef(0)
    const customSdt = useRef(0)
    const customAddress = useRef(0)
    const searchInput = useRef(0)
    const voucher = useRef(0)
    const voucherDetail = useRef(0)
    const totalResult = useRef(0)
    const [listSearch, setList] = useState(undefined)
    async function searchTop5(opt) {
        if (opt === 1) {
            setList(undefined)
            return
        }
        setList(await adminApi.searchTop5(searchInput.current.value.trim()))
    }
    async function addProduct(idProduct) {
        await adminApi.addProduct2BillDetail(idProduct, billId)
        setBill(await adminApi.getAllBillDetailOfBill(billId))
    }
    async function deleteBillDetail(idBillDetail) {
        await adminApi.deleteBillDetail(idBillDetail)
        setBill(await adminApi.getAllBillDetailOfBill(billId))
    }
    async function updateBillDetailQuantity(idBillDetail, quantity) {
        await adminApi.updateBillDetailQuantity(idBillDetail, quantity)
        setBill(await adminApi.getAllBillDetailOfBill(billId))
    }
    async function payBill() {
        const data = {
            idBill: billId,
            idEmployee: JSON.parse(localStorage.getItem('auth')).id,
            idVoucher: voucher.current.value,
            idBuyMethod: 1,
            customerName: customName.current.value,
            customerSdt: customSdt.current.value,
            customAddress: customAddress.current.value
        }
        const valueVoucher = bill.sales.find((item)=>{
            return item.salesId == voucher.current.value
        })
        localStorage.setItem('valueSixdo',valueVoucher.salesInt+valueVoucher.salesPercent)
        localStorage.setItem('valueSixdoTitle',valueVoucher.salesCode)
        await adminApi.payHoldBill(data)
        alert("thành công")
    }
    const navi = useNavigate()
    return (
        <>
            <div className='bill-detail-admin-item'>
                <div className='header-bill'>
                    <div className='layout3 margin2'>
                        <div className='info-bill'>Thông Tin Đơn Hàng - Mã HĐ: {bill ? bill.bill.billCode : ""}</div>
                        <div className='row-bill'>
                            <div className='left-title'>Nhân Viên Tạo: </div>
                            <div className='right-content'>{JSON.parse(localStorage.getItem('auth')).name}</div>
                        </div>
                        <div className='row-bill'>
                            <div className='left-title'>Ngày Tạo: </div>
                            <div className='right-content'>{bill ? bill.bill.createDate : ""}</div>
                        </div>
                        <div className='row-bill'><div className='left-title'>Trạng Thái Hóa Đơn: </div>
                            <div className='right-content'>Chờ Thanh Toán</div></div>
                    </div>
                    <div className='layout3 margin2'> <div className='info-bill'>Thanh Toán</div>
                        <div className='row-bill'>
                            <div className='left-title'>Trạng Thái Thanh Toán: </div>
                            <div className='right-content'>Chờ Thanh Toán</div>
                        </div>
                        <div className='row-bill'>
                            <div className='left-title'>Phương Thức Thanh Toán: </div>
                            <select name="" id="" className='fix-heightselect'>
                                <option value="3">Chuyển Khoản</option>
                                <option value="4">Trả Tiền Mặt</option>
                            </select>
                        </div>
                    </div>
                    <div className='layout3'> <div className='info-bill'>Vận Chuyển</div>
                        <div className='row-bill'>
                            <div className='left-title'>Hình Thức Vận Chuyển: </div>
                            <div className='right-content'>Mua Tại Quầy</div>
                        </div>
                    </div>
                </div>
                <div className='fix-margintop'>
                </div>
                <div className='body-bill'>
                    <div className='body-left'>
                        <div className='body-bill-header'>Chi Tiết Đơn Hàng</div>
                        <div className='body-bill-title'>
                            <div className='col-img xy-center'>Ảnh</div>
                            <div className='col-name xy-center'>Tên Sản Phẩm</div>
                            <div className='col-quantity xy-center'>Số Lượng</div>
                            <div className='col-shellPrice xy-center'>Đơn Giá</div>
                            <div className='col-price xy-center'>Thành Tiền</div>
                        </div>
                        {bill ? bill.billDetailAndProductList.map((item) => {
                            return <inShop.DetailItem2 voucher={voucher} totalResult={totalResult} updateBillDetailQuantity={updateBillDetailQuantity} setTotalProduct={setTotalProduct} deleteBillDetail={deleteBillDetail} item={item} voucherDetail={voucherDetail} />
                        }) : ""}
                        <input ref={searchInput} type="text" name="name" className="search-product-hold" placeholder="Mua thêm sản phẩm" onChange={() => {
                            if (searchInput.current.value === '') {
                                searchTop5(1)
                                return
                            }
                            searchTop5(2)
                        }} />
                        {listSearch ? listSearch.map((item) => {
                            return <inShop.ItemProduct bill={bill} searchTop5={searchTop5} addProduct={addProduct} item={item} voucher={voucher} voucherDetail={voucherDetail} />
                        }) : ""}
                        <div className='result-bill'>
                            <div className='result-content'>
                                <div className='row-result'>
                                    <div className='row-result-title'>Tổng tiền hàng: </div>
                                    <div className='row-result-content totalbill2' value={totalProduct}>{calcul(totalProduct) + 'đ'}</div>
                                    <div className='row-result-title'>Phí vận chuyển: </div>
                                    <div className='row-result-content'>{'0đ'}</div>
                                    <div className='row-result-title'>Miễn phí ship: </div>
                                    <div className='row-result-content'>{'0đ'}</div>
                                    <div className='row-result-title'>Voucher SIXDO: </div>
                                    <div className='row-result-content voucherDetail' ref={voucherDetail}>Chưa chọn</div>
                                    <div className='row-result-title total-resultbill resultBill'>Tổng giá trị đơn hàng: </div>
                                    <div className='row-result-content' ref={totalResult}>{calcul(totalProduct) + 'đ'}</div>
                                </div>
                            </div>
                        </div>
                        <div className='confirm-bill' onClick={() => {
                            if (bill.billDetailAndProductList.length == 0) {
                                alert("Không thể thanh toán hóa đơn trống")
                            }
                            else {
                                payBill()
                                localStorage.setItem('printId', billId)
                                localStorage.setItem('customerName', customName.current.value.trim())
                                localStorage.setItem('customerSdt', customSdt.current.value.trim())
                                localStorage.setItem('customerAddress', customAddress.current.value.trim())
                                navi("/printf")
                            }
                        }}>Thanh Toán</div>
                        <div className='cancel-bill' onClick={() => {
                            setBodyOpt(15)
                        }}>Hàng Chờ</div>
                    </div>
                    <div className='body-right'>
                        <div className='contact-content-cus'>
                            <div className='contact-customer'>Thông tin khách hàng</div>
                            <input ref={customName} type="text" className='input-customname' placeholder="Tên khách hàng" />
                            <input ref={customSdt} type="text" className='input-customname' placeholder="Số điện thoại" />
                            <input ref={customAddress} type="text" className='input-customname' placeholder="Địa chỉ" />
                        </div>
                        <div className='fix-margintop'></div>
                        <div className='contact-content-hold'>
                            <div className='contact-customer'>Voucher SIXDO</div>
                            <select onChange={() => {
                                const sale = bill.sales.find((item) => {
                                    return item.salesId == voucher.current.value
                                })
                                if (sale) {
                                    voucherDetail.current.innerHTML = sale.salesName
                                    if (sale.salesPercent < 100 && sale.salesPercent > 0) {
                                        totalResult.current.innerHTML = calcul(totalProduct - (totalProduct * sale.salesPercent / 100)) + 'đ'
                                    }
                                    if (sale.salesInt > 0 && sale.salesInt > 100) {
                                        totalResult.current.innerHTML = calcul(totalProduct - sale.salesInt) + 'đ'
                                    }
                                } else {
                                    totalResult.current.innerHTML = calcul(totalProduct) + 'đ'
                                    voucherDetail.current.innerHTML = 'Không chọn'
                                }
                            }} ref={voucher} name="" id="" className="opt-voucher-hold">
                                <option value={0}>Chưa chọn</option>
                                {bill ? bill.sales.map((item) => {
                                    return <option value={item.salesId}>{item.salesName}</option>
                                }) : ""}
                            </select>
                        </div>
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
export default CreateBill