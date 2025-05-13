import { AiFillCaretRight } from "react-icons/ai";
import { useSelector } from "react-redux";

import { AppHoverCard } from "@repo/ui/styledComponents";

import { selectSideBar } from "../../../../../../app/store/sideBar/sideBarSlice";
import { accordionItemButtonVariants } from "./accordionItemButtonVariants";
import { accordionItemContentVariants } from "./accordionItemContentVariants";
import { accordionItemIconLabelWrapperVariants } from "./accordionItemIconLabelWrapperVariants";
import { accordionItemIconVariants } from "./accordionItemIconVariants";
import { accordionItemLabelIconVariants } from "./accordionItemLabelIconVariants";
import { accordionItemLabelVariants } from "./accordionItemLabelVariants";
import AccordionItemProps from "./AccordionItemProps";

const AccordionItem = (props: AccordionItemProps) => {
  // Store
  const sideBar = useSelector(selectSideBar);

  // Constants
  const isOpened = props.value === props.actualValue;

  // Other
  const handleOnClick = () => {
    props.onClick(props.value);
  };

  return (
    <li className="px-4 my-1">
      <AppHoverCard
        side="right"
        disable={sideBar.open}
        trigger={
          <button
            onClick={handleOnClick}
            className={accordionItemButtonVariants({ opened: isOpened })}
          >
            <div
              className={accordionItemIconLabelWrapperVariants({
                sideBarOpened: sideBar.open,
              })}
            >
              {props.labelIcon && (
                <props.labelIcon
                  className={accordionItemLabelIconVariants({
                    sideBarOpened: sideBar.open,
                  })}
                />
              )}
              <p
                className={accordionItemLabelVariants({
                  sideBarOpened: sideBar.open,
                })}
              >
                {props.label}
              </p>
            </div>

            {props.content && (
              <AiFillCaretRight
                className={accordionItemIconVariants({
                  opened: isOpened,
                  sideBarOpened: sideBar.open,
                })}
              />
            )}
          </button>
        }
        content={props.content as JSX.Element}
      />

      {props.content && (
        <div
          className={accordionItemContentVariants({
            opened: isOpened,
            sideBarOpened: sideBar.open,
          })}
        >
          {props.content}
        </div>
      )}
    </li>
  );
};

export default AccordionItem;
