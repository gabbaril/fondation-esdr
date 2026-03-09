import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Construction, Heart, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Faire un don - Fondation E.S.D.R.',
  description: 'Soutenez la Fondation E.S.D.R. en faisant un don',
}

export default function DonationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 md:py-28">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
          </div>
          
          <div className="container relative mx-auto px-4 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-foreground/10">
              <Heart className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="mb-6 font-heading uppercase text-5xl font-bold text-balance text-primary-foreground md:text-6xl">
              Faire un don
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90 leading-relaxed md:text-xl">
              Votre générosité fait la différence dans la vie de nos élèves et de notre communauté
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <Card className="border-0 shadow-xl shadow-foreground/10">
                <CardHeader className="pb-4 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/20">
                    <Construction className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">Page en construction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    Notre plateforme de dons sécurisée sera bientôt disponible. 
                    Nous mettons tout en oeuvre pour vous offrir une expérience de don simple et sécurisée.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    En attendant, vous pouvez nous contacter directement pour plus d'informations sur comment contribuer à notre mission.
                  </p>
                  <div className="rounded-xl bg-muted p-6">
                    <p className="mb-4 text-sm font-semibold text-foreground">Contactez-nous</p>
                    <Button asChild variant="outline" className="gap-2">
                      <a href="mailto:info@fondation-esdr.org">
                        <Mail className="h-4 w-4" />
                        info@fondation-esdr.org
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-primary font-medium">Merci de votre patience et de votre soutien!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
