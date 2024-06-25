
import {toast} from 'react-toastify';


const uploadImage = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'mern_preset');

    try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: data
          }
        );
       
        const cloudinaryImageFile = await res.json();
        // console.log("File", file)

        return cloudinaryImageFile;

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

export default uploadImage