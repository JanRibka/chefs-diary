import { HTMLAttributes } from 'react';

import { mergeStyles } from '@/lib/utils/styles';

type Props = HTMLAttributes<HTMLHeadingElement> & {};

export default function PageTitle({
  className,
  children,
  ...restProps
}: Props) {
  return (
    <h1
      className={mergeStyles(
        "px-[1.875rem] py-[0.9375rem] mb-[1.875rem] mt-0 mx-0 bg-white rounded-lg text-sm md:text-base xl:text-lg font-bold shadow-md",
        className
      )}
      {...restProps}
    >
      {children}
    </h1>
  );
}
