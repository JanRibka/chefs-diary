"use client";

import NextLink from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { GiChefToque } from 'react-icons/gi';

import { Button, Link } from '@heroui/react';

export default function PublicFooter() {
  return (
    <footer className="bg-default-50 dark:bg-default-900 border-t border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <GiChefToque className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Kuchařův deník
              </span>
            </div>
            <p className="text-default-600 dark:text-default-400 mb-4 max-w-md">
              Vaše kulinářská cesta začíná zde. Objevujte recepty, sdílejte své
              kuchařské umění a spojte se s komunitou nadšených kuchařů.
            </p>
            <div className="flex gap-4">
              <Button isIconOnly variant="light" size="sm">
                <FaFacebook className="w-5 h-5" />
              </Button>
              <Button isIconOnly variant="light" size="sm">
                <FaInstagram className="w-5 h-5" />
              </Button>
              <Button isIconOnly variant="light" size="sm">
                <FaTwitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-default-900 dark:text-default-100 mb-4">
              Recepty
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  as={NextLink}
                  href="/recipes"
                  className="text-default-600 hover:text-primary transition-colors"
                >
                  Všechny recepty
                </Link>
              </li>
              <li>
                <Link
                  as={NextLink}
                  href="/categories/breakfast"
                  className="text-default-600 hover:text-primary transition-colors"
                >
                  Snídaně
                </Link>
              </li>
              <li>
                <Link
                  as={NextLink}
                  href="/categories/main-course"
                  className="text-default-600 hover:text-primary transition-colors"
                >
                  Hlavní chody
                </Link>
              </li>
              <li>
                <Link
                  as={NextLink}
                  href="/categories/desserts"
                  className="text-default-600 hover:text-primary transition-colors"
                >
                  Dezerty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-default-900 dark:text-default-100 mb-4">
              Účet
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  as={NextLink}
                  href="/profile"
                  className="text-default-600 hover:text-primary transition-colors"
                >
                  Můj profil
                </Link>
              </li>
              <li>
                <Link
                  as={NextLink}
                  href="/my-recipes"
                  className="text-default-600 hover:text-primary transition-colors"
                >
                  Moje recepty
                </Link>
              </li>
              <li>
                <Link
                  as={NextLink}
                  href="/favorites"
                  className="text-default-600 hover:text-primary transition-colors"
                >
                  Oblíbené
                </Link>
              </li>
              <li>
                <Link
                  as={NextLink}
                  href="/settings"
                  className="text-default-600 hover:text-primary transition-colors"
                >
                  Nastavení
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-divider mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-default-600 dark:text-default-400 text-sm">
            © 2025 Kuchařův deník. Všechna práva vyhrazena.
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-default-600 hover:text-primary transition-colors text-sm"
            >
              Ochrana soukromí
            </Link>
            <Link
              href="/terms"
              className="text-default-600 hover:text-primary transition-colors text-sm"
            >
              Podmínky použití
            </Link>
            <Link
              href="/contact"
              className="text-default-600 hover:text-primary transition-colors text-sm"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
