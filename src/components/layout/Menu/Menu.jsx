// NOTE: due to there is weird space when Menu is modularized from AppLayout, this component is deprecated, But will be keep it as file when I think of a hacky way to do it, low priority.

// import { Layout, Menu as AntdMenu } from "antd";
// import { MailOutlined } from "@ant-design/icons";
// import { useHistory } from "react-router-dom";

// // import { Typography } from "antd";
// import styles from "./Menu.module.less";
// // import styled from "@emotion/styled";
// import { Link } from "react-router-dom";

// // const { Title } = Typography;

// const { SubMenu } = AntdMenu;

// const Menu = () => {
//   const history = useHistory();
//   return (
//     <AntdMenu
//       selectable={false}
//       // className={styles.debug}
//       style={{ height: "100%", position: "fixed" }}
//       // theme="dark"
//       // defaultSelectedKeys={["1"]}
//       // defaultOpenKeys={["sub1"]}
//     >
//       <AntdMenu.Item>
//         <Link to="/">w3g-console</Link>
//       </AntdMenu.Item>
//       <AntdMenu.ItemGroup title="Sites">
//         <AntdMenu.Item onClick={() => history.push(`/sites`)}>
//           List
//         </AntdMenu.Item>
//         <AntdMenu.Item onClick={() => history.push(`/sites/create`)}>
//           Create
//         </AntdMenu.Item>
//       </AntdMenu.ItemGroup>
//       {/* <AntdMenu.Item>
//         <Link to="/tasks">Tasks</Link>
//       </AntdMenu.Item>
//       <AntdMenu.Item>
//         <Link to="/guests">Guests</Link>
//       </AntdMenu.Item>
//       <AntdMenu.Item>
//         <Link to="/operators">Operators</Link>
//       </AntdMenu.Item> */}

//     </AntdMenu>
//   );
// };

// export default Menu;
