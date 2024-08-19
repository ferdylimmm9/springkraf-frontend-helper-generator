import { Anchor, Flex, Text } from "@mantine/core";
import Container from "../components/container";
import React from "react";
import { RouteEnum } from "../constants/route-enum";
import { Link } from "react-router-dom";

const innerHTML = `
<p>The <strong>React Springkraf Helper Generator</strong> is a web tool designed to assist frontend engineers at Springkraf by automating the generation of frontend models and enums. This tool helps streamline the development process, ensuring that the frontend components are consistently structured and formatted according to project conventions.</p>
<h3 id="features">Features</h3>
<ul>
<li><strong>Model Generation</strong>: Automatically generates TypeScript models from JSON responses. It handles complex JSON structures, converting them into well-typed TypeScript classes with the appropriate decorators.</li>
<li><strong>Enum Consolidation</strong>: Gathers all enums from the API, converts them to PascalCase, and consolidates them into a single TypeScript file.</li>
<li><strong>PascalCase Conversion</strong>: Ensures that all model and enum names, as well as keys, follow the PascalCase convention for consistency.</li>
</ul>
<h3 id="model-generator">Model Generator</h3>
<p>The model generator takes a JSON response and transforms it into a TypeScript model class. Key features include:</p>
<ul>
<li><strong>Snake_case to camelCase</strong>: Automatically converts JSON keys from snake_case to camelCase.</li>
<li><strong>Type Detection</strong>: Determines the correct TypeScript type based on the JSON value, with special handling for dates, arrays, and nested objects.</li>
<li><strong>Recursive Type Handling</strong>: Handles nested objects and arrays, generating the appropriate TypeScript types for each level.</li>
<li><strong>@Type Decorators</strong>: Adds the correct <code>@Type</code> decorator to ensure proper type transformation when using libraries like <code>class-transformer</code>.</li>
</ul>
<h3 id="enum-generator">Enum Generator</h3>
<p>The enum generator fetches all enums from a specified API endpoint and consolidates them into a single TypeScript file. It converts both the enum names and their keys to PascalCase, ensuring that they align with the project&#39;s naming conventions.</p>
<h3 id="getting-started">Getting Started</h3>
<h4 id="prerequisites">Prerequisites</h4>
<ul>
<li><strong>Node.js</strong>: Ensure you have Node.js installed to run the scripts.</li>
<li><strong>Basic Knowledge</strong>: A basic understanding of TypeScript and JavaScript.</li>
</ul>
<h4 id="installation">Installation</h4>
<ol>
<li><p><strong>Clone the Repository</strong>:</p>
<pre><code class="lang-bash">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/yourusername/springkraf-helper-generator.git
</code></pre>
</li>
<li><p><strong>Install Dependencies</strong>:
Navigate to the project directory and install the necessary dependencies:</p>
<pre><code class="lang-bash">npm <span class="hljs-keyword">install</span>
</code></pre>
</li>
</ol>
<h4 id="running-the-model-generator">Running the Model Generator</h4>
<ol>
<li><p><strong>Prepare the JSON Response</strong>:</p>
<ul>
<li>Ensure you have the JSON response that you want to convert into a TypeScript model.</li>
</ul>
</li>
<li><p><strong>Run the Script</strong>:</p>
<ul>
<li>Place your JSON data into the <code>json</code> variable within the script.</li>
<li>Execute the script:<pre><code class="lang-bash"><span class="hljs-keyword">node</span> <span class="hljs-title">model-generator</span>.js
</code></pre>
</li>
<li>The TypeScript model will be generated and saved to a file.</li>
</ul>
</li>
<li><p><strong>Customization</strong>:</p>
<ul>
<li>You can adjust the PascalCase and type detection logic by modifying the corresponding functions in the script.</li>
</ul>
</li>
</ol>
<h3 id="running-the-enum-generator">Running the Enum Generator</h3>
<ol>
<li><p><strong>Fetch Enum Data</strong>:</p>
<ul>
<li>Use the provided API endpoint to fetch the list of enums.</li>
</ul>
</li>
<li><p><strong>Generate Enums</strong>:</p>
<ul>
<li>Run the script to fetch, process, and save the enums:<pre><code class="lang-bash">node <span class="hljs-class"><span class="hljs-keyword">enum</span>-<span class="hljs-title">generator</span>.<span class="hljs-title">js</span></span>
</code></pre>
</li>
<li>The consolidated TypeScript enums will be saved to a file.</li>
</ul>
</li>
</ol>
<h3 id="example-output">Example Output</h3>
<h4 id="model-output">Model Output</h4>
<pre><code class="lang-typescript"><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">class</span> <span class="hljs-selector-tag">OtherProductModel</span> {
  <span class="hljs-variable">@Expose</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'id'</span> })
  <span class="hljs-variable">@Type</span>(() =&gt; String)
  <span class="hljs-attribute">id</span>: string;

  <span class="hljs-variable">@Expose</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'code'</span> })
  <span class="hljs-variable">@Type</span>(() =&gt; String)
  <span class="hljs-attribute">code</span>: string;

  <span class="hljs-variable">@Expose</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'name'</span> })
  <span class="hljs-variable">@Type</span>(() =&gt; String)
  <span class="hljs-attribute">name</span>: string;

  <span class="hljs-variable">@Expose</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'price'</span> })
  <span class="hljs-variable">@Type</span>(() =&gt; Number)
  <span class="hljs-attribute">price</span>: number;

  <span class="hljs-variable">@Expose</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'updatedAt'</span> })
  <span class="hljs-variable">@Type</span>(() =&gt; Date)
  <span class="hljs-attribute">updatedAt</span>: Date;

  <span class="hljs-variable">@Expose</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'detail'</span> })
  <span class="hljs-variable">@Type</span>(() =&gt; DetailModel)
  <span class="hljs-attribute">detail</span>: DetailModel;
}

<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">class</span> <span class="hljs-selector-tag">DetailModel</span> {
  <span class="hljs-variable">@Expose</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'id'</span> })
  <span class="hljs-variable">@Type</span>(() =&gt; String)
  <span class="hljs-attribute">id</span>: string;

  <span class="hljs-variable">@Expose</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'index'</span> })
  <span class="hljs-variable">@Type</span>(() =&gt; Number)
  <span class="hljs-attribute">index</span>: number;

  <span class="hljs-variable">@Expose</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'filePath'</span> })
  <span class="hljs-variable">@Type</span>(() =&gt; String)
  <span class="hljs-attribute">filePath</span>: string;
}
</code></pre>
<h4 id="enum-output">Enum Output</h4>
<pre><code class="lang-typescript">export <span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">BannerTypeEnum</span> {</span>
  Homepage = <span class="hljs-string">'homepage'</span>, <span class="hljs-regexp">//</span> Homepage
  Reseller = <span class="hljs-string">'reseller'</span>, <span class="hljs-regexp">//</span> Reseller
  HomepageSliderFooter = <span class="hljs-string">'homepagesliderfooter'</span>, <span class="hljs-regexp">//</span> Homepage slider footer
  HomepageFooter = <span class="hljs-string">'homepagefooter'</span>, <span class="hljs-regexp">//</span> Homepage footer
}
</code></pre>
<h3 id="contributing">Contributing</h3>
<p>We welcome contributions! If you have ideas for improvements or new features, feel free to submit a pull request or open an issue.</p>
<h3 id="license">License</h3>
<p>This project is licensed under the MIT License.</p>
`;

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

  const externalLinks = React.useMemo(() => {
    return [
      {
        href: "https://github.com/ferdylimmm9/bump-manipulator-native-springkraf",
        label: "Springkraf Expo Bump Manipulator",
      },
      {
        href: "https://github.com/ferdylimmm9/springkraf-laravel-documentaion-cupu-generator",
        label: "Springkraf Laravel Documentaion Cupu Generator",
      },
    ];
  }, []);

  const mainContent = (
    <Flex w="100%" direction="column">
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
      {externalLinks.map((link) => {
        return (
          <Anchor href={link.href} key={link.href} target="_blank">
            {link.label}
          </Anchor>
        );
      })}
    </Flex>
  );
  return (
    <Container
      title="Springkraf Frontend Helper Generator"
      innerHTML={innerHTML}
      mainContent={mainContent}
      topAction={<></>}
    />
  );
}
