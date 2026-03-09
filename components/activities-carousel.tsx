'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ExternalLink } from 'lucide-react'
import type { Activity } from '@/lib/sanity'

interface ActivitiesCarouselProps {
  activities: Activity[]
}

export function ActivitiesCarousel({ activities }: ActivitiesCarouselProps) {
  if (activities.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-card p-8 text-center shadow-lg">
        <p className="text-muted-foreground leading-relaxed">
          Les activités récentes seront bientôt disponibles. Revenez prochainement pour découvrir nos dernières initiatives.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-12">
      <Carousel
        opts={{
          align: 'start',
          loop: activities.length > 3,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {activities.map((activity) => (
            <CarouselItem key={activity._id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="group h-full overflow-hidden border-0 bg-card shadow-lg shadow-foreground/5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {activity.photo?.url && (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={activity.photo.url}
                      alt={activity.photo.alt || activity.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-2 text-xl">{activity.title}</CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {new Date(activity.publishedAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="line-clamp-3 text-muted-foreground leading-relaxed">
                    {activity.excerpt}
                  </p>
                  {activity.link && (
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      En savoir plus
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 bg-card border-border shadow-md hover:bg-muted" />
        <CarouselNext className="-right-4 bg-card border-border shadow-md hover:bg-muted" />
      </Carousel>
    </div>
  )
}
