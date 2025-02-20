import { YouTubeEmbed } from "@next/third-parties/google";

export default function VideoComponent({ videoKey, width }: { videoKey: string, width: number }) {
    return (
        <YouTubeEmbed        
            videoid={videoKey}
            width={width}
            /*  width is set to a css property .lite-youtube as follows:
                .lite-youtube {
                    width: 360
                }
            */
            params="controls=1&allowFullScreen"
        />
    );
}