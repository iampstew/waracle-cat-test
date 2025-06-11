
import waracleLogo from '../../assets/waracle-logo.svg';
export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900 shadow-sm py-4">
      <div className="container mx-auto px-4">
        <a href="https://www.waracle.com" target="_blank">
          <img src={waracleLogo} className="logo" alt="Waracle logo" />
        </a>
        <span className="text-gray-400 text-sm">Cat upload assessment</span>
        <div className="flex justify-end">
            <button className='bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors'>
                Upload cat
            </button>
        </div>
      </div>
    </header>
  )
}