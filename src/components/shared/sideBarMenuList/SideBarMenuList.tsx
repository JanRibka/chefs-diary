import { HTMLAttributes } from 'react';

import { mergeStyles } from '@/lib/utils/styles';

import sideBarMenuListVariants from './sideBarMenuListVariants';

type Props = HTMLAttributes<HTMLUListElement> & {
  opened: boolean;
};

export default function SideBarMenuList({
  className,
  children,
  opened,
  ...restProps
}: Props) {
  return (
    <ul
      className={mergeStyles(className, sideBarMenuListVariants({ opened }))}
      {...restProps}
    >
      {children}
    </ul>
  );
}
