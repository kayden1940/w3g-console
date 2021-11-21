import React from "react";
import { Form, Input, Button, Row, Col, Card } from "antd";
import useSWR from "swr";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/auth";
import { useStore } from "../../store";
import shallow from "zustand/shallow";
import { validateEmail } from "../../utils";
import axios from "axios";

import styles from "./Signup.module.less";

const Signup = () => {
  const { signup } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const authResult = await signup(data);
    if (!authResult) {
      setError("email");
      setError("password");
      setTimeout(() => {
        clearErrors();
      }, 700);
    }
  };
  // console.log("errors", errors);

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
            <Form.Item
              {...(errors?.name && {
                validateStatus: "error",
                help: errors?.name?.message,
              })}
            >
              <Controller
                name="name"
                control={control}
                rules={{
                  required: { value: true, message: "Required." },
                  minLength: {
                    value: 2,
                    message: "Minimum name length: 2",
                  },
                  maxLength: {
                    value: 10,
                    message: "Maximum name length: 10",
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    onPressEnter={handleSubmit(onSubmit)}
                    placeholder="Name"
                    {...field}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              {...(errors?.email && {
                validateStatus: "error",
                help: errors?.email?.message,
              })}
            >
              <Controller
                name="email"
                control={control}
                rules={{
                  required: { value: true, message: "Required." },
                  validate: () =>
                    validateEmail(watch("email")) || "Invlid email.",
                }}
                defaultValue=""
                render={({ field }) => <Input placeholder="Email" {...field} />}
              />
            </Form.Item>

            <Form.Item
              {...(errors?.password && {
                validateStatus: "error",
                help: errors?.password?.message,
              })}
            >
              <Controller
                name="password"
                control={control}
                rules={{
                  required: { value: true, message: "Required." },
                  minLength: {
                    value: 8,
                    message: "Minimum password length: 8",
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum password length: 30",
                  },
                }}
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
              {...(errors?.passwordConfirm && {
                validateStatus: "error",
                help: errors?.passwordConfirm?.message,
              })}
            >
              <Controller
                name="passwordConfirm"
                control={control}
                rules={{
                  required: { value: true, message: "Required." },
                  validate: (value) =>
                    value === watch("password") || "Not match with password.",
                }}
                defaultValue=""
                render={({ field }) => (
                  <Input.Password
                    onPressEnter={handleSubmit(onSubmit)}
                    placeholder="Confirm password"
                    {...field}
                  />
                )}
              />
            </Form.Item>
            <Form.Item
              {...(errors?.passphrase && {
                validateStatus: "error",
                help: errors?.passphrase?.message,
              })}
            >
              <Controller
                name="passphrase"
                control={control}
                rules={{ required: { value: true, message: "Required." } }}
                defaultValue=""
                render={({ field }) => (
                  <Input.Password
                    onPressEnter={handleSubmit(onSubmit)}
                    placeholder="Passphrase"
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

export default Signup;
