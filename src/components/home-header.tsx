import Link from 'next/link';

export default function HomeHeader({ token }: { token: string | undefined }) {

  const extraLinks: string[] = ["Alert-requests", "Alert-events", "My-documents"];

  const tabStyle = "text-white font-semibold text-lg hover:text-gray-300 transition-colors hover:bg-gray-800 px-2 py-1";

  return (
    <nav className="bg-gray-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex flex-1 justify-center space-x-18">
            <Link href="/pricing" className={tabStyle}>
              Pricing
            </Link>
            <Link href="/api" className={tabStyle}>
              API
            </Link>
            <Link href="/contact" className={tabStyle}>
              Contact
            </Link>
            { token === undefined && extraLinks.map((link) => (
              <Link key={link} href={`/${link.toLowerCase}`} className={tabStyle}>
                {link.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}