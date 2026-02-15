import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { client } from '@/lib/sanity'
import type { Post, HomePage } from '@/lib/sanity'
import { Heart, Target, Users } from 'lucide-react'

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
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-balance md:text-6xl">
                {homeData?.heroTitle || 'Ensemble pour l\'éducation des jeunes'}
              </h1>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl">
                {homeData?.heroSubtitle || 'Soutenez notre mission et contribuez à offrir un avenir meilleur aux enfants de notre communauté.'}
              </p>
              <Button asChild size="lg" className="text-base">
                <Link href="/faire-un-don">Faire un don maintenant</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section id="mission" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
                {homeData?.missionTitle || 'Notre Mission et Valeurs'}
              </h2>
              <p className="mb-12 text-lg text-muted-foreground leading-relaxed">
                {homeData?.missionDescription || 'La Fondation École est dédiée à améliorer l\'accès et la qualité de l\'éducation. Nous croyons que chaque enfant mérite les meilleures opportunités pour apprendre et grandir.'}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {homeData?.values && homeData.values.length > 0 ? (
                homeData.values.map((value) => (
                  <Card key={value._key} className="border-2">
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <>
                  <Card className="border-2">
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        Nous nous engageons pleinement auprès de chaque élève et de sa famille pour assurer leur réussite éducative.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Excellence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        Nous visons l'excellence dans tous nos programmes et initiatives éducatives.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="border-2">
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Communauté</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        Nous croyons au pouvoir de la communauté pour créer un environnement d'apprentissage enrichissant.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Recent Activities Section */}
        <section id="activites" className="bg-muted/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
                Nos Activités Récentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Découvrez les dernières initiatives et événements de notre fondation
              </p>
            </div>

            {recentPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <Card key={post._id} className="overflow-hidden">
                    {post.mainImage?.url && (
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={post.mainImage.url}
                          alt={post.mainImage.alt || post.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription>
                        {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    </CardHeader>
                    {post.excerpt && (
                      <CardContent>
                        <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-md text-center">
                <p className="text-muted-foreground">
                  Les activités récentes seront bientôt disponibles. Revenez prochainement pour découvrir nos dernières initiatives.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Donation CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center text-primary-foreground md:p-12">
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
                Votre soutien fait la différence
              </h2>
              <p className="mb-8 text-lg leading-relaxed opacity-90">
                Chaque don contribue directement à améliorer l'éducation et l'avenir de nos jeunes. 
                Ensemble, nous pouvons créer un impact durable.
              </p>
              <Button asChild size="lg" variant="secondary" className="text-base">
                <Link href="/faire-un-don">Contribuer maintenant</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galerie" className="bg-muted/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl font-bold text-balance md:text-4xl">
                Galerie Photo
              </h2>
              <p className="text-lg text-muted-foreground">
                Découvrez en images la vie de notre fondation
              </p>
            </div>

            {homeData?.gallery && homeData.gallery.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {homeData.gallery.map((image) => (
                  <div key={image._key} className="overflow-hidden rounded-lg">
                    <img
                      src={image.url}
                      alt={image.alt || 'Photo de galerie'}
                      className="aspect-square w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-md text-center">
                <p className="text-muted-foreground">
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
