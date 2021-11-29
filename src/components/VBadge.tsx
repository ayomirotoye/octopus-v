import { isEkedpSuccessful } from "../common/helpers";

const VBadge = ({ statusCode, children }: any) => (
  <>
    {isEkedpSuccessful(statusCode) ? (
      <div style={{ wordBreak: "break-word" }} className="badge badge-outline-success">{children}</div>
    ) : (
      <div style={{ wordBreak: "break-word" }} className="badge badge-outline-warning">{children}</div>
    )}
  </>
);

export default VBadge;
