import LayoutLoginInfoDetail from "./LayoutLoginInfoDetail";

type Props = {
  header: string;
  description: string;
};

const LayoutLoginInfo = ({ header, description }: Props) => {
  const loginImage = `${process.env.NEXT_PUBLIC_IMAGE_KIT_LINK}/admin/auth/login-bg.jpg`;

  return (
    <section className="w-full h-full lg:w-3/5">
      <div className="relative flex items-center w-full h-full overflow-hidden rounded-t-md lg:rounded-e-none lg:rounded-s-md min-h-60">
        <div
          className="absolute top-0 left-0 z-0 w-full h-full ease-in delay-300 bg-center bg-no-repeat bg-cover transition-background-image"
          style={{ backgroundImage: `url(${loginImage})` }}
        />
        <div className="absolute top-0 left-0 w-full h-full opacity-50 z-1 bg-primary" />
        <LayoutLoginInfoDetail header={header} description={description} />
      </div>
    </section>
  );
};

export default LayoutLoginInfo;
