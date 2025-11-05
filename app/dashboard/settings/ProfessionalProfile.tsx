"use client";

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
import { Field } from "@chakra-ui/react";

import { FaBriefcase, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";

import { Controller, useForm, ControllerRenderProps } from "react-hook-form";
// Import ZodIssue for explicit typing in catch block
import { z, ZodIssue } from "zod";


const professionalProfileSchema = z.object({
  jobTitle: z.string().min(1, { message: "Job Title is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  experience: z.number({
    message: "Years of Experience must be a number",
  }).min(0, { message: "Experience cannot be negative" }),
});

type ProfessionalProfileFormValues = z.infer<typeof professionalProfileSchema>;


export default function ProfessionalProfile() {
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm<ProfessionalProfileFormValues>({
    defaultValues: {
      jobTitle: "",
      company: "",
      experience: 0,
    } as ProfessionalProfileFormValues,
  });

  useEffect(() => {
    async function fetchProfile() {
      setIsLoadingProfile(true);
      try {
        const res = await fetch("/api/setting/profile");
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 404) {
            console.log("No existing profile found, initializing with defaults.");
            reset({
                jobTitle: "",
                company: "",
                experience: 0,
            });
          } else {
            throw new Error(data.message || "Failed to fetch profile");
          }
        } else {
          setValue("jobTitle", data.job_title ?? "");
          setValue("company", data.company ?? "");
          setValue("experience", typeof data.experience_years === "number" ? data.experience_years : 0);
        }
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
      } finally {
        setIsLoadingProfile(false);
      }
    }
    fetchProfile();
  }, [setValue, reset]);


  const onSubmit = async (formData: ProfessionalProfileFormValues) => {
    try {
      clearErrors();
      const validatedData = professionalProfileSchema.parse(formData);

      try {
        const response = await fetch("/api/setting/professional", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to save profile");
        }

        await response.json();

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
      }

    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        // CORRECTED: Use error.issues instead of error.errors
        // CORRECTED: Explicitly type 'issue' as ZodIssue
        error.issues.forEach((issue: ZodIssue) => {
          // 'path' from Zod issues is an array, ensure it's handled as a string
          // Only set error if the path points to a known form field
          const fieldName = issue.path.join('.') as keyof ProfessionalProfileFormValues;
          if (fieldName in formData) { // Basic check to ensure it's a field we care about
              setError(fieldName, { type: issue.code, message: issue.message });
          }
        });
        toaster.create({
            title: "Validation Error",
            description: "Please correct the highlighted fields.",
            type: "error",
            duration: 3000,
            meta: { closable: true },
        });
      } else {
        toaster.create({
            title: "Error",
            description: error instanceof Error ? error.message : "An unexpected validation error occurred.",
            type: "error",
            duration: 3000,
            meta: { closable: true },
        });
      }
    }
  };

  if (isLoadingProfile) {
    return <Box p={6} rounded="lg" shadow="md">Loading profile...</Box>;
  }

  return (
    <Box bg="gray.50" p={6} rounded="lg" shadow="md">
      <Heading as="h2" size="md" mb={6}>
        Professional Profile
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          {/* Job Title */}
          <Field.Root invalid={!!errors.jobTitle}>
            <Stack direction="row" mb={2}>
              <Icon as={FaBriefcase} color="blue.500" boxSize={5} />
              <Field.Label as={Text} fontWeight="semibold">Job Title:</Field.Label>
            </Stack>
            <Controller
              name="jobTitle"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter your job title"
                  ml={7}
                />
              )}
            />
            <Field.ErrorText>{errors.jobTitle?.message}</Field.ErrorText>
          </Field.Root>

          {/* Company */}
          <Field.Root invalid={!!errors.company}>
            <Stack direction="row" mb={2}>
              <Icon as={FaBuilding} color="green.500" boxSize={5} />
              <Field.Label as={Text} fontWeight="semibold">Company:</Field.Label>
            </Stack>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter your company"
                  ml={7}
                />
              )}
            />
            <Field.ErrorText>{errors.company?.message}</Field.ErrorText>
          </Field.Root>

          {/* Years of Experience */}
          <Field.Root invalid={!!errors.experience}>
            <Stack direction="row" mb={2}>
              <Icon as={FaCalendarAlt} color="purple.500" boxSize={5} />
              <Field.Label as={Text} fontWeight="semibold">Years of Experience:</Field.Label>
            </Stack>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <NumberInput.Root
                  min={0}
                  name={field.name}
                  value={field.value === 0 ? "0" : String(field.value)}
                  onValueChange={(details: { value: string; valueAsNumber: number }) => {
                    field.onChange(isNaN(details.valueAsNumber) ? 0 : details.valueAsNumber);
                  }}
                  onBlur={field.onBlur}
                  ml={7}
                >
                  <NumberInput.Control>
                    <NumberInput.Input placeholder="e.g. 3" />
                    <NumberInput.IncrementTrigger />
                    <NumberInput.DecrementTrigger />
                  </NumberInput.Control>
                </NumberInput.Root>
              )}
            />
            <Field.ErrorText>{errors.experience?.message}</Field.ErrorText>
          </Field.Root>
        </SimpleGrid>

        <Button mt={6} colorScheme="blue" type="submit" loading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </Box>
  );
}