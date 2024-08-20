import axios from "axios";
import Strings from "../strings";

// Main function to fetch and process enums
export default async function enumGenerator(endpoint: string) {
  try {
    // Fetch the list of enums
    const { data: enumListResponse } = await axios.get(endpoint);
    const enumNames = enumListResponse.data as string[];

    // Prepare the output
    let output = "";
    const datas = await Promise.all(
      enumNames.map(async (enumName) => {
        const enumData = (await axios.get(`${endpoint}/${enumName}`)).data.data;
        return { enumData, enumName };
      })
    );

    // Iterate over each enum name
    for (const { enumName, enumData } of datas) {
      // Start constructing the enum
      const enumNamePascalCase = Strings.pascalCase(enumName) + "Enum";
      output += `export enum ${enumNamePascalCase} {\n`;

      // Add each key-value pair
      enumData.forEach(({ label, value }: { label: any; value: any }) => {
        const key = Strings.trimmedPascalCase(label);
        output += `  ${key} = ${
          typeof value === "string" ? `'${value}'` : value
        }, // ${label}\n`;
      });

      output += "}\n\n";
    }

    const enumTypes = datas.reduce((prev, data) => {
      const key = data.enumName;
      prev[key] = key;
      return prev;
    }, {} as { [x: string]: string });

    output += `export const EnumClass = ${JSON.stringify(enumTypes, null, 2)} as const;\n\n`;
    output += `export type EnumClassType = (typeof EnumClass)[keyof typeof EnumClass];\n\n`;

    // Write to file
    return output.trim();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
