import { AppRoutes } from "../../../../../../app/routes/appRoutes";
import LinkItem from "../LinkItem";
import LinkItemsWrapper from "../LinkItemsWrapper";

const NavLinksUser = () => {
  return (
    <LinkItemsWrapper>
      <LinkItem to={AppRoutes.Users} label="Uživatelé" />
    </LinkItemsWrapper>
  );
};

export default NavLinksUser;
