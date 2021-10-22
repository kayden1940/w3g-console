import "./App.less";
import React from "react";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import useAuth from "./hooks/auth";

const { AuthProvider } = useAuth;

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        {/* <Layout> */}
        <Login />
        {/* </Layout> */}
      </div>
    </AuthProvider>
  );
};

export default App;
