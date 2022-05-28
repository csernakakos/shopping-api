require('express-async-errors');
const express = require("express");
const cors = require('cors')
const axios = require("axios");
const dotenv = require("dotenv").config({});

const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello!")
})


// Get product by ID
app.get("/shop01/products/id/:productID", async (req, res) => {
        const { productID } = req.params;
        const URL = `${process.env.baseURL}/${productID}?${process.env.algoliaURL}`;

        const { data: hit } = await axios.get(URL);

        const result = {
            product: {
                ID: hit.id,
                name: hit.name,
                image: `${process.env.shopBaseURL}${hit.image_url}${process.env.jpgSize}`,
            },
            price: {
                current: hit.pricing.price,
                normal: hit.pricing.normal_price,
                perUnit: hit.pricing.price_per_unit,
            },
            ... (!hit.pricing.is_on_discount) && {
                discount: false,
            },
            ... (hit.pricing.is_on_discount) && {
                discount: {
                    discountEndsOn: hit.pricing.price_changes_on,
                }
            },
            category: {
                ID: hit.category_id,
                name: hit.category_name,
            }
        }

        res.json({
            success: true,
            result,
        });
});

// Get product by search word
app.post("/shop01/products/:searchWord", async (req, res) => {
    // example searchWord: hakket, peanut, kylling
    const { searchWord } = req.params;
    const URL = `${process.env.baseURL}/query?${process.env.algoliaURL}`;

    const { data: {hits} } = await axios.post(URL, {
        params: `query=${searchWord}&${process.env.numOfHits}`,
    });

    const results = hits.map((hit) => {
        return {
            product: {
                ID: hit.id,
                name: hit.name,
                image: `${process.env.shopBaseURL}${hit.image_url}${process.env.jpgSize}`,
            },
            price: {
                current: hit.pricing.price,
                normal: hit.pricing.normal_price,
                perUnit: hit.pricing.price_per_unit,
            },
            ... (!hit.pricing.is_on_discount) && {
                discount: false,
            },
            ... (hit.pricing.is_on_discount) && {
                discount: {
                    discountEndsOn: hit.pricing.price_changes_on,
                }
            },
            category: {
                ID: hit.category_id,
                name: hit.category_name,
            }
        };
    });

    res.json({
        success: true,
        searchWord,
        size: results.length,
        results,
    })
});

// Get 1000 products' details
app.post("/shop01/products", async (req, res) => {
    const URL = `${process.env.baseURL}/query?${process.env.algoliaURL}`;
    const { data: {hits} } = await axios.post(URL, {
        params: `query=&${process.env.numOfHits}`,
    });

    const results = hits.map((hit) => {
        return {
            product: {
                ID: hit.id,
                name: hit.name,
                image: `${process.env.shopBaseURL}${hit.image_url}${process.env.jpgSize}`,
            },
            price: {
                current: hit.pricing.price,
                normal: hit.pricing.normal_price,
                perUnit: hit.pricing.price_per_unit,
            },
            ... (!hit.pricing.is_on_discount) && {
                discount: false,
            },
            ... (hit.pricing.is_on_discount) && {
                discount: {
                    discountEndsOn: hit.pricing.price_changes_on,
                }
            },
            category: {
                ID: hit.category_id,
                name: hit.category_name,
            }
        };
    });

    const filteredResults = results.filter((result) => {
        return result.discount;
        });


    res.json({
        success: true,
        size: results.length,
        results,
    })
});

// Get details of discounted products from the 1000 products
app.post("/shop01/discounts", async (req, res) => {
    const URL = `${process.env.baseURL}/query?${process.env.algoliaURL}`;
    const { data: {hits} } = await axios.post(URL, {
        params: `query=&${process.env.numOfHits}`,
    });

    const results = hits.map((hit) => {
        return {
            product: {
                ID: hit.id,
                name: hit.name,
                image: `${process.env.shopBaseURL}${hit.image_url}${process.env.jpgSize}`,
            },
            price: {
                current: hit.pricing.price,
                normal: hit.pricing.normal_price,
                perUnit: hit.pricing.price_per_unit,
            },
            ... (!hit.pricing.is_on_discount) && {
                discount: false,
            },
            ... (hit.pricing.is_on_discount) && {
                discount: {
                    discountEndsOn: hit.pricing.price_changes_on,
                }
            },
            category: {
                ID: hit.category_id,
                name: hit.category_name,
            }
        };
    });

    const filteredResults = results.filter((result) => {
        return result.discount;
        });


    res.json({
        success: true,
        size: filteredResults.length,
        filteredResults,
    })
});

// JSON web server endpoints:
app.get("/jsonwebserver/results", async (req, res) => {
    const { data: results } = await axios.get("http://localhost:3000/results");
    const { name, discount } = req.query;

    const queryObject = {};
    let filteredResults = [...results];

    if (name) {
        console.log(`name is ${name}`)
        queryObject.name = name.toLowerCase();

        filteredResults = filteredResults.filter((result) => {
            return result.product.name.toLowerCase().includes(queryObject.name);
        });
    }

    if (discount) {
        console.log(`discount is ${discount}`)
        queryObject.discount = discount === "true" ? true : false;

        filteredResults = filteredResults.filter((result) => {
            console.log(!!result.discount, "<< >>", queryObject.discount)
            return !!result.discount === queryObject.discount;
        });
    }


    res.json({
        success: true,
        queryObject,
        size: filteredResults.length,
        filteredResults,
    })
})

app.listen(PORT, () => console.log(`Shopping app listening on ${PORT}...`))