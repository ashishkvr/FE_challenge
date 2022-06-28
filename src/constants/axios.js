import axios from 'axios';

const instance = axios.create({
  // baseURL: AppConfig.ApiUrl,
  baseURL: '',
  timeout: 0,
  withCredentials: true,
});

const requestHandler = request => {
  request.headers['Content-Type'] = 'application/json;charset=UTF-8';
  return request;
};

const responseHandler = response => {
  // Modify response here
  return response;
};

const errorHandler = error => {
  if (
    (error && error.code && error.code === 'ECONNABORTED') ||
    (error && error.message === 'Network Error')
  ) {
    error.message =
      'We are unable to connect to server. please try again later.';
  }
  if (error.response && error.response?.data) {
    if (error.response?.data?.systemMessage)
      error.message = error.response?.data?.systemMessage;
  }
  return Promise.reject(error);
};

// request intercepter
instance.interceptors.request.use(
  request => requestHandler(request),
  error => Promise.reject(error),
);
// response intercepter
instance.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error),
);

export default instance;
