import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

const UserLogin = () => {
  return (
    <div className="cursor-pointer flex items-center">
      <DesktopMenu className="hidden md:inline-flex" />
      <MobileMenu className="md:hidden" />
    </div>
  );
};

export default UserLogin;
