import Link from "next/link";

import webRoutes from "@/lib/routes/web/routes";

export default function CreateAccount() {
  return (
    <section>
      <div className="flex flex-col items-center mt-5">
        <p className="mb-2">
          Nemáte účet?{" "}
          <Link
            href={webRoutes.SignUp}
            className="font-bold underline text-primary"
          >
            Vytvořte si jej
          </Link>
        </p>
      </div>
    </section>
  );
}
