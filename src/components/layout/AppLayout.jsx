// import Menu from "./Menu/Menu";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useStoreProps } from "../../hooks/store";
import axios from "axios";
const AppLayout = ({ children }) => {
  const { Content, Sider } = Layout;
  const { me } = useStoreProps(["me"]);
  const history = useHistory();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          width: "100%",
          position: "relative",
        }}
        theme="light"
      >
        <Menu
          selectable={false}
          // className={styles.debug}
          style={{
            height: "100%",
            width: "100%",
          }}
          // theme="dark"
          // defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
        >
          <Menu.Item>
            <Link to="/">w3g-console</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
          <Menu.ItemGroup title="Sites">
            <Menu.Item onClick={() => history.push(`/sites`)}>List</Menu.Item>
            <Menu.Item onClick={() => history.push(`/sites/create`)}>
              Create
            </Menu.Item>
          </Menu.ItemGroup>
          {/* <Menu.Item>
            <Link to="/guests">Guests</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/operators">Operators</Link>
          </Menu.Item>  */}
          <Menu.Item
            title=""
            style={{
              bottom: 0,
              zIndex: 1,
              transition: "all 0.2s",
              position: "fixed",
            }}
            onClick={async () => {
              await axios({
                method: "GET",
                headers: {
                  authorization: `Bearer ${me.token}`,
                },
                url: `${process.env.REACT_APP_API_ROOT_URL}/api/v1/operators/logout`,
                withCredentials: true,
              });
              history.go(0);
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
