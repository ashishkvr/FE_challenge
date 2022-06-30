import moment from "moment";
import { toast } from "react-toastify";

const toasterStyle = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
}

export const stopPropagation = (e) => {
  e.stopPropagation();
};

export const dateFormat = (date, format) => {
  if(date) {
    return moment(date).format(format);
  }
};

export const showToast = (message, variant = "success") => {
  const toaster = toast[variant];
  return toaster(message, toasterStyle);
};
