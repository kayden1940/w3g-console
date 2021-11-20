import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, List, message } from "antd";
import useSWR from "swr";
import { useStoreProps } from "../../hooks/store";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import { useForm, Controller } from "react-hook-form";
// import useAuth from "../../hooks/auth";
// import { useStore } from "../../store";
// import shallow from "zustand/shallow";
// import { validateEmail } from "../../utils";

const Tasks = () => {
  const history = useHistory();
  const { me } = useStoreProps(["me"]);
  const myRole = me.data.operator.role;
  const [loading, setLoading] = useState(false);

  const {
    data = [],
    error,
    mutate,
  } = useSWR(
    [
      `${process.env.REACT_APP_API_ROOT_URL}/api/v1/tasks?sort=status`,
      `${me.token}`,
    ],
    (url, token) =>
      fetch(url, { headers: { authorization: `Bearer ${token}` } })
        .then((res) => res.json())
        .then((res) => res.data.data)
  );

  const taskUpdate = async (status, taskId) => {
    try {
      setLoading(true);
      const result = await axios.patch(
        `${process.env.REACT_APP_API_ROOT_URL}/api/v1/tasks/${taskId}`,
        {
          status: status,
          processed: {
            at: Date.now(),
            by: me.data.operator._id,
          },
        },
        { withCredentials: true }
      );
      setLoading(false);
      console.log("Date.now()", Date.now());
      if (result?.data?.status === "success") {
        mutate();
      }
    } catch (error) {
      setLoading(false);
      message.error({
        content: `Erorr! ${error}`,
        key: "createResult",
      });
    }
  };

  const taskRemove = async (taskId) => {
    try {
      setLoading(true);
      const result = await axios.delete(
        `${process.env.REACT_APP_API_ROOT_URL}/api/v1/tasks/${taskId}`,
        { withCredentials: true }
      );
      setLoading(false);
      console.log("result", result);
      if (`${result?.status}`.startsWith("2")) {
        message.success({
          content: "Removed!",
          key: "createResult",
        });
        mutate();
      }
    } catch (error) {
      setLoading(false);
      message.error({
        content: `Erorr! ${error}`,
        key: "createResult",
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
          // pagination={{
          //   onChange: (page) => {
          //     console.log(page);
          //   },
          //   pageSize: 3,
          // }}
          dataSource={data}
          // footer={
          //   <div>
          //     <b>ant design</b> footer part
          //   </div>
          // }
          renderItem={(task) => {
            const ISSUED_DATE = `${new Date(task.date).getDay()}-${new Date(
              task.date
            ).getMonth()}-${new Date(task.date).getFullYear()}`;
            return (
              <Card>
                <List.Item
                  // key={site.slug}
                  actions={[
                    <>
                      <Button
                        type={
                          !task?.status || task?.status == "idle"
                            ? "primary"
                            : "dashed"
                        }
                        // {...(myRole !== "admin" &&
                        //   ["rejected", "resolved"].includes(task?.status) && {
                        //     disabled: true,
                        //   })}
                        loading={loading}
                        onClick={() => {
                          if (task?.status == "idle") return;
                          taskUpdate("idle", task._id);
                        }}
                      >
                        idle
                      </Button>
                      <Button
                        type={
                          task?.status == "processing" ? "primary" : "dashed"
                        }
                        // {...(myRole !== "admin" &&
                        //   ["rejected", "resolved"].includes(task?.status) && {
                        //     disabled: true,
                        //   })}
                        loading={loading}
                        onClick={() => {
                          if (task?.status == "processing") return;
                          taskUpdate("processing", task._id);
                        }}
                      >
                        processing
                      </Button>
                      <Button
                        type={task?.status == "resolved" ? "primary" : "dashed"}
                        // {...(
                        //   myRole !== "admin" &&
                        //   task?.status !== "resolved" && {
                        //     disabled: true,
                        //   })}
                        loading={loading}
                        onClick={() => {
                          if (task?.status == "resolved") return;
                          taskUpdate("resolved", task._id);
                        }}
                      >
                        resolved
                      </Button>
                      <Button
                        type={task?.status == "rejected" ? "primary" : "dashed"}
                        // {...(
                        //   myRole !== "admin" &&
                        //   task?.status !== "rejected" &&
                        //   {
                        //     disabled: true,
                        //   })}
                        loading={loading}
                        danger
                        onClick={() => {
                          if (task?.status == "rejected") return;
                          taskUpdate("rejected", task._id);
                        }}
                      >
                        rejected
                      </Button>
                      {myRole == "admin" && (
                        <Button
                          loading={loading}
                          danger
                          style={{ marginLeft: "20px" }}
                          onClick={() => {
                            taskRemove(task._id);
                          }}
                        >
                          remove
                        </Button>
                      )}
                    </>,
                  ]}
                >
                  <List.Item.Meta
                    // avatar={<Avatar src={site.avatar} />}
                    title={
                      <p>
                        {task.type}: {task.url}
                      </p>
                    }
                    description={
                      <>
                        <p style={{ color: "#5b5b5b" }}>{task.description}</p>
                        <p>Submited by: {task.email}</p>
                        <p>Issued on: {ISSUED_DATE}</p>
                        {task?.processed && (
                          <p>last processed by: {task.processed.by.name}</p>
                        )}
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

export default Tasks;
