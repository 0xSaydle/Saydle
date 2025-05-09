"use client";
import { ReactNode } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";
import { GeneralSans } from "../../fonts";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "@/components/custom/logo";
import { OnboardingProvider } from "./onboarding-context";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // Extract step from URL: /dashboard/onboarding/step/[step]
  const match = pathname.match(/step\/(\d+)/);
  const step = match ? parseInt(match[1], 10) : 1;
  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  const goPrev = () => {
    if (step > 1) router.push(`/dashboard/onboarding/step/${step - 1}`);
  };
  const goNext = () => {
    if (step < totalSteps)
      router.push(`/dashboard/onboarding/step/${step + 1}`);
  };

  return (
    <Provider>
      <OnboardingProvider>
        <Box bg="#F5F7F9">
          {/* Top bar with logo, nav, and step counter */}
          <Flex align="center" justify="space-between" px={6} pt={4} pb={2}>
            <Flex>
              <IconButton
                aria-label="Previous"
                onClick={goPrev}
                disabled={step === 1}
                variant="ghost"
                fontSize="28px"
                ml={1}
              >
                <MdOutlineNavigateBefore />
              </IconButton>
              <IconButton
                aria-label="Next"
                onClick={goNext}
                disabled={step === totalSteps}
                variant="ghost"
                fontSize="28px"
                ml={1}
              >
                <MdOutlineNavigateNext />
              </IconButton>
            </Flex>
            <Logo />
            <Box fontWeight="bold" fontSize="sm" minW="60px" textAlign="right">
              Step {step} / {totalSteps}
            </Box>
          </Flex>
          <Flex align="center" px={6}>
            <Box flex={1} mx={0}>
              <Progress.Root
                size="xs"
                borderRadius="999px"
                value={progress}
                max={100}
                style={{ background: "#ffe7e5", height: 6 }}
              >
                <Progress.Track style={{ borderRadius: "999px" }}>
                  <Progress.Range
                    style={{ background: "#FF6F61", borderRadius: "999px" }}
                  />
                </Progress.Track>
              </Progress.Root>
            </Box>
          </Flex>
          <Box bg="#F5F7F9" h="calc(100vh - 70px)" /* overflow="hidden" */>
            {children}
          </Box>
        </Box>
      </OnboardingProvider>
    </Provider>
  );
}
