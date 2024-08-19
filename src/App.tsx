import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import ModelGenerator from "./modules/model-generator";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteEnum } from "./constants/route-enum";
import EnumGeneratorPage from "./modules/enum-generator";
import Homepage from "./modules/homepage";

const router = createBrowserRouter([
  {
    path: RouteEnum.Home,
    element: <Homepage />,
  },
  {
    path: RouteEnum.ModelGenerator,
    element: <ModelGenerator />,
  },
  {
    path: RouteEnum.EnumGenerator,
    element: <EnumGeneratorPage />,
  },
]);

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
