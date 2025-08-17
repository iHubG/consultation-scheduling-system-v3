import { Link } from '@inertiajs/react';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          Oops! Page not found.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
