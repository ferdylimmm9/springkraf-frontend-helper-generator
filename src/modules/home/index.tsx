import {
  Anchor,
  Button,
  Container,
  CopyButton,
  Flex,
  JsonInput,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import modelGenerator from "../../utils/model-generator";

export default function Homepage() {
  const [classname, setClassName] = React.useState("AuthModel");
  const [json, setJson] = React.useState<any | undefined>(undefined);
  const [result, setResult] = React.useState<string | undefined>(undefined);

  const onSubmit = React.useCallback(() => {
    const result = modelGenerator(json, classname || "Default");
    setResult(result);
  }, [classname, json]);

  return (
    <Container fluid p={16}>
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
        <Title ta="center">Springkraf Typescript Model Generator</Title>
        <Flex align="flex-end" gap={16}>
          <TextInput
            w="100%"
            value={classname}
            label="Classname"
            placeholder="Input your classname"
            onChange={(e) => {
              const value = e.target.value;
              setClassName(value || "");
            }}
          />
          <Flex align="center" gap={16}>
            <Button onClick={onSubmit}>Generate</Button>
            <CopyButton value={result || ""}>
              {({ copied, copy }) => {
                return (
                  <>
                    <Button
                      variant={copied ? "filled" : "outline"}
                      color={copied ? "teal" : undefined}
                      onClick={copy}
                    >
                      {copied ? "Copied Model" : "Copy Model"}
                    </Button>
                  </>
                );
              }}
            </CopyButton>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        justify="space-between"
        my={32}
        gap={24}
        direction={{
          base: "column",
          md: "row",
        }}
      >
        <Flex flex={1}>
          <JsonInput
            w="100%"
            h="100%"
            autosize
            label="Input"
            placeholder="Insert your response result"
            value={json ? JSON.stringify(json, null, 4) : undefined}
            onChange={(e) => {
              try {
                setJson(JSON.parse(e));
              } catch (e) {
                setJson({});
              }
            }}
          />
        </Flex>
        <Flex flex={1}>
          <Textarea
            autosize
            w="100%"
            h="100%"
            value={result}
            label="Result"
            placeholder="Insert your response first to acquire model"
          />
        </Flex>
      </Flex>
      <Text ta='center'>
        Copyright &copy; {new Date().getFullYear()}&nbsp;-&nbsp;
        <Anchor
          href="https://github.com/ferdylimmm9/springkraf-typescript-model-generator"
          target="_blank"
        >
          ferdylimmm9/springkraf-typescript-model-generator
        </Anchor>
      </Text>
    </Container>
  );
}
