import { useDispatch, useSelector } from "react-redux";
import { endpoints } from "./constants"
import { addProductCountToCart, setCartItems } from "./slice/cartSlice";

const useFetchCartItems = () => {

    const dispatch = useDispatch();

    const fetchCartItems = async () => {
        const fetchItemURL = endpoints.fetchCartItems.path;
        const apiData = await fetch(fetchItemURL , {
            method : endpoints.fetchCartItems.method,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token') || ''}`
            }
        })

        const data = await apiData.json();
        
        if(data.data){
            dispatch(setCartItems(data.data));
            dispatch(addProductCountToCart(data.data.length));
        }
        return data;
    }

    return {fetchCartItems};
}

export default useFetchCartItems;