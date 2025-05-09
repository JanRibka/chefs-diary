import Spinner from "@/components/shared/spinner/Spinner";

export default function Loading() {
  return (
    <section>
      <div className="w-full">
        <div className="w-full flex content-center justify-center">
          <Spinner
            aria-label="Loading..."
            color="primary"
            classNames={{
              circle1: "w-28 h-28",
              circle2: "w-28 h-28",
              wrapper: "w-28 h-28",
            }}
          />
        </div>
      </div>
    </section>
  );
}
