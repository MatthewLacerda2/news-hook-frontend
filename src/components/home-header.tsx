import Link from 'next/link'
import GoogleLogin from './google-login'
export default function HomeHeader() {
  return (
    <nav className="bg-gray-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex flex-1 justify-center space-x-18">
            <Link href="/pricing" className="text-white font-semibold text-lg hover:text-gray-300 transition-colors">
              Pricing
            </Link>
            <Link href="/api" className="text-white font-semibold text-lg hover:text-gray-300 transition-colors">
              API
            </Link>
            <Link href="/contact-us" className="text-white font-semibold text-lg hover:text-gray-300 transition-colors">
              Contact Us
            </Link>
            <GoogleLogin />
          </div>
        </div>
      </div>
    </nav>
  )
}