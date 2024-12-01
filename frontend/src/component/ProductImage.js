import { useEffect, useState } from "react";

const checkImageExists = async (imageUrl) => {
    return new Promise((resolve) => {
        const img = new Image()
        img.src = imageUrl
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
    })
}

function ProductImage ({ productImagePath, className }) {
    const [imagePath, setImagePath] = useState('')

    useEffect(() => {
        const checkImage = async () => {
            const exists = await checkImageExists(productImagePath)
            if (exists) {
                setImagePath(productImagePath)
            } else {
                setImagePath('/images/products/image-not-available.png')
            }
        }
        checkImage();
    }, [productImagePath])

    return (
        <div>
            <img src={imagePath} alt="Product" className={className}/>
        </div>
    );
};

export default ProductImage