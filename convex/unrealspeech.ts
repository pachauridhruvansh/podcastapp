import { action } from "./_generated/server";
import { v } from "convex/values";
import axios, { AxiosRequestConfig } from "axios";

const UNREAL_SPEECH_API_KEY = process.env.UNREAL_SPEECH_API_KEY;

if (!UNREAL_SPEECH_API_KEY) {
  throw new Error("Missing Unreal Speech API key in environment variables");
}

export const generateAudioAction = action({
  args: { text: v.string() },
  handler: async (_, { text }) => {
    try {
      const apiEndpoint = 'https://api.v7.unrealspeech.com/stream';

      const apiRequestOptions: AxiosRequestConfig<{ Text: string; VoiceId: string; Bitrate: string; Speed: string; Pitch: string; Codec: string; Temperature: number }> = {
        method: 'POST',
        url: apiEndpoint,
        headers: {
          'Authorization': `Bearer ${UNREAL_SPEECH_API_KEY}`,
          'Content-Type': 'application/json',
        //   'Accept': 'text/plain',
        },
        data: {
          Text: text,
          VoiceId: 'Scarlett', // You can customize this or pass it as an argument
          Bitrate: '192k',
          Speed: '0',
          Pitch: '1',
          Codec: 'libmp3lame',
          Temperature: 0.25,
        },
        responseType: 'arraybuffer', // To receive binary data in response
      };

      const apiResponse = await axios.request(apiRequestOptions);
      
      // Log the raw response for debugging
      console.log('Raw API response:', apiResponse);

      // Check if the response data is too small
    //   if (apiResponse.data.byteLength < 1000) { // Arbitrary small size threshold
    //     console.error('Unusually small response received:', apiResponse.data);
    //     throw new Error('Unusually small response received');
    //   }

      return apiResponse.data; // Return the binary audio data
    } catch (error) {
      console.error('Error generating audio:', error);
      throw new Error('Error generating audio');
    }
  },
});
