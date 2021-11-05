import React from "react";
// import { Form, Input, Button, Row, Col, Card } from "antd";
// import useSWR from "swr";
// import { useForm, Controller } from "react-hook-form";
// import useAuth from "../../hooks/auth";
// import { useStore } from "../../store";
// import shallow from "zustand/shallow";
// import { validateEmail } from "../../utils";

const Dashboard = () => {
  //   const { login } = useAuth();
  //   const {
  //     handleSubmit,
  //     watch,
  //     control,
  //     formState: { errors },
  //     setError,
  //     clearErrors,
  //   } = useForm();
  //   const onSubmit = async (data) => {
  //     const authResult = await login(data);
  //     if (!authResult) {
  //       setError("email");
  //       setError("password");
  //       setTimeout(() => {
  //         clearErrors();
  //       }, 700);
  //     }
  //   };

  //   const { loading } = useStore(
  //     (state) => ({
  //       authed: state.authed,
  //       setAuthed: state.setAuthed,
  //       loading: state.loading,
  //     }),
  //     shallow
  //   );

  return <h1>Dashboard, todo: stats and cool graph to show here.</h1>;
};

export default Dashboard;
