"use client";

import { Box, Flex, Text, Heading, SimpleGrid, Icon } from "@chakra-ui/react";
import {
  FiHeart,
  FiUsers,
  FiShield,
  FiClock,
  FiStar,
  FiAward,
} from "react-icons/fi";
import { FaTelegram, FaDiscord } from "react-icons/fa";
import { Logo } from "@/components/custom/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function AboutPage() {
  return (
    <Box maxW="1200px" mx="auto" px={4} py={12}>
      {/* Hero Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        textAlign="center"
        mb={16}
        bgGradient="linear(to-b, primary.20, white)"
        p={8}
        borderRadius="2xl"
      >
        <Logo />
        <Heading
          size="2xl"
          mb={4}
          color="dark.500"
          bgGradient="linear(to-r, primary.20, primary.30)"
          bgClip="text"
        >
          About Saydle
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="800px" mx="auto">
          Empowering mental wellness through personalized affirmations and
          guided meditation
        </Text>
      </MotionBox>

      {/* Mission Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        mb={16}
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        border="1px solid"
        borderColor="gray.100"
      >
        <Heading
          size="lg"
          mb={6}
          color="dark.500"
          bgGradient="linear(to-r, primary.20, primary.30)"
          bgClip="text"
        >
          Our Mission
        </Heading>
        <Text fontSize="lg" color="gray.600" lineHeight="1.8">
          At Saydle, we believe that everyone deserves access to tools that
          support their mental well-being. Our mission is to provide
          personalized daily affirmations and meditation guides that help
          individuals cultivate positivity, resilience, and inner peace.
          We&apos;re committed to making mental wellness accessible, engaging,
          and effective for everyone.
        </Text>
      </MotionBox>

      {/* Values Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        mb={16}
      >
        <Heading
          size="lg"
          mb={8}
          color="dark.500"
          bgGradient="linear(to-r, primary.20, primary.30)"
          bgClip="text"
        >
          Our Values
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          <ValueCard
            icon={FiHeart}
            title="Personalization"
            description="We believe in the power of tailored experiences. Every affirmation and meditation guide is crafted to meet your unique needs and journey."
          />
          <ValueCard
            icon={FiUsers}
            title="Community"
            description="Building a supportive community where individuals can share experiences and grow together in their wellness journey."
            socialLinks={{
              telegram: "https://t.me/saydle",
              discord: "https://discord.gg/saydle",
            }}
          />
          <ValueCard
            icon={FiShield}
            title="Privacy & Security"
            description="Your mental wellness journey is personal. We maintain the highest standards of privacy and security for all our users."
          />
          <ValueCard
            icon={FiClock}
            title="Consistency"
            description="We understand that real change comes from consistent practice. Our platform is designed to help you build lasting habits."
          />
          <ValueCard
            icon={FiStar}
            title="Quality"
            description="Every feature and content piece is carefully crafted by experts to ensure the highest quality experience."
          />
          <ValueCard
            icon={FiAward}
            title="Innovation"
            description="Continuously evolving our platform with the latest research and technology to better serve our community."
          />
        </SimpleGrid>
      </MotionBox>

      {/* Features Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        mb={16}
      >
        <Heading
          size="lg"
          mb={8}
          color="dark.500"
          bgGradient="linear(to-r, primary.20, primary.30)"
          bgClip="text"
        >
          What We Offer
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
          <FeatureCard
            title="Personalized Daily Affirmations"
            description="Receive custom affirmations tailored to your specific needs, goals, and current state of mind."
          />
          <FeatureCard
            title="Guided Meditation"
            description="Access a library of meditation guides, from basic to advanced, to support your mindfulness practice."
          />
          <FeatureCard
            title="Progress Tracking"
            description="Monitor your wellness journey with intuitive tracking tools and insights."
          />
          <FeatureCard
            title="Community Support"
            description="Connect with like-minded individuals in a supportive and positive environment."
          />
        </SimpleGrid>
      </MotionBox>

      {/* CTA Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        bgGradient="linear(to-r, primary.20, primary.30)"
        borderRadius="2xl"
        p={8}
        textAlign="center"
        mb={16}
        boxShadow="xl"
      >
        <Heading size="lg" mb={4} color="dark.500">
          Start Your Wellness Journey Today
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          Join thousands of users who have transformed their lives with Saydle
        </Text>
        <Button
          asChild
          size="lg"
          bg="white"
          color="dark.500"
          _hover={{ bg: "gray.50", transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          <Link href="/login">Get Started</Link>
        </Button>
      </MotionBox>

      {/* Team Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="lg"
        border="1px solid"
        borderColor="gray.100"
      >
        <Heading
          size="lg"
          mb={8}
          color="dark.500"
          bgGradient="linear(to-r, primary.20, primary.30)"
          bgClip="text"
        >
          Our Commitment
        </Heading>
        <Text fontSize="lg" color="gray.600" lineHeight="1.8">
          Saydle is more than just a platform – it&apos;s a commitment to your
          mental well-being. Our team of wellness experts, developers, and
          support staff work tirelessly to ensure you have the best possible
          experience. We&apos;re constantly listening to our community and
          evolving our platform to better serve your needs.
        </Text>
      </MotionBox>
    </Box>
  );
}

const ValueCard = ({
  icon,
  title,
  description,
  socialLinks,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  socialLinks?: { telegram?: string; discord?: string };
}) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -5 }}
    bg="white"
    p={6}
    borderRadius="lg"
    boxShadow="md"
    border="1px solid"
    borderColor="gray.100"
    _hover={{
      boxShadow: "lg",
      borderColor: "primary.20",
    }}
  >
    <Icon as={icon} boxSize={8} color="primary.20" mb={4} />
    <Heading size="md" mb={2} color="dark.500">
      {title}
    </Heading>
    <Text color="gray.600" mb={socialLinks ? 4 : 0}>
      {description}
    </Text>
    {socialLinks && (
      <Flex gap={4} mt={4}>
        {socialLinks.telegram && (
          <Link
            href={socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              as={FaTelegram}
              boxSize={6}
              color="primary.20"
              _hover={{ color: "primary.30", transform: "scale(1.1)" }}
              transition="all 0.2s"
            />
          </Link>
        )}
        {socialLinks.discord && (
          <Link
            href={socialLinks.discord}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              as={FaDiscord}
              boxSize={6}
              color="primary.20"
              _hover={{ color: "primary.30", transform: "scale(1.1)" }}
              transition="all 0.2s"
            />
          </Link>
        )}
      </Flex>
    )}
  </MotionBox>
);

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    whileHover={{ y: -5 }}
    bg="white"
    p={6}
    borderRadius="lg"
    boxShadow="md"
    border="1px solid"
    borderColor="gray.100"
    _hover={{
      boxShadow: "lg",
      borderColor: "primary.20",
    }}
  >
    <Heading size="md" mb={2} color="dark.500">
      {title}
    </Heading>
    <Text color="gray.600">{description}</Text>
  </MotionBox>
);
