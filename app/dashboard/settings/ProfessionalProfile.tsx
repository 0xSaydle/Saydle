import {
  Box,
  Heading,
  Text,
  Icon,
  Input,
  Button,
  Stack,
  SimpleGrid,
  NumberInput,
} from "@chakra-ui/react";
import { FaBriefcase, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";

export default function ProfessionalProfile() {
  const [jobTitle, setJobTitle] = useState("Student");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/setting/profile");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setJobTitle(data.job_title);
        setCompany(data.company);
        setExperience(
          typeof data.experience_years === "number" ? data.experience_years : 0
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          toaster.create({
            title: "Error",
            description: error.message,
            type: "error",
            duration: 3000,
            meta: { closable: true },
          });
        }
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/setting/professional", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          company,
          experience,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save profile");
      }
      const data = await response.json();
      setJobTitle(data.job_title ?? "");
      setCompany(data.company ?? "");
      setExperience(
        typeof data.experience_years === "number" ? data.experience_years : 0
      );

      toaster.create({
        title: "Profile updated.",
        description: "Your professional details have been saved.",
        type: "success",
        duration: 3000,
        meta: { closable: true },
      });
    } catch (error: unknown) {
      toaster.create({
        title: "Update failed.",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong while saving.",
        type: "error",
        duration: 3000,
        meta: { closable: true },
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box bg="gray.50" p={6} rounded="lg" shadow="md">
      <Heading as="h2" size="md" mb={6}>
        Professional Profile
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        <Box>
          <Stack direction="row" mb={2}>
            <Icon as={FaBriefcase} color="blue.500" boxSize={5} />
            <Text fontWeight="semibold">Job Title:</Text>
          </Stack>
          <Input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter your job title"
            ml={7}
          />
        </Box>

        <Box>
          <Stack direction="row" mb={2}>
            <Icon as={FaBuilding} color="green.500" boxSize={5} />
            <Text fontWeight="semibold">Company:</Text>
          </Stack>
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter your company"
            ml={7}
          />
        </Box>

        <Box>
          <Stack direction="row" mb={2}>
            <Icon as={FaCalendarAlt} color="purple.500" boxSize={5} />
            <Text fontWeight="semibold">Years of Experience:</Text>
          </Stack>
          <NumberInput.Root
            min={0}
            value={String(experience)}
            onValueChange={(value) => setExperience(Number(value))}
            ml={5}
          >
            <NumberInput.Control>
              <NumberInput.Input placeholder="e.g. 3" />
              <NumberInput.IncrementTrigger />
              <NumberInput.DecrementTrigger />
            </NumberInput.Control>
          </NumberInput.Root>
        </Box>
      </SimpleGrid>

      <Button mt={6} colorScheme="blue" onClick={handleSave} loading={isSaving}>
        Save Changes
      </Button>
    </Box>
  );
}
