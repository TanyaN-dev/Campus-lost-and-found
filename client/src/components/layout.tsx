import { Link, useLocation } from "wouter";
import { Search, PlusCircle, ShieldAlert, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/items", label: "Browse Items" },
    { href: "/report-lost", label: "Report Lost", primary: true },
    { href: "/report-found", label: "Report Found", primary: true },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 font-display font-bold text-xl text-primary hover:opacity-90 transition-opacity">
              <Search className="w-6 h-6 stroke-[2.5px]" />
              <span>Campus<span className="text-foreground">Find</span></span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === link.href ? "text-primary" : "text-muted-foreground",
                    link.primary && "bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 hover:text-white shadow-sm hover:shadow-md transition-all"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/admin">
              <a className="text-xs font-medium text-muted-foreground hover:text-foreground ml-4">
                Admin
              </a>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium py-2 transition-colors",
                    location === link.href ? "text-primary" : "text-muted-foreground",
                    link.primary && "text-primary font-semibold"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
             <Link href="/admin">
              <a 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground py-2"
              >
                Admin Dashboard
              </a>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-8 mt-12 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 Campus Lost & Found System</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact Campus Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
