import { FaRegUser } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

import Accordion from './accordion/Accordion';
import AccordionItem from './accordion/item/AccordionItem';
import NavLinksUser from './navLinks/user/NavLinksUser';

const SideBar = () => {
  // Store
  const sideBar = useSelector(selectSideBar);
  const { setActualValue } = useSideBarSlice();

  // Other
  const handleOnClick = (value: string) => {
    const selectedValue = value === sideBar.actualValue ? "" : value;

    setActualValue(selectedValue);
  };

  // Styles

  return (
    <aside className={sideBarVariants({ opened: sideBar.open })}>
      <div className="my-4 flex w-full h-full">
        <Accordion actualValue={sideBar.actualValue} onClick={handleOnClick}>
          <AccordionItem
            actualValue={sideBar.actualValue}
            label="Dashboard"
            labelIcon={MdDashboard}
            onClick={handleOnClick}
            value="dashboard"
          />
          <AccordionItem
            actualValue={sideBar.actualValue}
            content={<NavLinksUser />}
            label="Uživatel"
            labelIcon={FaRegUser}
            onClick={handleOnClick}
            value="user"
          />
        </Accordion>
      </div>
    </aside>
  );
};

export default SideBar;
