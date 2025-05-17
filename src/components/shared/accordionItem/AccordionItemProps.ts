import { ReactNode } from "react";
import { IconType } from "react-icons";

interface AccordionItemProps {
  label: string;
  labelIcon?: IconType;
  content?: ReactNode;
  value: string;
  actualValue: string;
  onClick: (value: string) => void;
}

export default AccordionItemProps;
