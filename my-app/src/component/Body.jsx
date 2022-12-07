import { Link } from "react-router-dom";
import "../css/Body.css";
import React, { useEffect, useRef, useState } from "react";
import getApiProduct from "../api/ProductAPI";
import { useNavigate } from 'react-router-dom'
function Body({ setGuest }) {
  const isAuth = JSON.parse(localStorage.getItem('auth'))
  const navi = useNavigate()
  useEffect(() => {
    if (isAuth) {
      if (isAuth.roleID === 1) {
        setGuest(false)
        navi("/admin")
      }
      if (isAuth.roleID === 2) {
        setGuest(false)
        navi("/admin")
      }
      if (isAuth.roleID === 3) {
        setGuest(true)
      }
    }
    setGuest(true)
  }, [])
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    let search = localStorage.getItem('search')
    if (!search) {
      let page = JSON.parse(localStorage.getItem('page'))
      if (page === null) {
        page = 1
      }
      const getProduct = async () => {
        const data = await getApiProduct.getProductByPage(page);
        setDataProduct(data);
      };
      getProduct();
    }
  }, []);
  const btn1 = useRef(1)
  const btn2 = useRef(2)
  const btn3 = useRef(3)
  async function hanldClickBtn(opt) {
    if (Number(opt) === 1) {
      localStorage.setItem('page', opt)
      return
    }
    localStorage.setItem('page', opt)
    btn1.current.innerHTML = Number(opt) - 1
    btn2.current.innerHTML = Number(opt)
    btn3.current.innerHTML = Number(opt) + 1
  }
  async function page1() {
    localStorage.removeItem('page')
    setDataProduct(await getApiProduct.getProductByPage(1));
  }
  useEffect(() => {
    const search = localStorage.getItem('search')
    if (search) {
      const searchProduct = async () => {
        localStorage.removeItem('search')
        setDataProduct(await getApiProduct.searchProduct(search));
      }
      searchProduct()
    }
  }, [])
  async function category(opt) {
    switch (opt) {
      case 1:
        setDataProduct(await getApiProduct.dressCategory());
        break;
      case 2:
        setDataProduct(await getApiProduct.panCategory());
        break;
      case 3:
        setDataProduct(await getApiProduct.shirtCategory());
        break;
      default:
    }
  }
  return (
    <div className="main">
      <div className="container">
        <div className="main-column">
          <div className="row row-1"></div>
          <div className="row row-2">
            <div className="product-category">
              <div className="title-category">category</div>
              <div className="category-opt">
                <div className="item-category hoverCategory" onClick={() => {
                  localStorage.removeItem('page')
                  category(1)
                }}>Dress</div>
                <div className="item-category hoverCategory" onClick={() => {
                  localStorage.removeItem('page')
                  category(2)
                }}>Pan</div>
                <div className="item-category hoverCategory" onClick={() => {
                  localStorage.removeItem('page')
                  category(3)
                }}>Shirt</div>
              </div>
            </div>
            <div className="product-list">
              <div className="title-product">shop</div>
              <div className="product-list-container">
                {dataProduct.map((x) => {
                  return (
                    <a href={`product-item`} key={x.productId} onClick={() => {
                      localStorage.setItem('productId', x.productId)
                    }}>
                      <ProductItem item={x} />
                    </a>
                  )
                })}
              </div>
              <div className="next-product-list">
                <a href="/">
                  <div className="next-btn" onClick={() => {
                    page1()
                  }}>...</div>
                </a>
                <a href="/">
                  <div ref={btn1} onClick={() => {
                    hanldClickBtn(btn1.current.innerHTML)
                  }} className="next-btn">{localStorage.getItem('page') ?
                    Number(localStorage.getItem('page')) === 1 ? 1 :
                      Number(localStorage.getItem('page')) - 1 : 1}</div>
                </a>
                <a href="/">
                  <div ref={btn2} onClick={() => {
                    hanldClickBtn(btn2.current.innerHTML)
                  }} className="next-btn">{localStorage.getItem('page') ? Number(localStorage.getItem('page')) === 1 ? 2 : Number(localStorage.getItem('page')) : 2}</div>
                </a> <a href="/">
                  <div ref={btn3} onClick={() => {
                    hanldClickBtn(btn3.current.innerHTML)
                  }} className="next-btn">{localStorage.getItem('page') ? Number(localStorage.getItem('page')) === 1 ? 3 : Number(localStorage.getItem('page')) + 1 : 3}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductItem({ item, key }) {
  let price = item.shellPrice + "";
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
  let color = item.colorId;
  resultPrice = resultPrice.split("").reverse().join("");
  const thisProduct = useRef(0);
  useEffect(() => {
    thisProduct.current.onmouseover = () => {
      thisProduct.current.childNodes[0].src =
        "data:image/jpeg;base64," + item.productImgs[1].productImg;
    };
    thisProduct.current.onmouseout = () => {
      thisProduct.current.childNodes[0].src =
        "data:image/jpeg;base64," + item.productImgs[0].productImg;
    };
  }, []);
  return (
    <>
      <div
        className="product-item-container"
        ref={thisProduct}
        id={item.productId}
      >
        <img
          className="product-image"
          src={"data:image/jpeg;base64," + item.productImgs[0].productImg}
          alt=""
        ></img>{" "}
        <span className="product-price">{resultPrice + "đ"}</span>
        <br></br>
        <span className="product-detail-name">{item.productName}</span>
        <div
          className={
            color === 1
              ? "product-color red"
              : color === 2
                ? "product-color blue"
                : color === 3
                  ? "product-color green"
                  : color === 4
                    ? "product-color black"
                    : color === 5
                      ? "product-color white"
                      : "product-color pink"
          }
        ></div>
      </div>
    </>
  );
}

export default Body;
