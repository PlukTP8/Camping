
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Tent, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'หน้าหลัก', path: '/' },
    { name: 'พื้นที่กางเต๊นท์', path: '/zones' },
    { name: 'การจอง', path: '/bookings' },
    { name: 'ข้อมูล', path: '/info' },
    { name: 'ติดต่อ', path: '/contact' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 px-4 lg:px-8',
        scrolled ? 'py-2 glass-panel' : 'py-4 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-primary font-display"
        >
          <Tent className="h-6 w-6" />
          <span className="text-xl font-semibold hidden sm:block">Camp Reservation</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                'animated-link text-sm font-medium transition-colors',
                router.pathname === link.path 
                  ? 'text-primary after:w-full' 
                  : 'text-foreground/80 hover:text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button 
            className="rounded-full hidden md:flex"
            onClick={() => router.push('/zones')}
          >
            จองเลย
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-50 transition-all duration-300 flex flex-col items-center justify-center gap-8',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={cn(
              'text-lg font-medium transition-colors animate-fade-in',
              router.pathname === link.path 
                ? 'text-primary' 
                : 'text-foreground/80 hover:text-foreground'
            )}
          >
            {link.name}
          </Link>
        ))}
        <Button 
          className="mt-4 rounded-full animate-fade-in"
          onClick={() => router.push('/zones')}
        >
          จองเลย
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
