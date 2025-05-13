import { Link } from "react-router-dom";

import { RouteValue } from "../../../../../app/routes/appRoutes";

interface LinkItemProps {
  to: RouteValue;
  label: string;
}

const LinkItem = (props: LinkItemProps) => {
  return (
    <li>
      <Link to={props.to}>{props.label}</Link>
    </li>
  );
};

export default LinkItem;
