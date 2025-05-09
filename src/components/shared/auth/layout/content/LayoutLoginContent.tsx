type Props = {
  children?: React.ReactNode;
};

function LayoutLoginContent({ children }: Readonly<Props>) {
  return (
    <section className="w-full lg:lg:w-2/5">
      <div className="h-full py-10 bg-dialogBackground rounded-b-md lg:rounded-bl-none lg:rounded-tr-md">
        <div className="flex items-center h-full mx-3">
          <div className="w-full px-2">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default LayoutLoginContent;
