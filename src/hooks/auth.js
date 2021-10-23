import * as React from "react";
import axios from "axios";

// https://ui.dev/react-router-protected-routes-authentication/
const authContext = React.createContext();

const useAuth = () => {
  const [authed, setAuthed] = React.useState(false);
  return {
    authed,
    login({ email, password }) {
      return (async () => {
        const result = await axios.post(
          `${process.env.REACT_APP_API_ROOT_URL}/operators/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        await console.log("result", result);
        // if(){
        //   setAuthed(true)
        // }
      })().catch((e) => {
        setAuthed(true);
        console.log("Caught: " + e);
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
};

const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const AuthConsumer = () => {
  return React.useContext(authContext);
};

export default { AuthConsumer, AuthProvider };
