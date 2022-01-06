function Header() {
  return (
    <header className="container mx-auto px-8 py-4">
      <nav className="flex items-center justify-between">
        <div className="chatter-logo h-16 w-32">
          <img
            className="h-full w-full"
            src="/chatter/chatter-logos_transparent.png"
            alt="chatter-logo"
          />
        </div>
        <button
          type="button"
          className="text-sm font-medium px-4 py-2 bg-white rounded-md"
        >
          ChatterBox
        </button>
      </nav>
    </header>
  );
}

export default Header;
