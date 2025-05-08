import Link from "next/link";

import webRoutes from "@/lib/routes/web/routes";

export default function LoginUser() {
  return (
    <section>
      <div className="flex flex-col items-center mt-5">
        <p className="mb-2">
          Máte účet?{" "}
          <Link
            href={webRoutes.LogIn}
            className="font-bold underline text-primary"
          >
            Přihlašte se
          </Link>
        </p>
      </div>
    </section>
  );
}
