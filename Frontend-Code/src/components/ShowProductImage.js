import { IoClose } from "react-icons/io5";

const ShowProductImage = ({image , onClose}) => {
    console.log(image)
    
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center p-[120] bg-slate-400 bg-opacity-[0.4]">
        
            <div className="relative ">
                <div className="absolute hover:bg-red-400 hover:rounded-full right-2 top-2"> 
                    <IoClose className='h-7 w-7 hover:text-white' onClick={() => onClose(false)}/>
                </div>
                <div className="bg-white h-[500] w-[500] flex justify-center items-center rounded-lg shadow-lg overflow-hidden">
                    <img src={image} alt={image} className="max-h-full max-w-full object-contain"/>
                </div>
            </div>
            
            
        </div>
    )
}

export default ShowProductImage;