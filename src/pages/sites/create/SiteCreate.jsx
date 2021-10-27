import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Col,
  Row,
  Tag,
  Select,
  Divider,
  Image,
} from "antd";
// import useSWR from "swr";
import { PlusOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
// import useAuth from "../../hooks/auth";
// import { useStore } from "../../store";
// import shallow from "zustand/shallow";
// import { validateEmail } from "../../utils";
import styles from "../../login/Login.module.less";

const SiteCreate = () => {
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const { CheckableTag } = Tag;
  const { TextArea } = Input;
  const { Option } = Select;

  const purposeTags = [
    "portfolio",
    "leaflet",
    "playground",
    "game",
    "artwork",
    "blog",
    "mystery",
    "service",
    "sns",
    "tool",
    "resource",
    "tutorial",
    "unknown",
  ];

  const topicTags = [
    "music",
    "design",
    "web",
    "graphic",
    "computerScience",
    "science",
    "math",
    "editing",
    "cookery",
  ];

  const languageTags = [
    "English",
    "Tranditional Chinese",
    "Simplified Chinese",
  ];
  const accessibilityOptions = ["full", "membership", "memberOnly", "private"];
  const ownershipOptions = [
    "personal",
    "indie",
    "project",
    "company",
    "ngo",
    "gov",
    "decentral",
    "unknown",
  ];
  const locationOptions = ["Hong Kong", "United Kingdom", "United States"];
  const siteStatusOptions = ["suspend", "running", "archive"];
  const profitabilityOptions = [
    "free",
    "freeWithDonate",
    "freeWithPay",
    "payOnly",
  ];
  const warningOptions = ["flashing", "adult", "nsfw"];

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
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  return (
    <Form
      style={{ width: "90%" }}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row justify="center">
        <Col style={{ width: "55%" }}>
          <Divider orientation="left">Content</Divider>
          <Form.Item label="English name" required={true}>
            <Input />
          </Form.Item>

          <Form.Item label="Original name">
            <Input />
          </Form.Item>
          <Form.Item label="Url" required={true}>
            <Input />
          </Form.Item>
          <Form.Item label="Languages">
            <Select
              mode="tags"
              // style={{ width: "100%" }}
              // onChange={handleChange}
              tokenSeparators={[","]}
            >
              {languageTags.map((tag, i) => (
                <Option key={i.toString(36) + i}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Description" required={true}>
            <TextArea autoSize={{ minRows: 4 }} showCount maxLength="250" />
          </Form.Item>
          <Form.Item label="Purposes" required={true}>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              // onChange={handleChange}
              tokenSeparators={[","]}
            >
              {purposeTags.map((tag, i) => (
                <Option key={i.toString(36) + i}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Topics">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              // onChange={handleChange}
              tokenSeparators={[","]}
            >
              {topicTags.map((tag, i) => (
                <Option key={i.toString(36) + i}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Cover">
            <Image
              width={100}
              height={100}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Form.Item>
        </Col>
        <Col style={{ width: "45%" }}>
          <Divider orientation="left">Meta</Divider>
          <Form.Item label="Site Status" required={true}>
            <Select
              style={{ width: "100%" }}
              // mode="tags"
              // style={{ width: "100%" }}
              // onChange={handleChange}
              tokenSeparators={[","]}
            >
              {siteStatusOptions.map((tag, i) => (
                <Option key={i.toString(36) + i}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Location">
            <Select
              // style={{ width: 240 }}
              allowClear
              // placeholder="custom dropdown render"
              dropdownRender={(menu) => (
                <div>
                  {menu}
                  <Divider style={{ margin: "4px 0" }} />
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      padding: 8,
                    }}
                  >
                    <Input
                      style={{ flex: "auto" }}
                      value={name}
                      // onChange={this.onNameChange}
                    />
                    <a
                      style={{
                        flex: "none",
                        padding: "8px",
                        display: "block",
                        cursor: "pointer",
                      }}
                      // onClick={this.addItem}
                    >
                      <PlusOutlined /> Add item
                    </a>
                  </div>
                </div>
              )}
            >
              {locationOptions.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Profitability" required={true}>
            <Select
              // mode="tags"
              // style={{ width: "100%" }}
              // onChange={handleChange}
              tokenSeparators={[","]}
            >
              {profitabilityOptions.map((tag, i) => (
                <Option key={i.toString(36) + i}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Ownership" required={true}>
            <Select
              // mode="tags"
              style={{ width: "100%" }}
              // onChange={handleChange}
              tokenSeparators={[","]}
            >
              {ownershipOptions.map((tag, i) => (
                <Option key={i.toString(36) + i}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Owner">
            <Input />
          </Form.Item>
          <Form.Item label="Owner Url">
            <Input />
          </Form.Item>
          <Form.Item label="Warnings" required={true}>
            <Select
              mode="tags"
              // style={{ width: "100%" }}
              // onChange={handleChange}
              tokenSeparators={[","]}
            >
              {warningOptions.map((tag, i) => (
                <Option key={i.toString(36) + i}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Content access" required={true}>
            <Select
              // mode="tags"
              style={{ width: "100%" }}
              // onChange={handleChange}
              tokenSeparators={[","]}
            >
              {accessibilityOptions.map((tag, i) => (
                <Option key={i.toString(36) + i}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {/* <Row justify="center">
        <Button>Submit</Button>
      </Row> */}
    </Form>
  );
};

export default SiteCreate;
