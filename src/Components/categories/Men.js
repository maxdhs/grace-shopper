import { useNavigate } from "react-router-dom";
import MainCategories from "../MainCategories";

const Men = ({products}) => {
    const navigate = useNavigate();
    const filteredProducts = products.filter(product => {
        if(product.category === "men") {
            return true;
        }
    });
    return (
        <div className="products_main">
        <MainCategories/>
        <div className="products_container">
            {filteredProducts.map(product => {
                return <div 
                    key={product.id}
                >
                    <div 
                        className="products_content"
                        onClick={() => {
                            navigate(`/products/${product.id}`);
                        }}
                    >
                        <h1>{product.title}</h1>
                        <img src={product.imgURL}/>
                        <p>${product.price}</p>
                    </div>
                    <button>Add to cart</button>
                </div>
            })}
        </div>
    </div>
    )
}

export default Men;