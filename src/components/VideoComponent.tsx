import { YouTubeEmbed } from "@next/third-parties/google";

export default function VideoComponent({videoKey}:{videoKey: string}) {
    
    return <YouTubeEmbed videoid={videoKey} width={420} height={315} params="controls=1&allowFullScreen" />;
}