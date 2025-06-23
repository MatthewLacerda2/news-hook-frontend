"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function HomeHeader({ token }: { token: string | undefined }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const links = ["Pricing", "API", "Contact"];
  const extraLinks: string[] = ["Alert-requests", "Alert-events", "My-documents"];

  const allLinks = token ? [...links, ...extraLinks] : links;

  const tabStyle = "text-white font-semibold text-lg hover:text-gray-300 transition-colors hover:bg-gray-800 px-2 py-1 rounded-md";
  const mobileLinkStyle = "block py-2 text-lg text-white font-semibold hover:bg-gray-800 rounded-md px-3";

  return (
    <nav className="bg-gray-950 border-b border-white/10 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-950 border-r-gray-800 text-white">
                <nav className="grid gap-y-4 pt-6">
                  {allLinks.map((link) => (
                    <Link
                      key={link}
                      href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                      className={mobileLinkStyle}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {allLinks.map((link) => (
              <Link key={link} href={`/${link.toLowerCase().replace(/ /g, '-')}`} className={tabStyle}>
                {link.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
