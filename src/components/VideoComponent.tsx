import { YouTubeEmbed } from "@next/third-parties/google";

export default function VideoComponent({ videoKey }: { videoKey: string }) {
    return (
        <YouTubeEmbed        
            videoid={videoKey}
            //width={420}
            //width={360}
            /*  width is set to a css property .lite-youtube as follows:
                .lite-youtube {
                    width: 360
                }
            */
            params="controls=1&allowFullScreen"
        />
    );
}