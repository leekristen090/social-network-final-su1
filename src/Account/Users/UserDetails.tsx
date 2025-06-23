import {Link, useNavigate, useParams} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";
import {useSelector} from "react-redux";
import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import * as reviewClient from "../Reviews/client.ts";
import * as followingClient from "../Following/client.ts";

export default function UserDetails() {
    const navigate = useNavigate();
    const {userId} = useParams();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {users} = useSelector((state: any) => state.usersReducer);
    const {books} = useSelector((state: any) => state.booksReducer);
    const user = users.find((u: any) => u._id === userId);
    const [userReviews, setUserReviews] = useState<any[]>([]);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const fetchUserReviews = async () => {
        if (userId) {
            const reviews = await reviewClient.fetchReviewsForUser(userId);
            const withTitles = reviews.map((r: any) => ({
                ...r,
                bookTitle: books.find((b: any) => b.googleBooksId === r.bookId)?.title || "Unknown Book",
                username: r.user?.username || "Unknown User"
            }));
            setUserReviews(withTitles);
        }
    };
    // const checkFollowingStatus = async () => {
    //     if (!currentUser || !userId) return;
    //     const following = await followingClient.fetchFollowing(currentUser._id);
    //     const isUserFollowed = following.some((f: any) => f.target === userId);
    //     setIsFollowing(isUserFollowed);
    // };
    const checkFollowingStatus = async () => {
        if (!currentUser || !userId) return;
        try {
            const following = await followingClient.fetchFollowing(currentUser._id);
            // Check if any follow record has this user as target
            const isUserFollowed = following.some(
                (f: any) => f.target._id === userId
            );
            setIsFollowing(isUserFollowed);
        } catch (err) {
            console.error("Error checking follow status:", err);
        }
    };
    const handleFollowToggle = async () => {
        if (!currentUser || !userId) return;
        if (isFollowing) {
            await followingClient.unfollowUser(currentUser._id, userId);
        } else {
            await followingClient.followUser(currentUser._id, userId);
        }
        checkFollowingStatus();
    };
    useEffect(() => {
        if (currentUser && currentUser._id === userId) {
            navigate("/GoodBooks/Account/Profile");
        }
        fetchUserReviews();
        checkFollowingStatus();
    }, [userId, books]);
    if (!user) return null;

    return (
        <div id={"sn-user-details"} className={"sn-below-header position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25"}>
            <div>
                <button onClick={() => navigate(-1)} className={"btn float-end end-0 wd-close-details"}>
                    <IoCloseSharp className={"fs-1"} />
                </button>
                <br /><br />
                <hr />
                <div id={"sn-user-detail-username"} className={"fs-2 text-wrap text-break word-wrap"}>
                    {user.username}
                </div>
            </div>

            <hr />
            {currentUser && (
                <div>
                    <div>
                        <h5><b>Bio:</b></h5>
                        {user.bio}
                        {currentUser._id !== userId && (
                            <Button
                                className={`float-end ${isFollowing ? "btn-danger" : "sn-bg-tan"}`}
                                onClick={handleFollowToggle}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        )}
                    </div>
                    <br /><br /><hr />
                    <div>
                        <h5>User Reviews:</h5>
                        {userReviews.length === 0 ? (
                            <p>This user hasn't written any reviews yet.</p>
                        ) : (
                            <Table striped>
                                <thead>
                                <tr>
                                    <th>Book</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userReviews.map((r: any) => (
                                    <tr key={r._id}>
                                        <td>
                                            <Link to={`/GoodBooks/Details/${r.bookId}`}>
                                                {r.bookTitle}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </div>
            )}
            {!currentUser && (
                <div>
                    You must be signed in to view a user's full profile.
                    <hr />
                    <Button onClick={() => navigate("/GoodBooks/Account/Signin")} className={"sn-bg-tan"}>
                        Sign In
                    </Button>
                    <br />
                    <Link to={"/GoodBooks/Account/Signup"}>
                        Don't have an account?<br />Sign up today!
                    </Link>
                </div>
            )}
        </div>
    );
}
