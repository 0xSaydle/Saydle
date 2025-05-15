import { Box } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { fonts } from "@/app/fonts";

export default function PersonalProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <Box className={fonts.inter.className}>{children}</Box>
    </Provider>
  );
}
