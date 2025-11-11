// Re-export the NextAuth route handlers from the project's auth module.
// `auth.ts` exports named `GET` and `POST` handlers (App Router style),
// so re-export them here for the dynamic catch-all API route.
export { GET, POST } from "../../../../auth";