import {useParams} from "react-router-dom";
import * as db from "../Database";
import {Card, Table} from "react-bootstrap";

export default function PublicProfile() {
    const {userId} = useParams();
    const user = db.users.find(u => u._id === userId);
    const reviews = db.reviews.filter(u => u.userId === userId);
    const book = reviews.map(b => {
        const u = db.books.find(x =>x.googleBooksId === b.bookId);
        return {...b, title: u ? u.title : "Unknown book"}
    });
    if (!user) return <div>User Not Found</div>
    return (
        <div id={"sn-public-profile"}>
            <Card id={"sn-public-profile-card"}>
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>
                        {user.bio}
                        <hr/>
                        <h5>User Reviews</h5>
                    </Card.Text>
                    <Table striped id={"sn-public-profile-reviews"}>
                        <thead>
                        <tr>
                            <th>Book</th>
                            <th>Review</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {book.map((review: any) => (
                            <tr>
                                <td>{review.title}</td>
                                <td>{review.text}</td>
                                <td>{new Date(review.timestamp).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}