import { HTMLAttributes } from 'react';

import { mergeStyles } from '@/lib/utils/styles';

import { AccordionContextProvider } from './AccordionContext';
import accordionVariants from './accordionVariants';

type Props = HTMLAttributes<HTMLUListElement> & {};

export default function Accordion({
  children,
  className,
  ...restProps
}: Props) {
  return (
    <AccordionContextProvider localStorageName="admin-sidebar-accordion-state">
      <ul
        className={mergeStyles(className, accordionVariants({}))}
        {...restProps}
      >
        {children}
      </ul>
    </AccordionContextProvider>
  );
}
