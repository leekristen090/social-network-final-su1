import {useParams} from "react-router-dom";
import * as db from "../Database";
import {Table} from "react-bootstrap";

export default function BookDetails() {
    const {bid} = useParams();
    const book = db.books.find(b => b.googleBooksId === bid);
    const bookReviews = db.reviews.filter(r => r.bookId === bid);
    const reviewer = bookReviews.map(review =>{
        const r = db.users.find(user => user._id === review.userId);
        return {...review, username: r ? r.username : "Unknown User"}
    });
    if (!book) return <div className={"sn-below-header"}>Book not found</div>;
    return (
        <div id={"sn-book-details"} className={"sn-below-header"}>
            <h1>{book.title}</h1><hr />
            <div className={"d-flex"}>
                <div className={"flex-fill me-3"}>
                    <h4><b>Author(s):</b></h4>
                    {book.authors}<br/><br/>
                    <h4><b>Description:</b></h4>
                    {book.description}
                    book detaisl and stuff
                    blah bal
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores blanditiis consectetur consequuntur cum earum maxime minima nam quas quidem repellendus, suscipit voluptatibus? Aliquam possimus quibusdam quis quisquam ratione repudiandae veniam?
                </div>
                <div className={"d-none d-xl-block"}>
                    <img src={`${book.coverURL}`} alt={book.title} height={200}/>
                </div>
            </div>
            <hr />
            <h3>Reviews from other GoodBooks users</h3>
            <Table striped>
                <thead>
                <tr>
                    <th>User</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {reviewer.map((review: any) => (
                    <tr key={review._id}>
                        <td>{review.username}</td>
                        <td>{review.text}</td>
                        <td>{new Date(review.timestamp).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}