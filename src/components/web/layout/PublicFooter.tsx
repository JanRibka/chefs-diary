"use client";

import Link from "next/link";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoMail,
} from "react-icons/io5";

import { Button, Input } from "@heroui/react";

export default function PublicFooter() {
  return (
    <footer className="relative bg-gradient-to-t from-white to-orange-50 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800 mt-20">
      <div className="absolute -top-48 right-10 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Kuchařův Deník
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-md">
              Místo, kde se setkávají nadšení kuchaři a profesionálové. Sdílejte
              své recepty a inspirujte ostatní.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-600 dark:text-slate-300 hover:text-pink-500 transition-colors"
              >
                <IoLogoInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
              >
                <IoLogoFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors"
              >
                <IoLogoTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Rychlé odkazy
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/recipes" className="hover:text-orange-500">
                  Recepty
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500">
                  O projektu
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-500">
                  Podmínky
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-orange-500">
                  Zásady ochrany osobních údajů
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
              Přihlaste se k odběru
            </h4>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Získejte novinky, nejlepší recepty a tipy přímo do vašeho inboxu.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                placeholder="Váš email"
                type="email"
                aria-label="Email"
                className="rounded-xl"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl px-6 py-3"
              >
                <IoMail className="w-5 h-5 mr-2" />
                Odebírat
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-divider mt-8 pt-6 text-sm text-slate-500 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Kuchařův deník. Všechna práva
            vyhrazena.
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-amber-500">
              Ochrana soukromí
            </Link>
            <Link href="/terms" className="hover:text-amber-500">
              Podmínky použití
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
