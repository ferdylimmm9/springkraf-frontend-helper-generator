import getType from "./get-type";
import Strings from "./strings";

export default function modelGenerator(obj: any, className: string): string {
  let code = `export class ${className} {\n`;
  const subModels: string[] = [];

  for (const key in obj) {
    const value = obj[key];
    const pascalKey = Strings.pascalCase(key);
    const type = getType(key, value);
    const isSnake = key.includes("_");

    if (Array.isArray(value)) {
      // Handle array types
      const arrayType =
        typeof value[0] === "object"
          ? `${pascalKey}ItemModel`
          : getType(key, value[0]);

      if (isSnake) {
        code += `  @Expose({ name: '${key}' })\n`;
      }
      code += `  @Type(() => ${Strings.pascalCase(arrayType)})\n`;
      code += `  ${Strings.pascalToCamelCase(pascalKey)}: ${Strings.pascalCase(
        arrayType
      )}[];\n\n`;

      // Generate sub-model for array items if it's an object
      if (typeof value[0] === "object") {
        subModels.push(modelGenerator(value[0], `${pascalKey}ItemModel`));
      }
    } else if (typeof value === "object" && value !== null) {
      // Handle nested objects
      const nestedClassName = `${pascalKey}Model`;

      if (isSnake) {
        code += `  @Expose({ name: '${key}' })\n`;
      }
      code += `  @Type(() => ${nestedClassName})\n`;
      code += `  ${Strings.pascalToCamelCase(
        pascalKey
      )}: ${nestedClassName};\n\n`;

      // Generate sub-model for nested object
      subModels.push(modelGenerator(value, nestedClassName));
    } else {
      // Handle primitive types
      if (isSnake) {
        code += `  @Expose({ name: '${key}' })\n`;
      }
      if (type === "Date" || type === "Date | null") {
        code += `  @Type(() => Date)\n`;
      }
      code += `  ${Strings.pascalToCamelCase(pascalKey)}: ${type};\n\n`;
    }
  }

  code += `}\n\n`;

  // Prepend sub-models to the main code
  return subModels.join("\n") + code;
}

// Example usage with provided JSON structure
// const jsonData = {
//   id: "string",
//   number: "string",
//   subtotal: 0,
//   service_fee: 0,
//   payment_fee: 0,
//   discount: 0,
//   total: 0,
//   cashback: 0,
//   kuro_points: 0,
//   payment_method: "string",
//   is_payment_method_editable: false,
//   status: "string",
//   type: "string",
//   pill_status: "completed",
//   transaction_at: "2024-08-16T09:41:03.356965Z",
//   due_at: "2024-08-17T09:41:03.346362Z",
//   completed_at: "2024-08-16T09:41:23.950920Z",
//   canceled_at: null,
//   expired_at: null,
//   rejected_at: null,
//   refunded_at: null,
//   items: [
//     {
//       id: "string",
//       currency_code: "string",
//       fx_price: 0,
//       fx_rate: "string",
//       sell_price: 0,
//       discounted_price: 0,
//       qty: 0,
//       total: 0,
//       withoutSim: false,
//       sim: {
//         id: "string",
//         label: "string",
//         skin: "string",
//         iccid: "string",
//         status: "string",
//         rechargeable: false,
//         assigned_at: "2024-08-16T09:41:03.356965Z",
//         created_at: "2024-08-16T09:41:03.356965Z",
//         updated_at: "2024-08-16T09:41:03.356965Z",
//       },
//       metadata: {
//         name: "string",
//         scale: "string",
//         grade: "string",
//         area_code: "string",
//         total_countries: 0,
//         data_type: "string",
//         quota_in_gb: 0,
//         validity_days: 0,
//         discount_percentage: null,
//       },
//     },
//   ],
// };

// console.log(modelGenerator(jsonData, "SaleInvoiceModel"));
