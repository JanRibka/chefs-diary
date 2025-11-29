"use client";

import { useState } from "react";
import { IoMail } from "react-icons/io5";

import { Button, Input } from "@heroui/react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-orange-500 to-primary" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

          <div className="max-w-2xl mx-auto relative z-10">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-6">
              <IoMail className="w-8 h-8" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Nenechte si ujít <br /> žádnou novinku
            </h2>

            <p className="text-xl text-white/70 mb-10">
              Připojte se k našemu newsletteru a získejte týdenní dávku
              inspirace, exkluzivních receptů a kulinářských tipů.
            </p>

            {!isSubscribed ? (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Váš email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  size="lg"
                  classNames={{
                    input: "text-lg",
                    inputWrapper:
                      "h-14 rounded-2xl bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 focus-within:border-primary transition-colors",
                  }}
                  required
                />
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="h-14 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20"
                >
                  Odebírat
                </Button>
              </form>
            ) : (
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 animate-in fade-in zoom-in duration-300">
                <p className="text-green-600 font-bold text-lg">
                  🎉 Vítejte v klubu! První recepty už jsou na cestě.
                </p>
              </div>
            )}

            <p className="mt-8 text-sm text-muted-foreground/60">
              Žádný spam, jen skvělé jídlo. Odhlásit se můžete kdykoliv.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
