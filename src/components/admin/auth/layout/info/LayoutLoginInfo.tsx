import login from "../image/login-bg.jpg";
import LayoutLoginInfoDetail from "./LayoutLoginInfoDetail";

const LayoutLoginInfo = () => {
  return (
    <section className="w-full h-full lg:w-3/5">
      <div className="relative flex items-center w-full h-full overflow-hidden rounded-t-md lg:rounded-e-none lg:rounded-s-md min-h-60">
        <div
          className="absolute top-0 left-0 z-0 w-full h-full ease-in delay-300 bg-center bg-no-repeat bg-cover transition-background-image"
          style={{ backgroundImage: `url(${login})` }}
        />
        <div className="absolute top-0 left-0 w-full h-full opacity-50 z-1 bg-primary" />
        <LayoutLoginInfoDetail />
      </div>
    </section>
  );
};

export default LayoutLoginInfo;
