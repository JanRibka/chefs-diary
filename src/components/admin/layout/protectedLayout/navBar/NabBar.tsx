import UpperBar from './upperBar/UpperBar';

export default function NavBar() {
  return (
    <header
      suppressHydrationWarning
      className="shadow-md"
      role="banner"
      aria-label="Horní panel"
    >
      <UpperBar />
    </header>
  );
}
