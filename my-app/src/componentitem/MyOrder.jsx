import "../css/MyOrder.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getApiProduct from "../api/ProductAPI";
function MyOrder() {
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
  const [order, setOrder] = useState(undefined);
  const [showWhich, setOrderShow] = useState(0);
  useEffect(() => {
    const getOrder = async () => {
      const data = await getApiProduct.getOrder(id);
      setOrder(data);
    };
    getOrder();
  }, [id]);
  function orderShow(opt) {
    setOrderShow(opt);
  }
  function setHigh(opt){
    const navs = document.querySelectorAll('.sethigh')
    for(const nav of navs){
      nav.classList.remove('active-myorder')
    }
    navs[opt].classList.add('active-myorder')
  }
  return (
    <>
      <div className="fix-header"></div>
      <div className="my-order-container">
        <div className="left-nav">
          <div className="order-manager">Đơn hàng</div>
          <div
            className="btn order-nav all-order sethigh active-myorder"
            onClick={() => {
              orderShow(0);
              setHigh(0)
            }}
          >
            tất cả
          </div>
          <div
            className="btn order-nav order-waitting sethigh"
            onClick={() => {
              orderShow(1);
              setHigh(1)
            }}
          >
            chờ xác nhận
          </div>
          <div
            className="btn order-nav order-shipping sethigh"
            onClick={() => {
              orderShow(2);
              setHigh(2)
            }}
          >
            đang giao
          </div>
          <div
            className="btn order-nav order-done sethigh"
            onClick={() => {
              orderShow(3);
              setHigh(3)
            }}
          >
            đã giao
          </div>
          <div
            className="btn order-nav order-cancel sethigh"
            onClick={() => {
              orderShow(4);
              setHigh(4)
            }}
          >
            đã hủy
          </div>
        </div>
        <div className="right-order-status">
          {order
            ? showWhich === 0
              ? order.map((order) => {
                return <AllOrderType setOrder={setOrder} order={order} key={order.bill.billId} />;
              })
              : showWhich === 1
                ? order
                  .filter((item) => {
                    return item.billStatus.billStatusId === 1;
                  })
                  .map((order) => {
                    return (
                      <AllOrderType setOrder={setOrder} order={order} key={order.bill.billId} />
                    );
                  })
                : showWhich === 2
                  ? order
                    .filter((item) => {
                      return item.billStatus.billStatusId === 2;
                    })
                    .map((order) => {
                      return (
                        <AllOrderType setOrder={setOrder} order={order} key={order.bill.billId} />
                      );
                    })
                  : showWhich === 3
                    ? order
                      .filter((item) => {
                        return item.billStatus.billStatusId === 3;
                      })
                      .map((order) => {
                        return (
                          <AllOrderType setOrder={setOrder} order={order} key={order.bill.billId} />
                        );
                      })
                    : showWhich === 4
                      ? order
                        .filter((item) => {
                          return item.billStatus.billStatusId === 4 || item.billStatus.billStatusId === 5;
                        })
                        .map((order) => {
                          return (
                            <AllOrderType setOrder={setOrder} order={order} key={order.bill.billId} />
                          );
                        })
                      : "" : ""}
        </div>
      </div>
    </>
  );
}

function AllOrderType({ setOrder, order }) {
  let shipMethod = "";
  let buyMethod = "";
  let billStatus = "";
  let productBillDetail = [];
  let freeShip = ''
  let voucherSIXDO = ''
  let accountShipContact = order.accountShipContact;
  let bill = ''
  if (order) {
    shipMethod = order.shipMethod;
    freeShip = order.freeShip
    voucherSIXDO = order.voucherSIXDO
    buyMethod = order.buyMethod;
    billStatus = order.billStatus;
    productBillDetail = order.productBillDetails;
    bill = order.bill
  }
  return (
    <>
      <div className="order-container">
        <div className="order-product-title">
          <div className="ship-buy-type">
            {shipMethod.shipMethodName} | {buyMethod.buyMethodName} |{" "}
            {"Giao hàng đến: " + accountShipContact.accountDetailAddress}
          </div>
          <div className="this-order-status">{billStatus.billStatusDetail}</div>
        </div>
        {productBillDetail.map((item) => {
          return <BillDetail item={item} key={Math.random()} />;
        })}
        {billStatus.billStatusId === 1 ? <OptionWait setOrder={setOrder} freeShip={freeShip} voucherSIXDO={voucherSIXDO} bill={bill} /> : ""}
        {billStatus.billStatusId === 2 ? <OptionShipping setOrder={setOrder} freeShip={freeShip} voucherSIXDO={voucherSIXDO} bill={bill} /> : ""}
        {billStatus.billStatusId === 3 ? <OptionShipped setOrder={setOrder} freeShip={freeShip} voucherSIXDO={voucherSIXDO} bill={bill} /> : ""}
        {billStatus.billStatusId === 4 ? <OptionCancel setOrder={setOrder} freeShip={freeShip} voucherSIXDO={voucherSIXDO} bill={bill} /> : ""}
        {billStatus.billStatusId === 5 ? <OptionCancel setOrder={setOrder} freeShip={freeShip} voucherSIXDO={voucherSIXDO} bill={bill} /> : ""}
      </div>
    </>
  );
}

function OptionWait({ setOrder, bill, voucherSIXDO, freeShip }) {
  let total = bill.totalBill
  if (voucherSIXDO !== null) {
    if (voucherSIXDO > 100) {
      total = total - voucherSIXDO
    } else {
      total = total - (total * voucherSIXDO) / 100
    }
  }
  if (freeShip !== null) {
    total = total - freeShip
  }
  total += bill.shipPrice
  return (
    <>
      <div className="total-container">
        <div className="fix-total">
          <div className="fix-wid"></div>
          <div className="total-price-myorder">
            <span className="detail-text">
              Phí Ship: <span className="fix-font-myorder">
                {calcul(bill.shipPrice) + "đ"}</span>
            </span>
            <span className="detail-text">
              FreeShip: <span className="fix-font-myorder">{freeShip ? calcul(freeShip) + "đ" : "0đ"}</span>
            </span>
            <span className="detail-text">
              Voucher SIXDO: <span className="fix-font-myorder">{voucherSIXDO ? voucherSIXDO > 100 ? calcul(voucherSIXDO) + "đ" : voucherSIXDO + "%" : "0đ"}</span>
            </span>
            <del className="detail-text">
              {calcul(bill.totalBill+bill.shipPrice) + "đ"}
            </del>
            <span className="total-text">
              Total: {calcul(total) + "đ"}
            </span>
          </div>
        </div>
        <div className="btn-opt">
          <div className="fix-widbtn"></div>
          <div className="btn-item-wait btn-item" onClick={() => {
            cancel(bill.billId, 2, setOrder)
          }}>
            <span className="btn_title">Hủy Đơn</span>
          </div>
        </div>
      </div>
    </>
  );
}

function OptionShipping({ setOrder, bill, voucherSIXDO, freeShip }) {
  let total = bill.totalBill
  if (voucherSIXDO !== null) {
    if (voucherSIXDO > 100) {
      total = total - voucherSIXDO
    } else {
      total = total - (total * voucherSIXDO) / 100
    }
  }
  if (freeShip !== null) {
    total = total - freeShip
  }
  total += bill.shipPrice
  return (
    <>
      <div className="total-container">
        <div className="fix-total">
          <div className="fix-wid"></div>
          <div className="total-price-myorder">
            <span className="detail-text">
              Phí Ship: <span className="fix-font-myorder">
                {calcul(bill.shipPrice) + "đ"}</span>
            </span>
            <span className="detail-text">
              FreeShip: <span className="fix-font-myorder">{freeShip ? calcul(freeShip) + "đ" : "0đ"}</span>
            </span>
            <span className="detail-text">
              Voucher SIXDO: <span className="fix-font-myorder">{voucherSIXDO ? voucherSIXDO > 100 ? calcul(voucherSIXDO) + "đ" : voucherSIXDO + "%" : "0đ"}</span>
            </span>
            <del className="detail-text">
              {bill.totalBill + "đ"}
            </del>
            <span className="total-text">
              Total: {calcul(total) + "đ"}
            </span>
          </div>
        </div>
        <div className="btn-opt">
          <div className="fix-widbtn"></div>
          <div className="btn-item-wait btn-item" onClick={() => {
            cancel(bill.billId, 3, setOrder)
          }}>
            <span className="btn_title">Hủy Đơn</span>
          </div>
        </div>
      </div>
    </>
  );
}
function OptionShipped({ bill, voucherSIXDO, freeShip }) {
  const navi = useNavigate()
  let total = bill.totalBill
  if (voucherSIXDO !== null) {
    if (voucherSIXDO > 100) {
      total = total - voucherSIXDO
    } else {
      total = total - (total * voucherSIXDO) / 100
    }
  }
  if (freeShip !== null) {
    total = total - freeShip
  }
  total += bill.shipPrice
  return (
    <>
      <div className="total-container">
        <div className="fix-total">
          <div className="fix-wid"></div>
          <div className="total-price-myorder">
            <span className="detail-text">
              Phí Ship: <span className="fix-font-myorder">
                {calcul(bill.shipPrice) + "đ"}</span>
            </span>
            <span className="detail-text">
              FreeShip: <span className="fix-font-myorder">{freeShip ? calcul(freeShip) + "đ" : "0đ"}</span>
            </span>
            <span className="detail-text">
              Voucher SIXDO: <span className="fix-font-myorder">{voucherSIXDO ? voucherSIXDO > 100 ? calcul(voucherSIXDO) + "đ" : voucherSIXDO + "%" : "0đ"}</span>
            </span>
            <del className="detail-text">
              {bill.totalBill + "đ"}
            </del>
            <span className="total-text">
              Total: {calcul(total) + "đ"}
            </span>
          </div>
        </div>
        <div className="btn-opt">
          <div className="fix-widbtn"></div>
          <div className="btn-item-wait btn-item" onClick={()=>{
            console.log(bill)
            localStorage.setItem('productId',bill.billDetails[0].productId)
            navi('/product-item')
          }}>
            <span className="btn_title">Mua Lại</span>
          </div>
          <div className="btn-item-wait btn-item">
            <span className="btn_title">Đánh Giá</span>
          </div>
        </div>
      </div>
    </>
  );
}
function OptionCancel({ bill, voucherSIXDO, freeShip }) {
  const navi = useNavigate()
  let total = bill.totalBill
  if (voucherSIXDO !== null) {
    if (voucherSIXDO > 100) {
      total = total - voucherSIXDO
    } else {
      total = total - (total * voucherSIXDO) / 100
    }
  }
  if (freeShip !== null) {
    total = total - freeShip
  }
  total += bill.shipPrice
  return (
    <>
      <div className="total-container">
        <div className="fix-total">
          <div className="fix-wid"></div>
          <div className="total-price-myorder">
            <span className="detail-text">
              Phí Ship: <span className="fix-font-myorder">
                {calcul(bill.shipPrice) + "đ"}</span>
            </span>
            <span className="detail-text">
              FreeShip: <span className="fix-font-myorder">{freeShip ? calcul(freeShip) + "đ" : "0đ"}</span>
            </span>
            <span className="detail-text">
              Voucher SIXDO: <span className="fix-font-myorder">{voucherSIXDO ? voucherSIXDO > 100 ? calcul(voucherSIXDO) + "đ" : voucherSIXDO + "%" : "0đ"}</span>
            </span>
            <del className="detail-text">
              {bill.totalBill + "đ"}
            </del>
            <span className="total-text">
              Total: {calcul(total) + "đ"}
            </span>
          </div>
        </div>
        <div className="btn-opt">
          <div className="fix-widbtn"></div>
          <div className="btn-item-wait btn-item" onClick={()=>{
            navi('/product-item/'+bill.billDetails[0].productId)
          }}>
            <span className="btn_title">Mua Lại</span>
          </div>
        </div>
      </div>
    </>
  );
}
function BillDetail(item) {
  let product = item.item.product;
  let billDetail = item.item.billDetail;
  let realPrice = billDetail.price * billDetail.quantity;
  return (
    <>
      <div className="order-product-detail">
        <div className="product-detail-myorder">
          <div className="img-center">
            <img
              alt=""
              src={
                "data:image/jpeg;base64," + product.productImgs[0].productImg
              }
              className="product-img"
            ></img>
          </div>
          <div className="product-name">
            <spam className="product-name-quantity">
              {product.productName}
              {" x"}
              {billDetail.quantity}
            </spam>
          </div>
        </div>
        <div className="bill-price">
          <del className="del-price"></del>{" "}
          <span className="real-price">{calcul(realPrice) + "đ"}</span>
        </div>
      </div>
      <div className="line-bottom"></div>
    </>
  );
}
async function cancel(billId, type, setOrder) {
  const data = {
    'billId': billId,
    "type": type
  }
  await getApiProduct.cancelBill(data)
  console.log(data)
  setOrder(await getApiProduct.getOrder(JSON.parse(localStorage.getItem('auth')).id))
}
function calcul(number) {
  console.log(number)
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

export default MyOrder;
