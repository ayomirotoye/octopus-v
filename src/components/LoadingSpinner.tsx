import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "../assets/styles/custom/spinner.css";

const LoadingSpinner = ({ area }: any) => {
  const { promiseInProgress } = usePromiseTracker({ area: area, delay: 0 });

  return promiseInProgress ? (
    <div className="spinner">
      <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>
  ) : (
    <></>
  );
};

export default LoadingSpinner;
