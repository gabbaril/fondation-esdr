import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center">
                <img src="/fondation-esdr.png" alt="Cap2B" className="h-[100%]"/>
              </div>
              <span className="font-heading uppercase text-xl font-semibold">Fondation ESDR</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ensemble pour l'éducation des jeunes. Notre mission est de soutenir et développer 
              l'accès à une éducation de qualité pour tous.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#mission" className="text-muted-foreground transition-colors hover:text-foreground">
                  Notre Mission
                </Link>
              </li>
              <li>
                <Link href="#activites" className="text-muted-foreground transition-colors hover:text-foreground">
                  Activités
                </Link>
              </li>
              <li>
                <Link href="#galerie" className="text-muted-foreground transition-colors hover:text-foreground">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/faire-un-don" className="text-muted-foreground transition-colors hover:text-foreground">
                  Faire un don
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@fondation-ecole.org</li>
              <li>+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Fondation École. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
