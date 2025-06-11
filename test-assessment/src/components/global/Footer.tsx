export default function Header() {
  return (
    <footer className="border-t border-gray-950 py-4" role="contentinfo">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Paul Stewart - Front End Developer
        </div>
    </footer>
  )
}