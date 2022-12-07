import axiosClient from "./AxiosApi";
const token = {
  headers: {
    token: "5f3e5e26-69a8-11ed-b190-ea4934f9883e",
  },
};
const shipApi = {
  getProvince: () => {
    const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`;
    return axiosClient.get(url, token);
  },
  getDistrist: (idProvince) => {
    const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${idProvince}`;
    return axiosClient.get(url, token);
  },
  getWard: (idDistrist) => {
    const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${idDistrist}`;
    return axiosClient.get(url, token);
  },
  getServices: (to_district_id) => {
    const tokenServices = {
      headers: {
        token: "5f3e5e26-69a8-11ed-b190-ea4934f9883e",
      },
      params: {
        shop_id: 3474985,
        from_district: 3440,
        to_district: to_district_id,
      },
    };
    const url = `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?`;
    return axiosClient.get(url, tokenServices);
  },
  calculFee: (service_id, insurance_value, to_district_id, to_ward_code) => {
    const tokenFee = {
      headers: {
        token: "5f3e5e26-69a8-11ed-b190-ea4934f9883e",
        shop_id: 3474985,
      },
      params: {
        service_id: service_id,
        insurance_value: insurance_value,
        coupon: null,
        from_district_id: 3440,
        to_district_id: to_district_id,
        to_ward_code: to_ward_code,
        height: 15,
        length: 15,
        weight: 1000,
        width: 15,
      },
    };
    const url = `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?
    `;
    return axiosClient.get(url, tokenFee);
  },
};
async function getPro() {
  const dataProvince = await shipApi.getProvince();
  const dataDistrist = await shipApi.getDistrist(201);
  const dataWard = await shipApi.getWard(1809);
  const ser = await shipApi.getServices(1809);
  const fee = await shipApi.calculFee(
    ser.data[0].service_id,
    1000000,
    1809,
    "1B2420"
  );
}
export default shipApi;
