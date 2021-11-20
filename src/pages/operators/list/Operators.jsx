import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, List, message } from "antd";
import useSWR from "swr";
import { useStoreProps } from "../../../hooks/store";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import { useForm, Controller } from "react-hook-form";
// import useAuth from "../../hooks/auth";
// import { useStore } from "../../store";
// import shallow from "zustand/shallow";
// import { validateEmail } from "../../utils";

const Operators = () => {
  const history = useHistory();
  const { me } = useStoreProps(["me"]);
  const myRole = me.data.operator.role;
  const [loading, setLoading] = useState(false);

  const {
    data = [],
    error,
    mutate,
  } = useSWR(
    [`${process.env.REACT_APP_API_ROOT_URL}/api/v1/operators`, `${me.token}`],
    (url, token) =>
      fetch(url, { headers: { authorization: `Bearer ${token}` } })
        .then((res) => res.json())
        .then((res) => res.data.data)
  );

  const operatorUpdate = async (field, taskId) => {
    try {
      const updateField = Object.keys(field)[0];
      const updateValue = Object.values(field)[0];
      setLoading(true);
      const result = await axios.patch(
        `${process.env.REACT_APP_API_ROOT_URL}/api/v1/operators/${taskId}`,
        {
          ...(updateField == "status" && { active: !updateValue }),
          ...(updateField == "role" && {
            role: updateValue == "admin" ? "staff" : "admin",
          }),
        },
        { withCredentials: true }
      );
      setLoading(false);
      if (result?.data?.status === "success") {
        message.success({
          content: "Updated!",
          key: "popup",
        });
        mutate();
      }
    } catch (error) {
      setLoading(false);
      message.error({
        content: `Erorr! ${error}`,
        key: "popup",
      });
    }
  };

  const operatorRemove = async (operatorId) => {
    try {
      setLoading(true);
      const result = await axios.delete(
        `${process.env.REACT_APP_API_ROOT_URL}/api/v1/operators/${operatorId}`,
        { withCredentials: true }
      );
      setLoading(false);
      if (`${result?.status}`.startsWith("2")) {
        message.success({
          content: "Removed!",
          key: "popup",
        });
        mutate();
      }
    } catch (error) {
      setLoading(false);
      message.error({
        content: `Erorr! ${error}`,
        key: "popup",
      });
    }
  };

  return (
    <Row
      justify="center"
      gutter={[14, 14]}
      style={{
        maxWidth: "100%",
        overflow: "auto",
        height: "100vh",
      }}
    >
      <Col span={16}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={data}
          renderItem={(operator) => {
            const { name, email, active, role, _id } = operator;
            return (
              <Card>
                <List.Item
                  actions={[
                    <>
                      {email !== "0tang0juan0@gmail.com" && (
                        <div>
                          <Button
                            warn
                            loading={loading}
                            onClick={() => operatorUpdate({ role: role }, _id)}
                          >
                            Be {`${role == "admin" ? "Staff" : "Admin"}`}
                          </Button>
                          <Button
                            warn
                            loading={loading}
                            onClick={() =>
                              operatorUpdate({ status: active }, _id)
                            }
                          >
                            {`${active ? "Suspend" : "Activate"}`}
                          </Button>
                          <Button
                            loading={loading}
                            onClick={() => operatorRemove(_id)}
                            style={{ marginLeft: "6px" }}
                            danger
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </>,
                  ]}
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={site.avatar} />}
                    title={<p>{name}</p>}
                    description={
                      <>
                        <p style={{ color: "#5b5b5b" }}>{email}</p>
                        <p>Status: {`${active ? "Active" : "Pending"}`}</p>
                        <p>Role: {role}</p>
                      </>
                    }
                  />
                </List.Item>
              </Card>
            );
          }}
        />
      </Col>
    </Row>
  );
};

export default Operators;
