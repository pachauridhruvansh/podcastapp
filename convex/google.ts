// import { action } from "./_generated/server";
// import { v } from "convex/values";
// import axios, { AxiosRequestConfig } from "axios";

// // Required libraries
// const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
// const { v } = require('convex/values');

// // Replace with your Google Cloud project ID
// const projectId = 'YOUR_PROJECT_ID';

// // Create a Text-to-Speech client
// const client = new TextToSpeechClient();

// export const generateAudioAction = action({
//   args: { text: v.string() },
//   handler: async (_, { text }) => {
//     try {
//       // Text-to-Speech request configuration
//       const request = {
//         input: { text },
//         voice: {
//           languageCode: 'en-US', // Adjust language code as needed
//           name: 'en-US-Wavenet-S', // Select a free tier voice (check Google Cloud docs for options)
//           ssmlGender: 'NEUTRAL', // Optional: adjust voice gender
//         },
//         audioConfig: { audioEncoding: 'MP3' },
//       };

//       // Synthesize speech
//       const [response] = await client.synthesizeSpeech(request);

//       // Check for errors
//       if (response.error) {
//         throw new Error(`Error generating audio: ${response.error.message}`);
//       }

//       // Return the audio content
//       return response.audioContent;
//     } catch (error) {
//       console.error('Error generating audio:', error);
//       throw new Error('Error generating audio');
//     }
//   },
// });

