import { z } from 'zod'

export const AuthFormSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email.'}),
    phone: z
        .string()
        .min(10, {message: 'Phone number must be at least 10 characters long.'})
        .regex(/[0-9]{3}-[0-9]{3}-[0-9]{4}/, {message: 'Not a valid phone number format.'})
        .trim(),
    otp: z
        .string()
        .min(6, {message: 'Be at least 8 characters long.'})
        .regex(/[0-9]{6}/, {message: 'Contain numbers.'})
        .trim(),
})

export type FormState = 
    | {
        errors?: {
            phone?: string[]
            email?: string[]
            otp?: string[]
        }
        message?: string
    }
    | undefined