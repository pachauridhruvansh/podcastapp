import { action } from "./_generated/server";
import { v } from "convex/values";

// import OpenAI from "openai";
// import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

// const openai = new OpenAI({
//   apiKey:process.env.OPENAI_API_KEY,
// })

// export const generateAudioAction = action({
//   args: { input: v.string(), voice: v.string() },
//   handler: async (_, { voice, input }) => {
//     const mp3 = await openai.audio.speech.create({
//       model: "tts-1",
//       voice: voice as SpeechCreateParams['voice'],
//       input,
//     });

//     const buffer = await mp3.arrayBuffer();
    
//     return buffer;
//   },
// });




// export const generateThumbnailAction = action({
//   args: { prompt: v.string() },
//   handler: async (_, { prompt }) => {
//     const response = await openai.images.generate({
//       model: 'dall-e-3',
//       prompt,
//       size: '1024x1024',
//       quality: 'standard',
//       n: 1,
//     })

//     const url = response.data[0].url;

//     if(!url) {
//       throw new Error('Error generating thumbnail');
//     }

//     const imageResponse = await fetch(url);
//     const buffer = await imageResponse.arrayBuffer();
//     return buffer;
//   }
// })

// LIMEWIRE WEBSITE FOR IMAGE GENERATION AND GIVING 10 IMAGES FREE PER DAY
const LIMEWIRE_API_KEY=process.env.LIMEWIRE_API_KEY
if (!LIMEWIRE_API_KEY) {
	throw new Error("Missing Unreal Speech API key in environment variables");
  }

export const generateThumbnailAction = action({
	args: { prompt: v.string() },
	handler: async (_, { prompt }) => {
	  const response =  await fetch(
		`https://api.limewire.com/api/image/generation`,
		{
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'X-Api-Version': 'v1',
			Accept: 'application/json',
			Authorization:`Bearer ${LIMEWIRE_API_KEY}`
		  },
		  body: JSON.stringify({
			prompt,
			aspect_ratio: '1:1'
		  })
		}
	  );

	  // Parse the JSON response
	  const jsonResponse = await response.json();
	//   console.log('API response:', jsonResponse);

	//   if (!jsonResponse || !jsonResponse[0] || !jsonResponse[0].url) {
    //     throw new Error('Invalid API response structure');
    //   }

	  // Extract the URL from the response
	  const url = jsonResponse.data[0].asset_url;
  
	  const imageResponse = await fetch(url);
	  const buffer = await imageResponse.arrayBuffer();
	  return buffer;
	}
  })