"use client";

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 shadow-md overflow-hidden'>
      {!session ? (
        <div className='flex-row items-center justify-center bg-slate-50'>
          <div className='social-buttons flex items-center justify-center py-4'>
            <button 
              onClick={() => signIn('google')}
              type="button" 
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Sign in with Google
            </button>
            <button 
              onClick={() => signIn('twitter')}
              type="button" 
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Sign in with Twitter
            </button>
            <button 
              onClick={() => signIn('linkedIn')}
              type="button" 
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Sign in with LinkedIn
            </button>
          </div>
          <form
            className='flex items-center justify-center'
            onSubmit={(e) => {
              const formData = new FormData(e.currentTarget);
              const username = formData.get("phone") as string;
              const token = formData.get("token") as string;

            }}
          >
            <div className='input-fields block mb-4'>
              <input className='' name="phone" type="text" placeholder="phone" />
            </div>
            <button 
              type="submit" 
              className="block text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Get OTP
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      )}
    </div>
  );
}