import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import getApiProduct from "../api/ProductAPI.js";
import "../css/Bag.css";
import { useNavigate } from "react-router-dom"
function Bag() {
  localStorage.removeItem('freeshipvoucher')
  localStorage.removeItem('sixdovoucher')
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
  const [productBagByAccountId, setProduct] = useState(undefined);
  useEffect(() => {
    const data2 = JSON.parse(localStorage.getItem("auth"));
    if (data2) {
    }
    const getProduct = async () => {
      const data = await getApiProduct.getProductBagByAccountId(id);
      setProduct(data);
    };
    getProduct();
    if (productBagByAccountId) {
      console.log(productBagByAccountId)
    }
  }, []);
  const [total, setTotal] = useState(0);
  const [listIdTotal, setListIdTotal] = useState([])

  function handleTotalCheckBox(accountBagId) {
    if (listIdTotal.includes(accountBagId)) {
      setTotal(total - productBagByAccountId.find((item) => {
        return item.accountBag.accountBagId === accountBagId
      }).product.shellPrice * productBagByAccountId.find((item) => {
        return item.accountBag.accountBagId === accountBagId
      }).accountBag.quantity)
      listIdTotal.splice(listIdTotal.indexOf(accountBagId), 1)
      setListIdTotal(listIdTotal)
      return
    }
    setListIdTotal([...listIdTotal, accountBagId])
    setTotal(total + productBagByAccountId.find((item) => {
      return item.accountBag.accountBagId === accountBagId
    }).product.shellPrice * productBagByAccountId.find((item) => {
      return item.accountBag.accountBagId === accountBagId
    }).accountBag.quantity)
  }
  async function deleteBag(accountBagId) {
    await getApiProduct.deleteBag(accountBagId);
    setProduct(await getApiProduct.getProductBagByAccountId(id))
  }
  const [listPay, setListPay] = useState([]);
  function add2ListPay(bagId) {
    if (listPay.includes(bagId)) {
      listPay.splice(listPay.indexOf(bagId), 1);
      setListPay(listPay);
      return;
    }
    setListPay([...listPay, bagId]);
  }
  function pushData2BackEnd() {
    localStorage.setItem('listPay', JSON.stringify(listPay));
  }
  const error = useRef(0)
  const [buyAll, setBuyAll] = useState(true)
  return (
    <>
      <div className="fix-header"></div>
      <div className="bag-table">
        <div className="title-row">

          <div className="bag-column long-column">sản phẩm</div>
          <div className="bag-column short-column">đơn giá</div>
          <div className="bag-column short-column">số lượng</div>
          <div className="bag-column short-column">thành tiền</div>
          <div className="bag-column short-column">thao tác</div>
        </div>
        {productBagByAccountId
          ? productBagByAccountId.map((item) => {
            return (
              <Item
                item={item}
                key={item.accountBag.accountBagId}
                deleteBag={deleteBag}
                add2ListPay={add2ListPay}
                handleTotalCheckBox={handleTotalCheckBox}
                setProduct={setProduct}
                id={id}
              />
            );
          })
          : ""}
        <div ref={error}></div>
        <div className="pay-container">
          <input type="checkbox" className="buy-all" onChange={() => {
            if (buyAll) {
              let listAll = []
              productBagByAccountId.forEach((item) => {
                listAll = [...listAll, item.accountBag.accountBagId]
              });
              setListPay(listAll)
              setBuyAll(false)
              return
            }
            setListPay([])
            setBuyAll(true)
          }} />
          <span>
            Mua hết
          </span>
          <div
            className="pay-it"
            onClick={function () {
              pushData2BackEnd()
              if (listPay.length === 0) {
                error.current.style.color = 'red'
                error.current.innerHTML = "Chọn ít nhất 1 sản phẩm!"
                setTimeout(() => {
                  error.current.innerHTML = ""
                }, 3000)
                return
              }
              navi('/create-order')
            }}
          >
            Mua hàng
          </div>

          <div className="total-pay">{"Tạm tính: " + calcul(total) + "đ"}</div>
        </div>
      </div>
    </>
  );
}

function Item({ item, deleteBag, add2ListPay, handleTotalCheckBox, setProduct, id }) {
  const a = item.accountBag;
  const p = item.product;
  const c = item.categoryType;

  async function resetQuantity(opt) {

    if (opt === 0) {
      quantity.current.value = quantity.current.value - 1
      const updateAccountBagData = [a.accountBagId, quantity.current.value]
      await getApiProduct.updateAccountBagById(updateAccountBagData)
      setProduct(await getApiProduct.getProductBagByAccountId(id))
    }
    if (opt === 1) {
      if (quantity.current.value == p.quantity) {
        alert("Không đủ sản phẩm!")
        return
      }
      quantity.current.value = Number(quantity.current.value) + 1
      const updateAccountBagData = [a.accountBagId, quantity.current.value]
      await getApiProduct.updateAccountBagById(updateAccountBagData)
      setProduct(await getApiProduct.getProductBagByAccountId(id))
    }
    if (quantity.current.value < 1) {
      deleteBag(a.accountBagId)
      console.log(2)
    }
  }
  const quantity = useRef(0);
  return (
    <>
      <div className="item-row">
        <div className="category-type-location">
          {c.categoryTypeDetail + ` / ${p.productName}`}
        </div>
        <div className="product-row">
          <div className="bag-row long-column">
            <input
              type="checkbox"
              className="choose-product2pay"
              value={a.accountBagId}
              onChange={function () {
                add2ListPay(a.accountBagId);
                handleTotalCheckBox(a.accountBagId)
              }}
            ></input>
            <img
              src={"data:image/jpeg;base64," + p.productImgs[0].productImg}
              alt=""
              className="product-img"
            ></img>
            <div className="product-name">{p.productDetail}</div>
          </div>
          <div className="bag-row short-column">{calcul(p.shellPrice) + "đ"}</div>
          <div className="quantity-opt-bag short-column">
            <button
              className="btn-quantity-left-bag btn"
              onClick={function () {
                resetQuantity(0)
              }}
            >
              -
            </button>
            <input
              ref={quantity}
              type="text"
              className="quantity-input-bag"
              value={a.quantity}
            ></input>
            <button
              className="btn-quantity-right-bag btn"
              onClick={function () {
                resetQuantity(1)
              }}
            >
              +
            </button>
            <span className="quantity-online">
            </span>
          </div>
          <div className="bag-row short-column">
            {calcul(p.shellPrice * a.quantity) + "đ"}
          </div>
          <div className="bag-row short-column">
            <div
              className="handle-bag delete-item"
              onClick={function () {
                deleteBag(a.accountBagId);
              }}
            >
              Xóa{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
export default Bag;
