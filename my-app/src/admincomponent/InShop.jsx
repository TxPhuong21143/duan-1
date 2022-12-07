import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import adminApi from "../api/AdminApi"
import '../css/InShop.css'
const inShop = {
    UI: ({ setBodyOpt }) => {
        const [listProduct, setList] = useState(undefined)
        const [chosseProduct, setChosse] = useState([])
        const [productChose, setProductChose] = useState(undefined)
        async function searchTop5() {
            setList(await adminApi.searchTop5(searchInput.current.value.trim()))
        }
        const searchInput = useRef(0)
        function clear() {
            searchInput.current.value = ''

            setList(undefined)
        }
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getListId(chosseProduct)
                setProductChose(data)
            }
            getData()
            localStorage.setItem('listIdProductHoding', chosseProduct)
        }, [chosseProduct])
        async function createBill(){
            const data = {
                
            }
        }
        return (
            <>
                <div>Chọn sản phẩm</div>
                <div className="fix-margintop"></div>
                <div className="half-inshop margin-admin-inshop">
                    <input ref={searchInput} type="text" name="name" className="search-product-admin" placeholder="Tìm kiếm sản phẩm" onChange={() => {
                        searchTop5()
                    }} />
                    <div className="fix-marigintop"></div>
                    {listProduct ? listProduct.map((item) => {
                        return <inShop.ItemProduct clear={clear} item={item} setChosse={setChosse} chosseProduct={chosseProduct} type={1} />
                    }) : ""}
                    <div className="btn-create-bill-holding" onClick={() => {
                        const checkEmpty = localStorage.getItem('listIdProductHoding')
                        if (!checkEmpty) {
                            alert("Chọn một sản phẩm")
                            return
                        }
                        setBodyOpt(14)
                    }}>Tạo Hóa Đơn</div>
                </div>
                <div className="half-inshop1">
                    {productChose ? productChose.map((item) => {
                        return <inShop.ItemProduct clear={clear} item={item} setChosse={setChosse} chosseProduct={chosseProduct} type={2} />
                    }) : ""}
                </div>
            </>
        )
    },
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
    CreateBill: () => {
        const today = new Date()
        localStorage.setItem('listIdProductHoding', [1, 2, 3])
        const list = localStorage.getItem('listIdProductHoding')
        const listId = list.split(',')
        const [listProduct, setListProduct] = useState(undefined)
        localStorage.setItem('totalHodling', 0)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getListId(listId)
                setListProduct(data)
            }
            getData()
        }, [])
        const [totalProduct, setTotalProduct] = useState(0)
        async function createHoldingBillInShop() {
            const data = {
                receiverName: customName.current.value,
                accountDetailAddress: customAddress.current.value,
                accountPhoneNumber: customSdt.current.value
            }
            await adminApi.createBillHolding(data, JSON.parse(localStorage.getItem('auth')).id,1)
            alert("thành công!")
        }
        const customName = useRef(0)
        const customSdt = useRef(0)
        const customAddress = useRef(0)
        return (
            <>
                <div className='bill-detail-admin-item'>
                    <div className='header-bill'>
                        <div className='layout3 margin2'>
                            <div className='info-bill'>Thông Tin Đơn Hàng</div>
                            <div className='row-bill'>
                                <div className='left-title'>Nhân Viên Tạo: </div>
                                <div className='right-content'>{JSON.parse(localStorage.getItem('auth')).name}</div>
                            </div>
                            <div className='row-bill'>
                                <div className='left-title'>Ngày Tạo: </div>
                                <div className='right-content'>{today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}</div>
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
                                    <option value="5">CK+TM</option>
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
                            {listProduct ? listProduct.map((item) => {
                                return <inShop.DetailItem totalProduct={totalProduct} setTotalProduct={setTotalProduct} item={item} />
                            }) : ""}
                            <div className='result-bill'>
                                <div className='result-content'>
                                    <div className='row-result'>
                                        <div className='row-result-title'>Tổng tiền hàng: </div>
                                        <div className='row-result-content'>{calcul(totalProduct) + 'đ'}</div>
                                        <div className='row-result-title'>Phí vận chuyển: </div>
                                        <div className='row-result-content'>{'0đ'}</div>
                                        <div className='row-result-title'>Miễn phí ship: </div>
                                        <div className='row-result-content'>{'0đ'}</div>
                                        <div className='row-result-title'>Voucher SIXDO: </div>
                                        <div className='row-result-content'>{"0"}</div>
                                        <div className='row-result-title total-resultbill'>Tổng giá trị đơn hàng: </div>
                                        <div className='row-result-content'>{'đ'}</div>
                                    </div>
                                </div>
                            </div>

                            <div className='confirm-bill' onClick={() => {
                                createHoldingBillInShop()
                            }}>Thanh Toán</div>
                            <div className='cancel-bill'>Hàng Chờ</div>
                        </div>
                        <div className='body-right'>
                            <div className='contact-content-cus'>
                                <div className='contact-customer'>Thông tin khách hàng</div>
                                <input ref={customName} type="text" className='input-customname' placeholder="Tên khách hàng" />
                                <input ref={customSdt} type="text" className='input-customname' placeholder="Số điện thoại" />
                                <input ref={customAddress} type="text" className='input-customname' placeholder="Địa chỉ" />
                            </div>
                            <div className='fix-margintop'></div>
                            <div className='contact-content'>
                                <div className='contact-customer'>Khách hàng ghi chú</div>
                                <div className='contact-detail'></div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    },
    DetailItem: ({ item, setTotalProduct, totalProduct }) => {
        const [total, setTotal] = useState(0)
        function totalQuantity() {
            setTotal(input.current.value * item.shellPrice)
        }
        const input = useRef(0)
        let getTotalHolding = JSON.parse(localStorage.getItem('totalHolding'))
        return (
            <>
                <div className='item-detail-bill'>
                    <div className='col-img-item xy-center'><img src={"data:image/jpeg;base64," + item.productImgs[0].productImg} alt="" className='col-img-detail' /></div>
                    <div className='col-name-item xy-center'>{item.productName}</div>
                    <input onChange={() => {
                        getTotalHolding = getTotalHolding - total
                        totalQuantity()
                        if (input.current.value != '') {
                            getTotalHolding = getTotalHolding + (input.current.value * item.shellPrice)
                        }
                        setTotalProduct(getTotalHolding)
                        localStorage.setItem('totalHolding', getTotalHolding)
                    }} ref={input} type="number" className='col-quantity-item xy-center' />
                    <div className='col-shellPrice-item xy-center'>{calcul(item.shellPrice) + 'đ'}</div>
                    <div className='col-price-item xy-center'>{calcul(total) + 'đ'}</div>
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
export default inShop