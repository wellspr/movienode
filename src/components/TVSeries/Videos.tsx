import { VideosType } from "@/types";
import VideoComponent from "../VideoComponent";

export const Videos = ({ movieVideos }: { movieVideos?: VideosType }) => {

    return (
        <div className="movie-videos">
            <ul className="movie-videos__list">
                {
                    movieVideos && movieVideos.results.map(video => {
                        return (
                            <li key={video.id} className="movie-videos__list__item">

                                <h4>{video.name}</h4>
                                <p>{video.type}, {new Date(video.published_at).toLocaleDateString()}</p>
                                <div className="movie-videos__list__item__frame">
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