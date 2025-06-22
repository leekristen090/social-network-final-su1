import {Link, useNavigate, useParams} from "react-router-dom";
import {IoCloseSharp} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {Button, Table} from "react-bootstrap";
import {useEffect} from "react";
import {followUser, unfollowUser} from "../Following/reducer.ts";

export default function UserDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userId} = useParams();
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const {users} = useSelector((state: any) => state.usersReducer);
    const {following} = useSelector((state: any) => state.followingReducer);
    const {reviews} = useSelector((state: any) => state.reviewsReducer);
    const {books} = useSelector((state: any) => state.booksReducer);
    const user = users.find((u: any) => u._id === userId);
    const isFollowing = following.some((f: any) => f.user === currentUser?._id && f.target === userId);
    // const bookReview = reviews.filter((r: any) => r._id === userId).map((r: any) => {
    //     const book = books.find((b: any) => b.googleBooksId === r.bookId);
    //     return {...r, title: book ? book.title : "Unkown Book"}
    // });
    const userReviews = reviews
        .filter((r: any) => r.userId === userId)
        .map((r: any) => {
            const book = books.find((b: any) => b.googleBooksId === r.bookId);
            return { ...r, bookTitle: book ? book.title : "Unknown Book" };
        });
    useEffect(() => {
        if (currentUser && currentUser._id === userId) {
            navigate("/GoodBooks/Account/Profile");
        }
    }, [currentUser, userId]);
    return (
        <div id={"sn-user-details"} className={"sn-below-header position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25"}>
            <div>
                <button onClick={() => navigate(-1)} className={"btn float-end end-0 wd-close-details"}>
                    <IoCloseSharp className={"fs-1"}/>
                </button>
                <br/><br/>
                <hr/>
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
                        <Button className={`float-end ${isFollowing ? "btn-danger" : "sn-bg-tan"}`} onClick={() => {
                            if (isFollowing) {
                                dispatch(unfollowUser({userId: currentUser._id, targetId: userId}));
                            } else {
                                dispatch(followUser({userId: currentUser._id, targetId: user._id}));
                            }
                        }}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                    </div>
                    <br/><br/><hr/>
                    <div>
                        <h5>User Reviews:</h5>
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
                    </div>
                </div>
            )}
            {!currentUser && (
                <div>
                    You must be signed in to view a user's full profile.
                    <hr />
                    <Button onClick={() => navigate("/GoodBooks/Account/Signin")}
                            className={"sn-bg-tan"}>
                        Signin
                    </Button>
                    <br />
                    <Link to={"/GoodBooks/Account/Signup"}>
                        Don't have an account?<br/> Sign up today!
                    </Link>
                </div>
                )}
        </div>
    );
}