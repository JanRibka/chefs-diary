import { mergeStyles } from "@/lib/utils/styles";
import { Alert, AlertProps } from "@heroui/react";

type Props = AlertProps & {};

export default function FormAlert({
  className,
  title,
  color = "danger",
  variant = "faded",
  ...restProps
}: Props) {
  if (!title) return null;

  return (
    <div className={mergeStyles("w-full", className)}>
      <Alert title={title} color={color} variant={variant} {...restProps} />
    </div>
  );
}
