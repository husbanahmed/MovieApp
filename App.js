import Navigation from "./navigations/navigations";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <Navigation />
    </PaperProvider>
  );
}
