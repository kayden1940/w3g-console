import { Layout, Menu as AntdMenu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

// import { Typography } from "antd";
import styles from "./Menu.module.less";
// import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// const { Title } = Typography;

const { SubMenu } = AntdMenu;

const Menu = () => {
  const history = useHistory();
  return (
    <AntdMenu
      selectable={false}
      // className={styles.debug}
      style={{ height: "100%", position: "fixed" }}
      // theme="dark"
      // defaultSelectedKeys={["1"]}
      // defaultOpenKeys={["sub1"]}
    >
      <AntdMenu.Item>
        <Link to="/">w3g-console</Link>
      </AntdMenu.Item>
      <AntdMenu.ItemGroup title="Sites">
        <AntdMenu.Item onClick={() => history.push(`/sites`)}>
          List
        </AntdMenu.Item>
        <AntdMenu.Item onClick={() => history.push(`/sites/create`)}>
          Create
        </AntdMenu.Item>
      </AntdMenu.ItemGroup>
      <AntdMenu.Item>
        <Link to="/tasks">Tasks</Link>
      </AntdMenu.Item>
      <AntdMenu.Item>
        <Link to="/guests">Guests</Link>
      </AntdMenu.Item>
      <AntdMenu.Item>
        <Link to="/operators">Operators</Link>
      </AntdMenu.Item>
      {/* <Menu.Item key="2" icon={<CalendarOutlined />}>
        Navigation Two
      </Menu.Item>
      <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
        <SubMenu key="sub1-2" title="Submenu">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
      </SubMenu>
      <Menu.Item key="link" icon={<LinkOutlined />}>
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Ant Design
        </a>
      </Menu.Item> */}
    </AntdMenu>
  );
};

export default Menu;
