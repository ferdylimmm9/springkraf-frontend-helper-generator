import { Anchor, Flex, Container as RawContainer, Text, Title } from "@mantine/core";

export interface ContainerProps {
  title: string;
  topAction: React.ReactNode;
  mainContent: React.ReactNode;
  innerHTML: string;
}

export default function Container(props: ContainerProps) {
  const { title, topAction, mainContent, innerHTML } = props;
  return (
    <RawContainer fluid p={16}>
      <Flex
        pos="sticky"
        top={0}
        left={0}
        right={0}
        bg="white"
        direction="column"
        style={{
          zIndex: 3,
        }}
        py={16}
      >
        <Title ta="center">{title}</Title>
        {topAction}
      </Flex>

      {mainContent}
      <div
        dangerouslySetInnerHTML={{
          __html: innerHTML,
        }}
      />
      <Text ta="center">
        Copyright &copy; {new Date().getFullYear()}&nbsp;-&nbsp;
        <Anchor
          href="https://github.com/ferdylimmm9"
          target="_blank"
        >
          ferdylimmm9
        </Anchor>
      </Text>
    </RawContainer>
  );
}
