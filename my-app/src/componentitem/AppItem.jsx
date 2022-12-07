import { useEffect, useState, useRef } from "react";
import getApiProduct from "../api/ProductAPI";
import "../css/AppItem.css";
function AppItem({ changeHideLogin }) {
  const id = JSON.parse(localStorage.getItem('productId'))
  const [productDetail, setProduct] = useState(undefined);
  useEffect(() => {
    const getProduct = async () => {
      const data = await getApiProduct.getOneId(id);
      setProduct(data);
    };
    getProduct();
  }, []);
  let resultPrice = "";
  if (productDetail) {
    let price = productDetail.product.shellPrice + "";
    //3 390 000
    let counter = 0;
    for (let i = price.length - 1; i >= 0; i--) {
      if (counter === 3) {
        resultPrice += ".";
        counter = 0;
      }
      resultPrice += price[i];
      counter++;
    }
    resultPrice = resultPrice.split("").reverse().join("") + "đ";
  }
  const [quantiy, setQuantity] = useState(0);
  function changQuantity(opt) {
    if (opt === 0) {
      if (quantityInput.current.value <= 0) {
        quantity0.current.style.color = 'red'
        quantity0.current.innerHTML = 'Số lượng không được nhỏ hơn 0!'
        return
      }
      quantityInput.current.value = Number(quantityInput.current.value) - 1
    }
    if (opt === 1) {
      quantityInput.current.value = Number(quantityInput.current.value) + 1
    }
  }
  const imgMain = useRef(0);
  function changImg(opt) {
    if (opt === 0) {
      imgMain.current.src =
        "data:image/jpeg;base64," +
        productDetail.product.productImgs[0].productImg;
    }
    if (opt === 1) {
      imgMain.current.src =
        "data:image/jpeg;base64," +
        productDetail.product.productImgs[1].productImg;
    }
  }
  const quantityInput = useRef(0);
  const quantity0 = useRef(0);
  function add2Bag() {
    const account = JSON.parse(localStorage.getItem("auth"));
    if (account == null) {
      console.log(1)
      changeHideLogin();
      return;
    }
    if (!quantityInput.current.value.match('^[0-9]+$')) {
      quantity0.current.style.color = 'red'
      quantity0.current.innerHTML = 'Hãy nhập số'
      return;
    }
    if (quantityInput.current.value <= 0) {
      quantity0.current.style.color = 'red'
      quantity0.current.innerHTML = 'Số lượng không được nhỏ hơn 0'
      return;
    }
    if (quantityInput.current.value > productDetail.product.quantity) {
      quantity0.current.style.color = 'red'
      quantity0.current.innerHTML = 'Số lượng không đủ'
      return;
    }
    const data = { accountId: account.id, productId: id, quantity: quantityInput.current.value };
    getApiProduct.addItem2Bag(data);
    quantity0.current.innerHTML = ''
    alert("Đã thêm vào giỏ hàng")
  }
  return (
    <>
      <div className="fix-header"></div>
      <div className="item-location">
        <span>trang chủ / </span>
        <span>
          {productDetail
            ? productDetail.categoryType.categoryTypeDetail +
            " / " +
            productDetail.product.productName
            : ""}
        </span>
      </div>
      <div className="item-full-layout">
        <div className="half-width product-imgs">
          <div className="float-left list-img">
            <img
              className="img-0"
              src={
                productDetail
                  ? "data:image/jpeg;base64," +
                  productDetail.product.productImgs[0].productImg
                  : ""
              }
              alt=""
              onClick={function () {
                changImg(0);
              }}
            ></img>
            <img
              className="img-0"
              src={
                productDetail
                  ? "data:image/jpeg;base64," +
                  productDetail.product.productImgs[1].productImg
                  : ""
              }
              alt=""
              onClick={function () {
                changImg(1);
              }}
            ></img>
          </div>
          <div className="float-left current-img">
            <img
              ref={imgMain}
              className="imgMain"
              src={
                productDetail
                  ? "data:image/jpeg;base64," +
                  productDetail?.product.productImgs[0].productImg
                  : ""
              }
              alt=""
            ></img>
          </div>
        </div>
        <div className="show-opt-and-add2bag">
          <div className="productName">
            {productDetail ? productDetail.product.productName : ""}
          </div>
          <div className="productPrice">{resultPrice}</div>

          <div className="productProperty">
            Nước sản xuất :{" "}
            <span className="fix-property">
              {productDetail ? productDetail.producer.producerDetail : ""}
            </span>
          </div>
          <div className="productProperty">
            Brand :{" "}
            <span className="fix-property">
              {productDetail ? productDetail.brand.brandDetail : ""}
            </span>
          </div>
          <div className="productProperty">
            SIZE :{" "}
            <span className="fix-property">
              {productDetail ? productDetail.size.sizeDetail : ""}
            </span>
          </div>
          <div className="productProperty">
            Color :{" "}
            <span className="fix-property">
              {productDetail ? productDetail.color.colorDetail : ""}
            </span>
          </div>
          <div
            className={
              productDetail
                ? "product-color " + productDetail.color.colorCode
                : "product-color"
            }
          ></div>
          <div className="productSize"></div>
          <div className="quantity-opt">
            <button
              className="btn-quantity-left btn"
              onClick={function () {
                changQuantity(0);
              }}
            >
              -
            </button>
            <input
              ref={quantityInput}
              type="text"
              className="quantity-input"
            ></input>
            <button
              className="btn-quantity-right btn"
              onClick={function () {
                changQuantity(1);
              }}
            >
              +
            </button>
            <span className="quantity-online">
              {productDetail
                ? productDetail.product.quantity + " sản phẩm có sẵn"
                : ""}
            </span>
          </div>
          <p ref={quantity0}></p>
          <div
            className="btn-add2bag"
            onClick={function () {
              add2Bag();
            }}
          >
            thêm vào giỏ hàng
          </div>
          <hr></hr>
          <div className="title-detail">Chi tiết</div>
          <div className="productDetail">
            {productDetail ? productDetail.product.productDetail : ""}
          </div>
          <hr></hr>
          <div className="title-detail">hướng dẫn bảo quản</div>
          <div className="productDetail"></div>
        </div>
      </div>
    </>
  );
}
export default AppItem;
