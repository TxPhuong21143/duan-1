import axiosClient from "./AxiosApi";

const getApiProduct = {
  getProductHome: () => {
    const url = "/api/product1.0/getproducthome";
    return axiosClient.get(url);
  },
  getOneId: (id) => {
    const url = `/api/product1.0/getproductid?id=${id}`;
    return axiosClient.get(url);
  },
  getOrder: (id) => {
    const url = `/api/product1.0/getbilldetailbyaccountid?accountId=${id}`;
    return axiosClient.get(url);
  },
  getProductBagByAccountId: (id) => {
    const url = `/api/product1.0/getproductbagbyaccountid?accountId=${id}`;
    return axiosClient.get(url);
  },
  getContacts: (id) => {
    const url = `/api/product1.0/getcontacts?accountId=${id}`;
    return axiosClient.get(url);
  },
  addItem2Bag: (data, params = null) => {
    const url = `/api/product1.0/addproduct2bag?accountId=${data.accountId}&productId=${data.productId}&quantity=${data.quantity}`;
    return axiosClient.post(url, data, {});
  },
  getCalculBag: (data) => {
    const url = `/api/product1.0/getcalculbag`;
    return axiosClient.post(url, data, {});
  },
  deleteBag: (accountBagId) => {
    const url = `/api/product1.0/deleteaccountbag?accountBagId=${accountBagId}`;
    return axiosClient.delete(url);
  },
  updateAccountBagById: (data) => {
    const url = `/api/product1.0/updateaccountbagbyid`;
    return axiosClient.put(url, data);
  },
  addNewShipContact: (data) => {
    const url = `/api/product1.0/addnewaccountshipcontact`;
    return axiosClient.post(url, data);
  },
  createBill: (data) => {
    const url = `/api/product1.0/createbill`;
    return axiosClient.post(url, data);
  },
  cancelBill: (data) => {
    const url = `/api/product1.0/cancelbill?billId=${data.billId}&type=${data.type}`;
    return axiosClient.put(url, data);
  },
  removeAccountShipContact: (idAccountShipContact) => {
    const url = `/api/product1.0/deleteshipcontact?idAccountShipContact=${idAccountShipContact}`;
    return axiosClient.put(url);
  },
  remakeAccountInfo: (data) => {
    const url = `/api/product1.0/remakeaccount`;
    return axiosClient.put(url, data);
  },
  remakepassword: (data) => {
    const url = `/api/product1.0/remakepassword`;
    return axiosClient.put(url, data);
  },
  getProductByPage: (page) => {
    const url = `/api/product1.0/nextpage?page=${page}`;
    return axiosClient.get(url);
  },

  dressCategory: () => {
    const url = `/api/product1.0/dress`;
    return axiosClient.get(url);
  },

  panCategory: () => {
    const url = `/api/product1.0/pan`;
    return axiosClient.get(url);
  },
  shirtCategory: () => {
    const url = `/api/product1.0/shirt`;
    return axiosClient.get(url);
  },
  searchProduct: (search) => {
    const url = `/api/product1.0/search?search=${search}`;
    return axiosClient.get(url);
  }
  
};

export default getApiProduct;
