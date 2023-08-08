import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";

import sidebarBg from "../../assets/bg2.jpg";
import "react-pro-sidebar/dist/css/styles.css";

import "./Sidebar.scss";

const Sidebar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        // image={image ? sidebarBg : false}
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"}></DiReact>
            <span>Hoi Dan IT</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              //   suffix={<span className="badge red">New</span>}
            >
              Dashboard
            </MenuItem>
            {/* <MenuItem icon={<FaGem />}> Components</MenuItem> */}
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              //   suffix={<span className="badge yellow">3</span>}
              //   icon={<FaRegLaughWink />}
              icon={<FaGem></FaGem>}
              title="Features"
            >
              <MenuItem>QL Users</MenuItem>
              <MenuItem>QL Quiz</MenuItem>
              <MenuItem>QL Câu Hỏi</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/tanphat1815"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              ></span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
      ;
    </>
  );
};

export default Sidebar;
