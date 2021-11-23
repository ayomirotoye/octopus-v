import { isEkedpSuccessful } from "../common/helpers";

const VBadge = ({ statusCode }: any) => (
  <>
    {isEkedpSuccessful(statusCode) ? (
      <div className="badge badge-outline-success">{statusCode}</div>
    ) : (
      <div className="badge badge-outline-warning">{statusCode}</div>
    )}
  </>
);

export default VBadge;
