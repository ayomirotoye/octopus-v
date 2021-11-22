
const InformationCard = ({ amount_value, percentage, title}: any) => (

  <>
    <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-9">
              <div className="d-flex align-items-center align-self-start">
                <h4 className="mb-0 text-primary">
                  <small>{amount_value}</small>
                </h4>
                <p className="text-success ml-2 mb-0 font-weight-medium">
                  {percentage}
                </p>
              </div>
            </div>
            <div className="col-3">
              <div className="icon icon-box-success">
                <span className="mdi mdi-arrow-top-right icon-item"></span>
              </div>
            </div>
          </div>
          <h6 className="text-muted font-weight-normal">{title}</h6>
        </div>
      </div>
    </div>
  </>
);

export default InformationCard;
