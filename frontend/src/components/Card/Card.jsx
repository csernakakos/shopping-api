import styles from "./Card.css"

const currency = "DKK";

export default function Card({items}) {
    return items.map((item) => {
        const { product, price, discount, category } = item;

        return (
            <section className={`card ${discount ? "discount" : "no-discount"}`} key={product.ID}>
                <div>
                    <h2>{product.name} <span className="product-id">({product.ID})</span></h2>

                    {discount && (
                        <div>
                            <p>Now {price.current} <span className="currency">DKK</span> instead of {price.normal} <span className="currency">DKK</span></p>
                            {/* <p>Normal price: {price.normal} <span className="currency">DKK</span></p> */}
                            <p>Last day to get this deal: {discount.discountEndsOn}</p>
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
                <img className="product-image" src={product.image} />
                </div>
            </section>
        );
    });
};
