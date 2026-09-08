import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  Input,
  Text,
  Stack,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

export default function PersonalProfile() {
  const [image, setProfilePic] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [dob, setDob] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
    gender: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/setting/profile");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setFormData({
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          date_of_birth: data.date_of_birth,
          address: data.address,
          gender: data.gender,
        });
        setProfilePic(data.image);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }
    fetchProfile();
  }, []);

  const validateDob = (value: string) => {
    const selectedDate = new Date(value);
    const today = new Date();
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);

    if (selectedDate > today) {
      return "DOB cannot be a future date.";
    }
    if (selectedDate > tenYearsAgo) {
      return "User must be at least 10 years old.";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDOBChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setDob(value);
    if (dob !== "") {
      setFormData({
        ...formData,
        date_of_birth: dob,
      });
    }
    setError(validateDob(value));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const fileData = new FormData();
    fileData.append("file", file);

    try {
      const res = await fetch("/api/setting/upload", {
        method: "POST",
        body: fileData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setProfilePic(data.imageUrl);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/setting/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: image }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <Box maxW="lg" mx="auto" p={6} bg="white" rounded="lg" shadow="md">
      <Heading size="lg" mb={6}>
        Personal Profile
      </Heading>

      <Stack gap={4} align="center" mb={6}>
        <Avatar
          name={formData.name}
          src={image}
          boxSize="128px"
          objectFit="cover"
          rounded="full"
          border="1px solid"
          borderColor="gray.200"
        />

        {isEditing && (
          <>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              display="none"
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <Button
                cursor="pointer"
                colorScheme="blue"
                loading={uploading}
                loadingText="Uploading..."
                as="span"
              >
                Upload Picture
              </Button>
            </label>
          </>
        )}
      </Stack>

      {error && (
        <Box p={4} mb={4} bg="red.50" color="red.500" rounded="md">
          {error}
        </Box>
      )}

      {!isEditing ? (
        <Stack gap={3} align="start">
          <Text>
            <strong>Full Name:</strong> {formData.name || ""}
          </Text>
          <Text>
            <strong>Email:</strong> {formData.email || ""}
          </Text>
          <Text>
            <strong>Phone:</strong> {formData.phone_number || ""}
          </Text>
          <Text>
            <strong>Date of Birth:</strong>
            {formData.date_of_birth
              ? new Date(formData.date_of_birth).toLocaleDateString()
              : ""}
          </Text>
          <Text>
            <strong>Address:</strong> {formData.address || ""}
          </Text>
          <Text>
            <strong>Gender:</strong> {formData.gender || ""}
          </Text>

          <Button
            mt={4}
            colorScheme="yellow"
            w="full"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        </Stack>
      ) : (
        <Stack gap={4} align="stretch">
          <Box>
            <Text mb={2}>Full Name</Text>
            <Input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </Box>

          <Box>
            <Text mb={2}>Email</Text>
            <Input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Box>

          <Box>
            <Text mb={2}>Phone</Text>
            <Input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </Box>

          <Box>
            <Text mb={2}>Date of Birth</Text>
            <Input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleDOBChange}
              max={new Date().toISOString().split("T")[0]}
            />
          </Box>

          <Box>
            <Text mb={2}>Address</Text>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </Box>

          <Box>
            <Text mb={2}>Gender</Text>
            <Select.Root
              value={[formData.gender]}
              onValueChange={(value) => {
                const newValue = (value as unknown as { value: string }).value;
                setFormData({ ...formData, gender: newValue });
              }}
              collection={createListCollection({
                items: [
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ],
              })}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select Gender" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  <Select.Item item={{ label: "Male", value: "male" }}>
                    Male
                  </Select.Item>
                  <Select.Item item={{ label: "Female", value: "female" }}>
                    Female
                  </Select.Item>
                  <Select.Item item={{ label: "Other", value: "other" }}>
                    Other
                  </Select.Item>
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </Box>

          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>

          <Button
            mt={4}
            colorScheme="green"
            w="full"
            onClick={handleUpdateProfile}
            loading={uploading}
          >
            Save Changes
          </Button>
        </Stack>
      )}
    </Box>
  );
}
