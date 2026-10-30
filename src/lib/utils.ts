export { cn } from "cn";

export function isPlaceholder(value: string): boolean {
  return (
    !value || value.startsWith("[") || value.includes("your-domain.example")
  );
}

export function isExternalUrl(value: string): boolean {
  return /^https?:\/\//.test(value);
}
