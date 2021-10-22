import React from "react";
import { Form, Input, Button, Row, Col, Card } from "antd";
import useSWR from "swr";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/auth";

import styles from "./Login.module.less";

const Login = () => {
  // rhf
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data);
  };
  const { AuthConsumer } = useAuth;
  const { authed, login } = AuthConsumer();

  return (
    <Row justify="center" type="flex" align="middle" className={styles.form}>
      <Col>
        <Card style={{ width: 300 }}>
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
            <Form.Item {...(errors?.name && { validateStatus: "error" })}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => <Input placeholder="email" {...field} />}
              />
            </Form.Item>

            <Form.Item {...(errors?.password && { validateStatus: "error" })}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <Input.Password placeholder="password" {...field} />
                )}
              />
            </Form.Item>

            <Form.Item
            //   wrapperCol={{
            //     offset: 16,
            //     span: 16,
            //   }}
            >
              <Button type="primary" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
