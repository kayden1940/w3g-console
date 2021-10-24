import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import styles from "./NavHeader.module.less";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const { Title } = Typography;

const { SubMenu } = Menu;
const { Header } = Layout;

const NavHeader = () => {
  return (
    <>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item>
            <Link to="/">w3g-console</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/sites">Sites</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/guests">Guests</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/operators">Operators</Link>
          </Menu.Item>
        </Menu>
      </Header>
      {/* <div>{children}</div> */}
    </>
  );
};

export default NavHeader;
