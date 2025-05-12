import UserLogin from "./userLogin/UserLogin";

const RightMenu = () => {
  return (
    <div className="flex items-center h-full space-x-4 [&>div:not(:last-of-type)]:mr-3">
      <UserLogin />
    </div>
  );
};

export default RightMenu;
