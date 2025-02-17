import "tailwindcss/tailwind.css";
import "flowbite/dist/flowbite.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900"> {/* Ensure global styles apply */}
        {children}
      </body>
    </html>
  );
}