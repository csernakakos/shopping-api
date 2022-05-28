import { useState, useEffect } from "react";
import { Card } from "./components"
import styles from "./App.css";
import getData from "./api/shop01";
import itemsFAKE from "./utils/itemsFAKE";

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     getData()
    //         .then((data) => {
    //             setItems(data.results);
    //             setIsLoading(false);
    //         })
    // }, [])

    return (
        <div className="app">
            <h1>REMA Shopper</h1>

            {isLoading && <p>Loading products...</p>}
            {items && (
                <Card items={itemsFAKE} />
            )}
        </div>
    )
}