import { action } from "./_generated/server";
import { v } from "convex/values";
import axios, { AxiosRequestConfig } from 'axios';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

export const generateAudioAction = action({
  args: { input: v.string() },
  handler: async (_, { input }) => {
    if (!ELEVENLABS_API_KEY) {
      throw new Error('API key is not set');
    }

    console.log('ELEVENLABS_API_KEY:', ELEVENLABS_API_KEY);
    const voiceId = '21m00Tcm4TlvDq8ikWAM'; // Make sure this is the correct voiceId



    const apiRequestOptions: AxiosRequestConfig<{ text: string }> = {
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        // 'xi-api-key': ELEVENLABS_API_KEY,
        'xi-api-key':  `${ELEVENLABS_API_KEY}`,
        // 'Authorization': `Bearer ${ELEVENLABS_API_KEY}`,  
      },
      data: {
        text: input,
      },
      responseType: 'arraybuffer', // To receive binary data in response
    };

    try {
		// console.log("request sent 1")
      const apiResponse = await axios.request(apiRequestOptions);
	//   console.log("request sent 2")
      
      return apiResponse.data; // Returning the binary audio data
    } catch (error) {
      // 
      if (axios.isAxiosError(error)) {
        console.error(error);
        throw new Error(`Error generating audio: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  },
});


// import { action } from "./_generated/server";
// import { v } from "convex/values";
// import axios from 'axios';
// import { AxiosRequestConfig } from 'axios';
// // require('dotenv').config();


// const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
// const voiceId = '21m00Tcm4TlvDq8ikWAM';

// export const generateAudioAction = action({
//   args: { input: v.string() },
//   handler: async (_, { input}) => {
//     // API request options with dynamic voiceId
//     const apiRequestOptions: AxiosRequestConfig<{ text: string }> = {
//       method: 'POST',
//       url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
//       headers: {
//         accept: 'audio/mpeg',
//         'content-type': 'application/json',
//         'xi-api-key': ELEVENLABS_API_KEY  ,
// 		// 'xi-api-key':'sk_81880b4d30eb1990be6fc04a9bbbad849cabfe06b5daa201' as string,
// 		// Authorization: `Bearer ${ELEVENLABS_API_KEY}`,
//       },
//       data: {
//         text: input,
//       },
//       responseType:'arraybuffer',
//     };

//     try {
//       const apiResponse = await axios.request(apiRequestOptions);
//       return apiResponse.data; // Returning the binary audio data
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error(error);
//         throw new Error(`Error generating audio: ${error.message}`);
//       } else {
//         throw new Error('An unknown error occurred');
//       }
//     }
//   },
// });
// "use client"
// import { ElevenLabsClient } from "elevenlabs";
// import { action } from "./_generated/server";
// import { v } from "convex/values";
// import axios, { AxiosRequestConfig } from 'axios';

// const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
// const client = new ElevenLabsClient({
//   apiKey: ELEVENLABS_API_KEY,
// });
// const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Specify the voice ID directly
// console.log("hello2");

// export const generateAudioAction = action({
//   args: { text: v.string() }, // Only text is required as an argument

//   handler: async (_, { text }) => {
//     const apiRequestOptions: AxiosRequestConfig<{ text: string }> = {
//       method: 'POST',
//       url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
//       headers: {
//         accept: 'audio/mpeg',
//         'content-type': 'application/json',
//         'xi-api-key': ELEVENLABS_API_KEY,
//       },
//       data: {
//         text,
//       },
//       responseType: 'arraybuffer', // Ensure this is correctly typed
//     };
	
//     try {
// 		console.log("hello 1");
//       const apiResponse = await axios.request(apiRequestOptions);

//       return apiResponse.data; // Returning the binary audio data
//     } catch (error) {
	
//       // Type assertion for the error object
//       if (axios.isAxiosError(error)) {
//         throw new Error(`Error generating audio: ${error.message}`);
//       } else {
//         throw new Error('An unknown error occurred');
//       }
//     }
//   },
// });


// import { ElevenLabsClient } from "elevenlabs";
// import { action } from "./_generated/server";
// import { v } from "convex/values";
// import { Readable } from "stream";
// // import * as dotenv from "dotenv";

// // dotenv.config();

// const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

// const client = new ElevenLabsClient({
//   apiKey: ELEVENLABS_API_KEY,
// });

// export const generateAudioAction = action({
//   args: { text: v.string() },
//   handler: async (_, { text }) => {
//     try {
//       const audio = await client.generate({
//         voice: "Rachel",
//         model_id: "eleven_turbo_v2",
//         text ,
//       });

//       // Collect audio data into a buffer
//       // const chunks: Buffer[] = [];
//       // audio.on('data', (chunk) => chunks.push(chunk));
//       // await new Promise<void>((resolve, reject) => {
//       //   audio.on('end', resolve);
//       //   audio.on('error', reject);
//       // });

//       // await new Promise<void>((resolve, reject) => {
//       //   audio.on('data', (chunk) => chunks.push(chunk));
//       //   audio.on('end', resolve);
//       //   audio.on('error', reject);
//       // });

//       // console.log("working fine");
//       // const chunks: Buffer[] = [];
//       // for await (const chunk of audio as Readable) {
//       //   chunks.push(Buffer.from(chunk));
//       // }
//       // console.log("working fine 2");
//       // const buffer = Buffer.concat(chunks);
//       // const base64Audio = buffer.toString('base64');
//       // return base64Audio;
//       return audio;
//       // const chunks: Buffer[] = [];
//       // for await (const chunk of audio) {
//       //   chunks.push(chunk);
//       // }

//       // const buffer = Buffer.concat(chunks);
//       // const base64Audio = buffer.toString('base64');
//       // return base64Audio;
//       // return buffer;
    
//       // responseType: 'arraybuffer',

//       // const buffer = Buffer.concat(chunks);
//       // return buffer;
//     } catch (error: unknown) {
//       // Type assertion to specify that error is an instance of Error
//       if (error instanceof Error) {
//         throw new Error(`Error generating audio: ${error.message}`);
//       } else {
//         throw new Error('An unknown error occurred');
//       }
//     }
//   },
// });

