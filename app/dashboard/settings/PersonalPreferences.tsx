import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/toast"
import { Select } from "@chakra-ui/select";
import { Stack } from "@chakra-ui/layout"
// import { Checkbox,
//   CheckboxGroup,
// } from '@chakra-ui/checkbox';
import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  // FormErrorIcon,
} from "@chakra-ui/form-control"
import { useState } from 'react'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export default function AffirmationPreferences() {
  const toast = useToast()
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [timeOfDay, setTimeOfDay] = useState('08:00')
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])
  const [channel, setChannel] = useState<'sms' | 'whatsapp'>('sms')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frequency, timeOfDay, daysOfWeek, channel }),
      })
      if (!res.ok) throw new Error('Failed to save')
      toast({ title: 'Preferences saved', status: 'success', duration: 3000 })
    } catch (error) {
      toast({ title: 'Error saving preferences', status: 'error', duration: 3000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box maxW="md" mx="auto" p={4} bg="white" rounded="md" shadow="md">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Frequency</FormLabel>
          <Select value={frequency} onChange={e => setFrequency(e.target.value as any)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Time of Day</FormLabel>
          <input
            type="time"
            value={timeOfDay}
            onChange={e => setTimeOfDay(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </FormControl>

        {frequency === 'weekly' && (
          <FormControl mb={4}>
            <FormLabel>Days of the Week</FormLabel>
            <CheckboxGroup
              colorScheme="pink"
              value={daysOfWeek}
              onChange={values => setDaysOfWeek(values as string[])}
            >
              <Stack spacing={2} direction="row" wrap="wrap">
                {days.map(day => (
                  <Checkbox key={day} value={day}>
                    {day}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </FormControl>
        )}

        <FormControl mb={6}>
          <FormLabel>Notification Channel</FormLabel>
          <Select value={channel} onChange={e => setChannel(e.target.value as any)}>
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
          </Select>
        </FormControl>

        <Button colorScheme="pink" type="submit" loading={loading} width="full">
          Save Preferences
        </Button>
      </form>
    </Box>
  )
}
