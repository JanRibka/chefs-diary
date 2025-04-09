import Image from "@/components/shared/image/Image";
import Typography from "@mui/material/Typography";

const LayoutLoginInfoDetail = () => {
  // TODO: Tady se bude na49tat dodatecne info, podle videa router. Je to n2kde na konci
  return (
    <div className="relative flex flex-col w-full h-full z-2">
      <div className="flex w-full">
        <div className="w-full mx-5 md:mx-12">
          <div className="my-12 lg:mb-0 w-fit">
            <a href={process.env.PUBLIC_URL} title={process.env.APP_NAME}>
              <Image
                src={"admin/logo-light.png"}
                alt={`Logo | ${process.env.APP_NAME}`}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="z-0 flex items-center h-full">
        <div className="mx-5 md:mx-12">
          <div className="mb-12">
            <Typography variant="h1" className="mb-6 text-white typography">
              Vítejte zpět!
            </Typography>
            {/* <h1 className="mb-6 text-white">Vítejte zpět!</h1> */}
            <Typography
              variant="subtitle1"
              className="italic tracking-wider text-white"
            >
              Získejte přístup k administraci webu Kuchařův deník
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutLoginInfoDetail;
