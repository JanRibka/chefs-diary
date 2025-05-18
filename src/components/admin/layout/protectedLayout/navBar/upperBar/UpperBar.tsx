import LeftMenu from "./leftMenu/LeftMenu";
import RightMenu from "./rightMenu/RightMenu";

export default function UpperBar() {
  return (
    <div className="h-16 2xl:h-20 flex items-center justify-center px-6 md:px-9 transition-all duration-200 ease-linear">
      <div className="h-full w-full flex items-center flex-row justify-between">
        <LeftMenu />
        <RightMenu />
      </div>
    </div>
  );
}
