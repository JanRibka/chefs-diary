import LayoutLoginContent from "./content/LayoutLoginContent";
import LayoutLoginInfo from "./info/LayoutLoginInfo";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="h-full">
      <main className="flex items-center h-full">
        <div className="container h-full max-h-[65rem] flex">
          <div className="flex flex-col w-full min-h-full gap-0 lg:flex-row sm:py-4 md:py-5">
            <LayoutLoginInfo />
            <LayoutLoginContent>{children}</LayoutLoginContent>
          </div>
        </div>
      </main>
    </div>
  );
}
