import Spinner from "@/components/shared/spinner/Spinner";

export default function Loading() {
  return (
    <section>
      <div className="w-full">
        <Spinner />
      </div>
    </section>
  );
}
