export default class Strings {
  static pascalCase(str: string): string {
    return str.replace(/(^\w|_\w)/g, (s) => s.replace("_", "").toUpperCase());
  }
  static pascalToCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
  static trimmedPascalCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
      .replace(/^./, (c) => c.toUpperCase());
  }
}
