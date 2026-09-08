import {
  Box,
  Button,
  Heading,
  Input,  
  Text,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { Checkbox,
  CheckboxGroup } from "@chakra-ui/checkbox";
import { FormControl,
  FormLabel } from "@chakra-ui/form-control";

import {SimpleGrid,
  Stack } from "@chakra-ui/layout";

import { useState } from "react";
import { useToast } from "@chakra-ui/toast"
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AffirmationPreferences() {
  const toast = useToast();
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("daily");
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
        body: JSON.stringify({ frequency, time_of_day, days_of_week, delivery_method }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({ title: "Preferences saved", status: "success", duration: 3000 });
    } catch (error) {
      toast({ title: "Error saving preferences", status: "error", duration: 3000 });
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
        <Stack spacing={6}>
          <Box>
            <Heading size="md" mb={2}>
              Affirmation Preferences
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Customize how and when you receive your affirmations.
            </Text>
          </Box>

          <FormControl>
            <FormLabel>Frequency</FormLabel>
            <Select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Select>
          </FormControl>

          {frequency === "weekly" && (
            <FormControl>
              <FormLabel>Select days</FormLabel>
              <CheckboxGroup
                colorScheme="pink"
                value={days_of_week}
                onChange={(values) => setDaysOfWeek(values as string[])}
              >
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
                  {days.map((day) => (
                    <Checkbox key={day} value={day}>
                      {day}
                    </Checkbox>
                  ))}
                </SimpleGrid>
              </CheckboxGroup>
            </FormControl>
          )}

          <FormControl>
            <FormLabel>Preferred Time</FormLabel>
            <Input
              type="time"
              value={time_of_day}
              onChange={(e) => setTimeOfDay(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Notification Channel</FormLabel>
            <Select
              value={delivery_method}
              onChange={(e) => setChannel(e.target.value as any)}
            >
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
            </Select>
          </FormControl>

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
