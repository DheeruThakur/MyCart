import CategoryList from "../components/CategoryList"
import BannerProduct from "../components/BannerProduct"

const Home = () => {
    return (
        
        <div className="h-screen bg-slate-100 overflow-auto">
            <CategoryList />
            <BannerProduct />
        </div>
    )
}

export default Home