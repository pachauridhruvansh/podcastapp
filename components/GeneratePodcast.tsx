// // import React from 'react'
// "use client"
import { GeneratePodcastProps } from '@/public'
// // import { Label } from './ui/label'
// // import { Textarea } from './ui/textarea'
// // import { Button } from './ui/button'
// // import { useState } from 'react'
// // import { Loader } from "lucide-react"
// // import { useAction } from 'convex/react'
// // import { api } from '@/convex/_generated/api'
// // import { v4 as uuidv4 } from 'uuid'

// // import { GeneratePodcastProps } from '@/types'
// import React, { useState } from 'react'
// import { Label } from './ui/label'
// import { Textarea } from './ui/textarea'
// import { Button } from './ui/button'
// import { Loader } from 'lucide-react'
// import { useAction, useMutation } from 'convex/react'
// import { api } from '@/convex/_generated/api'
// import { v4 as uuidv4 } from 'uuid';
// import { toast, useToast } from "@/components/ui/use-toast"

// import { useUploadFiles } from '@xixixao/uploadstuff/react';
// // import { Toast } from '@radix-ui/react-toast'


// const useGeneratePodcast=({ setAudio,voiceType,voicePrompt,setAudioStorageId}:GeneratePodcastProps)=>{
//   // logic for podcast generation

//   const [isGenerating, setIsGenerating] = useState(false);
//   const generateUploadUrl = useMutation(api.files.generateUploadUrl);
//   const { startUpload } = useUploadFiles(generateUploadUrl)
//   const getPodcastAudio=useAction(api.openai.generateAudioAction)
//   const getAudioUrl=useMutation(api.podcasts.getUrl);

//    const generatePodcast= async () => {
//     setIsGenerating(true);
//     setAudio('');

//     if(!voicePrompt){
//       // show toast message
//       toast({
//         title: "Please provide a voice type to generate the podcast",
//         description: "Friday, February 10, 2023 at 5:57 PM",
//       })

//       return setIsGenerating(false);
//     }

//     try {
//       const response=await getPodcastAudio({
//         voice:voiceType,
//         input:voicePrompt
//       })

//       const blob = new Blob([response], { type: 'audio/mpeg' });
//       const fileName = `podcast-${uuidv4()}.mp3`;
//       const file = new File([blob], fileName, { type: 'audio/mpeg' });

//       const uploaded = await startUpload([file]);
//       const storageId = (uploaded[0].response as any).storageId;

//       setAudioStorageId(storageId);

//       const audioUrl= await getAudioUrl({storageId});
//       setAudio(audioUrl!);
//       toast({
//         title: "Podcast generated successfully",
//       })

//       setIsGenerating(false);
      
      
//     } catch (error) {
//       console.log("can't generate podcast",error)
//       toast({
//         title: "Error creating a podcast",
//         variant: 'destructive',
//       })

//       setIsGenerating(false);
      
//     }
//    }

//   return {
//     isGenerating, generatePodcast
//   }
// }

// const GeneratePodcast = (props: GeneratePodcastProps)=>{
//   // const [isGenerating, setIsGenrating] = useState(false);
//   const {isGenerating, generatePodcast}=useGeneratePodcast(props);

//   return (
//     <div>
//       <div className='flex flex-col gap-2.5'>
//       <Label className='text-16 font-bold text-white-1 '>
//         AI prompt to generate Podcast
//       </Label>
//       <Textarea
//       className='input-class font-light focus-visible:ring-offset-orange-1'
//       placeholder='Provide Text to generate'
//       rows={5}
//       value={props.voicePrompt}
//       onChange={(e)=>props.setVoicePrompt(e.target.value)}

      
//       />
//       </div>
//       <div className='mt-5 w-full max-w-[200px]'>
//       <Button type="submit"
//           className="text-16 bg-orange-1 text-white-1 font-extrabold py-4 w-full "
//           onClick={generatePodcast}
          
//           >
//             {isGenerating ? (
//               <>
//               Generating
//               <Loader size={20} className="animate-spin ml-2"/>
//               </>
//             ):(
//               'Generate'
//             )}
//           </Button>
//       </div>
//      {props.audio &&(
//       <audio
//           controls
//           src={props.audio}
//           autoPlay
//           className="mt-5"
//           onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
//       />
//      )}
//     </div>
//     )

// }


// export default GeneratePodcast


// import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/components/ui/use-toast"

import { useUploadFiles } from '@xixixao/uploadstuff/react';

const useGeneratePodcast = ({
  setAudio, voicePrompt, setAudioStorageId
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast()

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl)
// 1
  const getPodcastAudio = useAction(api.unrealspeech.generateAudioAction)

  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio('');

    if(!voicePrompt) {
      toast({
        title: "Please provide a Text to generate a podcast",
      })
      return setIsGenerating(false);
    }
    console.log("hello thi si sksjkd")
    try {
      console.log("Generating podcast audio...");
      const response = await  getPodcastAudio({
  
        text: voicePrompt,
        // voice:  's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json' ,


      })
      console.log("Audio generated, creating blob...");
      
      console.log(response);
      const blob = new Blob([response], { type: 'audio/mpeg' });
    
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: 'audio/mpeg' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Podcast generated successfully",
      })
    } catch (error) {
      console.log('Error generating podcast', error)
      toast({
        title: "Error creating a podcast",
        variant: 'destructive',
      })
      setIsGenerating(false);
    }
    
  }

  return { isGenerating, generatePodcast }
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea 
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder='Provide text to generate audio'
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
      <Button type="submit" className="text-16 bg-orange-1 py-4 font-bold text-white-1" onClick={generatePodcast}>
        {isGenerating ? (
          <>
            Generating
            <Loader size={20} className="animate-spin ml-2" />
          </>
        ) : (
          'Generate'
        )}
      </Button>
      </div>
      {props.audio && (
        <audio 
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) => props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast