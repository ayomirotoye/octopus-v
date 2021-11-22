import { isEkedpSuccessful } from "../common/helpers";

const VBadge = ({ responseCode, statusCodeValue }: any) => (
  <>
    {isEkedpSuccessful(responseCode, statusCodeValue) ? (
      <div className="badge badge-outline-success">Successful</div>
    ) : (
      <div className="badge badge-outline-warning">Pending</div>
    )}
  </>
);

export default VBadge;
