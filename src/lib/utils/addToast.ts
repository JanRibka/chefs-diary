import { addToast as addToastHero } from "@heroui/react";

export default function addToast(
  title: string,
  description: string,
  color:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined = "default"
) {
  return addToastHero({
    title,
    color,
    description,
  });
}
