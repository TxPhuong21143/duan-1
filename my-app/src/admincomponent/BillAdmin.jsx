import { useEffect } from 'react'
import '../css/BillAdmin.css'
import adminApi from '../api/AdminApi'
import { useState } from 'react'
import { useNavigate } from 'react-router'
const billAdmin = {
    WaitingBill: ({ lenguage, setBodyOpt, setDataBillDetail }) => {
        const [billWaiting, setBillWaiting] = useState(undefined)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getAllBillType(1)
                setBillWaiting(data)
            }
            getData()
        }, [])
        if (billWaiting) {
            console.log(billWaiting)
        }
        async function adminSetBill(opt, idBill) {
            if (opt === 1) {
                await adminApi.adminSetBill(1, idBill)
            }
            if (opt === 2) {
                await adminApi.adminSetBill(2, idBill)
            }
            setBillWaiting(await adminApi.getAllBillType(1))
        }
        return (
            <>
                <div className='product-admin-title'>{lenguage.bill.waitingBill.title}</div>
                {billWaiting ? billWaiting.length === 0 ? <div className='bill0'>{lenguage.bill.waitingBill.bill0}</div> : "" : ""}
                <div className='fix-margin1-bill'></div>
                {billWaiting ? billWaiting.map((item) => {
                    return <billAdmin.BillItem setDataBillDetail={setDataBillDetail} setBodyOpt={setBodyOpt} item={item} key={item.billId} adminSetBill={adminSetBill} type={1} lenguage={lenguage} />
                }) : ""}
            </>
        )
    },
    BillItem: ({ item, adminSetBill, type, lenguage, setBodyOpt, setDataBillDetail }) => {
        return (
            <>
                <div className='waitting-container' onClick={() => {
                    setBodyOpt(99)
                    setDataBillDetail(item)
                }}>
                    <div className='title-row-waitting'>
                        <div className='column-billcode column-title-waitting'>{lenguage.bill.common.billCode} <span> {item.billCode}</span></div>
                        <div className='column-createbill column-title-waitting'>{lenguage.bill.common.createDate} <span>{item.createBill}</span></div>
                        <div className='column-accountName column-title-waitting'>{lenguage.bill.common.accountName} <span>{item.customerName}</span></div>
                        <div className='column-reveiceName column-title-waitting'>{lenguage.bill.common.reveceiName}  <span>{item.reveceiName}</span></div>
                        <div className='column-reveiceSdt column-title-waitting'>{lenguage.bill.common.reveceiSDT}  <span>{item.reveceiSdt}</span></div>
                        <div className='column-shipMethod column-title-waitting'>{lenguage.bill.common.ship}  <span>{item.shipMethodName}</span></div>
                    </div>
                </div>
                {item.billDetailAnalyses.map((item) => {
                    return <billAdmin.BillDetailItem item={item} lenguage={lenguage} />
                })}
                <billAdmin.BillOption item={item} adminSetBill={adminSetBill} type={type} lenguage={lenguage} />
            </>
        )
    },
    BillDetailItem: ({ item, lenguage }) => {
        return (
            <>
                <div className='detail-container'>
                    <div className='product-detail-bill'><img src={"data:image/jpeg;base64," + item.productImg} alt="" className='product-img-bill' />
                        <span>{item.productName + " x" + " " + item.quantity}</span>
                    </div>
                    <div className='cacul-container'>
                        <span>{lenguage.bill.common.inventory} {item.quantityInventory}</span>
                    </div>
                    <div className='cacul-container'>
                        <span>{lenguage.bill.common.shellPrice} {calcul(item.shellprice) + 'đ'}</span>
                    </div>
                    <div className='cacul-container'>
                        <span>{lenguage.bill.common.total} {calcul(item.total) + 'đ'}</span>
                    </div>
                </div>
            </>
        )
    },
    BillOption: ({ item, adminSetBill, type, lenguage }) => {
        return (
            <>
                <div className='bill-option-admin'>
                    <div className='option-voucher'>
                        {item.voucherCode ? <div className='option-bill-item'>Voucher SIXDO: <span> {item.voucherCode}
                        </span></div> : ""}
                        {item.voucherShipCode ? <div className='option-bill-item'>Voucher Ship: <span>{item.voucherShipCode}
                        </span></div> : ""}
                        <div className='option-bill-item'>Ship: <span>{calcul(item.shipPrice) + 'đ'}
                        </span></div>
                        {item.notification ? <div className='option-bill-item'>KH: <span>{item.notification}</span></div> : ""}
                    </div>

                </div>
            </>
        )
    },
    ShippingBill: ({ lenguage, setBodyOpt, setDataBillDetail }) => {
        const [billShippng, setBillShipping] = useState(undefined)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getAllBillType(2)
                setBillShipping(data)
            }
            getData()
        }, [])
        return (
            <>
                <div className='product-admin-title'>{lenguage.bill.shipping}</div>
                {billShippng ? billShippng.length === 0 ? <div className='bill0'>{lenguage.bill.common.bill0}</div> : "" : ""}
                <div className='fix-margin1-bill'></div>
                {billShippng ? billShippng.map((item) => {
                    return <billAdmin.BillItem setDataBillDetail={setDataBillDetail} setBodyOpt={setBodyOpt} item={item} key={item.billId} adminSetBill={billShippng} lenguage={lenguage} />
                }) : ""}
            </>
        )
    },
    ShippedBill: ({ lenguage, setBodyOpt, setDataBillDetail }) => {
        const [billShipped, setBillShipped] = useState(undefined)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getAllBillType(3)
                setBillShipped(data)
            }
            getData()
        }, [])
        return (
            <>
                <div className='product-admin-title'>{lenguage.bill.shipped}</div>
                {billShipped ? billShipped.length === 0 ? <div className='bill0'>Không có đơn chờ</div> : "" : ""}
                <div className='fix-margin1-bill'></div>
                {billShipped ? billShipped.map((item) => {
                    return <billAdmin.BillItem setDataBillDetail={setDataBillDetail} setBodyOpt={setBodyOpt} item={item} key={item.billId} adminSetBill={billShipped} lenguage={lenguage} />
                }) : ""}
            </>
        )
    },
    BillDetail: ({ item }) => {
        let total = item.totalBill
        if (item.shipVoucher) {
            if (item.shipVoucher > 100) {
                total -= item.shipVoucher
            } else {
                total -= (total * item.shipVoucher) / 100
            }
        }
        if (item.voucherVoucher) {
            if (item.voucherVoucher > 100) {
                total -= item.voucherVoucher
            } else {
                total -= (total * item.voucherVoucher) / 100
            }
        }
        total += item.shipPrice
        async function adminSetBill(opt, idBill) {
            if (opt === 1) {
                await adminApi.adminSetBill(1, idBill, JSON.parse(localStorage.getItem('auth')).id)
            }
            if (opt === 2) {
                await adminApi.adminSetBill(2, idBill, JSON.parse(localStorage.getItem('auth')).id)
            }
        }
        const navi = useNavigate()
        return (
            <>
                <div className='bill-detail-admin-item'>
                    <div className='header-bill'>
                        <div className='layout3 margin2'>
                            <div className='info-bill'>Thông Tin Hóa Đơn</div>
                            <div className='row-bill'>
                                <div className='left-title'>Mã HĐ: </div>
                                <div className='right-content'>{item.billCode}</div>
                            </div>
                            <div className='row-bill'>
                                <div className='left-title'>Ngày Tạo: </div>
                                <div className='right-content'>{item.createBill}</div>
                            </div>
                            <div className='row-bill'><div className='left-title'>Trạng Thái Hóa Đơn: </div>
                                <div className='right-content'>{item.billStatus}</div></div>

                        </div>
                        <div className='layout3 margin2'> <div className='info-bill'>Thanh Toán</div>
                            <div className='row-bill'>
                                <div className='left-title'>{item.buyMethod}</div>
                            </div>
                            <div className='row-bill'>
                                <div className='left-title'>Trạng Thái Thanh Toán: </div>
                                <div className='right-content'>{item.buyStatus}</div>
                            </div>
                        </div>
                        <div className='layout3'> <div className='info-bill'>Vận Chuyển</div>
                            <div className='row-bill'>
                                <div className='left-title'>Hình Thức Vận Chuyển: </div>
                                <div className='right-content'>{item.reveceiMethod}</div>
                            </div>
                            <div className='row-bill'>
                                <div className='left-title'>Trạng Thái Giao Hàng:</div>
                                <div className='right-content'>{item.shipStatus}</div>
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
                            {item.billDetailAnalyses.map((item) => {
                                return <billAdmin.DetailItem item={item} />
                            })}
                            <div className='result-bill'>
                                <div className='result-content'>
                                    <div className='row-result'>
                                        <div className='row-result-title'>Tổng tiền hàng: </div>
                                        <div className='row-result-content'>{calcul(item.totalBill) + 'đ'}</div>
                                        <div className='row-result-title'>Phí vận chuyển: </div>
                                        <div className='row-result-content'>{calcul(item.shipPrice) + 'đ'}</div>
                                        <div className='row-result-title'>Miễn phí ship: </div>
                                        <div className='row-result-content'>{item.shipVoucher ? item.shipVoucher > 100 ? calcul(item.shipVoucher) + 'đ' : item.shipVoucher + '%' : '0'}</div>
                                        <div className='row-result-title'>Voucher SIXDO: </div>
                                        <div className='row-result-content'>{item.voucherVoucher ? item.voucherVoucher > 100 ? item.voucherVoucher + "đ" : item.voucherVoucher + '%' : "0"}</div>
                                        <div className='row-result-title total-resultbill'>Tổng giá trị đơn hàng: </div>
                                        <div className='row-result-content'>{calcul(total) + 'đ'}</div>
                                    </div>
                                </div>
                            </div>
                            {item.billStatusId === 1 ? 
                                <div className='confirm-bill' onClick={() => {
                                    adminSetBill(2, item.billId)
                                    localStorage.setItem('printId',item.billId)
                                    navi('/printf')
                                }}>Xác nhận đơn hàng</div> : ""}
                            {item.billStatusId === 1 ? <a href='/admin'><div className='cancel-bill' onClick={() => {
                                adminSetBill(1, item.billId)
                            }}>Hủy đơn hàng</div></a> : ""}
                        </div>
                        <div className='body-right'>
                            <div className='contact-content-cus'>
                                <div className='contact-customer'>Thông tin khách hàng</div>
                                <div className='contact-detail'>{item.reveceiContact}</div>
                                <div className='contact-detail'>{item.customerName}</div>
                                <div className='contact-detail'>{item.reveceiSdt}</div>
                            </div>
                            <div className='fix-margintop'></div>
                            <div className='contact-content'>
                                <div className='contact-customer'>Khách hàng ghi chú</div>
                                <div className='contact-detail'>{item.notification}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    },
    DetailItem: ({ item }) => {
        return (
            <>
                <div className='item-detail-bill'>
                    <div className='col-img-item xy-center'><img src={"data:image/jpeg;base64," + item.productImg} alt="" className='col-img-detail' /></div>
                    <div className='col-name-item xy-center'>{item.productName}</div>
                    <div className='col-quantity-item xy-center'>{item.quantity}</div>
                    <div className='col-shellPrice-item xy-center'>{item.shellprice}</div>
                    <div className='col-price-item xy-center'>{item.total}</div>
                </div>
            </>
        )
    }
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
export default billAdmin