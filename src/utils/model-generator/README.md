# Springkraf Typescript Model Generator
This script generates TypeScript models from JSON data, converting all properties to camelCase and adding appropriate type annotations and decorators. The model classes are named in PascalCase, and nested objects or arrays of objects generate additional model classes.


## Usage Guide for `modelGenerator` Function

The `modelGenerator` function is designed to automatically generate TypeScript class models from JSON input. This function, along with its helper methods, transforms the JSON structure into a format compatible with class-transformer decorators. Below is an overview of how the function processes the input and what kind of output you can expect.

#### **Input Structure**
The function accepts two parameters:
- **`obj` (Object)**: This is the JSON object that needs to be converted into a TypeScript class model. The structure can include primitive types, nested objects, and arrays.
- **`className` (string)**: The name of the class to be generated. This should be in PascalCase.

#### **Data Type Handling**
The `modelGenerator` function automatically determines the TypeScript data type for each property based on its value:
1. **Boolean**: If the value is a boolean, the type is `boolean`.
2. **Number**: If the value is a number or a string that can be parsed into a number, the type is `number`.
3. **String**: If the value is a string, the type is `string`.
4. **Date**: If the key ends with `_at` or `At` and the value is a string that represents a date, the type is `Date`.
5. **Null**: If the value is null and the key ends with `_at` or `At`, the type is `Date | null`. Otherwise, it is `string | null`.
6. **Array**: If the value is an array, the function checks the first element's type to generate the appropriate array type. If the array contains objects, a sub-model is generated.
7. **Object**: If the value is an object, a nested class model is generated for it.

#### **Key Formatting**
- **Snake Case to Camel Case**: All keys in the JSON input that are in snake_case will be converted to camelCase in the generated TypeScript model.
- **Pascal Case Class Names**: The class names and sub-model names generated are in PascalCase.

#### **Decorators Used**
- **`@Expose`**: Applied to properties whose JSON keys are in snake_case, indicating the original key name.
- **`@Type`**: Applied to properties that need to be transformed into a specific type (e.g., Date, nested object models, etc.).

#### **Example Input**
```json
{
  "id": "123",
  "created_at": "2024-01-01T00:00:00Z",
  "details": {
    "item_count": 10,
    "items": [
      {
        "id": "item1",
        "price": "100.50"
      }
    ]
  }
}
```

#### **Example Output**
```typescript
import { Expose, Type } from 'class-transformer';

export class DetailItemsModel {
  id: string;

  @Type(() => Number)
  price: number;
}

export class DetailModel {
  @Expose({ name: 'item_count' })
  @Type(() => Number)
  itemCount: number;

  @Type(() => DetailItemsModel)
  items: DetailItemsModel[];
}

export class ExampleModel {
  id: string;

  @Expose({ name: 'created_at' })
  @Type(() => Date)
  createdAt: Date;

  @Type(() => DetailModel)
  details: DetailModel;
}
```

This output illustrates how the `modelGenerator` function converts a JSON structure into a corresponding TypeScript class model, handling various data types, nested objects, and arrays while applying the necessary decorators.