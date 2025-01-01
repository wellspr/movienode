import { Videos } from "@/types";
import VideoComponent from "./VideoComponent";

export const MovieVideos = ({ movieVideos }: { movieVideos?: Videos }) => {

    return (
        <div className="movie__videos">
            <ul className="movie__videos__list">
                {
                    movieVideos && movieVideos.results.map(video => {
                        return (
                            <li key={video.id} className="movie__videos__list__item">
                                <h2>{video.name}</h2>
                                <p>{video.type}, {new Date(video.published_at).toLocaleDateString()}</p>
                                <div>{video.key}</div>
                                <div className="movie__videos__list__item__frame">
                                    <VideoComponent videoKey={video.key} />
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};