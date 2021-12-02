import React, { useState } from "react";
import axios from "axios";
import { useStoreProps } from "../../hooks/store";
import { Form, Input, Button, Row, Col, Card } from "antd";
// import useSWR from "swr";
// import { useForm, Controller } from "react-hook-form";
// import useAuth from "../../hooks/auth";
// import { useStore } from "../../store";
// import shallow from "zustand/shallow";
// import { validateEmail } from "../../utils";

const onBackup = async (myToken, setLoading) => {
  try {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${myToken}`,
      },
      url: `${process.env.REACT_APP_API_ROOT_URL}/api/v1/database/backup`,
    };
    const result = await axios(options);
    console.log("result", result);
  } catch (error) {
    console.log("Caught: " + error);
  } finally {
    setLoading(false);
  }
};
const onRestore = async (myToken, setLoading) => {
  setLoading(true);
  try {
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${myToken}`,
      },
      url: `${process.env.REACT_APP_API_ROOT_URL}/api/v1/database/restore`,
    };
    const result = await axios(options);
    console.log("result", result);
  } catch (error) {
    console.log("Caught: " + error);
  } finally {
    setLoading(false);
  }
};

const Dashboard = () => {
  const { me } = useStoreProps(["me"]);
  const [loading, setLoading] = useState(false);
  const myRole = me?.data?.operator?.role;
  return (
    <>
      {/* <h1>Dashboard, todo: stats and cool graph to show here.</h1> */}
      {myRole == "admin" && (
        <>
          <Button
            loading={loading}
            onClick={() => onBackup(me.token, setLoading)}
          >
            backup
          </Button>
          <Button
            loading={loading}
            onClick={() => onRestore(me.token, setLoading)}
          >
            restore
          </Button>
        </>
      )}
    </>
  );
};

export default Dashboard;
