import { useState } from 'react'
import img1 from '../assets/banner/img1.webp'
import img2 from '../assets/banner/img2.webp'
import img3 from '../assets/banner/img3.jpg'
import img4 from '../assets/banner/img4.jpg'
import img5 from '../assets/banner/img5.webp'

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


const BannerProduct = () => {

    const [translateXBy , setTranslateXBy] = useState(0)
    
    const desktopImages = [
        img1,
        img2,
        img3,
        img4,
        img5
    ]

    const desktopImagesLength = desktopImages.length;

    const handleTransformBannerBack = () => {
        if(translateXBy != 0) {
            setTranslateXBy(prev => prev-100)
        }
        else{
            setTranslateXBy((desktopImagesLength-1)*100)
        }
        
    }

    const handleTransformBannerForward = () => {
        

        if(translateXBy < (desktopImagesLength-1)*100) {
            setTranslateXBy(prev => prev+100)
        }
        else{
            setTranslateXBy(0)
        }
        
    }

    return (
        <div className="h-full w-full">
            <div className="relative h-[350px] w-[1400px] mx-10 my-10">
                <div className='flex h-full w-full overflow-hidden shadow-md'>
                    {
                        desktopImages.map((url , idx) => {
                            return (
                                <div className='min-h-full min-w-full' style={{transform : `translateX(${-translateXBy}%)`}}>
                                    <img src={url} className='h-full w-full object-cover'/>
                                </div>
                                
                            )
                        })
                    }
                </div>
                
                
                <div className='absolute w-full top-[160px]'>
                    <div className='w-full flex justify-between'>
                        <div className='h-8 w-8 rounded-full bg-white flex justify-center items-center ml-4 pr-1'>
                            <IoIosArrowBack className='h-full w-full' onClick={handleTransformBannerBack}/>
                        </div>
                        <div className='h-8 w-8 rounded-full bg-white flex justify-center items-center mr-4 pl-1'>
                            <IoIosArrowForward className='h-full w-full' onClick={handleTransformBannerForward}/>
                        </div>
                        
                        
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default BannerProduct

