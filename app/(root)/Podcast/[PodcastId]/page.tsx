"use client"

import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const PodcastDetails = ({params :{PodcastId} }:{params:{PodcastId:Id<'podcasts'>}}) => {
  const {user}=useUser();
  
  const podcast=useQuery(api.podcasts.getPodcastById,{PodcastId})
  
  const  similarPodcast= useQuery(api.podcasts.getPodcastByVoiceType,{PodcastId})
  
  const isOwner=user?.id===podcast?.authorId;

  if(!similarPodcast || !podcast) return <LoaderSpinner/>
 
  return (
    <section className='flex flex-col w-full'>
      <header className='mt-9 flex items-center justify-between'>
        <h1 className='text-20 font-bold text-white-1'>
          Currently Playing

        </h1>
        <figure className='flex gap-3 '>
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className='text-16 font-bold text-white-1'>
            {podcast?.views}

          </h2>

        </figure>

      </header>

      <PodcastDetailPlayer
      isOwner={isOwner}
      podcastId={podcast._id!}
      {...podcast}
      
      />


      <p className='text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center'> 
         {podcast?.podcastDescription} </p>
        
        <div className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-18 text-white-1 font-bold'> Transcription</h1>
            <p className='text-white-2 text-16 font-medium'>{podcast?.voicePrompt}</p>


          </div>
          {podcast?.imagePrompt && (
          <div className='flex flex-col gap-4'>
            <h1 className='text-18 text-white-1 font-bold'> Thumbnail Prompt</h1>
            <p className='text-white-2 text-16 font-medium'>{podcast?.imagePrompt}</p>


          </div>
          )}
        </div>

      <section className='mt-8 flex flex-col gap-5'>
        <h1 className='text-20 font-bold text-white-1'>
          Similar Podcasts
        </h1>

        {similarPodcast && similarPodcast.length > 0 ? (
          <div className='podcast_grid'>
            {similarPodcast?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
              <PodcastCard
                key={_id}
                imgUrl={imageUrl as string}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}

              />
            ))}
          </div>
        ) : (
          <>
            <EmptyState
              title="No similar podcasts found"
              buttonLink="/discover"
              buttonText="Discover more podcasts"
            />
          </>
        )}

      </section>

    </section>
  )
}

export default PodcastDetails