import Alert from "@/components/shared/Alert/Alert";

export default function VerifyEmail() {
  return (
    <section>
      <div className="w-full">
        <Alert
          title="Nelze ověřit e-mail – chybí bezpečnostní token"
          color="danger"
          variant="faded"
        />
      </div>
    </section>
  );
}
