import { useEffect, useState } from "react";
import Image from "../Image/Image";
import NoImageFound from "../../images/no-image-found.png";
import styles from "./Card.css";
const currency = "DKK";

export default function Card({items, searchWord, checked}) {
    
    const [filteredItems, setFilteredItems] = useState(items);

    useEffect(() => {
        let filtered = [...items];        
        filtered = items.filter((item) => {
            return item.product.name.toLowerCase().includes(searchWord);
        });

        if (checked) {
            filtered = filtered.filter((item) => {
                return !!item.discount;
            });
        };
        
        setFilteredItems(filtered);
    }, [searchWord, checked])

    return filteredItems.map((item) => {
        const { product, price, discount, category } = item;
        return (
            <section className="card" key={product.ID}>
                {discount && (
                    <div className="discount">
                        { discount.discountEndsOn
                            ? (<p>Discount through {discount.discountEndsOn}</p>)
                            : (<p>Discount</p>)}
                    </div>
                )}
                <div className="flex">
                    <div>
                        <h2>
                            <a className="link-to-shop" href={`${process.env.REACT_APP_SHOP_PRODUCT_PAGE}/${product.ID}`} target="_blank">
                                {product.name}
                            </a>
                        </h2>

                        {discount && (
                            <div>
                                <p>Now {price.current} <span className="currency">DKK</span> instead of {price.normal} <span className="currency">DKK</span></p>
                                {/* <p>Normal price: {price.normal} <span className="currency">DKK</span></p> */}
                                {/* <p>Through {discount.discountEndsOn}</p> */}
                            </div>
                        )}
                        <p className="price">
                            <span className="price">{price.perUnit.toLowerCase().split(" per ")[0]}</span>
                            <span className="currency"> DKK</span>
                            <span className="per"> / </span>
                            <span className="unit">{price.perUnit.toLowerCase().split(" per ")[1]}</span>
                        </p>

                    </div>
                    
                    <div>
                    <Image className="product-image" src={discount ? product.image : NoImageFound } />
                    </div>
                </div>
            </section>
        );
    });
};
