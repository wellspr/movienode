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
                                <div className="movie-videos__list__item__frame movie-videos__list__item__frame--xsm">
                                    <VideoComponent videoKey={video.key} width={320} />
                                </div>
                                <div className="movie-videos__list__item__frame movie-videos__list__item__frame--sm">
                                    <VideoComponent videoKey={video.key} width={400} />
                                </div>
                                <div className="movie-videos__list__item__frame movie-videos__list__item__frame--md">
                                    <VideoComponent videoKey={video.key} width={600} />
                                </div>
                                <div className="movie-videos__list__item__frame movie-videos__list__item__frame--lg">
                                    <VideoComponent videoKey={video.key} width={720} />
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};