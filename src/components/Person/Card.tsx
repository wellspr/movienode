import { baseImageUrl, paths } from "@/config";
import { Link } from "@/i18n/routing";
import { PersonType } from "@/types";
import Image from "next/image";

export const Card = ({ person }: { person: PersonType }) => {

    return (
        <Link href={paths.person(String(person.id))}>
            <li className={`person-card`}>

                <div className={`person-card__image`}>
                    {
                        person.profile_path ?
                            <Image
                                src={baseImageUrl(500) + person.profile_path}
                                alt={person.name}
                                fill
                                draggable={false}
                            /> :
                            <Image 
                                src={`https://ui-avatars.com/api/?name=${person.name}`}
                                alt={person.name}
                                fill
                                draggable={false}
                            />
                    }
                </div>

                <div className={`person-card__info`}>
                    <h3>{person.name} </h3>
                    <h4>{person.known_for_department}</h4>
                </div>

            </li>
        </Link>
    );
};