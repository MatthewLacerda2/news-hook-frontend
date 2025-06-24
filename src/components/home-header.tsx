"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function HomeHeader({ token }: { token: string | undefined }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/api", label: "API" },
    { href: "/contact", label: "Contact" },
  ];

  const extraLinks = [
    { href: "/alert-requests", label: "Alert Requests" },
    { href: "/alert-events", label: "Alert Events" },
    { href: "/my-documents", label: "My Documents" },
  ];

  const linksToShow = token === undefined ? [...baseLinks, ...extraLinks] : baseLinks;

  const tabStyle = "text-white font-semibold text-lg hover:text-gray-300 transition-colors hover:bg-gray-800 px-2 py-1 rounded-md";
  const mobileLinkStyle = "block py-2 text-lg text-white font-semibold hover:bg-gray-800 rounded-md px-3 capitalize";

  return (
    <nav className="bg-gray-950 border-b border-white/10 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {linksToShow.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={tabStyle}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="sm:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-950 border-r-gray-800 text-white">
                <nav className="grid gap-y-4 pt-6">
                  {linksToShow.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={mobileLinkStyle}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
