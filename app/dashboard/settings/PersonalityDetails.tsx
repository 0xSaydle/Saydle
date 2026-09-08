import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import {
  Box,
  Heading,
  Input,
  Button,
  Stack,
  CloseButton,
} from "@chakra-ui/react";

export default function PersonalityDetails() {
  const [type, setType] = useState("INTP-T");
  const [isSaving, setIsSaving] = useState(false);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

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
      toaster.create({
        title: "Saved!",
        type: "success",
        duration: 3000,
        meta: { closable: true },
      });
    } catch (err: unknown) {
      toaster.create({
        title: "Error",
        description: err instanceof Error ? err.message : "An error occurred",
        type: "error",
        duration: 3000,
        meta: { closable: true },
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

        const toArray = (val: string | string[] | undefined): string[] => {
          if (Array.isArray(val)) return val;
          if (typeof val === "string") {
            return val
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          }
          return [];
        };

        setStrengths(toArray(data.strengths));
        setWeaknesses(toArray(data.weaknesses));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box bg="gray.50" p={6} rounded="lg" shadow="md">
      <Heading as="h2" size="md" mb={4}>
        Personality Details
      </Heading>
      <Stack gap={4}>
        {/* Type */}
        <Box>
          <Box as="label" display="block" mb={2}>
            Type
          </Box>
          <Input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g. INTP-T"
          />
        </Box>

        {/* Strengths */}
        <Box>
          <Box as="label" display="block" mb={2}>
            Strengths
          </Box>
          <Stack direction="row" wrap="wrap" gap={2} mb={2}>
            {strengths.map((s, idx) => (
              <Box
                key={idx}
                bg="green.500"
                color="white"
                px={3}
                py={1}
                rounded="full"
                display="inline-flex"
                alignItems="center"
                gap={2}
              >
                <span>{s}</span>
                <CloseButton
                  size="sm"
                  onClick={() => removeTag(idx, setStrengths)}
                />
              </Box>
            ))}
          </Stack>
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
        </Box>

        {/* Weaknesses */}
        <Box>
          <Box as="label" display="block" mb={2}>
            Weaknesses
          </Box>
          <Stack direction="row" wrap="wrap" gap={2} mb={2}>
            {weaknesses.map((w, idx) => (
              <Box
                key={idx}
                bg="green.500"
                color="white"
                px={3}
                py={1}
                rounded="full"
                display="inline-flex"
                alignItems="center"
                gap={2}
              >
                <span>{w}</span>
                <CloseButton
                  size="sm"
                  onClick={() => removeTag(idx, setWeaknesses)}
                />
              </Box>
            ))}
          </Stack>
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
        </Box>

        {/* Save Button */}
        <Button
          mt={6}
          colorScheme="blue"
          onClick={handleSave}
          loading={isSaving}
        >
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}
