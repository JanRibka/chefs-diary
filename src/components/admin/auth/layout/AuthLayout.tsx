import CardBody from "@/components/shared/card-body/CardBody";
import Card from "@/components/shared/card/Card";

import LayoutLoginContent from "./content/LayoutLoginContent";
import LayoutLoginInfo from "./info/LayoutLoginInfo";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="h-full">
      <div className="flex items-center justify-center h-full">
        <div className="container h-full max-h-[65rem] flex">
          <Card isBlurred className="w-full bg-dialogBackground" shadow="lg">
            <CardBody className="flex flex-col w-full min-h-full gap-0 p-0 lg:flex-row">
              <LayoutLoginInfo />
              <LayoutLoginContent>{children}</LayoutLoginContent>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
