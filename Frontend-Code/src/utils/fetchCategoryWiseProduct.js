import { endpoints } from "./constants"


const fetchCategoryWiseProduct = async (category) => {

    const fetchURL = endpoints?.fetchCategoryWiseProduct?.path;

    const result = await fetch(fetchURL , {
        method : endpoints?.fetchCategoryWiseProduct?.method,
        headers : {
            'Content-Type' : "application/json"
        },
        body : JSON.stringify({
            category 
        })
    })
    const data = await result.json();
    return data;
}

export default fetchCategoryWiseProduct