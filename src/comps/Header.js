function Header() {
  return (
    <nav className="flex items-center justify-between">
      <div className="chatter-logo h-12 w-24 md:w-32 md:h-16">
        <img
          className="h-full w-full"
          src="/chatter/chatter-logos_transparent.png"
          alt="chatter-logo"
        />
      </div>
      <button
        type="button"
        className="text-sm font-medium px-4 py-2 bg-white rounded-md cursor-none"
      >
        Chat App
      </button>
    </nav>
  );
}

export default Header;
