import Alert from "@/components/shared/alert/Alert";

export default function PasswordResetPage() {
  //TODO: Mel by tu byt cudl na zpet na prihlaseni a taky vsude, kde je jenom alert
  return (
    <section>
      <div className="w-full">
        <Alert
          title="Nelze obnovit heslo – Chybí bezpečnostní token"
          color="danger"
          variant="faded"
        />
      </div>
    </section>
  );
}
