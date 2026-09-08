"use client";

import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Stack,
  SimpleGrid,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const frequencyOptions = createListCollection({
  items: [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ],
});

const deliveryOptions = createListCollection({
  items: [
    { label: "SMS", value: "sms" },
    { label: "WhatsApp", value: "whatsapp" },
  ],
});

export default function AffirmationPreferences() {
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [time_of_day, setTimeOfDay] = useState("08:00");
  const [days_of_week, setDaysOfWeek] = useState<string[]>([]);
  const [delivery_method, setChannel] = useState<"sms" | "whatsapp">("sms");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/setting/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frequency,
          time_of_day,
          days_of_week,
          delivery_method,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toaster.create({
        title: "Preferences saved",
        type: "success",
        duration: 3000,
        meta: { closable: true },
      });
    } catch {
      toaster.create({
        title: "Error saving preferences",
        type: "error",
        duration: 3000,
        meta: { closable: true },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={10}
      p={6}
      bg="white"
      borderRadius="2xl"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap={6}>
          <Box>
            <Heading size="md" mb={2}>
              Affirmation Preferences
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Customize how and when you receive your affirmations.
            </Text>
          </Box>

          <Box>
            <Box as="label" display="block" mb={2}>
              Frequency
            </Box>
            <Select.Root
              value={[frequency]}
              onValueChange={(value) =>
                setFrequency(
                  (
                    value as unknown as {
                      value: "daily" | "weekly" | "monthly";
                    }
                  ).value
                )
              }
              collection={frequencyOptions}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select frequency" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {frequencyOptions.items.map((option) => (
                    <Select.Item item={option} key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Box>

          {frequency === "weekly" && (
            <Box>
              <Box as="label" display="block" mb={2}>
                Select days
              </Box>
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={2}>
                {days.map((day) => (
                  <Checkbox
                    key={day}
                    checked={days_of_week.includes(day)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDaysOfWeek([...days_of_week, day]);
                      } else {
                        setDaysOfWeek(days_of_week.filter((d) => d !== day));
                      }
                    }}
                  >
                    {day}
                  </Checkbox>
                ))}
              </SimpleGrid>
            </Box>
          )}

          <Box>
            <Box as="label" display="block" mb={2}>
              Preferred Time
            </Box>
            <Input
              type="time"
              value={time_of_day}
              onChange={(e) => setTimeOfDay(e.target.value)}
            />
          </Box>

          <Box>
            <Box as="label" display="block" mb={2}>
              Notification Channel
            </Box>
            <Select.Root
              value={[delivery_method]}
              onValueChange={(value) =>
                setChannel(
                  (value as unknown as { value: "sms" | "whatsapp" }).value
                )
              }
              collection={deliveryOptions}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select delivery method" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {deliveryOptions.items.map((option) => (
                    <Select.Item item={option} key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Box>

          <Button
            colorScheme="pink"
            type="submit"
            loading={loading}
            loadingText="Saving..."
            size="lg"
            borderRadius="full"
          >
            Save Preferences
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
