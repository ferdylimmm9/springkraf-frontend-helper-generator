export default class Strings {
  static pascalCase(str: string): string {
    return str.replace(/(^\w|_\w)/g, (s) => s.replace("_", "").toUpperCase());
  }
  static pascalToCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
}
