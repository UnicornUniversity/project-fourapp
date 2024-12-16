import { useContext } from "react";
import ProductCard from "./CardContainer";
import { ProductContext } from "../../providers/ProductProvider";
import "../../assets/styles/product.css";

function RecentContainer() {
    // const { recentProducts } = useContext(ProductContext);

    const recentProducts = [
        {
            "name": "test",
            "price": 200,
            "description": "AA",
            "isOnline": true,
            "variants": [
                {
                    "variantId": 1,
                    "name": "testVar",
                    "size": "XL",
                    "color": "test",
                    "stock": 2,
                    "images": []
                }
            ]
        }, {
            "name": "test",
            "price": 200,
            "description": "AA",
            "isOnline": true,
            "variants": [
                {
                    "variantId": 1,
                    "name": "testVar",
                    "size": "XL",
                    "color": "test",
                    "stock": 2,
                    "images": []
                }
            ]
        },
        {
            "name": "test",
            "price": 200,
            "description": "AA",
            "isOnline": true,
            "variants": [
                {
                    "variantId": 1,
                    "name": "testVar",
                    "size": "XL",
                    "color": "test",
                    "stock": 2,
                    "images": []
                }
            ]
        },
        {
            "name": "test",
            "price": 200,
            "description": "AA",
            "isOnline": true,
            "variants": [
                {
                    "variantId": 1,
                    "name": "testVar",
                    "size": "XL",
                    "color": "test",
                    "stock": 2,
                    "images": []
                }
            ]
        },
        {
            "name": "test",
            "price": 200,
            "description": "AA",
            "isOnline": true,
            "variants": [
                {
                    "variantId": 1,
                    "name": "testVar",
                    "size": "XL",
                    "color": "test",
                    "stock": 2,
                    "images": []
                }
            ]
        }

    ]

    return (
        <section className="recentContainer">
            <h3>Newest additions</h3>
            <div>
                {recentProducts ? (
                    recentProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <></>
                )}
            </div>  
        </section>
    );
}

export default RecentContainer;
