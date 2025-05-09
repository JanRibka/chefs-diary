import Image from "@/components/shared/image/Image";

type Props = {
  header: string;
  description: string;
};

const LayoutLoginInfoDetail = ({ header, description }: Props) => {
  return (
    <div className="relative flex flex-col w-full h-full z-2">
      <div className="flex w-full">
        <div className="w-full mx-5 md:mx-12">
          <div className="w-24 my-12 h-9 lg:mb-0">
            <a
              href={process.env.PUBLIC_URL}
              title={process.env.NEXT_PUBLIC_APP_NAME}
            >
              <Image
                src={"admin/logo-light.png"}
                alt={`Logo | ${process.env.NEXT_PUBLIC_APP_NAME}`}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="z-0 flex items-center h-full">
        <div className="mx-5 md:mx-12">
          <div className="mb-12">
            <h1 className="mb-6 text-white">{header}</h1>
            <em className="text-white">{description}</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutLoginInfoDetail;
