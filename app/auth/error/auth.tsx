'use client';
import { useSearchParams } from 'next/navigation';
import { Box, Heading, Text,  AlertRoot } from '@chakra-ui/react';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = "An unknown error occurred during authentication.";
  if (error === "OAuthAccountNotLinked") {
    errorMessage = "This email is already associated with another account type. Please sign in with the original method or link accounts in your profile.";
  } else if (error === "Configuration") {
    errorMessage = "A server configuration error occurred. Please try again later or contact support.";
  } else if (error) {
    errorMessage = `Authentication failed: ${error.replace(/([A-Z])/g, ' $1').trim()}.`;
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} rounded="md" shadow="md">
      <Heading size="lg" mb={4}>Authentication Error</Heading>
      <AlertRoot status="error" rounded="md">
        {/* <AlertIcon /> */}
        <Text>{errorMessage}</Text>
      </AlertRoot>
      <Text mt={4}>Please try logging in again. If the problem persists, please contact support.</Text>
    </Box>
  );
}