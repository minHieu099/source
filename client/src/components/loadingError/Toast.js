import React from "react";
import { toast,ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Toast;
