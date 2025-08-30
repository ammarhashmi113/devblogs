import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axiosConfig";
import ProfilePageLayout from "../components/ProfilePageLayout";

function PublicProfilePage() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loadingActivity, setLoadingActivity] = useState(false);

    const [activity, setActivity] = useState({
        blogs: { results: [], pagination: null },
        comments: { results: [], pagination: null },
        likes: { results: [], pagination: null },
    });

    const [type, setType] = useState("blogs");
    const [page, setPage] = useState({ blogs: 1, comments: 1, likes: 1 });
    const limit = 5;

    useEffect(() => {
        api.get(`/users/${username}`).then((res) => {
            setUser(res.data.data.user);
        });
    }, [username]);

    useEffect(() => {
        const fetchActivity = async () => {
            setLoadingActivity(true);
            const res = await api.get(
                `/users/${username}/activity?type=${type}&page=${page[type]}&limit=${limit}`
            );
            setActivity((prev) => ({
                ...prev,
                [type]: {
                    results:
                        page[type] === 1
                            ? res.data.data[type].results
                            : [
                                  ...prev[type].results,
                                  ...res.data.data[type].results,
                              ],
                    pagination: res.data.data[type].pagination,
                },
            }));
            setLoadingActivity(false);
        };
        fetchActivity();
    }, [username, type, page[type]]);

    return (
        <ProfilePageLayout
            user={user}
            loadingActivity={loadingActivity}
            activity={activity}
            type={type}
            setType={setType}
            page={page}
            setPage={setPage}
            showEdit={false}
        />
    );
}

export default PublicProfilePage;
