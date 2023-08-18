import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const http = axios.create({
  baseURL: 'http://localhost:8000',
});

// Initialize react-toastify
toast.configure();

http.defaults.headers.post['Content-Type'] = 'application/json';

http.interceptors.response.use(
  async (response) => {
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data,'THE RES')
      const message = response.data.message;
      if (message) {
        showToast(message);
      }
      return response.data;
    }
  },
  (error) => {
    const { response, request } = error;
    if (response) {
      if (response.status >= 400 && response.status < 500) {
        // alert(response.data?.message, 'error');
        showToast(response.data?.message, "error");
        return null;
      }
    } else if (request) {
      showToast("Request failed. Please try again.", "error");
      // alert('Request failed. Please try again.', 'error');
      return null;
    }
    return Promise.reject(error);
  }
);

http.generateConfig = (accessToken) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token? token: accessToken,
    }
  };
};
const showToast = (message, type = "success") => {
  toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export default http;
