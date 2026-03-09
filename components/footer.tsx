import Link from 'next/link'
import { Heart, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-foreground text-background">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background/10 p-2">
                <img src="/fondation-esdr.png" alt="Fondation ESDR" className="h-full w-auto brightness-0 invert"/>
              </div>
              <span className="font-heading uppercase text-xl font-semibold tracking-wide">Fondation ESDR</span>
            </div>
            <p className="max-w-md text-background/70 leading-relaxed">
              La Fondation E.S.D.R. s'appuie sur une riche tradition d'entraide et de fierté 
              qui contribue à porter les jeunes vers de nouveaux sommets d'excellence.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-background">Navigation</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#mission" className="text-background/70 transition-colors hover:text-secondary">
                  Notre Mission
                </Link>
              </li>
              <li>
                <Link href="#activites" className="text-background/70 transition-colors hover:text-secondary">
                  Activités
                </Link>
              </li>
              <li>
                <Link href="#galerie" className="text-background/70 transition-colors hover:text-secondary">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/faire-un-don" className="inline-flex items-center gap-2 text-secondary font-medium transition-colors hover:text-secondary/80">
                  <Heart className="h-4 w-4" />
                  Faire un don
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-background">Contact</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <a href="mailto:info@fondation-esdr.org" className="transition-colors hover:text-secondary">
                  info@fondation-esdr.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary" />
                <a href="tel:+15551234567" className="transition-colors hover:text-secondary">
                  +1 555 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-background/10 pt-8 text-center text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} Fondation E.S.D.R. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
