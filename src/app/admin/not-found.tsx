import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stránka nenalezena | Admin - Kuchařův Deník",
  description: "Hledaná stránka nebyla nalezena v admin sekci.",
};

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Stránka nenalezena
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Požadovaná stránka v admin sekci nebyla nalezena.
        </p>
        <a
          href="/admin"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Zpět do admin
        </a>
      </div>
    </div>
  );
}
