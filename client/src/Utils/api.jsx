import axios from "axios";

export async function getData(url, token) {
  return await axios
    .get(`${process.env.REACT_APP_PATH}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => err);
}

export async function postData(url, data) {
  return await axios
    .post(`${process.env.REACT_APP_PATH}${url}`, data)
    .then((response) => response.data);
}

export async function updateData(url, data) {
  return await axios
    .patch(`${process.env.REACT_APP_PATH}${url}`, data)
    .then((response) => response.data)
    .catch((err) => err);
}
