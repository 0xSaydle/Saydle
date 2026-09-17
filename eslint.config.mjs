// eslint-config-next 16 ships flat configs directly, so the old FlatCompat
// wrapper is not only unnecessary, it crashes: compat tries to JSON.stringify a
// config whose plugins reference each other ("Converting circular structure").
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  // Parked app surfaces: kept in the repo, out of the lint.
  { ignores: ["app/_*/**", "_parked/**", ".next/**"] },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
