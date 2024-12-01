import { useEffect, useState } from "react";

const checkImageExists = async (imageUrl) => {
    return new Promise((resolve) => {
        const img = new Image()
        img.src = imageUrl
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
    })
}

function ProductImage ({ productImagePath }) {
    const [imagePath, setImagePath] = useState('/images/products/image-not-available.png');

    useEffect(() => {
        const checkImage = async () => {
            const exists = await checkImageExists(productImagePath)
            if(exists) setImagePath(productImagePath)
        }
        checkImage()
    }, [productImagePath])

    return (
        <img src={imagePath} alt="Product"/>
    )
}

export default ProductImage