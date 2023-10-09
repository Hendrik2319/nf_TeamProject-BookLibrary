import './App.css';
import {useEffect, useState} from "react";
import {Book} from "./Types.tsx";
import axios from "axios";
import BookList from "./components/BookList.tsx";
import {Route, Routes} from "react-router-dom";
import EditBook from "./components/EditBook.tsx";

export default function App() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(loadAllBooks, []);

    function loadAllBooks (){
        axios.get("/api/books")
            .then((response) => {
                if (response.status!==200)
                    throw "Get wrong response status, when loading all books: "+response.status;
                setBooks(response.data);
            })
            .catch((error)=>{
                console.error(error);
            })
    }


    return (
        <>
            <h1>Book Library</h1>
            <Routes>
                <Route path="/"               element={<BookList books={books}/>}/>
                <Route path="/books/:id/edit" element={<EditBook books={books} reload={loadAllBooks}/>}/>
            </Routes>
        </>
    )
}
