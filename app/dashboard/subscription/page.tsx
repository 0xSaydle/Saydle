"use client";

import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDashboard } from "../../contexts/dashboard-context";
import { FiPackage, FiCalendar, FiAlertCircle } from "react-icons/fi";
import { toaster } from "@/components/ui/toaster";

export default function SubscriptionPage() {
  const { subDetails, isLoading } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);

  const handleCancelSubscription = async () => {
    // TODO: Implement cancel subscription logic
    toaster.create({
      title: "Subscription cancelled",
      description: "Your subscription has been cancelled successfully.",
      type: "success",
    });
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Loading subscription details...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto" p={8}>
      <Box mb={8}>
        <Heading size="lg" mb={2}>
          Subscription Details
        </Heading>
        <Text color="gray.600">
          Manage your subscription and billing information
        </Text>
      </Box>

      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.100"
        p={6}
      >
        <Box mb={6}>
          <Flex align="center" gap={4} mb={4}>
            <FiPackage size={24} color="#E53E3E" />
            <Box>
              <Text fontSize="sm" color="gray.500" mb={1}>
                CURRENT PLAN
              </Text>
              <Heading size="md">
                {subDetails?.product_name || "No Plan"}
              </Heading>
            </Box>
          </Flex>
        </Box>

        <Box mb={6}>
          <Flex align="center" gap={4} mb={4}>
            <FiAlertCircle size={24} color="#E53E3E" />
            <Box>
              <Text fontSize="sm" color="gray.500" mb={1}>
                STATUS
              </Text>
              <Box
                as="span"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                bg={subDetails?.status === "active" ? "green.100" : "red.100"}
                color={
                  subDetails?.status === "active" ? "green.700" : "red.700"
                }
              >
                {subDetails?.status_formatted || "Inactive"}
              </Box>
            </Box>
          </Flex>
        </Box>

        <Box>
          <Flex align="center" gap={4} mb={4}>
            <FiCalendar size={24} color="#E53E3E" />
            <Box>
              <Text fontSize="sm" color="gray.500" mb={1}>
                NEXT BILLING DATE
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                {subDetails?.renews_at
                  ? new Date(subDetails.renews_at).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Not set"}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* Cancel Subscription Button */}
      <Flex justify="flex-end" mt={8}>
        <Button
          variant="solid"
          colorScheme="red"
          onClick={() => setIsOpen(true)}
          size="lg"
          px={2}
        >
          Cancel Subscription
        </Button>
      </Flex>

      {/* Cancel Confirmation Dialog */}
      <DialogRoot
        open={isOpen}
        onOpenChange={(details) => setIsOpen(details.open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to cancel your subscription? You&apos;ll lose
            access to premium features at the end of your current billing
            period.
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Keep Subscription
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={handleCancelSubscription}
            >
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
