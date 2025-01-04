import { createSystem, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "343pt",
      md: "768px",
      lg: "960px",
      xl: "1240px",
    },
    tokens: {
      colors: {
        primary: {
          value: "#EE0F0F",
          "50": { value: "#FFE7E5" },
          "100": { value: "#FFCFCA" },
          "200": { value: "#FFB7B0" },
          "300": { value: "#FF9F96" },
          "400": { value: "#FF877B" },
          "500": { value: "#FF3A26" },
          "600": { value: "#EB1500" },
          "700": { value: "#B01000" },
          "800": { value: "#750A00" },
          "900": { value: "#3B0500" },
        },
        secondary: {
          value: "#A76D99",
          "50": { value: "#F0E7EE" },
          "100": { value: "#E2CEDD" },
          "200": { value: "#d3b6cc" },
          "300": { value: "#c49ebb" },
          "400": { value: "#b685aa" },
          "500": { value: "#905682" },
          "600": { value: "#734568" },
          "700": { value: "#56344e" },
          "800": { value: "#392334" },
          "900": { value: "#1d111a" },
        },
        dark_bg: {
          value: { value: "#1E252B" },
          "50": { value: "#FFE7E5" },
          "100": { value: "#FFCFCA" },
          "200": { value: "#FFB7B0" },
          "300": { value: "#FF9F96" },
          "400": { value: "#FF877B" },
          "500": { value: "#FF3A26" },
          "600": { value: "#EB1500" },
          "700": { value: "#B01000" },
          "800": { value: "#750A00" },
          "900": { value: "#3B0500" },
        },
        light_bg: {
          value: "#EEEFF2",
          "50": { value: "#FFE7E5" },
          "100": { value: "#FFCFCA" },
          "200": { value: "#FFB7B0" },
          "300": { value: "#FF9F96" },
          "400": { value: "#FF877B" },
          "500": { value: "#FF3A26" },
          "600": { value: "#EB1500" },
          "700": { value: "#B01000" },
          "800": { value: "#750A00" },
          "900": { value: "#3B0500" },
        },
        white: {
          value: "#FFFFFF",
        },
        black: {
          value: "#000000",
        },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
      },
      shadows: {
        shadow_xs: {
          value: "box-shadow: 0px 12px 24px -10px rgba(179, 182, 186, 0.05);",
        },
        shadow_sm: {
          value: "box-shadow: 0px 24px 32px -15px rgba(168, 175, 182, 0.15);",
        },
        shadow_md: {
          value: "box-shadow: 0px 32px 48px -20px rgba(100, 112, 122, 0.15);",
        },
        shadow_lg: {
          value: "box-shadow: 0px 48px 56px -25px rgba(100, 112, 122, 0.1",
        },
      },
      blurs: {
        blur_xs: { value: "backdrop-filter: blur(4px);" },
        blur_sm: { value: "backdrop-filter: blur(8px);" },
        blur_md: { value: "backdrop-filter: blur(12px);" },
        blur_lg: { value: "backdrop-filter: blur(20px);" },
      },
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
    textStyles: {
      // font weights:
      // regular - 400
      //medium- 500
      // semi bold - 600
      // bold - 700
      // extra-bold - 800
      d1: {
        fontSize: "72px",
        fontWeight: 600,
      },
      // OR
      // d1: {
      //   value: {
      //     fontSize: "72px",
      //     fontWeight: 600,
      //   },
      // },

      d2: {
        fontSize: "64px",
        fontWeight: 600,
      },
      h1: {
        fontSize: "56px",
        fontWeight: 600,
      },
      h2: {
        fontSize: "48px",
        fontWeight: 600,
      },
      h3: {
        fontSize: "40px",
        fontWeight: 600,
      },
      h4: {
        fontSize: "32px",
        fontWeight: 600,
      },
      h5: {
        fontSize: "24px",
        fontWeight: 600,
      },
      h6: {
        fontSize: "20px",
        fontWeight: 600,
      },
      h7: {
        fontSize: "20px",
        fontWeight: 400,
      },
      title: {
        fontSize: "18px",
        fontWeight: 600,
      },
      menu: {
        fontSize: "16px",
        fontWeight: 600,
      },
      body_lg: {
        fontSize: "16px",
        fontWeight: 500,
      },
      body_sm: {
        fontSize: "14px",
        fontWeight: 500,
      },
      button_lg: {
        fontSize: "16px",
        fontWeight: 700,
      },
      button_sm: {
        fontSize: "14px",
        fontWeight: 700,
      },
      caption: {
        fontSize: "13px",
        fontWeight: 600,
      },
      chip: {
        fontSize: "12px",
        fontWeight: 800,
      },
    },
  },

  conditions: {
    cqSm: "@container(min-width: 320px)",
    child: "& > *",
    off: "&:is([data-state=off])",
    on: "&:is([data-state=on])",
  },
});
const SaydleTheme = createSystem(config);
export default SaydleTheme;
