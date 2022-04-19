import { Link } from "react-router-dom";


const MainCategories = () => {
    return (
        <div className="products_links">
            <Link
                to="/categories/women"
            >
                WOMEN
            </Link>
            <Link
                to="/categories/men"
            >
                MEN
            </Link>
            <Link
                to="/categories/kids"
            >
                KIDS
            </Link>
            <Link
                to="/categories/accessories"
            >
                ACCESSORIES
            </Link>
        </div>
    )
}

export default MainCategories;