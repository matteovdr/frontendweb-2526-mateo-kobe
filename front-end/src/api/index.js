import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAll(url) {
  const { data } = await axios.get(`${baseUrl}/${url}`);
  return data.items;
}

export async function postData(url, body) {
  const { data } = await axios.post(`${baseUrl}/${url}`, body);
  return data;
}

export async function deleteData(url) {
  const { data } = await axios.delete(`${baseUrl}/${url}`);
  return data;
}
