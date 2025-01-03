import axios from "axios"

const handleBuyNow = (id) => {
    alert(`kupiono ${id}`)
}

const handleAddToCart = async (id) => {
    const token = localStorage.getItem('token')
    const [type, session] = (token) ? ['user', null] : ['session', localStorage.getItem('sessionId')]
    let url = `http://localhost:8000/api/cart/add/${id}/${type}`;
    if (session) { url += `/${session}` }
    await axios.post(url, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

const eventHandlers = {
    buyNow: handleBuyNow,
    addToCart: handleAddToCart,
}

function Button({ handleEvent, handleEventName, id, text, className }) {
    
    const eventHandler = handleEvent || eventHandlers[handleEventName];

    return (
        <button onClick={() => eventHandler(id)} className={className}>{text}</button>
    )
}

export default Button