export default function getType(key: string, value: any) {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") {
    if (key.endsWith("_at") || key.endsWith("At")) return "Date";
    if (!isNaN(Number(value))) return "number";
    return "string";
  }
  if (value === null && (key.endsWith("_at") || key.endsWith("At"))) {
    return "Date | null";
  }
  if (Array.isArray(value)) return "Array";
  if (typeof value === "object" && value !== null) return "Object";
  if(value === null) return "string | null"
  return "any";
}
