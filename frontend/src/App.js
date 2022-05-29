import { useState, useEffect } from "react";
import { Card, SearchBar } from "./components";
import styles from "./App.css";
import getData from "./api/shop01";
import itemsLOCAL from "./utils/itemsFAKE";

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const [checked, setChecked] = useState(false);

    // Commenting this useEffect out to avoid loading data from the internet:
    useEffect(() => {
        setIsLoading(true);
        getData()
            .then((data) => {
                setItems(data.results);
                setIsLoading(false);
            })
    }, [])

    return (
        <div className="app">
            <h1>Shopper</h1>

            <SearchBar setSearchWord={setSearchWord} setChecked={setChecked} checked={checked} />

            {isLoading && <p>Loading products...</p>}
            {!isLoading && items && (
                 // Commenting this Card component out to avoid loading data from local sample datat:
                // <Card items={itemsLOCAL} searchWord={searchWord} checked={checked} />
                
                // Commenting this Card component out to avoid loading data from the internet:
                <Card items={items} searchWord={searchWord} checked={checked} />
            )}
        </div>
    )
}