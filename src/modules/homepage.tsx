import { Flex, Text } from "@mantine/core";
import Container from "../components/container";
import React from "react";
import { RouteEnum } from "../constants/route-enum";
import { Link } from "react-router-dom";

export default function Homepage() {
  const menus = React.useMemo(() => {
    return [
      {
        label: "Enum Generator",
        to: RouteEnum.EnumGenerator,
      },
      {
        label: "Model Generator",
        to: RouteEnum.ModelGenerator,
      },
    ];
  }, []);
  const mainContent = (
    <Flex w="100%" direction="column" h="calc(100vh - 77px - 32px - 25px)">
      {menus.map((menu) => {
        return (
          <Link
            style={{
              textDecoration: "none",
            }}
            to={menu.to}
            key={menu.to}
          >
            <Text color="blue">{menu.label}</Text>
          </Link>
        );
      })}
    </Flex>
  );
  return (
    <Container
      title="Springkraf Frontend Helper Generator"
      innerHTML=""
      mainContent={mainContent}
      topAction={<></>}
    />
  );
}
