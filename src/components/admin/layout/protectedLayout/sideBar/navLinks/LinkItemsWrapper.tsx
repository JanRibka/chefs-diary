import { ReactNode } from "react";

interface LinkItemsWrapperProps {
  children: ReactNode | ReactNode[];
}

const LinkItemsWrapper = (props: LinkItemsWrapperProps) => {
  return <ul>{props.children}</ul>;
};

export default LinkItemsWrapper;
