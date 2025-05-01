import Card from "@/components/shared/card/Card";
import CardBody from "@/components/shared/cardBody/CardBody";

import LayoutLoginContent from "./content/LayoutLoginContent";
import LayoutLoginInfo from "./info/LayoutLoginInfo";

type Props = {
  children: React.ReactNode;
  header: string;
  description: string;
};
// TODO: D8t do app
export default function AuthLayout({ children, header, description }: Props) {
  return (
    <main className="h-full">
      <div className="flex items-center justify-center h-full">
        <div className="container h-full max-h-[65rem] flex">
          <Card isBlurred className="w-full bg-dialogBackground" shadow="lg">
            <CardBody className="flex flex-col w-full min-h-full gap-0 p-0 lg:flex-row">
              <LayoutLoginInfo header={header} description={description} />
              <LayoutLoginContent>{children}</LayoutLoginContent>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
