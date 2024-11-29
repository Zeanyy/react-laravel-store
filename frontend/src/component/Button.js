const handleBuyNow = (id) => {
    alert(`kupiono ${id}`)
}

const handleAddToCart = (id) => {
    alert(`dodano ${id} do koszyka`)
}

const eventHandlers = {
    buyNow: handleBuyNow,
    addToCart: handleAddToCart,
}

function Button({ handleEvent, handleEventName, id, text }) {
    
    const eventHandler = handleEvent || eventHandlers[handleEventName];

    return (
        <button onClick={() => eventHandler(id)}>{text}</button>
    )
}

export default Button