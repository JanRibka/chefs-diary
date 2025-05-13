import AccordionItem from './item/AccordionItem';

interface AccordionProps {
  children: React.ReactElement<typeof AccordionItem>[];
  actualValue: string;
  onClick: (value: string) => void;
}

export default AccordionProps;
