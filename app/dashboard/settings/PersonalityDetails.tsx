import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  
} from "@chakra-ui/react";
import {Tag,
  TagLabel,
  TagCloseButton }
from '@chakra-ui/tag'
import { VStack, HStack } from "@chakra-ui/layout"

import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  // FormErrorIcon,
} from "@chakra-ui/form-control"

export default function PersonalityDetails() {
  const toast = useToast();
  const [type, setType] = useState("INTP-T");
  const [isSaving, setIsSaving] = useState(false);
  const [strengths, setStrengths] = useState<string[]>([
    "Logical",
    "Analytical",
    "Creative",
  ]);
  const [weaknesses, setWeaknesses] = useState<string[]>([
    "Overthinking",
    "Perfectionist",
  ]);

  // Handlers to add/remove tags
  const addTag = (
    text: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[]
  ) => {
    const trimmed = text.trim();
    if (trimmed && !list.includes(trimmed)) {
      setter([...list, trimmed]);
    }
  };
  const removeTag = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/setting/personality", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalityType: type,
          strengths,
          weaknesses,
        }),
      });
      if (!response.ok) throw new Error((await response.json()).error);
      toast({
        title: "Saved!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetch("/api/setting/personality")
      .then((res) => res.json())
      .then((data) => {
        setType(data.personalityType || "");
        setStrengths(data.strengths || []);
        setWeaknesses(data.weaknesses || []);
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <Box bg="gray.50" p={6} rounded="lg" shadow="md">
      <Heading as="h2" size="md" mb={4}>
        Personality Details
      </Heading>
      <VStack align="stretch" spacing={4}>
        {/* Type */}
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g. INTP-T"
          />
        </FormControl>

        {/* Strengths */}
        <FormControl>
          <FormLabel>Strengths</FormLabel>
          <HStack wrap="wrap" spacing={2} mb={2}>
            {strengths.map((s, idx) => (
              <Tag key={idx} size="md" borderRadius="full" variant="solid" colorScheme="green">
                <TagLabel>{s}</TagLabel>
                <TagCloseButton onClick={() => removeTag(idx, setStrengths)} />
              </Tag>
            ))}
          </HStack>
          <Input
            placeholder="Add a strength and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(e.currentTarget.value, setStrengths, strengths);
                e.currentTarget.value = "";
              }
            }}
          />
        </FormControl>

        {/* Weaknesses */}
        <FormControl>
          <FormLabel>Weaknesses</FormLabel>
          <HStack wrap="wrap" spacing={2} mb={2}>
            {weaknesses.map((w, idx) => (
              <Tag key={idx} size="md" borderRadius="full" variant="subtle" colorScheme="red">
                <TagLabel>{w}</TagLabel>
                <TagCloseButton onClick={() => removeTag(idx, setWeaknesses)} />
              </Tag>
            ))}
          </HStack>
          <Input
            placeholder="Add a weakness and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(e.currentTarget.value, setWeaknesses, weaknesses);
                e.currentTarget.value = "";
              }
            }}
          />
        </FormControl>

        {/* Save Button */}
        <Button
          mt={6}
          colorScheme="blue"
          onClick={handleSave}
          loading={isSaving}
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
}
