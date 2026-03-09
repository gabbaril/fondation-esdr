import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-12 w-12 items-center justify-center">
            <img src="/fondation-esdr.png" alt="Fondation ESDR" className="h-full w-auto"/>
          </div>
          <span className="font-heading uppercase text-xl font-semibold tracking-wide text-foreground">Fondation ESDR</span>
        </Link>
        
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#mission" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Mission
          </Link>
          <Link href="#activites" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Activités
          </Link>
          <Link href="#galerie" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Galerie
          </Link>
        </nav>

        <Button asChild>
          <Link href="/faire-un-don">
            <Heart className="mr-2 h-4 w-4" />
            Faire un don
          </Link>
        </Button>
      </div>
    </header>
  )
}
