import React, { useState } from "react";
import { List, Space, Row, Col } from "antd";
import { HeartOutlined, FileTextOutlined } from "@ant-design/icons";
import styles from "./Sites.module.less";
import Filter from "./components/Filter";
// import { useSites } from "../../../hooks/apis";
import { useStoreProps } from "../../../hooks/store";

const Sites = () => {
  const { sites } = useStoreProps(["sites"]);
  // const [siteList, setSiteList] = useState([]);

  // for (let i = 0; i < 23; i++) {
  //   listData.push({
  //     href: "https://ant.design",
  //     title: `ant design part ${i}`,
  //     avatar: "https://joeschmoe.io/api/v1/random",
  //     description:
  //       "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  //     content:
  //       "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  //   });
  // }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <Row justify="center" gutter={[16, 16]}>
      <Col span={16} className={styles.debug}>
        <Filter />
      </Col>
      <Col span={16} className={styles.debug}>
        <List
          itemLayout="vertical"
          size="large"
          // pagination={{
          //   onChange: (page) => {
          //     console.log(page);
          //   },
          //   pageSize: 3,
          // }}
          dataSource={sites}
          // footer={
          //   <div>
          //     <b>ant design</b> footer part
          //   </div>
          // }
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText
                  icon={HeartOutlined}
                  text="156"
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={FileTextOutlined}
                  text="2"
                  key="list-vertical-message"
                />,
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default Sites;
