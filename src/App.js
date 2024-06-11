import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("https://newsapi.org/v2/everything?q=apple&from=2024-05-30&to=2024-05-30&sortBy=popularity&apiKey=7a2add4c4db54f788bb070f853e65355")
            .then((response) => response.json())
            .then((data) => {
                if (data && data.articles) {
                    setArticles(data.articles.slice(1,20));
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h2>Latest Apple Headlines</h2>
            <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {filteredArticles.map((article, index) => (
                    <li key={index}>
                        <h3>{article.title}</h3>
                        <p>Source: {article.source.name}</p>
                        <p>Published At: {new Date(article.publishedAt).toLocaleString()}</p>
                        <p>Description: {article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

