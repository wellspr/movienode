import { Locale } from "@/i18n/types";
import { PersonType } from "@/types";
import { Profile } from "./Profile";
import { paths } from "@/config";

export const PeopleList = ({results, locale}: {results: PersonType[], locale: Locale}) => {
    return (
        <ul className="people__list">
            {
                results && results.map((person: PersonType) => {
                    return (
                        <Profile
                            key={person.id}
                            baseClassName="people"
                            href={paths.person(String(person.id))}
                            locale={locale}
                            result={person}
                        />
                    );
                }) 
            }
        </ul>
    );
}