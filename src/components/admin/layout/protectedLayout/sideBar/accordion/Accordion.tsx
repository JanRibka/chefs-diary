import AccordionProps from './AccordionProps';

const Accordion = (props: AccordionProps) => {
  return <ul className="w-full">{props.children}</ul>;
};

export default Accordion;
