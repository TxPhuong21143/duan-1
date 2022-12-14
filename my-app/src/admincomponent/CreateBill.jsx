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
        alert("th??nh c??ng")
    }
    const navi = useNavigate()
    return (
        <>
            <div className='bill-detail-admin-item'>
                <div className='header-bill'>
                    <div className='layout3 margin2'>
                        <div className='info-bill'>Th??ng Tin ????n H??ng - M?? H??: {bill ? bill.bill.billCode : ""}</div>
                        <div className='row-bill'>
                            <div className='left-title'>Nh??n Vi??n T???o: </div>
                            <div className='right-content'>{JSON.parse(localStorage.getItem('auth')).name}</div>
                        </div>
                        <div className='row-bill'>
                            <div className='left-title'>Ng??y T???o: </div>
                            <div className='right-content'>{bill ? bill.bill.createDate : ""}</div>
                        </div>
                        <div className='row-bill'><div className='left-title'>Tr???ng Th??i H??a ????n: </div>
                            <div className='right-content'>Ch??? Thanh To??n</div></div>
                    </div>
                    <div className='layout3 margin2'> <div className='info-bill'>Thanh To??n</div>
                        <div className='row-bill'>
                            <div className='left-title'>Tr???ng Th??i Thanh To??n: </div>
                            <div className='right-content'>Ch??? Thanh To??n</div>
                        </div>
                        <div className='row-bill'>
                            <div className='left-title'>Ph????ng Th???c Thanh To??n: </div>
                            <select name="" id="" className='fix-heightselect'>
                                <option value="3">Chuy???n Kho???n</option>
                                <option value="4">Tr??? Ti???n M???t</option>
                            </select>
                        </div>
                    </div>
                    <div className='layout3'> <div className='info-bill'>V???n Chuy???n</div>
                        <div className='row-bill'>
                            <div className='left-title'>H??nh Th???c V???n Chuy???n: </div>
                            <div className='right-content'>Mua T???i Qu???y</div>
                        </div>
                    </div>
                </div>
                <div className='fix-margintop'>
                </div>
                <div className='body-bill'>
                    <div className='body-left'>
                        <div className='body-bill-header'>Chi Ti???t ????n H??ng</div>
                        <div className='body-bill-title'>
                            <div className='col-img xy-center'>???nh</div>
                            <div className='col-name xy-center'>T??n S???n Ph???m</div>
                            <div className='col-quantity xy-center'>S??? L?????ng</div>
                            <div className='col-shellPrice xy-center'>????n Gi??</div>
                            <div className='col-price xy-center'>Th??nh Ti???n</div>
                        </div>
                        {bill ? bill.billDetailAndProductList.map((item) => {
                            return <inShop.DetailItem2 voucher={voucher} totalResult={totalResult} updateBillDetailQuantity={updateBillDetailQuantity} setTotalProduct={setTotalProduct} deleteBillDetail={deleteBillDetail} item={item} voucherDetail={voucherDetail} />
                        }) : ""}
                        <input ref={searchInput} type="text" name="name" className="search-product-hold" placeholder="Mua th??m s???n ph???m" onChange={() => {
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
                                    <div className='row-result-title'>T???ng ti???n h??ng: </div>
                                    <div className='row-result-content totalbill2' value={totalProduct}>{calcul(totalProduct) + '??'}</div>
                                    <div className='row-result-title'>Ph?? v???n chuy???n: </div>
                                    <div className='row-result-content'>{'0??'}</div>
                                    <div className='row-result-title'>Mi???n ph?? ship: </div>
                                    <div className='row-result-content'>{'0??'}</div>
                                    <div className='row-result-title'>Voucher SIXDO: </div>
                                    <div className='row-result-content voucherDetail' ref={voucherDetail}>Ch??a ch???n</div>
                                    <div className='row-result-title total-resultbill resultBill'>T???ng gi?? tr??? ????n h??ng: </div>
                                    <div className='row-result-content' ref={totalResult}>{calcul(totalProduct) + '??'}</div>
                                </div>
                            </div>
                        </div>
                        <div className='confirm-bill' onClick={() => {
                            if (bill.billDetailAndProductList.length == 0) {
                                alert("Kh??ng th??? thanh to??n h??a ????n tr???ng")
                            }
                            else {
                                payBill()
                                localStorage.setItem('printId', billId)
                                localStorage.setItem('customerName', customName.current.value.trim())
                                localStorage.setItem('customerSdt', customSdt.current.value.trim())
                                localStorage.setItem('customerAddress', customAddress.current.value.trim())
                                navi("/printf")
                            }
                        }}>Thanh To??n</div>
                        <div className='cancel-bill' onClick={() => {
                            setBodyOpt(15)
                        }}>H??ng Ch???</div>
                    </div>
                    <div className='body-right'>
                        <div className='contact-content-cus'>
                            <div className='contact-customer'>Th??ng tin kh??ch h??ng</div>
                            <input ref={customName} type="text" className='input-customname' placeholder="T??n kh??ch h??ng" />
                            <input ref={customSdt} type="text" className='input-customname' placeholder="S??? ??i???n tho???i" />
                            <input ref={customAddress} type="text" className='input-customname' placeholder="?????a ch???" />
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
                                        totalResult.current.innerHTML = calcul(totalProduct - (totalProduct * sale.salesPercent / 100)) + '??'
                                    }
                                    if (sale.salesInt > 0 && sale.salesInt > 100) {
                                        totalResult.current.innerHTML = calcul(totalProduct - sale.salesInt) + '??'
                                    }
                                } else {
                                    totalResult.current.innerHTML = calcul(totalProduct) + '??'
                                    voucherDetail.current.innerHTML = 'Kh??ng ch???n'
                                }
                            }} ref={voucher} name="" id="" className="opt-voucher-hold">
                                <option value={0}>Ch??a ch???n</option>
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