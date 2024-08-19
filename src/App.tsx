import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Homepage from "./modules/home";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Homepage />
    </MantineProvider>
  );
}
