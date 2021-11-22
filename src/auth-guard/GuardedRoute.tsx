import React from "react";
import { Redirect, Route } from "react-router";
import { doAuthentication } from "../common/helpers";

export const GuardedRoute = (props: any) => (
  <Route
    {...props.rest}
    render={({location}: any) =>
      doAuthentication() === true ? (
        props.children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      )
    }
  />
);
