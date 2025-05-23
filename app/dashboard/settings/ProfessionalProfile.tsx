import { Box, Heading, Text, Icon, Input, Button} from "@chakra-ui/react";
import { FaBriefcase, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { VStack, SimpleGrid, HStack } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/number-input"

export default function ProfessionalProfile() {
  const [jobTitle, setJobTitle] = useState("Student");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState<number>(0);
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
      async function fetchProfile() {
        try {
          const res = await fetch("/api/setting/profile");
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
          console.log(data)
          setJobTitle(data.job_title)
          setCompany(data.company)
          setExperience(typeof data.experience_years === "number" ? data.experience_years : 0);
        } catch (error: any) {
          setError(error.message);
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
      setExperience(typeof data.experience_years === "number" ? data.experience_years : 0);

      toast({
        title: "Profile updated.",
        description: "Your professional details have been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Update failed.",
        description: "Something went wrong while saving.",
        status: "error",
        duration: 3000,
        isClosable: true,
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

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box>
          <HStack mb={2}>
            <Icon as={FaBriefcase} color="blue.500" boxSize={5} />
            <Text fontWeight="semibold">Job Title:</Text>
          </HStack>
          <Input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter your job title"
            ml={7}
          />
        </Box>

        <Box>
          <HStack mb={2}>
            <Icon as={FaBuilding} color="green.500" boxSize={5} />
            <Text fontWeight="semibold">Company:</Text>
          </HStack>
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter your company"
            ml={7}
          />
        </Box>

        <Box>
          <HStack mb={2}>
            <Icon as={FaCalendarAlt} color="purple.500" boxSize={5} />
            <Text fontWeight="semibold">Years of Experience:</Text>
          </HStack>
          <NumberInput
            min={0}
            value={experience}
            onChange={(valueString, valueNumber) =>
              setExperience(isNaN(valueNumber) ? 0 : valueNumber)
            }
            ml={5}
          >
            <NumberInputField placeholder="e.g. 3" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </SimpleGrid>

      <Button
        mt={6}
        colorScheme="blue"
        onClick={handleSave}
        loading={isSaving}
      >
        Save Changes
      </Button>
    </Box>
  );
}
