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
    try {
        const response = await axios.get(`${BASE_URL}/${bookId}`, {
            params: { key: API_KEY }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching book details:', error);
        return null;
    }
};