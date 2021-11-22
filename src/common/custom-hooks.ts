import { useHistory } from "react-router";
import { encryptStorage } from "./helpers";

export const useLogout = () => {
  const history = useHistory();

  const doLogout = () => {
    encryptStorage.clear();

    return history.push("/");
  };

  return { doLogout };
};
