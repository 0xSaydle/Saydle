"use client";
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "431px",
      md: "790px",
      lg: "1032px",
    },
    tokens: {
      colors: {
        primary: {
          20: { value: "#FF6F61" },
          50: { value: "#FFE7E5" },
          100: { value: "#FFCFCA" },
          200: { value: "#FFB7B0" },
          300: { value: "#FF9F96" },
          400: { value: "#FF877B" },
          500: { value: "#FF3A26" },
          600: { value: "#EB1500" },
          700: { value: "#B01000" },
          800: { value: "#750A00" },
          900: { value: "#3B0500" },
        },
        secondary: {
          20: { value: "#a76d99" },
          50: { value: "#F0E7EE" },
          100: { value: "#E2CEDD" },
          200: { value: "#d3b6cc" },
          300: { value: "#c49ebb" },
          400: { value: "#b685aa" },
          500: { value: "#905682" },
          600: { value: "#734568" },
          700: { value: "#56344e" },
          800: { value: "#392334" },
          900: { value: "#1d111a" },
        },
        dark: {
          50: { value: "#e6e6e6" },
          100: { value: "#b3b3b3" },
          200: { value: "#bebebe" },
          300: { value: "#5a5a5a" },
          400: { value: "#3a3a3a" },
          500: { value: "#090909" },
          600: { value: "#080808" },
          700: { value: "#060606" },
          800: { value: "#050505" },
          900: { value: "#040404" },
        },
        light: {
          bg: { value: "#F5F7F9" },
          50: { value: "#FFE7E5" },
          100: { value: "#fcfdfd" },
          200: { value: "#fafbfc" },
          300: { value: "#f8fafb" },
          400: { value: "#f7f9fa" },
          500: { value: "#f5f7f9" },
          600: { value: "#dfe1e3" },
          700: { value: "#aeafb1" },
          800: { value: "#878889" },
          900: { value: "#676869" },
        },
        white: { value: "#FFFFFF" },
        black: { value: "#000000" },
      },
      radii: {
        tag: { value: "12px" },
        media: { value: "16px" },
        card: { value: "16px" },
        panel: { value: "20px" },
        pill: { value: "24px" },
        section: { value: "32px" },
      },
      gradients: {
        brand: {
          value:
            "linear-gradient(102deg, {colors.secondary.20} 40.11%, {colors.primary.20} 109.93%)",
        },
        brandSoft: {
          value:
            "linear-gradient(102deg, {colors.secondary.300} 40.11%, {colors.primary.20} 109.93%)",
        },
      },
    },
    semanticTokens: {
      shadows: {
        xs: { value: "0px 12px 24px -10px rgba(179, 182, 186, 0.05)" },
        sm: { value: "0px 24px 32px -15px rgba(168, 175, 182, 0.15)" },
        md: { value: "0px 32px 48px -20px rgba(100, 112, 122, 0.15)" },
        lg: { value: "0px 48px 56px -25px rgba(100, 112, 122, 0.1)" },
        // One shadow language: the same hue and direction, three depths.
        card: { value: "0 6px 24px -6px rgba(9, 9, 9, 0.08)" },
        float: { value: "0 14px 40px -12px rgba(9, 9, 9, 0.16)" },
      },
    },
    // Every step carries its own leading and tracking. Display sizes need
    // markedly tighter leading and slightly negative tracking than body copy;
    // inheriting body's 1.5 is what made large headings read as merely big.
    // Headings also scale with the viewport so they do not have to be sized
    // per breakpoint at every call site.
    textStyles: {
      d1: {
        value: {
          fontSize: "clamp(48px, 6vw, 72px)",
          fontWeight: 600,
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
        },
      },
      d2: {
        value: {
          fontSize: "clamp(42px, 5.2vw, 64px)",
          fontWeight: 600,
          lineHeight: 1.04,
          letterSpacing: "-0.03em",
        },
      },
      h1: {
        value: {
          fontSize: "clamp(38px, 4.6vw, 56px)",
          fontWeight: 600,
          lineHeight: 1.06,
          letterSpacing: "-0.025em",
        },
      },
      h2: {
        value: {
          fontSize: "clamp(34px, 4vw, 48px)",
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: "-0.022em",
        },
      },
      h3: {
        value: {
          fontSize: "clamp(30px, 3.2vw, 40px)",
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        },
      },
      h4: {
        value: {
          fontSize: "clamp(26px, 2.6vw, 32px)",
          fontWeight: 600,
          lineHeight: 1.16,
          letterSpacing: "-0.018em",
        },
      },
      h5: {
        value: {
          fontSize: "clamp(21px, 2vw, 24px)",
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: "-0.014em",
        },
      },
      h6: {
        value: {
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        },
      },
      h7: {
        value: {
          fontSize: "20px",
          fontWeight: 400,
          lineHeight: 1.4,
          letterSpacing: "-0.01em",
        },
      },
      title: {
        value: {
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: "-0.008em",
        },
      },
      sub: {
        value: {
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: 1.5,
        },
      },
      menu: {
        value: {
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: 1.4,
        },
      },
      body_lg: {
        value: {
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: 1.65,
        },
      },
      normal_lg: {
        value: {
          fontSize: "21px",
          fontWeight: 700,
          lineHeight: 1.4,
          letterSpacing: "-0.01em",
        },
      },
      body_sm: {
        value: {
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: 1.6,
        },
      },
      button_lg: {
        value: {
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.005em",
        },
      },
      button_sm: {
        value: {
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.005em",
        },
      },
      caption: {
        value: {
          fontSize: "13px",
          fontWeight: 600,
          lineHeight: 1.4,
        },
      },
      chip: {
        value: {
          fontSize: "12px",
          fontWeight: 800,
          lineHeight: 1.4,
          letterSpacing: "0.01em",
        },
      },
    },
    layerStyles: {
      // Layer styles rather than recipes: recipes are consumed through the
      // useRecipe hook, which would force every section that renders a tag or
      // a card across the client boundary. These stay server-renderable.
      surface: {
        // Floating white cards: the banner headlines and the How It Works tiles.
        card: {
          value: {
            bg: "white",
            borderRadius: "pill",
            boxShadow: "card",
          },
        },
        // Flat white blocks that sit on a coloured panel, e.g. the FAQ answers.
        panel: {
          value: {
            bg: "white",
            borderRadius: "panel",
            border: "1px solid",
            borderColor: "dark.50",
          },
        },
        // Photography and anything else that needs to clip to its corners.
        media: {
          value: {
            borderRadius: "section",
            boxShadow: "float",
            overflow: "hidden",
            bg: "dark.50",
          },
        },
        // The dark closing panel that carries the store badges.
        dark: {
          value: {
            bg: "secondary.900",
            borderRadius: "section",
          },
        },
      },
      // Frosted captions layered over photographs. These sit on a dark scrim
      // rather than a white one: the crops behind them are pale, so white text
      // on a white veil was close to unreadable. The blur keeps the frosted
      // look the design asks for while the scrim carries the contrast.
      glass: {
        base: {
          value: {
            bg: "blackAlpha.400",
            backdropFilter: "blur(18px)",
            borderRadius: "card",
            color: "white",
          },
        },
        strong: {
          value: {
            bg: "blackAlpha.500",
            backdropFilter: "blur(28px)",
            borderRadius: "card",
            color: "white",
          },
        },
      },
      // Small labelled chips: "Positivity", "Wellness", "Hope", "Support".
      // `onImage` is the same chip over photography, where it needs a dark
      // scrim to stay readable instead of a near-white one.
      tag: {
        base: {
          value: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "max-content",
            padding: "6px 12px",
            borderRadius: "tag",
            border: "1px solid",
            borderColor: "dark.50",
            textStyle: "caption",
            bg: "white",
            color: "dark.400",
          },
        },
        onImage: {
          value: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "max-content",
            padding: "6px 12px",
            borderRadius: "tag",
            border: "1px solid",
            borderColor: "whiteAlpha.300",
            textStyle: "caption",
            bg: "blackAlpha.500",
            backdropFilter: "blur(18px)",
            color: "white",
          },
        },
      },
      // Call-to-action buttons. Solid is the primary action, outline the
      // secondary one that sits beside it.
      pill: {
        solid: {
          value: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "max-content",
            padding: "12px 24px",
            borderRadius: "pill",
            textStyle: "button_lg",
            bg: "primary.20",
            color: "white",
            _hover: { bg: "primary.500" },
          },
        },
        outline: {
          value: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "max-content",
            padding: "12px 24px",
            borderRadius: "pill",
            textStyle: "button_lg",
            border: "1px solid",
            borderColor: "secondary.20",
            color: "dark.500",
            _hover: { bg: "secondary.50" },
          },
        },
      },
      // A phrase inside a headline, not a second card. Keeps the outlined
      // treatment from the design without stacking two white boxes.
      highlight: {
        phrase: {
          value: {
            display: "inline-block",
            border: "1px solid",
            borderColor: "primary.20",
            borderRadius: "pill",
            px: "0.45em",
            py: "0.08em",
            color: "primary.20",
          },
        },
      },
    },
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
      background: "light.bg",
      color: "dark.500",
    },
    "::selection": {
      background: "primary.20",
      color: "white",
    },
    // Keyboard users get a visible ring; pointer users do not see it.
    ":focus-visible": {
      outline: "2px solid",
      outlineColor: "primary.20",
      outlineOffset: "3px",
      borderRadius: "4px",
    },
    // Named properties rather than `all`, so nothing eases a discrete value
    // such as z-index or visibility by accident.
    "a, button": {
      transitionProperty:
        "background-color, border-color, color, box-shadow, opacity, transform",
      transitionDuration: "200ms",
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
  },
});

const theme = createSystem(defaultConfig, config);
export default theme;
