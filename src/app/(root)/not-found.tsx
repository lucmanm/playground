import Link from "next/link";

export default function NotFound() {
  return (
<section className="container flex items-center justify-center h-full">
  <div className="max-w-md text-center">
    <h2 className="text-4xl font-bold text-gray-800">Oh no! We cant find that page.</h2>
    <p className="text-gray-600 mt-4">The resource you requested might have been moved or deleted.</p>
    <Link href="/" className="btn btn-primary mt-6">Return Home</Link>
  </div>
</section>
  );
}
