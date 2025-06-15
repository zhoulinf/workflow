import axios from 'axios';

const request = axios.create({
  baseURL: 'http://127.0.0.1:3000',
});

request.interceptors.response.use((response) => {
  const { data } = response;
  if (data.code === 200) {
    return data;
  }
  return Promise.reject(data);
}, (error) => {
  const { response } = error || {};
  const { data } = response || {};
  const message = Array.isArray(data?.message) ? data?.message.join('\n') : data?.message;
  return Promise.reject(data);
});

interface ResponseData<T>{
  code:number;
  data:T;
  message:string|string[]
}

export {
  request,
};

export type {
  ResponseData,
};
