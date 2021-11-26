import React, { useState } from "react";
import { List, Space, Row, Col, Card, Button } from "antd";
import { HeartOutlined, FileTextOutlined } from "@ant-design/icons";
import styles from "./Sites.module.less";
import Filter from "./components/Filter";
import { useSites } from "../../../hooks/apis";
import { useStoreProps } from "../../../hooks/store";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

const getSortedSites = (list) => {
  // fixme: sort at api
  if (!list) return [];
  return list.sort((a, b) => {
    if (!a?.name) return;
    return a.name.en.localeCompare(b.name.en);
  });
};

const Sites = () => {
  const history = useHistory();
  const { data: rawSitesData } = useSites();
  const [sitesData, setSitesData] = useState([]);

  return (
    <Row
      justify="center"
      gutter={[14, 14]}
      style={{
        maxWidth: "100%",
        overflow: "auto",
      }}
    >
      <Col span={16}>
        <Filter
          setSitesData={setSitesData}
          rawSitesData={rawSitesData}
        />
      </Col>
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
          dataSource={getSortedSites(sitesData)}
          // footer={
          //   <div>
          //     <b>ant design</b> footer part
          //   </div>
          // }
          renderItem={(site) => (
            <Card>
              <List.Item
                key={site.slug}
                actions={[
                  <Button
                    onClick={() => {
                      history.push(`/sites/${site._id}`, { siteId: site._id });
                    }}
                  >
                    Edit
                  </Button>,
                  // <IconText
                  //   icon={HeartOutlined}
                  //   text="156"
                  //   key="list-vertical-star-o"
                  // />,
                  // <IconText
                  //   icon={FileTextOutlined}
                  //   text="2"
                  //   key="list-vertical-message"
                  // />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={`${process.env.REACT_APP_API_ROOT_URL}/images/sites/${site.imageCover}`}
                  />
                }
              >
                <List.Item.Meta
                  // avatar={<Avatar src={site.avatar} />}
                  title={
                    <a href={site.url} target="_blank">
                      {site.name.en}
                    </a>
                  }
                  description={
                    <>
                      <p style={{ color: "#5b5b5b" }}>{site.description}</p>
                      <p>
                        {site.purposes.join(", ")}
                        {site.topics.length > 0 && `, `}
                        {site.topics.join(", ")}
                      </p>
                    </>
                  }
                />
              </List.Item>
            </Card>
          )}
        />
      </Col>
    </Row>
  );
};

export default Sites;
