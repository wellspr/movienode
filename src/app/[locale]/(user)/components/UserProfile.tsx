import { UserDetails } from "@/actions/user";
import { LogoutButton } from "../../(auth)/components/LogoutButton";
import Image from "next/image";
import { ListsType } from "@/actions/user/lists/types";

export const UserProfile = ({ user, lists }: { user: UserDetails | null, lists: ListsType }) => {

    if (!user) return null;

    return (
        <div className="user-profile">
            <h2 className="user-profile__heading">{user?.name ? `Hello ${user.name}` : "Profile"}</h2>

            <div className="user-profile__primary">
                <div className="user-profile__primary__user-info">
                    <div className="user-profile__image">
                        {
                            user && user.avatar &&
                            <Image
                                src={`https://gravatar.com/avatar/${user.avatar.gravatar.hash}?s=300`}
                                alt="avatar image"
                                width={200}
                                height={200}
                            />
                        }
                    </div>

                    <p className="user-profile__text">Logged in as {user?.username}</p>
                </div>
                <div className="user-profile__primary__user-tmdb-data">
                    TMDB

                    {
                        lists.results.length > 0 &&
                        <div className="user-lists-section">
                            {
                                lists.results.map(list => {
                                    return (
                                        <div className="user-lists__list" key={list.id}>
                                            <div className="user-lists__list__item">
                                                {list.name}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                </div>
            </div>

            <div className="user-profile__logout-button">
                <LogoutButton />
            </div>
        </div>
    );
};

