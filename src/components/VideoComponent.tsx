export default function VideoComponent({videoKey}:{videoKey: string}) {

    const src = `https://www.youtube.com/embed/${videoKey}`;
    
    return (
        <iframe width="420" height="315" allowFullScreen
            src={src}>
        </iframe>
    );
}