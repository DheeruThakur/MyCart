import CategoryList from "../components/CategoryList"
import BannerProduct from "../components/BannerProduct"
import HorizontalProductCard from "../components/HorizontalProductCard"
import VerticalProductCard from "../components/VerticleProductCard"

const Home = () => {
    return (
        
        <div className="h-screen bg-slate-100 overflow-auto">
            <CategoryList />
            <BannerProduct />
            <HorizontalProductCard category = {"Airpodes"} heading = {"Top's Airpodes"}/>
            <HorizontalProductCard category = {"Watches"} heading = {"Popular's Watches"}/>

            <VerticalProductCard category = {"Refrigerator"} heading={"Refrigerators"} />
            <VerticalProductCard category = {"Camera"} heading={"Camera & Photography"} />
            <VerticalProductCard category = {"Earphones"} heading={"Wired Earphones"} />
            <VerticalProductCard category = {"Mobiles"} heading={"Mobiles"} />
            <VerticalProductCard category = {"Mouse"} heading={"Mouse"} />
            <VerticalProductCard category = {"Printers"} heading={"Printers"} />
            <VerticalProductCard category = {"Processor"} heading={"Processors"} />
            <VerticalProductCard category = {"Speakers"} heading={"Speakers"} />
            <VerticalProductCard category = {"Televisions"} heading={"Telivisions"} />
            <VerticalProductCard category = {"Trimmers"} heading={"Trimmers"} />
            
        </div>
    )
}

export default Home