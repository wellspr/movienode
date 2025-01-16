import { baseImageUrl } from "@/config";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/types";
import { PersonDetailsType } from "@/types";
import { IconCross, IconMovie, IconStar } from "@tabler/icons-react";
import Image from "next/image";

export const Person = ({ person, locale }: { person: PersonDetailsType, locale: Locale }) => {

    console.log(
        person,
        person.movie_credits?.cast
            .map(entry => entry.id)
            .sort(),

        person.movie_credits?.crew
            .map(entry => entry.id)
            .sort()
    );

    return (
        <div className="person">

            <div className="person__profile__main">
                <div className="person__profile__main__col">
                    <h2 className="person__profile__main__name">{person.name}</h2>

                    <div className="person__profile__main__image">
                        <Image
                            src={baseImageUrl() + person.profile_path}
                            alt={person.name}
                            fill
                            draggable={false}
                        />
                    </div>

                    <div className="person__profile__main__dates">
                        <p className="person__profile__main__date person__profile__main__date--birth">
                            <IconStar size={16} />
                            {new Date(person.birthday).toLocaleDateString()}
                        </p>
                        {
                            person.deathday &&
                            <p className="person__profile__main__date person__profile__main__date--death">
                                <IconCross size={16} />
                                {new Date(person.deathday).toDateString()}
                            </p>
                        }
                    </div>
                </div>

                <div className="person__profile__main__col">
                    <h3>{person.known_for_department}</h3>
                    <p>{person.place_of_birth}</p>

                </div>
            </div>

            <div className="person__profile__biography">
                <h3>Biography</h3>
                <p className="person__profile__main__biography">{person.biography}</p>
            </div>

            <div className="person__profile__work">
                <h3 className="person__profile__work__heading">Works</h3>
                <h4>Cast</h4>
                <ul className="person__profile__work__list">
                    {
                        person.movie_credits && person.movie_credits.cast.map((entry, index) => {
                            return (
                                <li key={entry.id + "-" + index} className="person__profile__work__list__item">
                                    <div className="person__profile__work__list__item__image-wrapper person__profile__work__list__item__image-wrapper--cast">
                                        <div className="person__profile__work__list__item__image person__profile__work__list__item__image--cast">
                                            {
                                                entry.poster_path ?
                                                    <Image
                                                        src={baseImageUrl() + entry.poster_path}
                                                        alt={entry.title}
                                                        fill
                                                        draggable={false}
                                                    /> :
                                                    <div className="person__profile__work__list__item__image__placeholder">
                                                        <div className="person__profile__work__list__item__image__placeholder__title">
                                                            {entry.title}
                                                        </div>
                                                        <IconMovie />
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="person__profile__work__list__item__info">
                                        <h4 className="person__profile__work__list__item__info__title">
                                            <span>{entry.title}</span>
                                            {" "}
                                            {
                                                entry.release_date &&
                                                <span>({entry.release_date.split('-')[0]})</span>
                                            }
                                        </h4>
                                        <p className="person__profile__work__list__item__info__character">
                                            {entry.character}
                                        </p>
                                        <p className="person__profile__work__list__item__info__overview">
                                            {entry.overview}
                                        </p>
                                        <p className="person__profile__work__list__item__info__vote-average">
                                            {entry.vote_average}
                                        </p>
                                        <Link className="person__profile__work__list__item__info__link inline-link"
                                            href={`/details/${entry.id}`} locale={locale}>
                                            Visit
                                        </Link>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>

                <h4>Crew</h4>
                <ul className="person__profile__work__list">
                    {
                        person.movie_credits && person.movie_credits.crew.map((entry, index) => {
                            return (
                                <li key={entry.id + "-" + index} className="person__profile__work__list__item">
                                    <div className="person__profile__work__list__item__image-wrapper person__profile__work__list__item__image-wrapper--crew">
                                        <div className="person__profile__work__list__item__image person__profile__work__list__item__image--crew">
                                            {
                                                entry.poster_path ?
                                                    <Image
                                                        src={baseImageUrl() + entry.poster_path}
                                                        alt={entry.title}
                                                        fill
                                                        draggable={false}
                                                    /> :
                                                    <div className="person__profile__work__list__item__image__placeholder">
                                                        <div className="person__profile__work__list__item__image__placeholder__title">
                                                            {entry.title}
                                                        </div>
                                                        <IconMovie />
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="person__profile__work__list__item__info">
                                        <h4 className="person__profile__work__list__item__info__title">
                                            <span>{entry.title}</span>
                                            {" "}
                                            {
                                                entry.release_date &&
                                                <span>({entry.release_date.split('-')[0]})</span>
                                            }
                                        </h4>
                                        <p className="person__profile__work__list__item__info__job">
                                            {entry.job}
                                        </p>
                                        <Link className="person__profile__work__list__item__info__link inline-link"
                                            href={`/details/${entry.id}`} locale={locale}>
                                            Visit
                                        </Link>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <div className="person__profile__gallery">
                <h3 className="person__profile__gallery__heading">Gallery</h3>
                <ul className="person__profile__gallery__list">
                    {
                        person.images && person.images.profiles.map((image, index) => {
                            return (
                                <li key={image.file_path + "-" + index} className="person__profile__gallery__item">
                                    <Image
                                        src={baseImageUrl() + image.file_path} width={image.aspect_ratio * 300} height={300}
                                        alt={person.name}
                                        draggable={false}
                                    />
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};