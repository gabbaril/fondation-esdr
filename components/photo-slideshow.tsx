'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import type { Photo } from '@/lib/sanity'

interface PhotoSlideshowProps {
  photos: Photo[]
}

export function PhotoSlideshow({ photos }: PhotoSlideshowProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  if (photos.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-card p-8 text-center shadow-lg">
        <p className="text-muted-foreground leading-relaxed">
          La galerie photo sera bientôt remplie avec nos meilleurs moments. Revenez prochainement!
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {photos.map((photo) => (
            <CarouselItem key={photo._id} className="md:basis-4/5 lg:basis-3/4">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={photo.image.url}
                  alt={photo.alt || photo.title || 'Photo de galerie'}
                  className="aspect-video w-full object-cover"
                />
              </div>
              {photo.title && (
                <p className="mt-4 text-center text-lg font-medium text-foreground">
                  {photo.title}
                </p>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-12 bg-card border-border shadow-md hover:bg-muted" />
        <CarouselNext className="-right-4 md:-right-12 bg-card border-border shadow-md hover:bg-muted" />
      </Carousel>

      {/* Dots indicator */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'h-2.5 w-2.5 rounded-full transition-all duration-200',
              current === index
                ? 'bg-primary w-8'
                : 'bg-primary/30 hover:bg-primary/50'
            )}
            aria-label={`Aller à la photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
