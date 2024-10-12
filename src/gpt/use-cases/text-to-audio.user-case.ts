import OpenAI from "openai";
import * as path from "path";
import * as fs from "fs";

interface Options {
    prompt: string;
    voice?: string;
}

export const textToAudioUseCase = async (openai: OpenAI, { prompt, voice }: Options) => {
    const voices = {
        'nova': 'nova',
        'alloy': 'alloy',
        'echo': 'echo',
        'fable': 'fable',
        'onyx': 'onyx',
        'shimmer': 'shimmer'
    }
    const selectedVoice = voices[voice] ?? 'nova';

    const folder = path.resolve(__dirname, `../../../generated/audio/`);
    const speechFile = path.resolve(`${folder}/${new Date().getTime()}.mp3`);

    fs.mkdirSync(folder, { recursive: true });
    const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: selectedVoice,
        input: prompt,
        response_format: 'mp3',
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(speechFile, buffer);
    return speechFile;
}