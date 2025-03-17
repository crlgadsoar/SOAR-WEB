import {
  SolutionOutlined,
  InfoCircleOutlined,
  FileDoneOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  UserOutlined,
  DatabaseOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { LINK_STORE } from "./Link";
//import IntlMessages from 'util/IntlMessages';

export const MENU_TYPE = {
  NAVIGATE: "NAVIGATE",
  DIALOG: "DIALOG",
  MODAL: "MODAL",
  EXTERNAL_LINK: "EXTERNAL_LINK",
};

//key should be path of file

/**
 * An array of menu items for a navigation menu.
 */
export const MENU_ITEMS = [
  {
    label: "Dashboard",
    key: LINK_STORE.DASHBOARD1,
    icon: <DatabaseOutlined />,
    menuType: MENU_TYPE.NAVIGATE,
    path: "routes/configuration/dashboard1",
  },
  {
    label: "Incidents",
    key: LINK_STORE.HOME,
    icon: <MinusCircleOutlined />,
    menuType: MENU_TYPE.NAVIGATE,
    path: "routes/main/home",
  },
  {
    label: "Playbooks",
    key: LINK_STORE.PLAYBOOKS,
    icon: <FileDoneOutlined />,
    menuType: MENU_TYPE.NAVIGATE,
    path: "routes/configuration",
  },
  {
    label: "MITRE | ATT&CK",
    key: LINK_STORE.MITRE,
    icon: <SolutionOutlined />,
    menuType: MENU_TYPE.NAVIGATE,
    path: "routes/mitre",
  },
  // {
  //   label: "Users",
  //   key: LINK_STORE.USERS,
  //   icon: <UserOutlined />,
  //   menuType: MENU_TYPE.NAVIGATE,
  //   path: "routes/user_management/config",
  // },
  //about is having modal and not a new page for navigation
  {
    label: "About",
    key: LINK_STORE.ABOUT,
    icon: <InfoCircleOutlined />,
    menuType: MENU_TYPE.MODAL,
  },
];
