import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import adminApi from "../api/AdminApi"
import '../css/InShop.css'
const inShop = {
    ItemProduct: ({ item, setChosse, chosseProduct, clear, type }) => {
        return (
            <>
                <div className="fix-margintop8px"></div>
                <div className="search-item-contaier" onClick={() => {
                    if (type === 1) {
                        setChosse([...chosseProduct, item.productId])
                        clear()
                    }
                    if (type === 2) {
                        let arr = chosseProduct.filter((x) => {
                            return x != item.productId
                        })
                        setChosse(arr)
                        clear()
                    }
                }}>
                    <img src={"data:image/jpeg;base64," + item.productImgs[0].productImg} alt="" className="img-search" />
                    <div className="detail-product-search">

                        <div>{item.productDetail + '. số lượng còn '} <span className="quantity-search">{item.quantity}</span> </div>
                        <div className="price-search">{calcul(item.shellPrice) + 'đ'}</div>
                    </div>
                </div>
            </>
        )
    },
    ItemProduct: ({voucher,voucherDetail, bill, item, addProduct, searchTop5 }) => {
        return (
            <>
                <div className="fix-margintop8px"></div>
                <div className="search-item-contaier" onClick={() => {
                    let bol = false
                    bill.billDetailAndProductList.forEach(element => {
                        if (element.product.productId === item.productId) {
                            alert("Sản phẩm đã có!")
                            searchTop5(1)
                            bol = true
                        }
                    });
                    if (!bol) {
                        searchTop5(1)
                        addProduct(item.productId)
                        const totalvalue = document.querySelector('.totalbill2').attributes[1].nodeValue
                        localStorage.setItem('lastPrice', totalvalue)
                        voucher.current.value =0
                        voucherDetail.current.innerHTML ="Chưa chọn"
                    }
                }}>
                    <img src={"data:image/jpeg;base64," + item.productImgs[0].productImg} alt="" className="img-search" />
                    <div className="detail-product-search">
                        <div>{item.productDetail + '. số lượng còn '} <span className="quantity-search">{item.quantity}</span> </div>
                        <div className="price-search">{calcul(item.shellPrice) + 'đ'}</div>
                    </div>
                </div>
            </>
        )
    },
    DetailItem2: ({ voucherDetail,voucher, item, deleteBillDetail, updateBillDetailQuantity, setTotalProduct }) => {
        const input = useRef(0)
        const [total, setTotal] = useState(0)
        useEffect(() => {
            if (item.billDetail.quantity === null) {
                input.current.value = 0
                setTotal(item.billDetail.quantity * item.billDetail.price)
            } else {
                input.current.value = item.billDetail.quantity
                setTotal(item.billDetail.quantity * item.billDetail.price)
            }
        }, [])
        let total2 = JSON.parse(localStorage.getItem('totalsum'))
        if (total2) {
            setTotalProduct(total2 + (item.billDetail.quantity * item.billDetail.price))
            total2 += (item.billDetail.quantity * item.billDetail.price)
            localStorage.setItem('totalsum', total2)
            
        } else {
            setTotalProduct(item.billDetail.quantity * item.billDetail.price)
            localStorage.setItem('totalsum', item.billDetail.quantity * item.billDetail.price)
        }
        const [quantity, setQuantity] = useState(item.billDetail.quantity)
        return (
            <>
                <div className='item-detail-bill'>
                    <div className='col-img-item xy-center'><img src={"data:image/jpeg;base64," + item.product.productImgs[0].productImg} alt="" className='col-img-detail' /></div>
                    <div className='col-name-item xy-center'>{item.product.productName}</div>
                    <input min={1} onChange={(e) => {
                        // let totalBill = JSON.parse(localStorage.getItem('totalBill'))
                        // if(totalBill===null){
                        //     totalBill=0
                        // }
                        if (e.target.value > item.product.quantity) {
                            alert("Kho không đủ!")
                            input.current.value = item.product.quantity
                        } else {
                            updateBillDetailQuantity(item.billDetail.billDetailId, input.current.value)
                            setTotal(input.current.value * item.billDetail.price)
                            const totalvalue = document.querySelector('.totalbill2').attributes[1].nodeValue
                            setTotalProduct(totalvalue - (quantity * item.billDetail.price) + (input.current.value * item.billDetail.price))
                            setQuantity(input.current.value)
                            voucher.current.value =0
                            voucherDetail.current.innerHTML ="Chưa chọn"
                        }
                    }} ref={input} type="number" className='col-quantity-item xy-center' />
                    <div className='col-shellPrice-item xy-center'>{calcul(item.product.shellPrice) + 'đ'}</div>
                    <div className='col-price-item xy-center'>{calcul(total) + 'đ'}
                        <div className="delete-billdetail" onClick={() => {
                            deleteBillDetail(item.billDetail.billDetailId)
                            const totalvalue = document.querySelector('.totalbill2').attributes[1].nodeValue
                            setTotalProduct(totalvalue - (quantity * item.billDetail.price))
                            voucher.current.value =0
                        voucherDetail.current.innerHTML ="Chưa chọn"
                        }}>Xóa</div>
                    </div>
                </div>
            </>
        )
    },
    HoldingBill: ({ setBodyOpt }) => {
        const [holdingBill, setHoldingBill] = useState(undefined)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getAllHoldingBill()
                setHoldingBill(data)
            }
            getData()
        }, [])
        if (holdingBill) {
            console.log(holdingBill)
        }
        return (
            <>
                <div className='product-admin-title'>Hóa Đơn Chờ Thanh Toán</div>
                <div className='fix-margintop'></div>
                {holdingBill ? holdingBill.map((item) => {
                    return <inShop.HoldingItem setBodyOpt={setBodyOpt} item={item} />
                }) : ""}
            </>
        )
    },
    HoldingItem: ({ setBodyOpt, item }) => {
        return (
            <>
                <div className='waitting-container' onClick={() => {
                    localStorage.setItem('holdbillid', item.billId)
                    setBodyOpt(16)
                }}>
                    <div className='title-row-waitting'>
                        <div className='column-billcode-hold column-title-waitting'>Mã Hóa Đơn: <span> {item.billCode}</span></div>
                        <div className='column-createbill-hold column-title-waitting'>Ngày Tạo HD: <span>{item.createDate}</span></div>
                        <div className='column-shipMethod-hold column-title-waitting'>Vận Chuyển:  <span>Mua Tại Quầy</span></div>
                    </div>
                </div>
                {item.billDetails.map((item) => {
                    return <inShop.BillDetailItem item={item} />
                })}
                <div className="fix-margintop-hold"></div>
            </>
        )
    },
    BillDetailItem: ({ item }) => {
        const [product, setProduct] = useState(undefined)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.findProductById(item.productId)
                setProduct(data)
            }
            getData()
        }, [])
        return (
            <>
                <div className='detail-container fix-hold2' onClick={() => {

                }}>
                    <div className='product-detail-bill'><img src={product ? "data:image/jpeg;base64," + product.productImgs[0].productImg : ""} alt="" className='product-img-bill' />
                        <span>{product ? product.productName + " x" + " " + product.quantity : ""}</span>
                    </div>
                    <div className='cacul-container fix-hold'>
                        <span>Đơn giá: {product ? calcul(product.shellPrice) + 'đ' : "0"}</span>
                    </div>
                    <div className='cacul-container'>
                        <span>Số lượng: {item ? item.quantity : "0"}</span>
                    </div>
                </div>

            </>
        )
    },
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
export default inShop