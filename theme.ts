"use client";
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "431px",
      md: "768px",
      lg: "960px",
      xl: "1240px",
    },
    tokens: {
      colors: {
        primary: {
          // value: "#EE0F0F",
          "20": { value: "#FF6F61" },
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
          "20": { value: "#a76d99" },
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
        dark: {
          // "20":  "#1E252B" ,
          "50": { value: "#e6e6e6" },
          "100": { value: "#b3b3b3" },
          "200": { value: "#bebebe" },
          "300": { value: "#5a5a5a" },
          "400": { value: "#3a3a3a" },
          "500": { value: "#090909" },
          "600": { value: "#080808" },
          "700": { value: "#060606" },
          "800": { value: "#050505" },
          "900": { value: "#040404" },
        },
        light: {
          // value: "#EEEFF2",
          bg: { value: "#F5F7F9" },
          "50": { value: "#FFE7E5" },
          "100": { value: "#fcfdfd" },
          "200": { value: "#fafbfc" },
          "300": { value: "#f8fafb" },
          "400": { value: "#f7f9fa" },
          "500": { value: "#f5f7f9" },
          "600": { value: "#dfe1e3" },
          "700": { value: "#aeafb1" },
          "800": { value: "#878889" },
          "900": { value: "#676869" },
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
        xs: {
          value: "0px 12px 24px -10px rgba(179, 182, 186, 0.05)",
        },
        sm: {
          value: "0px 24px 32px -15px rgba(168, 175, 182, 0.15)",
        },
        md: {
          value: "0px 32px 48px -20px rgba(100, 112, 122, 0.15)",
        },
        lg: {
          value: "0px 48px 56px -25px rgba(100, 112, 122, 0.1)",
        },
      },
      blurs: {
        xs: { value: "blur(4px)" },
        sm: { value: "blur(8px)" },
        md: { value: "blur(12px)" },
        lg: { value: "blur(20px)" },
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
        value: {
          fontSize: "72px",
          fontWeight: 600,
        },
      },

      d2: {
        value: {
          fontSize: "64px",
          fontWeight: 600,
        },
      },
      h1: {
        value: {
          fontSize: "56px",
          fontWeight: 600,
        },
      },
      h2: {
        value: {
          fontSize: "48px",
          fontWeight: 600,
        },
      },
      h3: {
        value: {
          fontSize: "40px",
          fontWeight: 600,
        },
      },
      h4: {
        value: {
          fontSize: "32px",
          fontWeight: 600,
        },
      },
      h5: {
        value: {
          fontSize: "24px",
          fontWeight: 600,
        },
      },
      h6: {
        value: {
          fontSize: "20px",
          fontWeight: 600,
        },
      },
      h7: {
        value: {
          fontSize: "20px",
          fontWeight: 400,
        },
      },
      title: {
        value: {
          fontSize: "18px",
          fontWeight: 600,
        },
      },
      menu: {
        value: {
          fontSize: "16px",
          fontWeight: 600,
        },
      },
      body_lg: {
        value: {
          fontSize: "16px",
          fontWeight: 500,
        },
      },
      body_sm: {
        value: {
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      button_lg: {
        value: {
          fontSize: "16px",
          fontWeight: 700,
        },
      },
      button_sm: {
        value: {
          fontSize: "14px",
          fontWeight: 700,
        },
      },
      caption: {
        value: {
          fontSize: "13px",
          fontWeight: 600,
        },
      },
      chip: {
        value: {
          fontSize: "12px",
          fontWeight: 800,
        },
      },
    },
  },
  conditions: {
    cqSm: "@container(min-width: 320px)",
    child: "& > *",
    off: "&:is([data-state=off])",
    on: "&:is([data-state=on])",
  },
  globalCss: {
    "*": {
      p: 0,
      m: 0,
      listStyleType: "none",
      textDecoration: "none",
      boxSizing: "border-box",
    },
    "html, body": {
      background: "#F5F7F9",
    },
  },
});
const SaydleTheme = createSystem(defaultConfig, config);
export default SaydleTheme;
