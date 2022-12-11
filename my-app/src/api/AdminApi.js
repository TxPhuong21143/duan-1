import axiosClient from "./AxiosApi";

const adminApi = {
  getAnalysisData: () => {
    const url = `api/admin1.0/getanalysisshop`;
    return axiosClient.get(url);
  },
  getAllProperty: () => {
    const url = `api/admin1.0/getallproperty`;
    return axiosClient.get(url);
  },
  createProperty: (data) => {
    const url = `api/admin1.0/createproperty`;
    return axiosClient.post(url, data);
  },
  remakeProperty: (data) => {
    const url = `api/admin1.0/remakeproperty`;
    return axiosClient.put(url, data);
  },
  getAllBillType: (opt) => {
    const url = `api/admin1.0/getallbilltype?opt=${opt}`;
    return axiosClient.get(url);
  },
  adminSetBill: (opt, idBill, idEmployee) => {
    const url = `api/admin1.0/adminsetbill?opt=${opt}&idBill=${idBill}&idEmployee=${idEmployee}`;
    return axiosClient.put(url);
  },
  addProduct: (data) => {
    const url = `api/admin1.0/upload`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getAllSales: () => {
    const url = `/api/admin1.0/sales`;
    return axiosClient.get(url);
  },
  createSales: (data) => {
    const url = `/api/admin1.0/createsales`;
    return axiosClient.post(url, data);
  },
  closeOrOpen: (idVoucher) => {
    const url = `/api/admin1.0/closeoropen?idVoucher=${idVoucher}`;
    return axiosClient.put(url);
  },
  searchTop5: (search) => {
    const url = `/api/admin1.0/searchtop5product?search=${search}`;
    return axiosClient.get(url);
  },
  getListId: (data) => {
    const url = `/api/admin1.0/getbylist`;
    return axiosClient.post(url, data);
  },
  remakeProduct: (data) => {
    const url = `/api/admin1.0/remakeproduct`;
    return axiosClient.post(url, data);
  },
  createBillHolding: (data, idEmployee, billId) => {
    const url = `/api/admin1.0/shellinshop?idEmployee=${idEmployee}&billId=${billId}`;
    return axiosClient.post(url, data);
  },
  createBillInShop: (idEmployee) => {
    const url = `/api/admin1.0/createbillinshop?idEmployee=${idEmployee}`;
    return axiosClient.post(url);
  },
  removeBillDetailHolding: (idBillDetail) => {
    const url = `/api/admin1.0/deletebilldetail?idBillDetail=${idBillDetail}`;
    return axiosClient.get(url);
  },
  getAllHoldingBill: () => {
    const url = `/api/admin1.0/getallholdingbill`;
    return axiosClient.get(url);
  },
  findProductById: (idProduct) => {
    const url = `/api/admin1.0/findproductbyid?idProduct=${idProduct}`;
    return axiosClient.get(url);
  },
  getAllBillDetailOfBill: (idBill) => {
    const url = `/api/admin1.0/getallbilldetailofbill?idBill=${idBill}`;
    return axiosClient.get(url);
  },
  addProduct2BillDetail: (idProduct, idBill) => {
    const url = `/api/admin1.0/addproduct2billdetail?idProduct=${idProduct}&idBill=${idBill}`;
    return axiosClient.get(url);
  },
  deleteBillDetail: (idBillDetail) => {
    const url = `/api/admin1.0/deletebilldetail2?idBillDetail=${idBillDetail}`;
    return axiosClient.get(url);
  },
  updateBillDetailQuantity: (idBillDetail, quantity) => {
    const url = `/api/admin1.0/updatebilldetailquantity?idBillDetail=${idBillDetail}&quantity=${quantity}`;
    return axiosClient.get(url);
  },
  getSumBill: (idBill) => {
    const url = `/api/admin1.0/getsumbill?idBill=${idBill}`;
    return axiosClient.get(url);
  },
  payHoldBill: (data) => {
    const url = `/api/admin1.0/getpaybillrequest`;
    return axiosClient.post(url,data);
  },
  printBill: (idBill) => {
    const url = `/api/admin1.0/printbill?idBill=${idBill}`;
    return axiosClient.get(url);
  },
};
export default adminApi;
