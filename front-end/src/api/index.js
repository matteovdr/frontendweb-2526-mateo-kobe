// import axios from 'axios';

// const baseUrl = import.meta.env.VITE_API_URL;

// export async function getAll(url) {
//   const { data } = await axios.get(`${baseUrl}/${url}`);
//   return data.items;
// }

// export async function postData(url, body) {
//   const { data } = await axios.post(`${baseUrl}/${url}`, body);
//   return data;
// }

// export async function deleteData(url) {
//   const { data } = await axios.delete(`${baseUrl}/${url}`);
//   return data;
// }
import axiosRoot from 'axios';
import { JWT_TOKEN_KEY } from '../contexts/auth';

const baseUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}`;
console.log('🔧 [API] Initialized with baseURL:', baseUrl);

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  console.log('🔧 [API] Request interceptor - token exists:', !!token);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// ---------------------
// API FUNCTIONS
// ---------------------
export const getMe = async (token) => {
  return axios.get('personen/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data)
    .catch((err) => {
      console.error('getMe error:', err);
      throw err;
    });
};

export async function getAll(url) {
  const { data } = await axios.get(url);
  return data.items;
}

export async function getById(url) {
  const { data } = await axios.get(url);
  return data;
}

export const deleteById = async (url) => {
  const { data } = await axios.delete(url);
  return data;
};

export const post = async (url, { arg }) => {
  const { data } = await axios.post(url, arg);

  return data;
};

export async function save(url, { arg: { id, ...data } }) {
  await axios({
    method: id ? 'PUT' : 'POST',
    url: id ? `${url}/${id}` : url,
    data,
  });
}

