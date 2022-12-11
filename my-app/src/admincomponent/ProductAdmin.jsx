import '../css/ProductAdmin.css'
import adminApi from '../api/AdminApi'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { BsPencil } from "react-icons/bs";
import { useNavigate } from 'react-router';
const productAdmin = {
    Product: ({ lenguage }) => {
        const searchInput = useRef(0)
        const [listProduct, setList] = useState(undefined)
        const [product, setProduct] = useState(undefined)
        async function searchTop5() {
            setList(await adminApi.searchTop5(searchInput.current.value.trim()))
        }
        const [property, setProperty] = useState(undefined)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getAllProperty()
                setProperty(data)
            }
            getData()
        }, [])
        const productName = useRef(0)
        const productDetail = useRef(0)
        const shellPrice = useRef(0)
        const quantity = useRef(0)
        const category = useRef(0)
        const color = useRef(0)
        const nsx = useRef(0)
        const brand = useRef(0)
        const size = useRef(0)
        const status = useRef(0)
        let id = 0
        function setProduct2Input(item) {
            console.log(item)
            id = item.productId
            productName.current.value = item.productName
            productDetail.current.value = item.productDetail
            shellPrice.current.value = item.shellPrice
            quantity.current.value = item.quantity
            category.current.value = item.categoryTypeId
            color.current.value = item.colorId
            nsx.current.value = item.producerId
            brand.current.value = item.brandId
            size.current.value = item.sizeId
            status.current.value = item.productStatusId
        }
        function check() {
            if(id==0){
                alert("Hãy chọn sản phâm")
                return false
            }
            if (productName.current.value.trim().length == 0) {
                alert("Tên sản phẩm không được để trống!")
                return false
            }
            if (productDetail.current.value.trim().length == 0) {
                alert("Chi tiết sản phẩm không được để trống!")
                return false
            }
            if (shellPrice.current.value.trim().length == 0) {
                alert("Giá bán không được để trống!")
                return false
            }
            if (quantity.current.value.trim().length == 0) {
                alert("Số lượng không được để trống!")
                return false
            }
            if (quantity.current.value.trim() < 0) {
                alert("Số lượng sản phẩm không được nhỏ hơn 0!")
                return false
            }
            return true
        }
        async function remake(idProduct) {
            const data = {
                productId: idProduct,
                productName: productName.current.value,
                productDetail: productDetail.current.value,
                shellPrice: shellPrice.current.value,
                quantity: quantity.current.value,
                categoryTypeId: category.current.value,
                colorId: color.current.value,
                producerId: nsx.current.value,
                brandId: brand.current.value,
                sizeId: size.current.value,
                productStatusId:status.current.value
            }
            await adminApi.remakeProduct(data)
            id = 0
            productName.current.value = ''
            productDetail.current.value = ''
            shellPrice.current.value = ''
            quantity.current.value = ''
        }
        return (
            <>
                <div className='product-admin-title'>{lenguage.product.title}</div>
                <div className='fix-margintop'></div>
                <div className="half-inshop margin-admin-inshop">
                    <input ref={searchInput} type="text" name="name" className="search-product-admin" placeholder="Tìm kiếm sản phẩm" onChange={() => {
                        searchTop5()
                    }} />
                    <div className="fix-marigintop"></div>
                    {listProduct ? listProduct.map((item) => {
                        return <productAdmin.ItemProduct setList={setList} setProduct2Input={setProduct2Input} item={item} />
                    }) : ""}
                </div>
                <div className="half-inshop margin-admin-inshop">
                    <div>Thông tin Sản Phẩm</div>
                    <input ref={productName} className='remake-input-product' type="text" placeholder='Tên sản phẩm' />
                    <input ref={productDetail} className='remake-input-product' type="text" placeholder='Chi tiết sản phẩm' />
                    <input ref={shellPrice} className='remake-input-product' type="number" placeholder='Giá bán' />
                    <input ref={quantity} className='remake-input-product' type="number" placeholder='Số lượng tồn' />
                    <div></div>
                    <div>Loại sản phẩm</div>
                    <select ref={category} name="" id="" className='select-opt-product'>
                        {property ? property.categoryTypes.map((item) => {
                            return <option value={item.categoryTypeId}>{item.categoryTypeDetail}</option>
                        }) : ""}
                    </select>
                    <div>Màu sắc</div>
                    <select ref={color} name="" id="" className='select-opt-product'>
                        {property ? property.colors.map((item) => {
                            return <option value={item.colorId}>{item.colorDetail}</option>
                        }) : ""}
                    </select>
                    <div>Nhà sản xuất</div>
                    <select ref={nsx} name="" id="" className='select-opt-product'>
                        {property ? property.producers.map((item) => {
                            return <option value={item.producerId}>{item.producerDetail}</option>
                        }) : ""}
                    </select>
                    <div>Nhãn hiệu</div>
                    <select ref={brand} name="" id="" className='select-opt-product'>
                        {property ? property.brands.map((item) => {
                            return <option value={item.brandId}>{item.brandDetail}</option>
                        }) : ""}
                    </select>
                    <div>Kích cỡ</div>
                    <select ref={size} name="" id="" className='select-opt-product'>
                        {property ? property.sizes.map((item) => {
                            return <option value={item.sizeId}>{item.sizeDetail}</option>
                        }) : ""}
                    </select>
                    <div>Trạng thái sản phẩm</div>
                    <select ref={status} name="" id="" className='select-opt-product'>
                        {property ? property.productStatuses.map((item) => {
                            return <option value={item.productStatusId}>{item.productStatusDetail}</option>
                        }) : ""}
                    </select>
                    <div className='btn-update-product' onClick={() => {
                        if (check() && id != 0) {
                            remake(id)
                            alert("Thay đổi thành công!")
                            return
                        }
                    }}>Cập nhật</div>
                </div>
            </>
        )
    },
    ItemProduct: ({ item, setProduct2Input,setList }) => {
        return (
            <>
                <div className="fix-margintop8px"></div>
                <div className="search-item-contaier" onClick={() => {
                    setProduct2Input(item)
                    setList(undefined)
                }}>
                    <img src={"data:image/jpeg;base64," + item.productImgs[0].productImg} alt="" className="img-search" />
                    <div className="detail-product-search">
                        <div>{item.productDetail + '. số lượng còn '} <span className="quantity-search">{item.quantity}</span> </div>
                        <div className="price-search">{calcul(item.shellPrice) + 'đ'}</div>
                    </div>
                </div>
            </>
        )
    }
    ,
    AddProduct: ({setBodyOpt}) => {
        const [selectedFile1, setFile1] = useState(undefined)
        const [selectedFile2, setFile2] = useState(undefined)
        async function upload() {
            const form = new FormData()
            if (selectedFile1 && selectedFile2) {
                if (selectedFile1.target.files[0].type !== 'image/jpeg') {
                    alert("Không đúng định dạng ảnh!")
                    return
                }
                if (selectedFile2.target.files[0].type !== 'image/jpeg') {
                    alert("Không đúng định dạng ảnh!")
                    return
                }
                if (!check()) {
                    return
                }
                const data = {
                    productName: productName.current.value.trim(),
                    productDetail: productDetail.current.value.trim(),
                    productPrice: productPrice.current.value.trim(),
                    productShellPrice: productShellPrice.current.value.trim(),
                    productQuantity: productQuantity.current.value.trim(),
                    color: color.current.value,
                    producer: producer.current.value,
                    brand: brand.current.value,
                    size: size.current.value,
                    category: category.current.value
                }
                form.append('file1', selectedFile1.target.files[0])
                form.append('file2', selectedFile2.target.files[0])
                form.append('data', JSON.stringify(data))
                await adminApi.addProduct(form)
                alert("Thêm sản phẩm thành công")
                setBodyOpt(2)
                return
            }
            alert("Sản phẩm phải có 2 hình ảnh để hiển thị!")
        }
        const img1 = useRef(0)
        const img2 = useRef(0)
        const color = useRef(0)
        const producer = useRef(0)
        const brand = useRef(0)
        const category = useRef(0)
        const size = useRef(0)
        const productName = useRef(0)
        const productDetail = useRef(0)
        const productPrice = useRef(0)
        const productShellPrice = useRef(0)
        const productQuantity = useRef(0)
        const [propertys, setProps] = useState(undefined)
        useEffect(() => {
            img1.current.style.display = 'none'
            img2.current.style.display = 'none'
            const getProps = async () => {
                const data = await adminApi.getAllProperty()
                setProps(data)
            }
            getProps()
        }, [])
        if (propertys) {
            console.log(propertys)
        }
        function check() {
            if (productName.current.value.trim().length === 0) {
                alert("Không được để trống tên sản phẩm!")
                return false
            }
            if (productDetail.current.value.trim().length === 0) {
                alert("Không được để trống chi tiết sản phẩm!")
                return false
            }
            if (productPrice.current.value.trim().length === 0) {
                alert("Không được để trống giá nhập!")
                return false
            }
            if (productShellPrice.current.value.trim().length === 0) {
                alert("Không được để trống giá bán!")
                return false
            }
            if (productQuantity.current.value.trim().length === 0) {
                alert("Không được để trống số lượng!")
                return false
            }
            const regex = "^[0-9]+$"
            if (!productQuantity.current.value.trim().match(regex)) {
                alert("Phải là số!")
                return false
            }
            if (!productShellPrice.current.value.trim().match(regex)) {
                alert("Phải là số!")
                return false
            }
            if (!productPrice.current.value.trim().match(regex)) {
                alert("Phải là số!")
                return false
            }
            
            return true
        }
        return (
            <>
                <div>Thêm mới sản Phẩm</div>
                <div className='fix-margintop'></div>
                <div className='list-input-product'>
                    <input ref={productName} type="text" name="" id="" placeholder='Tên sản phẩm' className='input-product' />
                    <input ref={productDetail} type="text" name="" id="" placeholder='Chi tiết sản phẩm' className='input-product' />
                    <input ref={productPrice} type="text" name="" id="" placeholder='Giá nhập' className='input-product' />
                    <input ref={productShellPrice} type="text" name="" id="" placeholder='Giá bán' className='input-product' />
                    <input ref={productQuantity} type="text" name="" id="" placeholder='Số lượng nhập' className='input-product' />
                </div>
                <select ref={color} name="" id="" className='select-properties'>
                    {propertys ? propertys.colors.map((item) => {
                        return <option value={item.colorId}>{item.colorDetail}</option>
                    }) : ""}
                </select>
                <select ref={producer} name="" id="" className='select-properties'>
                    {propertys ? propertys.producers.map((item) => {
                        return <option value={item.producerId}>{item.producerDetail}</option>
                    }) : ""}
                </select>
                <select ref={brand} name="" id="" className='select-properties'>
                    {propertys ? propertys.brands.map((item) => {
                        return <option value={item.brandId}>{item.brandDetail}</option>
                    }) : ""}
                </select>
                <select ref={size} name="" id="" className='select-properties'>
                    {propertys ? propertys.sizes.map((item) => {
                        return <option value={item.sizeId}>{item.sizeDetail}</option>
                    }) : ""}
                </select>
                <select ref={category} name="" id="" className='select-properties'>
                    {propertys ? propertys.categoryTypes.map((item) => {
                        return <option value={item.categoryTypeId}>{item.categoryTypeDetail}</option>
                    }) : ""}
                </select>
                <div className='fix-margintop'></div>
                <img accept=".jpg, .png" ref={img1} src="" alt="" />
                <img accept=".jpg, .png" ref={img2} src="" alt="" />
                <div></div>
                <input type="file" name="file" accept=".jpg, .png" id="" onChange={(e) => {
                    const src = URL.createObjectURL(e.target.files[0])
                    img1.current.src = src
                    img1.current.classList.add("img-product")
                    setFile1(e)
                }} />
                <input type="file" name="file" accept=".jpg, .png" id="" onChange={(e) => {
                    const src = URL.createObjectURL(e.target.files[0])
                    img2.current.src = src
                    img2.current.classList.add("img-product")
                    setFile2(e)
                }} />
                <div className='upload' onClick={() => {
                    upload()
                }}>upload</div>
            </>
        )
    },
    AddProperty: ({ lenguage, type }) => {
        const [property, setProperty] = useState(undefined)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getAllProperty()
                setProperty(data)
            }
            getData()
        }, [])
        const code = useRef(0)
        const detail = useRef(0)
        async function createProperty() {
            if (code.current.value.trim().length === 0 || detail.current.value.trim().length === 0) {
                alert("Không được để trống!")
                return
            }
            switch (type) {
                case 1:
                    for (let item in property.colors) {
                        if (property.colors[item].colorCode.toUpperCase() === (code.current.value.toUpperCase())) {
                            alert("Mã Tồn Tại!")
                            return
                        }
                    }
                    break;
                case 2:
                    for (let item in property.producers) {
                        if (property.producers[item].producerCode.toUpperCase() === (code.current.value.toUpperCase())) {
                            alert("Mã Tồn Tại!")
                            return
                        }
                    }
                    break;
                case 3:
                    for (let item in property.sizes) {
                        if (property.sizes[item].sizeCode.toUpperCase() === (code.current.value.toUpperCase())) {
                            alert("Mã Tồn Tại!")
                            return
                        }
                    }
                    break;
                case 4:
                    for (let item in property.brands) {
                        if (property.brands[item].brandCode.toUpperCase() === (code.current.value.toUpperCase())) {
                            alert("Mã Tồn Tại!")
                            return
                        }
                    }
                    break;
                default:
            }
            const data = {
                type: type,
                code: code.current.value,
                detail: detail.current.value
            }
            await adminApi.createProperty(data)
            setProperty(await adminApi.getAllProperty())
        }
        return (
            <>
                {type === 1 ? <div className='product-admin-title'>Màu Sắc</div> : ""}
                {type === 2 ? <div className='product-admin-title'>Nhà Sản Xuất</div> : ""}
                {type === 3 ? <div className='product-admin-title'>Nhãn Hiệu</div> : ""}
                {type === 4 ? <div className='product-admin-title'>Kích Cỡ</div> : ""}

                <div className='fix-height-property'></div>
                <input ref={code} type="text" placeholder={lenguage.product.placeholderCode} className='input-property-admin' />
                <input ref={detail} type="text" placeholder={lenguage.product.placeholderDetail} className='input-property-admin' />
                <div className='add-new-property xy-center' onClick={() => {
                    createProperty()
                }}>{lenguage.product.add}</div>
                <div className='property-table'>
                    <div className='table-detail margin_right1property'>
                        <div className='header-property-row'>
                            <div className='property-id-column xy-center'>{lenguage.product.AddProperty.color.id}</div>
                            <div className='property-code-column xy-center'>{lenguage.product.AddProperty.color.code}</div>
                            <div className='property-detail-column xy-center'>{lenguage.product.AddProperty.color.detail}</div>
                            <div className='property-remake-column xy-center'>{lenguage.product.AddProperty.color.action}</div>
                        </div>
                        {type === 1 ? property ? property.colors.map((item) => {
                            return <productAdmin.PropertyItem type={1} item={item} code={code} detail={detail} property={property} setProperty={setProperty} />
                        }) : "" : ""}
                        {type === 2 ? property ? property.producers.map((item) => {
                            return <productAdmin.PropertyItem type={2} item={item} code={code} detail={detail} property={property} setProperty={setProperty} />
                        }) : "" : ""}
                        {type === 3 ? property ? property.brands.map((item) => {
                            return <productAdmin.PropertyItem type={3} item={item} code={code} detail={detail} property={property} setProperty={setProperty} />
                        }) : "" : ""}
                        {type === 4 ? property ? property.sizes.map((item) => {
                            return <productAdmin.PropertyItem type={4} item={item} code={code} detail={detail} property={property} setProperty={setProperty} />
                        }) : "" : ""}
                    </div>
                </div>
            </>
        )
    },
    PropertyItem: ({ type, item, code, detail, property, setProperty }) => {
        async function remakeProperty() {
            let id;
            if (code.current.value.trim().length === 0 || detail.current.value.trim().length === 0) {
                alert("Không được để trống!")
                return
            }
            switch (Number(type)) {
                case 1:
                    id = item.colorId
                    break;
                case 2:
                    id = item.producerId
                    break;
                case 4:
                    id = item.sizeId
                    break;
                case 3:
                    id = item.brandId
                    break;
                default:
            }
            const data = {
                id: id,
                type: Number(type),
                code: code.current.value,
                detail: detail.current.value
            }
            await adminApi.remakeProperty(data)
            setProperty(await adminApi.getAllProperty())
        }
        return (
            <>
                <div className='property-id-column xy-center'>
                    {type === 1 ? item.colorId : ""}
                    {type === 2 ? item.producerId : ""}
                    {type === 3 ? item.brandId : ""}
                    {type === 4 ? item.sizeId : ""}
                </div>
                <div className='property-code-column xy-center'>
                    {type === 1 ? item.colorCode : ""}
                    {type === 2 ? item.producerCode : ""}
                    {type === 3 ? item.brandCode : ""}
                    {type === 4 ? item.sizeCode : ""}
                </div>
                <div className='property-detail-column xy-center'>
                    {type === 1 ? item.colorDetail : ""}
                    {type === 2 ? item.producerDetail : ""}
                    {type === 3 ? item.brandDetail : ""}
                    {type === 4 ? item.sizeDetail : ""}
                </div>
                <div className='property-remake-column xy-center'>
                    <BsPencil className='icon-remake-property' onClick={() => {
                        remakeProperty()
                    }} />
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
export default productAdmin;