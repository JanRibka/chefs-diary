import { Chip, ChipProps } from "@heroui/react";

type Props = {
  value: boolean | null;
  trueColor: ChipProps["color"];
  trueLabel: string;
  falseColor: ChipProps["color"];
  falseLabel: string;
};

export default function TableCellBoolean({
  value,
  trueColor,
  trueLabel,
  falseColor,
  falseLabel,
}: Props) {
  const label = value ? trueLabel : falseLabel;
  const color = value ? trueColor : falseColor;

  return <Chip color={color}>{label}</Chip>;
}
