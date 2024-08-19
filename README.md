# React Springkraf Helper Generator

## Overview

The **React Springkraf Helper Generator** is a web tool designed to assist frontend engineers at Springkraf by automating the generation of frontend models and enums. This tool helps streamline the development process, ensuring that the frontend components are consistently structured and formatted according to project conventions.

### Features

- **Model Generation**: Automatically generates TypeScript models from JSON responses. It handles complex JSON structures, converting them into well-typed TypeScript classes with the appropriate decorators.
- **Enum Consolidation**: Gathers all enums from the API, converts them to PascalCase, and consolidates them into a single TypeScript file.
- **PascalCase Conversion**: Ensures that all model and enum names, as well as keys, follow the PascalCase convention for consistency.

### Model Generator

The model generator takes a JSON response and transforms it into a TypeScript model class. Key features include:

- **Snake_case to camelCase**: Automatically converts JSON keys from snake_case to camelCase.
- **Type Detection**: Determines the correct TypeScript type based on the JSON value, with special handling for dates, arrays, and nested objects.
- **Recursive Type Handling**: Handles nested objects and arrays, generating the appropriate TypeScript types for each level.
- **@Type Decorators**: Adds the correct `@Type` decorator to ensure proper type transformation when using libraries like `class-transformer`.

### Enum Generator

The enum generator fetches all enums from a specified API endpoint and consolidates them into a single TypeScript file. It converts both the enum names and their keys to PascalCase, ensuring that they align with the project's naming conventions.

### Getting Started

#### Prerequisites

- **Node.js**: Ensure you have Node.js installed to run the scripts.
- **Basic Knowledge**: A basic understanding of TypeScript and JavaScript.

#### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/springkraf-helper-generator.git
   ```
   
2. **Install Dependencies**:
   Navigate to the project directory and install the necessary dependencies:
   ```bash
   npm install
   ```

#### Running the Model Generator

1. **Prepare the JSON Response**:
   - Ensure you have the JSON response that you want to convert into a TypeScript model.

2. **Run the Script**:
   - Place your JSON data into the `json` variable within the script.
   - Execute the script:
     ```bash
     node model-generator.js
     ```
   - The TypeScript model will be generated and saved to a file.

3. **Customization**:
   - You can adjust the PascalCase and type detection logic by modifying the corresponding functions in the script.

### Running the Enum Generator

1. **Fetch Enum Data**:
   - Use the provided API endpoint to fetch the list of enums.

2. **Generate Enums**:
   - Run the script to fetch, process, and save the enums:
     ```bash
     node enum-generator.js
     ```
   - The consolidated TypeScript enums will be saved to a file.

### Example Output

#### Model Output

```typescript
export class OtherProductModel {
  @Expose({ name: 'id' })
  @Type(() => String)
  id: string;

  @Expose({ name: 'code' })
  @Type(() => String)
  code: string;

  @Expose({ name: 'name' })
  @Type(() => String)
  name: string;

  @Expose({ name: 'price' })
  @Type(() => Number)
  price: number;

  @Expose({ name: 'updatedAt' })
  @Type(() => Date)
  updatedAt: Date;

  @Expose({ name: 'detail' })
  @Type(() => DetailModel)
  detail: DetailModel;
}

export class DetailModel {
  @Expose({ name: 'id' })
  @Type(() => String)
  id: string;

  @Expose({ name: 'index' })
  @Type(() => Number)
  index: number;

  @Expose({ name: 'filePath' })
  @Type(() => String)
  filePath: string;
}
```

#### Enum Output

```typescript
export enum BannerTypeEnum {
  Homepage = 'homepage', // Homepage
  Reseller = 'reseller', // Reseller
  HomepageSliderFooter = 'homepagesliderfooter', // Homepage slider footer
  HomepageFooter = 'homepagefooter', // Homepage footer
}
```

### Contributing

We welcome contributions! If you have ideas for improvements or new features, feel free to submit a pull request or open an issue.

### License

This project is licensed under the MIT License.