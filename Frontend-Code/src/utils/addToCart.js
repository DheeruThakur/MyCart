import { endpoints } from "./constants";
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import { addProductCountToCart } from "./slice/cartSlice";
import useFetchCartItems from "./useFetchCartItems";

const useAddToCart = () => {

    const dispatch = useDispatch();
    const {fetchCartItems} = useFetchCartItems();

    const addToCart = async (e , productId) => {
        e.preventDefault();
        const addToCartURL = endpoints.addToCart.path;
        try {
    
            const apiData = await fetch(addToCartURL , {
                method : endpoints.addToCart.method,
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token') || ''}`
                },
                body : JSON.stringify({
                    productId
                })
            })
        
            const result = await apiData.json();
        
            if(result.success){
                toast.success(result.message);
                fetchCartItems();
                // dispatch(addProductCountToCart(1));
                return result.data;
            }
            else {
                throw new Error(result.message || 'Failed to add product to cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return error.message;
        }
    }

    return {addToCart}
}


export default useAddToCart