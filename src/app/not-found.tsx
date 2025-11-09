import { Metadata } from "next";

import NotFoundClient from "@/components/features/web/notFoundClient/NotFoundClient";

export const metadata: Metadata = {
  title: "Stránka nenalezena | Kuchařův Deník",
  description:
    "Hledaná stránka nebyla nalezena. Vraťte se na hlavní stránku nebo vyhledejte recepty.",
};

export default function NotFound() {
  return <NotFoundClient />;
}
