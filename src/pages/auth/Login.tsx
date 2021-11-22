import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { Button, Form } from "react-bootstrap";
import Brand from "../../components/Brand";
import { callToUserLogin } from "../../services/auth-service";
import { encryptStorage, isSuccessful } from "../../common/helpers";
import { useHistory } from "react-router";
import { routeConstants } from "../../routing/RouteConstants";
import { toast } from "react-toastify";
import { responseMessage } from "../../common/response-message";
import { httpServiceInterfaceOauth2 } from "../../services/http-service";

type LoginData = {
  username: string;
  password: string;
};
const Login = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    setLoginData({ ...loginData, [event.target.id]: event.target.value });
  };

  const doUserLogin = () => {
    trackPromise(
      callToUserLogin(loginData)
        .then((res: any) => {
          console.log("RESPONSE::", res);
          if (isSuccessful(res.responseCode)) {
            httpServiceInterfaceOauth2.setJwt(res?.data.accessToken);
            encryptStorage.setItem("isLoggedIn", "true");
            encryptStorage.setItem("accessToken", res?.data.accessToken);
            encryptStorage.setItem("name", res?.data.name);
            history.push({
              pathname: routeConstants.DASHBOARD_ENDPOINT,
            });
          } else {
            toast.error(responseMessage.LOGIN_FAILED);
          }
        })
        .catch((err) => {
          console.log("ERROR OCCURRED:::", err);
        })
    );
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 my-5">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-2 px-4 px-sm-5">
              <Brand greenLogo={true} />
              <h5 className="text-primary">Welcome to OctopusV Portal</h5>
              <h6 className="font-weight-light text-primary">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="email"
                    placeholder="Username"
                    size="lg"
                    className="h-auto"
                    value={loginData.username}
                    id="username"
                    name="username"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    className="h-auto"
                    value={loginData.password}
                    id="password"
                    name="password"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <div className="mt-3">
                  <Button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={doUserLogin}
                    type="button"
                  >
                    SIGN IN
                  </Button>
                </div>
                <div className="my-2 d-flex justify-content-center align-items-center">
                  <a
                    href="!#"
                    onClick={(event) => event.preventDefault()}
                    className="auth-link text-muted"
                  >
                    Forgot password?
                  </a>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
