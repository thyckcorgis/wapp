import React from "react";
import Navigator from "./components/Navigator";
import { useNotifications } from "./hooks/";

export default function App() {
  const [notification] = useNotifications();
  return <Navigator />;
}
