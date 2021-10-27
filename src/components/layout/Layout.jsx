import Menu from "./Menu/Menu";
import { Layout as AntdLayout } from "antd";
// const { Header, Content, Footer } = Layout;

const Layout = ({ children }) => {
  const { Content, Sider } = AntdLayout;
  return (
    <AntdLayout>
      <Sider>
        <Menu />
      </Sider>
      <Content>
        <>{children}</>
      </Content>
    </AntdLayout>
  );
};

export default Layout;
