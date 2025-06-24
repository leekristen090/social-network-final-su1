import axios from 'axios';

const API_KEY = 'AIzaSyDFJavdwrlZENp_BhZzrXiYuCH4mJRpF3s';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query: string) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: query,
                key: API_KEY,
                maxResults: 20
            }
        });
        return response.data.items || [];
    } catch (error) {
        console.error('Error searching books:', error);
        return [];
    }
};
export const getBookDetails = async (bookId: string | undefined) => {
    if (!bookId) return null;

    try {
        const response = await axios.get(`${BASE_URL}/${bookId}`, {
            params: { key: API_KEY }
        });

        const book = response.data;
        const info = book.volumeInfo;

        return {
            googleBooksId: book.id,
            title: info.title || "Untitled",
            authors: info.authors?.join(", ") || "Unknown",
            description: info.description || "No description available",
            coverURL: info.imageLinks?.thumbnail || "",
            volumeInfo: info.volumeInfo 
        };
    } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
    }
};
export const getTrendingBooks = async () => {
    const subjects = [
        "subject:fiction",
        "subject:fantasy",
        "subject:romance",
        "subject:mystery",
        "subject:thriller",
        "subject:science fiction",
        "subject:young adult",
        "subject:history",
        "subject:biography"
    ];
    const randomQuery = subjects[Math.floor(Math.random() * subjects.length)];

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: randomQuery,
                orderBy: "newest",
                printType: "books",
                maxResults: 20,
                key: API_KEY
            }
        });

        const books = response.data.items || [];

        return books.map((book: any) => ({
            googleBooksId: book.id,
            title: book.volumeInfo?.title || "Untitled",
            authors: book.volumeInfo?.authors?.join(", ") || "Unknown Author",
            description: book.volumeInfo?.description || "",
            coverURL: book.volumeInfo?.imageLinks?.thumbnail || ""
        }));
    } catch (error) {
        console.error("Error fetching trending books:", error);
        return [];
    }
};
