import { useState, useEffect } from "react";
import { Card } from "./components"
import styles from "./App.css";
import getData from "./api/shop01";
var itemsFAKE = [
    {
        "product": {
        "ID": 10506,
        "name": "ÆBLEJUICE",
        "image": "https://cphapp.rema1000.dk/api/v1/catalog/store/1/item/10506/image/1618229743"
        },
        "price": {
        "current": 9.95,
        "normal": 9.95,
        "perUnit": "6.63 per Ltr."
        },
        "discount": false,
        "category": {
        "ID": 5898350,
        "name": "Juice m.v."
        }
    },

    {
        "product": {
          "ID": 212613,
          "name": "COCA COLA",
          "image": "https://cphapp.rema1000.dk/api/v1/catalog/store/1/item/212613/image/1618570506"
        },
        "price": {
          "current": 3,
          "normal": 5,
          "perUnit": "9.09 per Ltr."
        },
        "discount": {
          "discountEndsOn": "2022-06-01"
        },
        "category": {
          "ID": 5898320,
          "name": "Sodavand, vand, smoothies m.v."
        }
      },
]

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