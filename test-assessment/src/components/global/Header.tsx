
import waracleLogo from '../../assets/waracle-logo.svg';
export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900 shadow-sm py-4" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex">
          <div className="w-64 flex-1">
            <a href="/">
              <img src={waracleLogo} className="logo" alt="Waracle logo" />
            </a>
            <span className="text-gray-400 text-sm">Cat upload assessment</span>
          </div>
          <div className="flex-1 justify-end">
            <a href="/upload" className='bg-emerald-800 ms-auto text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors'>
                Upload cat
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}