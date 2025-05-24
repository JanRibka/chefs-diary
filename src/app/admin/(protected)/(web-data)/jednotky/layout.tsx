import PageContent from "@/components/admin/pageContent/PageContent";
import PageTitle from "@/components/admin/pageTitle/PageTitle";

type Props = { children: React.ReactNode };

export default function AllUsersLayout({ children }: Props) {
  return (
    <div className="min-h-full flex flex-col">
      <PageTitle>Jednotky</PageTitle>
      <PageContent className="flex-1">{children}</PageContent>
    </div>
  );
}
