// 'use client'

// import React from 'react'
// import Image from 'next/image'

// import { podcastData } from '@/constants'
// import { useUser } from '@clerk/nextjs'
// import ProfileCard from '@/components/ProfileCard'
// import { api } from '@/convex/_generated/api'
// import { useQuery } from 'convex/react'
// import EmptyState from '@/components/EmptyState'
// import PodcastCard from '@/components/PodcastCard'


// const Profile = ({params:{profileId}}:{params:{profileId:string}}) => {

//   // const user=useUser();
//   const user = useQuery(api.user.getUserById, {
//     clerkId: profileId,
//   });
//   const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
//     authorId: profileId
//   });
//   return (
	
//     <section>

//       <header className='mt-9 flex items-center justify-between'>
//         <h1 className='text-20 font-bold text-white-1'>
//           Podcaster Profile

//         </h1>
//         <figure className='flex gap-3 '>
//           <Image
//             src="/icons/headphone.svg"
//             width={24}
//             height={24}
//             alt="headphone"
//           />
//           {/* <h2 className='text-16 font-bold text-white-1'>
//             {podcast?.views}

//           </h2> */}

//         </figure>

//       </header>


//       <ProfileCard
//         podcastData={podcastsData!}
//         imageUrl={user?.imageUrl!}
//         userFirstName={user?.name!}
//       />

// <section className='mt-8 flex flex-col gap-5'>
//         <h1 className='text-20 font-bold text-white-1'>
//           Similar Podcasts
//         </h1>

//         {podcastsData && podcastsData.podcasts.length > 0 ? (
//           <div className="podcast_grid">
//             {podcastsData?.podcasts
//               ?.slice(0, 4)
//               .map((podcast) => (
//                 <PodcastCard
//                   key={podcast._id}
//                   imgUrl={podcast.imageUrl!}
//                   title={podcast.podcastTitle!}
//                   description={podcast.podcastDescription}
//                   podcastId={podcast._id}
//                 />
//               ))}
//           </div>
//         ) : (
//           <>
//             <EmptyState
//             title="You have not created any podcasts yet"
//             buttonLink="/create-podcast"
//             buttonText="Create Podcast"
//           />
//           </>
//         )}

//       </section>

//     </section>
//   )
// }

// export default Profile


"use client";

import { useQuery } from "convex/react";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import ProfileCard from "@/components/ProfileCard";
import { api } from "@/convex/_generated/api";

const ProfilePage = ({
  params,
}: {
  params: {
    profileId: string;
  };
}) => {
  const user = useQuery(api.user.getUserById, {
    clerkId: params.profileId,
  });
  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: params.profileId,
  });

  if (!user || !podcastsData) return <LoaderSpinner />;

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
        <ProfileCard
          podcastData={podcastsData!}
          imageUrl={user?.imageUrl!}
          userFirstName={user?.name!}
        />
      </div>
      <section className="mt-9 flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {podcastsData && podcastsData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData?.podcasts
              ?.slice(0, 4)
              .map((podcast) => (
                <PodcastCard
                  key={podcast._id}
                  imgUrl={podcast.imageUrl!}
                  title={podcast.podcastTitle!}
                  description={podcast.podcastDescription}
                  podcastId={podcast._id}
                />
              ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any podcasts yet"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}
      </section>
    </section>
  );
};

export default ProfilePage;