// lib/localStorage.ts
import { IUser } from './User'

const USER_KEY = 'user_data'

export const saveUserToLocalStorage = (user: IUser) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export const getUserFromLocalStorage = (): IUser | null => {
   if (typeof window !== 'undefined') {
    const data = localStorage.getItem(USER_KEY)
    return data ? JSON.parse(data) : null
  }

  return null
}

export const clearUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY)
  }
}
