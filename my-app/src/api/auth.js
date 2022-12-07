import axiosClient from "./AxiosApi";

const authApi = {
  login: (param) => {
    const url = `/api/product1.0/checklogin?userName=${param.userName}&userPass=${param.userPass}`;
    return axiosClient.get(url);
  },
  signin:(data) => {
    const url = `/api/product1.0/createaccount`;
    return axiosClient.post(url, data, {});
  }
};

export default authApi;
