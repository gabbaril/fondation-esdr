import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Construction } from 'lucide-react'

export const metadata = {
  title: 'Faire un don - Fondation École',
  description: 'Soutenez la Fondation École en faisant un don',
}

export default function DonationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <h1 className="mb-6 text-center font-serif text-4xl font-bold text-balance md:text-5xl">
                Faire un don
              </h1>
              <p className="mb-12 text-center text-lg text-muted-foreground leading-relaxed">
                Merci de votre intérêt à soutenir notre mission éducative
              </p>

              <Card className="border-2">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
                    <Construction className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">Page en construction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    Notre plateforme de dons sécurisée sera bientôt disponible. 
                    Nous mettons tout en œuvre pour vous offrir une expérience de don simple et sécurisée.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    En attendant, vous pouvez nous contacter directement à{' '}
                    <a href="mailto:info@fondation-ecole.org" className="font-medium text-primary hover:underline">
                      info@fondation-ecole.org
                    </a>
                    {' '}pour plus d'informations sur comment contribuer à notre mission.
                  </p>
                  <div className="mt-8 rounded-lg bg-muted p-6">
                    <p className="text-sm font-medium">Merci de votre patience et de votre soutien!</p>
                  </div>
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
