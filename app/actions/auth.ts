import { AuthFormSchema, FormState } from "../lib/definition";
  
export const submission = async (state: FormState, formData: FormData) => {
    let email =  formData.get('email');
    let phone = formData.get('phone');
    let otp = formData.get('otp')

    const validateFields = AuthFormSchema.safeParse({
        email:  email,
        phone: phone,
        otp: otp,
    })

    //if any form field are invalid, return early
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        }
    }

    //connect to api
    
    const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, otp }),
    })
    
    if (response.ok) {
        return { success: true };  // Return a success result
    } else {
        return { success: false, error: 'Signup failed' };
    }
}