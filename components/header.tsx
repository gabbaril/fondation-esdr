import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <span className="font-serif text-xl font-bold text-primary-foreground">F</span>
          </div>
          <span className="font-serif text-xl font-semibold">Fondation École</span>
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#mission" className="text-sm font-medium transition-colors hover:text-primary">
            Mission
          </Link>
          <Link href="#activites" className="text-sm font-medium transition-colors hover:text-primary">
            Activités
          </Link>
          <Link href="#galerie" className="text-sm font-medium transition-colors hover:text-primary">
            Galerie
          </Link>
        </nav>

        <Button asChild>
          <Link href="/faire-un-don">Faire un don</Link>
        </Button>
      </div>
    </header>
  )
}
