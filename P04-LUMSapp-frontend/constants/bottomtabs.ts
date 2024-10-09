import { Ionicons } from "@expo/vector-icons";
import LdfHomePage from "../screens/LdfHomePage";
import AddPost from "../screens/AddPost";
import HomeStack from "../components/HomeStack";
import Profile from "../screens/Profile";
import Notifications from "../screens/NotificationsTab";
import EventTopTabs from "../components/EventTopTabs";
import ChatScreen from "../screens/ChatScreen";
import ChatsHome from "../screens/ChatsHome";
import Donations from "../screens/Donations";

type BottomTab = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  component: React.FC;
};

const bottomTabs: BottomTab[] = [
  { name: "LDF", icon: "people-outline", component: LdfHomePage },
  { name: "AllEvents", icon: "calendar", component: EventTopTabs },
  { name: "HomeStack", icon: "home", component: HomeStack },
  { name: "Notifications", icon: "notifications", component: Notifications },
  // { name: "Donations", icon: "fitness" },
  { name: "Profile", icon: "person", component: Profile },
];

export default bottomTabs;
