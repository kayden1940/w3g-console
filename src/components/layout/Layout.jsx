import NavHeader from "../layout/navHeader/NavHeader";
// import { Layout, Menu, Breadcrumb } from 'antd';
// const { Header, Content, Footer } = Layout;

const Layout = ({ children }) => (
  <>
    <NavHeader />
    <>{children}</>
  </>
);

export default Layout;
