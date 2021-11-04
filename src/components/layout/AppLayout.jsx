// import Menu from "./Menu/Menu";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
const AppLayout = ({ children }) => {
  const { Content, Sider } = Layout;
  const history = useHistory();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        // style={{
        //   overflow: "auto",
        //   height: "100vh",
        //   // position: "fixed",
        //   // width: "100%",
        //   left: 0,
        // }}
        theme="light"
      >
        <Menu
          selectable={false}
          // className={styles.debug}
          // style={{ height: "100%", position: "fixed" }}
          // theme="dark"
          // defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
        >
          <Menu.Item>
            <Link to="/">w3g-console</Link>
          </Menu.Item>
          <Menu.ItemGroup title="Sites">
            <Menu.Item onClick={() => history.push(`/sites`)}>List</Menu.Item>
            <Menu.Item onClick={() => history.push(`/sites/create`)}>
              Create
            </Menu.Item>
          </Menu.ItemGroup>
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
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
};

export default AppLayout;