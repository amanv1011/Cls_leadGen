import WidgetsIcon from "@mui/icons-material/Widgets";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
export const userRole = 3;
export const sideBarList =
  userRole !== 4
    ? [
        {
          icon: <WidgetsIcon />,
          title: "Dashboard",
          url: "/",
        },
        {
          icon: <HourglassBottomIcon />,
          title: "Campaign",
          url: "/campaign",
        },
        {
          icon: <WysiwygIcon />,
          title: "Leads",
          url: "/leads",
        },
      ]
    : [
        {
          icon: <WysiwygIcon />,
          title: "Leads",
          url: "/leads",
        },
      ];
