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
  message,
  Upload,
} from "antd";
import { useLocation } from "react-router-dom";
import useSWR from "swr";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useStoreProps } from "../../../hooks/store";
import { jsonToFormData } from "../../../utils";
// import useAuth from "../../hooks/auth";
// import { useStore } from "../../store";
// import shallow from "zustand/shallow";
// import { validateEmail } from "../../utils";
import styles from "../../login/Login.module.less";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SiteCreate = () => {
  const { me } = useStoreProps(["me"]);
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
  // const { CheckableTag } = Tag;
  const { TextArea } = Input;
  const { Option } = Select;
  const location = useLocation();
  console.log("location", location.state.siteId);

  const { data, error } = useSWR(
    `${process.env.REACT_APP_API_ROOT_URL}/api/v1/sites/${location.state.siteId}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  console.log("data", data);

  // if (!location.pathname.includes("create")) {

  // }

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
  const history = useHistory();

  const siteCreate = async (fData) => {
    try {
      message.loading({ content: "Creating...", key: "createResult" });
      const options = {
        method: "POST",
        headers: {
          "content-Type": "multipart/form-data",
          authorization: `Bearer ${me.token}`,
        },
        data: fData,
        url: `${process.env.REACT_APP_API_ROOT_URL}/api/v1/sites`,
      };
      const createResult = await axios(options);
      if (createResult?.data?.status === "success") {
        message.success({
          content: "Created!",
          key: "createResult",
        });
        setTimeout(() => {
          history.push("/sites");
        }, 1000);
      }
    } catch (error) {
      message.error({
        content: `Erorr! ${error}`,
        key: "createResult",
      });
    }
  };

  const onSubmit = (data, e) => {
    data.created = {
      at: Date.now(),
      by: me.data.operator._id,
    };

    const formData = jsonToFormData(data);
    console.log("formData", formData);

    siteCreate(formData);
  };

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const loading = false;
  const imageUrl = "https://i.postimg.cc/kMjj7Zpj/FC7-DCWna-UAA8-O6o.jpg";

  console.log("watch", watch());

  return (
    <Form
      style={{ width: "90%" }}
      // name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // onFinish={onFinish}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row justify="center">
        <Col style={{ width: "55%" }}>
          <Divider orientation="left">Content</Divider>
          <Form.Item
            label="English name"
            required={true}
            {...(errors?.name?.en && {
              validateStatus: "error",
              help: errors?.name?.en?.message,
            })}
          >
            <Controller
              name="name.en"
              control={control}
              rules={{
                required: `This field is required`,
                minLength: {
                  value: 3,
                  message: "This field need to be at least 3 letter long",
                },
                maxLength: {
                  value: 30,
                  message: "This field need to be at most 30 letter long",
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <Input placeholder="Offical English name" {...field} />
              )}
            />
          </Form.Item>

          <Form.Item label="Original name">
            <Controller
              name="name.original"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  placeholder="Leave this blank if original name is in English"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Url"
            required={true}
            {...(errors?.url && {
              validateStatus: "error",
              help: errors?.url?.message,
            })}
          >
            <Controller
              name="url"
              control={control}
              rules={{
                required: `This field is required`,
                minLength: {
                  value: 17,
                  message: "This field need to be at least 17 letter long",
                },
                maxLength: {
                  value: 80,
                  message: "This field need to be at most 80 letter long",
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <Input placeholder="eg: https://www.google.com" {...field} />
              )}
            />
          </Form.Item>
          <Form.Item label="Languages">
            <Controller
              name="languages"
              control={control}
              rules={{ required: `This field is required` }}
              defaultValue={["English"]}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="tags"
                  // style={{ width: "100%" }}
                  // onChange={handleChange}
                  tokenSeparators={[","]}
                >
                  {languageTags.map((tag, i) => (
                    <Option key={tag}>{tag}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            required={true}
            {...(errors?.description && {
              validateStatus: "error",
              help: errors?.description?.message,
            })}
          >
            <Controller
              name="description"
              control={control}
              rules={{
                required: `This field is required`,
                minLength: {
                  value: 17,
                  message: "This field need to be at least 17 letter long",
                },
                maxLength: {
                  value: 250,
                  message: "This field need to be at most 250 letter long",
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  autoSize={{ minRows: 4 }}
                  showCount
                  maxLength="250"
                  {...field}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Purposes"
            required={true}
            {...(errors?.purposes && {
              validateStatus: "error",
              help: errors?.purposes?.message,
            })}
          >
            <Controller
              name="purposes"
              control={control}
              rules={{ required: `This field is required` }}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="tags"
                  // style={{ width: "100%" }}
                  // onChange={handleChange}
                  tokenSeparators={[","]}
                >
                  {purposeTags.map((tag, i) => (
                    <Option key={tag}>{tag}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item label="Topics">
            <Controller
              name="topics"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="tags"
                  // style={{ width: "100%" }}
                  // onChange={handleChange}
                  tokenSeparators={[","]}
                >
                  {topicTags.map((tag, i) => (
                    <Option key={tag}>{tag}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item label="Cover">
            <Controller
              name="imageCover"
              control={control}
              render={({ field }) => {
                // console.log("field", field);
                return (
                  <Upload
                    {...field}
                    listType="picture-card"
                    showUploadList={false}
                    maxCount={1}
                    customRequest={() => {}}
                    onChange={(e) => field.onChange(e.file.originFileObj)}
                  >
                    {/* {imageUrl ? (
                      <img
                        src={imageUrl}
                        // alt=""
                        style={{ width: "100%" }}
                      />
                    ) : ( */}
                    <div>
                      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                    {/* )} */}
                  </Upload>
                );
              }}
            />
          </Form.Item>
        </Col>
        <Col style={{ width: "45%" }}>
          <Divider orientation="left">Meta</Divider>
          <Form.Item
            label="Site Status"
            required={true}
            {...(errors?.status && {
              validateStatus: "error",
              help: errors?.status?.message,
            })}
          >
            <Controller
              name="status"
              control={control}
              defaultValue={"running"}
              render={({ field }) => (
                <Select
                  {...field}
                  style={{ width: "100%" }}
                  // mode="tags"
                  // style={{ width: "100%" }}
                  // onChange={handleChange}
                  tokenSeparators={[","]}
                >
                  {siteStatusOptions.map((tag, i) => (
                    <Option key={tag}>{tag}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Content access"
            required={true}
            {...(errors?.accessibility && {
              validateStatus: "error",
              help: errors?.accessibility?.message,
            })}
          >
            <Controller
              name="accessibility"
              control={control}
              defaultValue=""
              rules={{
                required: `This field is required`,
              }}
              render={({ field }) => (
                <Select
                  // mode="tags"
                  {...field}
                  style={{ width: "100%" }}
                  // onChange={handleChange}
                  tokenSeparators={[","]}
                >
                  {accessibilityOptions.map((tag, i) => (
                    <Option key={tag}>{tag}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Profitability"
            required={true}
            {...(errors?.profitability && {
              validateStatus: "error",
              help: errors?.profitability?.message,
            })}
          >
            <Controller
              name="profitability"
              control={control}
              defaultValue=""
              rules={{ required: `This field is required` }}
              render={({ field }) => (
                <Select
                  {...field}
                  // mode="tags"
                  // style={{ width: "100%" }}
                  // onChange={handleChange}
                  tokenSeparators={[","]}
                >
                  {profitabilityOptions.map((tag, i) => (
                    <Option key={tag}>{tag}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Ownership"
            required={true}
            {...(errors?.ownership && {
              validateStatus: "error",
              help: errors?.ownership?.message,
            })}
          >
            <Controller
              name="ownership"
              rules={{ required: `This field is required` }}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  // mode="tags"
                  style={{ width: "100%" }}
                  // onChange={handleChange}
                  tokenSeparators={[","]}
                >
                  {ownershipOptions.map((tag, i) => (
                    <Option key={tag}>{tag}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          {/* <Form.Item label="Warnings">
  <Controller
    name="warnings"
    control={control}
    defaultValue={[]}
    render={({ field }) => (
      <Select
        {...field}
        mode="tags"
        // style={{ width: "100%" }}
        // onChange={handleChange}
        tokenSeparators={[","]}
      >
        {warningOptions.map((tag, i) => (
          <Option key={tag}>{tag}</Option>
        ))}
      </Select>
    )}
  />
</Form.Item> */}
          <Form.Item label="Owner">
            <Controller
              name="owner.name"
              control={control}
              defaultValue=""
              render={({ field }) => <Input placeholder="" {...field} />}
            />
          </Form.Item>
          <Form.Item label="Owner Url">
            <Controller
              name="owner.url"
              control={control}
              defaultValue=""
              render={({ field }) => <Input placeholder="" {...field} />}
            />
          </Form.Item>

          <Form.Item label="Location">
            <Controller
              name="location"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  // style={{ width: 240 }}
                  {...field}
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
                        <Controller
                          name="location"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Input placeholder="location" {...field} />
                          )}
                        />
                        {/* <a
        style={{
          flex: "none",
          padding: "8px",
          display: "block",
          cursor: "pointer",
        }}
        // onClick={this.addItem}
      >
        <PlusOutlined /> Add location
      </a> */}
                      </div>
                    </div>
                  )}
                >
                  {locationOptions.map((item) => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          // loading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
        {/* <Button
          // loading={loading}
          onClick={}
        >
          test
        </Button> */}
      </Row>
    </Form>
  );
};

export default SiteCreate;
