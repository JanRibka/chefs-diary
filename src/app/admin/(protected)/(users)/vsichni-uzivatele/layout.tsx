import PageRow from "@/components/admin/pageRow/PageRow";
import PageTitle from "@/components/admin/pageTitle/PageTitle";

type Props = { children: React.ReactNode };

export default function AllUsersLayout({ children }: Props) {
  return (
    <>
      <PageTitle>Všichni uživatelé</PageTitle>
      <PageRow>{children}</PageRow>
    </>
  );
}
