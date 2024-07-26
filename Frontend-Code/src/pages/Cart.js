import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formatNumberToCurrency } from '../utils/formatNumberToCurrency';
import { MdDelete } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { endpoints } from '../utils/constants';
import useFetchCartItems from '../utils/useFetchCartItems';

const Cart = () => {

    const [items , setItems] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0);
    const [discount , setDiscount] = useState(0);

    const cartItems = useSelector(state => state.cartDetails.cartItems);

    console.log("CartItems",items);

    const {fetchCartItems} = useFetchCartItems();

    const calculateTotalPrice = () => {

        const finalAmount = items.reduce((sum , item) => {
            return sum + (item.productId.sellingPrice * item.quantity)
        } , 0);
        
        setTotalPrice(finalAmount);
    }

    const calculateDiscount = () => {

        const finalAmount = items.reduce((sum , item) => {
            return sum + (( item.productId.price - item.productId.sellingPrice ) * item.quantity)
        } , 0);
        
        setDiscount(finalAmount);
    }

    useEffect(() => {
        setItems(cartItems);
    } , [cartItems])

    useEffect(() => {
        calculateTotalPrice();
        calculateDiscount();
    } , [items])

    

    const updateCartItemQuantity = async (product , quantity) => {
        const updateCartItemURL = endpoints.updateCartItem.path;
        const apiData = await fetch(updateCartItemURL , {
            method : endpoints.updateCartItem.method,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token') || ''}`
            },
            body : JSON.stringify({
                productId : product.productId._id,
                quantity,
            })
        })

        const data = await apiData.json();
        if(data.success){
            fetchCartItems();
        }
    }

    const handleIncrementInQuantity = (product) => {
        const quantity = product.quantity+1;
        updateCartItemQuantity(product , quantity);
    }

    const handleDecrementInQuantity = (product) => {
        if(product.quantity >= 2){
            const quantity = product.quantity-1;
            updateCartItemQuantity(product , quantity);
        }
        
    }

    const handleDeleteItem = async (product) => {
        const removeCartItemURL = endpoints.removeCartItem.path;
        const apiData = await fetch(removeCartItemURL , {
            method : endpoints.removeCartItem.method,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('token') || ''}`
            },
            body : JSON.stringify({
                productId : product.productId._id,
            })
        })

        const data = await apiData.json();
        if(data.success){
            fetchCartItems()
        }
    }


    const IsdeliveryChargeable = totalPrice >= 200 ? false : true;
    const deliveryCharges = 99;

  return (items.length) 
            ? 
            (
                <div className='min-h-screen overflow-y-auto grid grid-cols-3 mx-20 bg-slate-100'>
                    {/** showing products */}
                    <div className='col-span-2 h-full' >
                        {
                            items.map(item => {
                                return (
                                    <div key={item._id} className='flex h-40 w-full bg-white m-4 shadow-sm border rounded-sm'>
                                        <div className='w-[220px] h-full flex justify-center p-2 bg-gray-200 rounded-sm'>
                                            <img src={item?.productId?.productImage[0]} alt='product-image' className='h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='h-38 m-4 mx-6 w-full relative'>
                                            <p className='text-2xl font-normal text-ellipsis line-clamp-1'>{item?.productId?.productName}</p>
                                            <p className='text-sm text-slate-400'>{item?.productId?.category}</p>
                                            <div className='flex gap-2'>
                                                <p className="text-green-500 text-xl my-2">{formatNumberToCurrency(item?.productId?.sellingPrice)}</p>
                                                <p className="text-slate-400 line-through text-xl my-2">{formatNumberToCurrency(item?.productId?.price)}</p>
                                            </div>
                                            
                                            <div className='flex my-2'>
                                                <button className='border border-red-500 h-6 w-6 rounded-md flex items-center justify-center pb-[2px]' onClick={() => handleDecrementInQuantity(item)}>-</button>
                                                <span className='mx-2 text-md'>{item?.quantity}</span>
                                                <button className='border border-green-500 h-6 w-6 rounded-md flex items-center justify-center pb-[2px]' onClick={() => handleIncrementInQuantity(item)}>+</button>
                                            </div>
                                            <div className='absolute top-1 right-1 hover:bg-red-400 rounded-full p-1 hover:text-white text-red-500' onClick={() => handleDeleteItem(item)}>
                                                < MdDelete className='text-xl'/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/** billing section */}
                    <div className='col-span-1'>
                        <div className='mx-10 bg-white h-[320px] my-4 rounded-sm'>
                            <div className='h-12 flex items-center border-b border-gray-200'>
                                <p className='text-slate-500 text-xl font-semibold p-2 ml-6'>PRICE DETAILS</p>
                            </div>
                            <div className='mx-8'>
                                <div className='my-5 flex justify-between'>
                                    <p className='text-lg'>Price</p>
                                    <p className='text-lg'>{formatNumberToCurrency(totalPrice)}</p>
                                </div>
                                <div className='my-5 flex justify-between'>
                                    <p className='text-lg'>Discount</p>
                                    <p className='text-lg text-green-500'>-{formatNumberToCurrency(discount)}</p>
                                </div>
                                <div className='my-5 flex justify-between'>
                                    <p className='text-lg'>Delivery Charges</p>
                                    {
                                        (!IsdeliveryChargeable)
                                        ?
                                        <p className='text-lg text-green-500'>Free</p>
                                        :
                                        <p className='text-lg text-green-500'>{formatNumberToCurrency(deliveryCharges)}</p>
                                    }
                                    
                                </div>
                                <div className='border-y border-gray-200 border-dashed flex justify-between py-4'>
                                    <p className='text-lg'>Total Amount</p>
                                    <p className='text-lg'>{formatNumberToCurrency(totalPrice + deliveryCharges)}</p>
                                </div>
                                <div className='my-2'>
                                    <p className='text-green-600'>You will save {IsdeliveryChargeable ? formatNumberToCurrency(discount) : formatNumberToCurrency(discount + deliveryCharges) } on this order</p>
                                </div>
                            </div>
                        </div>
                        <div className='h-10 mx-10 bg-green-500 rounded-sm flex justify-center items-center'>
                            <button className='text-md font-medium tracking-widest text-white'>PLACE ORDER </button>
                        </div>
                        <div className='mx-10 my-10 flex'>
                            <AiFillSafetyCertificate className='h-14 w-14 ml-3'/>
                            <p className='ml-2 flex items-center text-sm text-slate-500 font-semibold'>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
                        </div>
                    </div>
                </div>
            )
            :
            (
                <div className='min-h-screen mx-[630px] bg-slate-100 mt-[30px]'>
                    <p className='text-xl text-slate-400 tracking-wider'>Cart is Empty...</p>
                </div> 
            )
}

export default Cart
