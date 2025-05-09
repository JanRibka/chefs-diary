import Link from "next/link";

import { RouteValue } from "@/lib/routes/webRoutes";

import Alert from "../alert/Alert";
import Button from "../button/Button";

type Props = {
  alertTitle: string;
  link: RouteValue;
  description: string;
  buttonTitle: string;
};

export default function PasswordResetAlert({
  alertTitle,
  link,
  description,
  buttonTitle,
}: Props) {
  return (
    <section>
      <div className="w-full">
        <Alert
          className="mb-8"
          title={alertTitle}
          color="danger"
          variant="faded"
        />
        <p className="mb-8 text-sm text-center">{description}</p>
        <Link href={link} className="w-full">
          <Button className="w-full" color="primary">
            {buttonTitle}
          </Button>
        </Link>
      </div>
    </section>
  );
}
