import React from "react";
import enumGenerator from "../utils/enum-generator";
import { Button, Flex, Textarea, TextInput } from "@mantine/core";
import Container from "../components/container";
import { useClipboard } from "@mantine/hooks";

const innerHTML = `
<h1 id="enum-gatherer-script-for-web">Enum Gatherer Script for Web</h1>
<p>This project contains a web-based script that gathers all enums from a specified API and consolidates them into a single TypeScript file. The enum names and keys are automatically converted to PascalCase for consistency and readability.</p>
<h2 id="features">Features</h2>
<ul>
<li>Fetches enum data from a given API using Axios.</li>
<li>Converts enum names and keys to PascalCase.</li>
<li>Generates a TypeScript enum file with proper formatting and comments.</li>
<li>Supports both string and numeric enum values.</li>
</ul>
<h3 id="example-output">Example Output</h3>
<pre><code class="lang-typescript">export <span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">BannerTypeEnum</span> {</span>
  Homepage = <span class="hljs-string">'homepage'</span>, <span class="hljs-regexp">//</span> Homepage
  Reseller = <span class="hljs-string">'reseller'</span>, <span class="hljs-regexp">//</span> Reseller
  HomepageSliderFooter = <span class="hljs-string">'homepagesliderfooter'</span>, <span class="hljs-regexp">//</span> Homepage slider footer
  HomepageFooter = <span class="hljs-string">'homepagefooter'</span>, <span class="hljs-regexp">//</span> Homepage footer
}

export <span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">BillToEnum</span> {</span>
  Supplier = <span class="hljs-number">1</span>, <span class="hljs-regexp">//</span> Supplier
  Customer = <span class="hljs-number">2</span>, <span class="hljs-regexp">//</span> Customer
  Factory = <span class="hljs-number">3</span>, <span class="hljs-regexp">//</span> Factory
}
</code></pre>
<h2 id="contributing">Contributing</h2>
<p>If you have any suggestions or improvements, feel free to submit a pull request or open an issue..</p>
`;

export default function EnumGeneratorPage() {
  const [endpoint, setEndpoint] = React.useState("");
  const [result, setResult] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { copy, copied } = useClipboard();
  const onSubmit = React.useCallback(async () => {
    try {
      setLoading(true);
      const result = await enumGenerator(endpoint);
      if (result) {
        copy(result);
        setResult(result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [copy, endpoint]);

  const topAction = (
    <Flex gap={16} align="flex-end" justify="space-between">
      <TextInput
        label="Api URL"
        w="90%"
        placeholder="Insert your api url enums"
        required
        value={endpoint}
        onChange={(e) => {
          const value = e.target.value;
          setEndpoint(value);
        }}
      />
      <Button
        color={copied ? "teal" : undefined}
        loading={loading}
        onClick={onSubmit}
      >
        {copied ? "Copied" : "Generate"}
      </Button>
    </Flex>
  );

  return (
    <Container
      mainContent={
        <Textarea
          value={result}
          autosize
          placeholder="Insert your api url first for acquire enums"
        />
      }
      innerHTML={innerHTML}
      title="Springkraf Enum Generator"
      topAction={topAction}
    />
  );
}
