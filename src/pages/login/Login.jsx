import React from "react";
import { Form, Input, Button, Row, Col, Card } from "antd";
import useSWR from "swr";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/auth";
import { useStore } from "../../store";
import shallow from "zustand/shallow";
import { validateEmail } from "../../utils";

import styles from "./Login.module.less";

const Login = () => {
  const { login } = useAuth();
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {
    const authResult = await login(data);
    console.log("authResult", authResult);
    if (!authResult) {
      setError("email");
      setError("password");
      setTimeout(() => {
        clearErrors();
      }, 700);
    }
  };

  const { loading } = useStore(
    (state) => ({
      loading: state.loading,
    }),
    shallow
  );

  return (
    <Row justify="center" type="flex" align="middle" className={styles.form}>
      <Col>
        <Card style={{ width: 300 }} bordered={false}>
          <Form
            // className={styles.debug}
            // labelCol={{
            //   span: 8,
            // }}
            // wrapperCol={{
            //   span: 12,
            // }}
            initialValues={{
              remember: true,
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Item {...(errors?.email && { validateStatus: "error" })}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true, validate: validateEmail }}
                defaultValue=""
                render={({ field }) => <Input placeholder="Email" {...field} />}
              />
            </Form.Item>

            <Form.Item {...(errors?.password && { validateStatus: "error" })}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <Input.Password
                    onPressEnter={handleSubmit(onSubmit)}
                    placeholder="Password"
                    {...field}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
            //   wrapperCol={{
            //     offset: 16,
            //     span: 16,
            //   }}
            >
              <Button
                type="primary"
                loading={loading}
                onClick={handleSubmit(onSubmit)}
              >
                ➔
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
