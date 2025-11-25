"use client";

import { useState } from 'react';
import { IoMail, IoSend } from 'react-icons/io5';

import { Button, Input } from '@heroui/react';

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-card text-card-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center">
            <IoMail className="w-10 h-10 text-primary-foreground" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Zůstaňte v obraze
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Přihlaste se k odběru našeho newsletteru a dostávejte nejnovější
            recepty, kulinářské tipy a exkluzivní obsah přímo do vaší schránky.
          </p>
        </div>

        {!isSubscribed ? (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Váš email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                classNames={{
                  input:
                    "bg-background border-border text-foreground placeholder:text-muted-foreground",
                  inputWrapper:
                    "bg-background border-border hover:bg-secondary focus:bg-secondary",
                }}
                required
              />
              <Button
                type="submit"
                color="primary"
                size="lg"
                className="font-semibold px-8 text-primary-foreground"
                endContent={<IoSend className="w-5 h-5" />}
              >
                Odebírat
              </Button>
            </div>
          </form>
        ) : (
          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 max-w-md mx-auto">
            <div className="text-green-600 dark:text-green-400 text-lg font-semibold mb-2">
              ✅ Úspěšně přihlášeno!
            </div>
            <p className="text-muted-foreground">
              Děkujeme za přihlášení k odběru. Brzy obdržíte první newsletter.
            </p>
          </div>
        )}

        <div className="mt-8 text-muted-foreground text-sm">
          <p>
            Respektujeme vaše soukromí. Odhlásit se můžete kdykoli pomocí odkazu
            v emailu.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="font-semibold mb-2">Týdenní recepty</h3>
            <p className="text-muted-foreground text-sm">
              Nejlepší recepty vybrané našimi šéfkuchaři
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-destructive/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="font-semibold mb-2">Kulinářské tipy</h3>
            <p className="text-muted-foreground text-sm">
              Profesionální rady a triky pro lepší vaření
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎁</span>
            </div>
            <h3 className="font-semibold mb-2">Exkluzivní obsah</h3>
            <p className="text-muted-foreground text-sm">
              Speciální recepty a soutěže jen pro odběratele
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
