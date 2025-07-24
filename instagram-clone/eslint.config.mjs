import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default compat.config({
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    "no-unused-expressions": ["error", {
      allowShortCircuit: true,
      allowTernary: true
    }],
    "@typescript-eslint/no-unused-expressions": ["error", {
      allowShortCircuit: true,
      allowTernary: true
    }]
  }
});
