import Link from "next/link";

export default function PersonalProfile() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Personal Profile</h2>

      <div className="bg-white p-4 rounded shadow">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Phone:</strong> +123 456 7890</p>
      </div>

      <Link href="/settings/personal/edit" className="mt-4 inline-block text-blue-600 hover:underline">
        Edit Profile
      </Link>
    </div>
  );
}
