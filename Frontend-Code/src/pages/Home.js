import CategoryList from "../components/CategoryList"
import BannerProduct from "../components/BannerProduct"
import HorizontalProductCard from "../components/HorizontalProductCard"

const Home = () => {
    return (
        
        <div className="h-screen bg-slate-100 overflow-auto">
            <CategoryList />
            <BannerProduct />
            <HorizontalProductCard category = {"Airpodes"} heading = {"Top's Airpodes"}/>
        </div>
    )
}

export default Home