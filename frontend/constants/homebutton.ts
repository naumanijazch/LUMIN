import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

interface Button {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap | keyof typeof FontAwesome.glyphMap;
  route: string;
}

const buttons: Button[] = [
  {
    name: "Scheduler",
    icon: "calendar-today",
    route: "Scheduler",
  },
  {
    name: "GPA Predictor",
    icon: "bar-chart",
    route: "GPA Predictor",
  },
  {
    name: "Donations",
    icon: "attach-money",
    route: "Donations",
  },
  {
    name: "Coming Soon",
    icon: "hourglass-bottom",
    route: "Coming Soon",
  },
];

export default buttons;
