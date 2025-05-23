"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  
  Container,
  // useColorModeValue,
} from "@chakra-ui/react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PersonalProfile from "./PersonalProfile";
import ProfessionalProfile from "./ProfessionalProfile";
import PersonalPreferences from "./PersonalPreferences";
import PersonalityDetails from "./PersonalityDetails";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function SettingsPage() {
  const tabBg = useColorModeValue("white", "gray.800");
  const tabBorderColor = useColorModeValue("#f2e3e1", "gray.600");

  return (
    <Container maxW="4xl" py={10}>
      <Box
        bg={tabBg}
        shadow="md"
        rounded="lg"
        border="2px"
        borderColor={tabBorderColor}
        p={6}
      >
        <Heading as="h1" size="lg" mb={6}>
          Settings
        </Heading>

        <Tabs>
          <TabList>
            <Tab>Personal</Tab>
            <Tab>Professional</Tab>
            <Tab>Personality</Tab>
            <Tab>Preferences</Tab>
          </TabList>

          <TabPanel><PersonalProfile /></TabPanel>
          <TabPanel><ProfessionalProfile /></TabPanel>
          <TabPanel><PersonalityDetails /></TabPanel>
          <TabPanel><PersonalPreferences /></TabPanel>
        </Tabs>
      </Box>
    </Container>
  );
}
