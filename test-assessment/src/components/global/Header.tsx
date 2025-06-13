import waracleLogo from '@/assets/waracle-logo.svg';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900 shadow-sm py-4" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left side: logo + title */}
          <div className="flex items-center">
            <a href="/">
              <img src={waracleLogo} className="h-8 w-auto" alt="Waracle logo" />
            </a>
            <span className="ml-3 text-gray-400 text-sm hidden md:inline-block">Cat upload assessment</span>
          </div>

          {/* Right side: the upload button */}
          <a
            href="/upload"
            className="ml-auto bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors"
          >
            Upload cat
          </a>
        </div>
      </div>
    </header>
  );
}
