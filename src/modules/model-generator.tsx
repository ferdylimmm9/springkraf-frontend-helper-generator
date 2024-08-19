import { Button, Flex, JsonInput, Textarea, TextInput } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import React from "react";
import modelGenerator from "../utils/model-generator";
import Container from "../components/container";

const innerHTML = `
<h1 id="typescript-model-generator">Springkraf Typescript Model Generator</h1>
<p>This web generates TypeScript models from JSON data, converting all properties to camelCase and adding appropriate type annotations and decorators. The model classes are named in PascalCase, and nested objects or arrays of objects generate additional model classes.</p>
<h2 id="usage-guide-for-modelgenerator-function">Usage Guide for <code>modelGenerator</code> Function</h2>
<p>The <code>modelGenerator</code> function is designed to automatically generate TypeScript class models from JSON input. This function, along with its helper methods, transforms the JSON structure into a format compatible with class-transformer decorators. Below is an overview of how the function processes the input and what kind of output you can expect.</p>
<h4 id="-data-type-handling-"><strong>Data Type Handling</strong></h4>
<p>The <code>modelGenerator</code> function automatically determines the TypeScript data type for each property based on its value:</p>
<ol>
<li><strong>Boolean</strong>: If the value is a boolean, the type is <code>boolean</code>.</li>
<li><strong>Number</strong>: If the value is a number or a string that can be parsed into a number, the type is <code>number</code>.</li>
<li><strong>String</strong>: If the value is a string, the type is <code>string</code>.</li>
<li><strong>Date</strong>: If the key ends with <code>_at</code> or <code>At</code> and the value is a string that represents a date, the type is <code>Date</code>.</li>
<li><strong>Null</strong>: If the value is null and the key ends with <code>_at</code> or <code>At</code>, the type is <code>Date | null</code>. Otherwise, it is <code>string | null</code>.</li>
<li><strong>Array</strong>: If the value is an array, the function checks the first element&#39;s type to generate the appropriate array type. If the array contains objects, a sub-model is generated.</li>
<li><strong>Object</strong>: If the value is an object, a nested class model is generated for it.</li>
</ol>
<h4 id="-key-formatting-"><strong>Key Formatting</strong></h4>
<ul>
<li><strong>Snake Case to Camel Case</strong>: All keys in the JSON input that are in snake_case will be converted to camelCase in the generated TypeScript model.</li>
<li><strong>Pascal Case Class Names</strong>: The class names and sub-model names generated are in PascalCase.</li>
</ul>
<h4 id="-decorators-used-"><strong>Decorators Used</strong></h4>
<ul>
<li><strong><code>@Expose</code></strong>: Applied to properties whose JSON keys are in snake_case, indicating the original key name.</li>
<li><strong><code>@Type</code></strong>: Applied to properties that need to be transformed into a specific type (e.g., Date, nested object models, etc.).</li>
</ul>
<h4 id="-example-input-"><strong>Example Input</strong></h4>
<pre><code class="lang-json">{
  <span class="hljs-attr">"id"</span>: <span class="hljs-string">"123"</span>,
  <span class="hljs-attr">"created_at"</span>: <span class="hljs-string">"2024-01-01T00:00:00Z"</span>,
  <span class="hljs-attr">"details"</span>: {
    <span class="hljs-attr">"item_count"</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">"items"</span>: [
      {
        <span class="hljs-attr">"id"</span>: <span class="hljs-string">"item1"</span>,
        <span class="hljs-attr">"price"</span>: <span class="hljs-string">"100.50"</span>
      }
    ]
  }
}
</code></pre>
<h4 id="-example-output-"><strong>Example Output</strong></h4>
<pre><code class="lang-typescript"><span class="hljs-keyword">import</span> { Expose, Type } <span class="hljs-keyword">from</span> <span class="hljs-string">'class-transformer'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DetailItemsModel</span> {</span>
  <span class="hljs-name">id</span>: <span class="hljs-built_in">string</span>;

  @Type(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> Number)
  <span class="hljs-name">price</span>: number;
}

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DetailModel</span> {</span>
  @Expose({ <span class="hljs-name">name</span>: <span class="hljs-string">'item_count'</span> })
  @Type(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> Number)
  <span class="hljs-name">itemCount</span>: number;

  @Type(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> DetailItemsModel)
  <span class="hljs-name">items</span>: DetailItemsModel[];
}

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExampleModel</span> {</span>
  <span class="hljs-name">id</span>: <span class="hljs-built_in">string</span>;

  @Expose({ <span class="hljs-name">name</span>: <span class="hljs-string">'created_at'</span> })
  @Type(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> Date)
  <span class="hljs-name">createdAt</span>: Date;

  @Type(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> DetailModel)
  <span class="hljs-name">details</span>: DetailModel;
}
</code></pre>
<p>This output illustrates how the <code>modelGenerator</code> function converts a JSON structure into a corresponding TypeScript class model, handling various data types, nested objects, and arrays while applying the necessary decorators.</p>
`;

export default function ModelGenerator() {
  const [classname, setClassName] = React.useState("ExampleModel");
  const [json, setJson] = React.useState<string | undefined>("");
  const [result, setResult] = React.useState<string | undefined>(undefined);
  const { copy, copied } = useClipboard();
  const onSubmit = React.useCallback(() => {
    try {
      const result = modelGenerator(
        JSON.parse(json || "{}"),
        classname || "ExampleModel"
      );
      setResult(result);
      copy(result);
    } catch (e) {
      console.error(e);
    }
  }, [classname, copy, json]);

  const topAction = (
    <Flex align="flex-end" gap={16}>
      <TextInput
        w="90%"
        value={classname}
        label="Classname"
        placeholder="Input your classname"
        onChange={(e) => {
          const value = e.target.value;
          setClassName(value || "");
        }}
      />
      <Button onClick={onSubmit} color={copied ? "teal" : undefined}>
        {copied ? "Copied" : "Generate"}
      </Button>
    </Flex>
  );

  const mainContent = (
    <Flex
      justify="space-between"
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
          value={json}
          onChange={setJson}
          validationError="Invalid JSON"
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
  );

  return (
    <Container
      mainContent={mainContent}
      innerHTML={innerHTML}
      title="Springkraf Model Generator"
      topAction={topAction}
    />
  );
}
