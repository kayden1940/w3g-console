import React, { useEffect, useState, useCallback } from "react";
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
  Space,
  message,
  Upload,
  Typography,
  Popover,
  AutoComplete,
} from "antd";
import { useLocation } from "react-router-dom";
import { useStats } from "../../../hooks/apis";
// import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
import { useStoreProps } from "../../../hooks/store";
import {
  jsonToFormData,
  fileToBase64,
  base64ToFile,
  getSortedList,
} from "../../../utils";
// import useAuth from "../../hooks/auth";
// import { useStore } from "../../store";
// import shallow from "zustand/shallow";
// import { validateEmail } from "../../utils";
import styles from "../../login/Login.module.less";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SiteCreate = () => {
  const { data: statsData } = useStats();
  const { me } = useStoreProps(["me"]);
  const [selectedPurposes, setSelectedPurposes] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [visible, setVisible] = useState(false);
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    setValue,
  } = useForm();

  const { Text, Link } = Typography;
  const { TextArea } = Input;
  const { Option } = Select;
  const location = useLocation();
  const { data } = useStats();
  const myRole = me?.data?.operator?.role;

  let languageStats = {};
  let locationTags = [];
  let purposeStats = {};
  let topicStats = {};
  let warningStats = {};

  if (!!data?.sites) {
    const { languages, locations, purposes, topics, warnings } = data.sites;
    languageStats = languages[0];
    locationTags = locations;
    purposeStats = purposes[0];
    topicStats = topics[0];
    warningStats = warnings[0];
  }

  const siteId = location.state?.siteId;

  const [fetchedSite, setFetchedSite] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (siteId) {
      const result = await fetchSite(siteId);
      setFetchedSite(result);
    }
  }, []);

  useEffect(() => {
    if (!!fetchedSite) {
      reset({
        ...fetchedSite,
        ...(fetchedSite?.imageCover &&
          !`${fetchedSite?.imageCover}`.includes(
            process.env.REACT_APP_API_ROOT_URL
          ) && {
            imageCover: `${process.env.REACT_APP_API_ROOT_URL}/images/sites/${fetchedSite.imageCover}`,
          }),
      });
    }
  }, [fetchedSite]);

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
  const siteStatusOptions = ["suspend", "running", "archive"];
  const profitabilityOptions = [
    "free",
    "freeWithDonate",
    "freeWithPay",
    "payOnly",
  ];

  const history = useHistory();

  const siteCreate = async (fData) => {
    setLoading(true);
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
        setLoading(false);
        message.success({
          content: "Created!",
          key: "createResult",
        });
        setTimeout(() => {
          history.push("/sites");
        }, 250);
      }
    } catch (error) {
      setLoading(false);
      message.error({
        content: `Erorr! ${error}`,
        key: "createResult",
      });
    }
  };

  const siteEdit = async (fData) => {
    setLoading(true);
    try {
      message.loading({ content: "Editing...", key: "editSpinner" });
      const options = {
        method: "PATCH",
        headers: {
          "content-Type": "multipart/form-data",
          authorization: `Bearer ${me.token}`,
        },
        data: fData,
        url: `${process.env.REACT_APP_API_ROOT_URL}/api/v1/sites/${siteId}`,
      };
      const editResult = await axios(options);
      if (editResult?.data?.status === "success") {
        setLoading(false);
        message.success({
          content: "Edited!",
          key: "editSpinner",
        });
        setTimeout(() => {
          history.push("/sites");
        }, 250);
      }
    } catch (error) {
      setLoading(false);
      message.error({
        content: `Erorr! ${error}`,
        key: "editSpinner",
      });
    }
  };

  const siteRemove = async () => {
    setLoading(true);
    try {
      message.loading({ content: "Removing...", key: "removeSpinner" });
      const options = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${me.token}`,
        },
        url: `${process.env.REACT_APP_API_ROOT_URL}/api/v1/sites/${siteId}`,
      };
      const removeResult = await axios(options);
      if (removeResult?.status.toString().startsWith("2")) {
        setLoading(false);
        message.success({
          content: "Removed!",
          key: "removeSpinner",
        });
        setTimeout(() => {
          history.push("/sites");
        }, 250);
      }
    } catch (error) {
      setLoading(false);
      message.error({
        content: `Erorr! ${error}`,
        key: "removeSpinner",
      });
    }
  };

  const onSubmit = async (data, e) => {
    data.created = {
      at: Date.now(),
      by: me.data.operator._id,
    };
    if (data?.imageCover) {
      if (`${data.imageCover}`.includes(process.env.REACT_APP_API_ROOT_URL)) {
        data.imageCover = data.imageCover.replace(
          `${process.env.REACT_APP_API_ROOT_URL}/images/sites/`,
          ""
        );
      } else {
        data.imageCover = await base64ToFile(data.imageCover);
      }
    }
    const formData = jsonToFormData(data);
    if (siteId) {
      siteEdit(formData);
    } else {
      siteCreate(formData);
    }
  };

  const fetchSite = async (siteId) => {
    setLoading(true);
    try {
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${me.token}`,
        },
        url: `${process.env.REACT_APP_API_ROOT_URL}/api/v1/sites/${siteId}`,
      };
      const createResult = await axios(options);
      if (createResult) {
        setLoading(false);
        return createResult?.data?.data?.data;
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  // useEffect(() => {
  //   console.log("watch()", watch());
  //   console.log("errors", errors);
  // }, [watch(), errors]);

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

          <Form.Item
            label="Original name"
            {...(errors?.name?.original && {
              validateStatus: "error",
              help: errors?.name?.original?.message,
            })}
          >
            <Controller
              name="name.original"
              control={control}
              rules={{
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
              // rules={{ required: `This field is required` }}
              defaultValue={["English"]}
              render={({ field }) => (
                <Select {...field} mode="tags" tokenSeparators={[","]}>
                  {(Object.keys(languageStats) ?? []).map((language, i) => (
                    <Option
                      key={language}
                      value={language}
                    >{`${language}(${languageStats[language]})`}</Option>
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
                  {getSortedList(Object.keys(purposeStats)).map(
                    (purpose, i) => (
                      <Option key={purpose} value={purpose}>
                        {`${purpose}(${purposeStats[purpose]})`}
                      </Option>
                    )
                  )}
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
                  {getSortedList(Object.keys(topicStats)).map((topic, i) => (
                    <Option
                      key={topic}
                      value={topic}
                    >{`${topic}(${topicStats[topic]})`}</Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Cover"
            required={true}
            {...(errors?.imageCover && {
              validateStatus: "error",
              help: errors?.imageCover?.message,
            })}
          >
            <Controller
              name="imageCover"
              rules={{
                required: `This field is required`,
              }}
              control={control}
              render={({ field }) => {
                // if (typeof watch("imageCover") == "object") {
                //   const result = await fileToBase64(
                //     watch("imageCover").file.originFileObj
                //   );
                //   await setValue("imageCover", "result");
                //   await console.log("result", result);
                //   await console.log("settedValue", watch("imageCover"));
                // }
                return (
                  <Upload
                    {...field}
                    listType="picture-card"
                    showUploadList={false}
                    maxCount={1}
                    customRequest={() => {}}
                    onChange={async (e) => {
                      const eResult = await fileToBase64(e.file.originFileObj);
                      // console.log("eResult", eResult);
                      return field.onChange(eResult);
                    }}
                  >
                    {field.value ? (
                      <img src={field.value} style={{ width: "100%" }} />
                    ) : (
                      <div>
                        {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
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
              rules={{ required: `This field is required` }}
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
          <Form.Item label="Warnings">
            <Controller
              name="warnings"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="tags"
                  onChange={(e) => {
                    console.log("e", e);
                    return field.onChange(e);
                  }}
                  // style={{ width: "100%" }}
                  tokenSeparators={[","]}
                >
                  {getSortedList(Object.keys(warningStats)).map((warning) => (
                    <Option key={warning} value={warning}>
                      {`${warning}(${warningStats[warning]})`}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item label="Location">
            <Controller
              name="location"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <AutoComplete
                  {...field}
                  options={getSortedList(locationTags).map((location) => ({
                    value: location,
                  }))}
                />
              )}
            />
          </Form.Item>
          {siteId && fetchedSite?.created?.by?.name && (
            <>
              <Form.Item label="Create by">
                <Text>{fetchedSite.created.by.name}</Text>
              </Form.Item>
            </>
          )}
        </Col>
      </Row>
      <Row justify="end">
        <Space>
          {siteId && myRole == "admin" && (
            <Popover
              content={<Button onClick={() => siteRemove()}>Yeah</Button>}
              title="For real?"
              trigger="click"
              visible={visible}
              onVisibleChange={() => setVisible((visible) => !visible)}
            >
              <Button loading={loading} danger>
                Remove
              </Button>
            </Popover>
          )}
          <Button loading={loading} onClick={handleSubmit(onSubmit)}>
            {siteId ? "Edit" : "Create"}
          </Button>
        </Space>
      </Row>
    </Form>
  );
};

export default SiteCreate;
