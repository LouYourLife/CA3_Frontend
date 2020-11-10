import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
  Prompt,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

function Login({ loggedIn, loginMsg, setLoginStatus }) {
    const handleButton = () => {
      setLoginStatus(!loggedIn);
    };
  
    return (
      <div>
        <h2>{loginMsg}</h2>
        <em>
          This simulates a real login page. Here you just need to press the button.
        </em>
        <em>
          In a real application you obviously will need to add your credentials,
          and login via the server.
        </em>
        <br/>
        <button onClick={handleButton}>{loginMsg}</button>
      </div>
    );
  }

  export default Login;