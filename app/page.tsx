import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { client } from '@/lib/sanity'
import type { Post, HomePage } from '@/lib/sanity'
import { Heart, Target, Users, Handshake, Shield, Eye, ArrowRight } from 'lucide-react'

async function getHomePageData() {
  try {
    const data = await client.fetch<HomePage>(
      `*[_type == "homePage"][0]{
        _id,
        heroTitle,
        heroSubtitle,
        missionTitle,
        missionDescription,
        values[]{
          _key,
          title,
          description
        },
        gallery[]{
          _key,
          "url": asset->url,
          alt
        }
      }`
    )
    return data
  } catch (error) {
    console.log('[v0] Error fetching home page data:', error)
    return null
  }
}

async function getRecentPosts() {
  try {
    const posts = await client.fetch<Post[]>(
      `*[_type == "post"] | order(publishedAt desc)[0...3]{
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        "mainImage": mainImage{
          "url": asset->url,
          alt
        }
      }`
    )
    return posts
  } catch (error) {
    console.log('[v0] Error fetching posts:', error)
    return []
  }
}

export default async function Page() {
  const homeData = await getHomePageData()
  const recentPosts = await getRecentPosts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="
            relative overflow-hidden py-32 md:py-48
            bg-[url('/images/fondation-esdr-hero.jpg')]
            bg-cover bg-center bg-no-repeat
          "
        >
          {/* Overlay with brand color tint */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-primary/70" />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
          </div>

          <div className="relative container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center text-primary-foreground">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                Fondation E.S.D.R. - Ecole Secondaire du Rocher
              </div>
              
              <h1 className="mb-6 font-heading uppercase text-5xl font-bold leading-none tracking-tight md:text-7xl">
                {homeData?.heroTitle || "Ensemble pour l'avenir de nos jeunes"}
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/90 leading-relaxed md:text-xl">
                {homeData?.heroSubtitle ||
                  "Soutenir financièrement des projets structurants qui auront un impact positif sur la vie des élèves et de toute la communauté."}
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="min-w-[200px]">
                  <Link href="/faire-un-don">
                    Faire un don
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="min-w-[200px] border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="#mission">Découvrir notre mission</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Notre raison d'être</span>
              <h2 className="mb-6 font-heading uppercase text-4xl font-bold text-balance text-foreground md:text-5xl">
                {homeData?.missionTitle || 'Notre Mission'}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed md:text-xl">
                {homeData?.missionDescription || "La Fondation E.S.D.R. est un organisme de bienfaisance qui veut venir en aide à l'école secondaire du Rocher. Sa mission est de soutenir financièrement des projets structurants qui auront un impact positif sur la vie des élèves, mais également sur celle de toute la communauté."}
              </p>
            </div>

            {/* Values Grid */}
            <div className="mt-16">
              <h3 className="mb-10 text-center font-heading uppercase text-2xl font-bold text-foreground md:text-3xl">Nos Valeurs</h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {homeData?.values && homeData.values.length > 0 ? (
                  homeData.values.map((value, index) => {
                    const icons = [Shield, Eye, Handshake, Users, Heart, Target]
                    const Icon = icons[index % icons.length]
                    return (
                      <Card key={value._key} className="group border-0 bg-card shadow-lg shadow-foreground/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <CardHeader className="pb-2">
                          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            <Icon className="h-7 w-7" />
                          </div>
                          <CardTitle className="text-xl">{value.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base leading-relaxed">
                            {value.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    )
                  })
                ) : (
                  <>
                    <Card className="group border-0 bg-card shadow-lg shadow-foreground/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Shield className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-xl">Intégrité</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          Nous agissons avec honnêteté et éthique dans toutes nos actions et décisions.
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card className="group border-0 bg-card shadow-lg shadow-foreground/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Eye className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-xl">Transparence</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          Nous communiquons ouvertement sur nos activités, nos finances et nos résultats.
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card className="group border-0 bg-card shadow-lg shadow-foreground/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Handshake className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-xl">Collaboration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          Nous travaillons ensemble avec tous les acteurs pour atteindre nos objectifs communs.
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card className="group border-0 bg-card shadow-lg shadow-foreground/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Users className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-xl">Engagement communautaire</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          Nous impliquons activement la communauté dans nos projets et initiatives.
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card className="group border-0 bg-card shadow-lg shadow-foreground/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Heart className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-xl">Respect</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          Nous traitons chaque individu avec dignité et considération.
                        </CardDescription>
                      </CardContent>
                    </Card>

                    <Card className="group border-0 bg-card shadow-lg shadow-foreground/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Target className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-xl">Inclusion</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          Nous accueillons et valorisons la diversité sous toutes ses formes.
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activities Section */}
        <section id="activites" className="bg-muted py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Actualités</span>
              <h2 className="mb-4 font-heading uppercase text-4xl font-bold text-balance text-foreground md:text-5xl">
                Nos Activités Récentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Découvrez les dernières initiatives et événements de notre fondation
              </p>
            </div>

            {recentPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <Card key={post._id} className="group overflow-hidden border-0 bg-card shadow-lg shadow-foreground/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {post.mainImage?.url && (
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={post.mainImage.url}
                          alt={post.mainImage.alt || post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
                      <CardDescription className="font-medium text-primary">
                        {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    </CardHeader>
                    {post.excerpt && (
                      <CardContent>
                        <p className="line-clamp-3 text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-lg rounded-2xl bg-card p-8 text-center shadow-lg">
                <p className="text-muted-foreground leading-relaxed">
                  Les activités récentes seront bientôt disponibles. Revenez prochainement pour découvrir nos dernières initiatives.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Donation CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-primary p-10 text-center text-primary-foreground md:p-16">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />
              
              <div className="relative">
                <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-secondary">Faites la différence</span>
                <h2 className="mb-6 font-heading uppercase text-4xl font-bold text-balance md:text-5xl">
                  Votre soutien fait la différence
                </h2>
                <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
                  Chaque don contribue directement à améliorer l'éducation et l'avenir de nos jeunes. 
                  Ensemble, nous pouvons créer un impact durable sur notre communauté.
                </p>
                <Button asChild size="lg" variant="secondary" className="text-base">
                  <Link href="/faire-un-don">
                    Contribuer maintenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galerie" className="bg-muted py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-14 text-center">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">En images</span>
              <h2 className="mb-4 font-heading uppercase text-4xl font-bold text-balance text-foreground md:text-5xl">
                Galerie Photo
              </h2>
              <p className="text-lg text-muted-foreground">
                Découvrez en images la vie de notre fondation
              </p>
            </div>

            {homeData?.gallery && homeData.gallery.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {homeData.gallery.map((image) => (
                  <div key={image._key} className="group overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={image.url}
                      alt={image.alt || 'Photo de galerie'}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-lg rounded-2xl bg-card p-8 text-center shadow-lg">
                <p className="text-muted-foreground leading-relaxed">
                  La galerie photo sera bientôt remplie avec nos meilleurs moments. Revenez prochainement!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
