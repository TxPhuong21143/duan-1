import { useEffect, useState } from 'react'
import adminApi from '../api/AdminApi'
import '../css/PrintBill.css'


function PrintBill() {
    const [bill, setBill] = useState(undefined)
    const billId = JSON.parse(localStorage.getItem('printId'))
    useEffect(() => {
        const getData = async () => {
            const data = await adminApi.printBill(billId)
            setBill(data)
        }
        getData()
    }, [])
    if (bill) {
        console.log(bill)
    }
    return (
        <>
            <div className="print-title">SIXDO - SHOP</div>
            <div className='bill-code'>{bill ? bill.billCode : ""}</div>
            <div className='fix-margintop'></div>
            {bill ? bill.reveceiSdt ? <CustomerDetail name={bill.reveceiName} sdt={bill.reveceiSdt} address={bill.reveceiAddress} /> : <div className='gust-print'>Khách mua ngoài</div> : ""}
            <div className='employee-did'>
                <div className='title-print-cus1'>Nhân viên thực hiện:</div>
                <div className='detail-print-cus1'>{bill?bill.employeeName:""}</div>
            </div>
            <div className='employee-did'>
                <div className='title-print-cus1'>Ngày thanh toán:</div>
                <div className='detail-print-cus1'>{bill?bill.closeDate:""}</div>
            </div>
            <div className='fix-margintop'></div>
            <div className='header-print-row'>
                <div className='count-print-row'>STT</div>
                <div className='product-name-print-row'>Tên Sản Phẩm</div>
                <div className='quantity-print-row'>SL</div>
                <div className='price-print-row'>Giá</div>
                <div className='total-print-row'>Thành Tiền</div>
            </div>
            {bill ? bill.billDetailPrints.map((item, index) => {
                return <ProductItem item={item} index={index} />
            }) : ""}
            <div className='row-print-row'>
                <div className='half-column-print1'></div>
                <div className='half-column-print2'>
                    <div className='left-print-detail'>
                        <div className='row-analysis-detail'>Tổng tiền hàng:</div>
                        <div className='row-analysis-detail'>Phí vận chuyển:</div>
                        <div className='row-analysis-detail'>Freeship:</div>
                        <div className='row-analysis-detail'>SIXDO voucher:</div>
                        <div className='row-analysis-detail'>Tổng giá trị đơn hàng:</div>
                    </div>
                    <div className='right-print-detail'>
                        <div className='row-analysis-detail2'>{bill ? calcul(bill.total) + 'đ' : ""}</div>
                        <div className='row-analysis-detail2'>{bill ? calcul(bill.shipPrice) + 'đ' : ""}</div>
                        <div className='row-analysis-detail2'>{bill ? calcul(bill.freeShip) + 'đ' : ""}</div>
                        <div className='row-analysis-detail2'>{bill ? calcul(bill.voucher) + 'đ' : ""}</div>
                        <div className='row-analysis-detail2'>{bill ? calcul(bill.totalResult) + 'đ' : ""}</div>
                    </div>
                </div>
            </div>
           
        </>
    )
}
function CustomerDetail({ name, sdt, address }) {
    return (
        <>
            <div className='customer-detail-print'>
                <div className='title-print-cus'>
                    <div className=''>Tên khách hàng:</div>
                    <div className=''>Số điện thoại</div>
                    <div className=''>Địa chỉ:</div>
                </div>
                <div className='detail-print-cus'>
                    <div className=''>{name}</div>
                    <div className=''>{sdt}</div>
                    <div className=''>{address}</div>
                </div>
            </div>
        </>
    )
}
function ProductItem({ item, index }) {
    return (
        <>
            <div className='header-print-row-item'>
                <div className='count-print-row'>{index + 1}</div>
                <div className='product-name-print-row'>{item.productName}</div>
                <div className='quantity-print-row'>{item.quantity}</div>
                <div className='price-print-row'>{calcul(item.price)}đ</div>
                <div className='total-print-row'>{calcul(item.price * item.quantity)}đ</div>
            </div>
            <div className='fix-margintop'></div>
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
export default PrintBill