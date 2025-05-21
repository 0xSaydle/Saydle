import { Box, Heading, Text, Icon, Input, Button} from "@chakra-ui/react";
import { FaBriefcase, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { VStack, SimpleGrid, HStack } from "@chakra-ui/layout";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast"

export default function ProfessionalProfile() {
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [company, setCompany] = useState("TechCorp Inc.");
  const [experience, setExperience] = useState("5 years");
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate saving to backend

  //     await supabase
  // .from('professional_profiles')
  // .update({ jobTitle, company, experience })
  // .eq('user_id', userId);

      await new Promise(resolve => setTimeout(resolve, 1000));

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
            <Text fontWeight="semibold">Experience:</Text>
          </HStack>
          <Input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g. 3 years"
            ml={7}
          />
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
