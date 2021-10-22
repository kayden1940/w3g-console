import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import styles from "./NavHeader.module.less";
import styled from "@emotion/styled";

const { Title } = Typography;

const { SubMenu } = Menu;
const { Header } = Layout;

const NavHeader = () => {
  return (
    <>
      <Header>
        {/* <Logo>
        </Logo> */}
        <div className={styles.logo}>
          <p className={styles.title}>w3g-console</p>
        </div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>Sites</Menu.Item>
          <Menu.Item>Tasks</Menu.Item>
          <Menu.Item>Guests</Menu.Item>
          <Menu.Item>Operators</Menu.Item>
        </Menu>
      </Header>
      {/* <div>{children}</div> */}
    </>
  );
};

export default NavHeader;
