import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import adminApi from "../api/AdminApi"

import '../css/Voucher.css'
const voucher = {
    Voucher: () => {
        const [sales, setSales] = useState(undefined)
        useEffect(() => {
            const getData = async () => {
                const data = await adminApi.getAllSales()
                setSales(data)
            }
            getData()
        }, [])
        async function close(idVoucher) {
            await adminApi.closeOrOpen(idVoucher)
            setSales(await adminApi.getAllSales())
        }
        return (
            <>
                <div>Mã Giảm Giá</div>
                <div className='fix-margintop'></div>
                <div className="voucher-container-admin">
                    <div className="voucher-admin-title">
                        <div className="col-admin-voucher-code xy-center">Mã Giảm Giá</div>
                        <div className="col-admin-voucher-detail xy-center">Tên Khuyến Mại</div>
                        <div className="col-admin-voucher-begin xy-center">Ngày Bắt Đầu</div>
                        <div className="col-admin-voucher-end xy-center">Ngày Kết Thúc</div>
                        <div className="col-admin-voucher-int xy-center">Giảm thẳng</div>
                        <div className="col-admin-voucher-percent xy-center">Giảm Theo %</div>
                        <div className="col-admin-voucher-status xy-center">Trạng Thái</div>
                        <div className="col-admin-voucher-action xy-center">Thay Đổi</div>
                    </div>
                    {sales ? sales.shipVouchers.map((item) => {
                        return <voucher.VoucherItem close={close} item={item} />
                    }) : ""}
                    {sales ? sales.voucherVouchers.map((item) => {
                        return <voucher.VoucherItem close={close} item={item} />
                    }) : ""}
                </div>
            </>
        )
    },
    VoucherItem: ({ item, close }) => {
        return (
            <>
                <div className="fix-margin-voucher">
                    <div className="col-admin-voucher-code-content xy-center">{item.salesCode}</div>
                    <div className="col-admin-voucher-detail-content xy-center">{item.salesName}</div>
                    <div className="col-admin-voucher-begin-content xy-center">{item.openDate}</div>
                    <div className="col-admin-voucher-end-content xy-center">{item.endDate}</div>
                    <div className="col-admin-voucher-int-content xy-center">{item.salesInt}</div>
                    <div className="col-admin-voucher-percent-content xy-center">{item.salesPercent}</div>
                    <div className="col-admin-voucher-status-content xy-center">{item.salessStatusId == 3 ? "Ngừng áp dụng" : "Đang áp dụng"}</div>
                    {item.salessStatusId == 3 ? <div className="btn-voucher-mixopen col-admin-voucher-action-content xy-center" onClick={() => {
                        close(item.salesId)
                    }}>Mở lại</div> : ""}
                    {item.salessStatusId == 1 ? <div className="btn-voucher-mix col-admin-voucher-action-content xy-center" onClick={() => {
                        close(item.salesId)
                    }}>Dừng</div> : ""}
                    {item.salessStatusId == 2 ? <div className="btn-voucher-mix col-admin-voucher-action-content xy-center" onClick={() => {
                        close(item.salesId)
                    }}>Dừng</div> : ""}
                </div>
            </>
        )
    },
    CreateVoucher: () => {
        const type = useRef(0)
        const code = useRef(0)
        const detail = useRef(0)
        const typeVoucher = useRef(0)
        const howMuch = useRef(0)
        const begin = useRef(0)
        const end = useRef(0)
        function check() {
            if (typeVoucher.current.value == 2 && howMuch.current.value >= 100) {
                alert("Không thể giảm nhiều hơn hoặc bằng 100%")
                return false
            }
            if (code.current.value.trim().length === 0) {
                alert("Không được để trống mã!")
                return false
            }
            if (detail.current.value.trim().length === 0) {
                alert("Không được để trống tên!")
                return false
            }
            if (howMuch.current.value.trim().length === 0) {
                alert("Không được để trống giá trị!")
                return false
            }
            const regex = "^[0-9]+$"
            if (!howMuch.current.value.trim().match(regex)) {
                alert("Giá trị khuyến mãi không hợp lệ!")
                return false
            }
            if (howMuch.current.value.trim() <= 0) {
                alert("Giá trị khuyến mãi không hợp lệ!")
                return false
            }
            if (begin.current.value === '') {
                alert("Hãy chọn ngày bắt đầu!")
                return false
            }
            if (end.current.value === '') {
                alert("Hãy chọn ngày kết thúc!")
                return false
            }
            const endVoucher = new Date(end.current.value)
            const today = new Date()
            if (endVoucher < today) {
                alert("Ngày kết thúc phải là tương lai!")
                return false
            }
            const beginVOucher = new Date(begin.current.value)
            if (beginVOucher > endVoucher) {
                alert("Ngày bắt đầu phải trước ngày kết thúc!")
                return false
            }
            return true
        }
        async function createVoucher() {
            if (!check()) {
                return
            }
            const data = {
                salesCode: code.current.value.trim(),
                salesName: detail.current.value.trim(),
                saleTypeId: type.current.value === 1 ? 1 : 2,
                salesInt: typeVoucher.current.value == 1 ? howMuch.current.value.trim() : 0,
                salesPercent: typeVoucher.current.value == 2 ? howMuch.current.value.trim() : 0,
                endDate: end.current.value,
                openDate: begin.current.value
            }
            await adminApi.createSales(data)
            alert("Thêm thành công!")
        }
        return (
            <>
                <div className="fix-margin-voucher">
                    Tạo Khuyến Mãi Mới.
                </div>
                <div className="form-create-voucher">
                    <select ref={type} className="select-opt-voucher">
                        <option value={1}>Ship Voucher</option>
                        <option value={2}>SIXDO Voucher</option>
                    </select>
                    <div></div>
                    <input ref={code} type="text" placeholder="Mã Giảm Giá" name="" id="" className="input-voucher-text" />
                    <div></div>
                    <input ref={detail} type="text" placeholder="Tên Giảm Giá" name="" id="" className="input-voucher-text" />
                    <div></div>
                    <select ref={typeVoucher} className="select-opt-voucher">
                        <option value={1}>Giảm thẳng</option>
                        <option value={2}>Giảm theo %</option>
                    </select>
                    <div></div>
                    <input ref={howMuch} type="text" placeholder="Giảm ..?" name="" id="" className="input-voucher-text" />
                    <div></div>
                    <div>Ngày bắt đầu</div>
                    <input ref={begin} type="date" name="" id="" className="input-voucher-date" />
                    <div>Ngày kết thúc</div>
                    <input ref={end} type="date" name="" id="" className="input-voucher-date" />
                    <div className="btn-add-voucher" onClick={() => {
                        createVoucher()
                    }}>Thêm</div>
                </div>
            </>
        )
    }
}

export default voucher