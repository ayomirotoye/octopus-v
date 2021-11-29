import React from "react";
import Brand from "../components/Brand";

const PageNotFound = () => {
  return (
    <div>
      <div className="d-flex align-items-center auth px-0 my-5">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-center py-2 px-4 px-sm-5">
              <Brand greenLogo={true} />
              <h5 className="text-primary">Ooops ! PAGE NOT FOUND</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
