const handleBuyNow = (id) => {
    alert(`kupiono ${id}`);
};

const handleAddToCart = (id) => {
    alert(`dodano ${id} do koszyka`);
};

const eventHandlers = {
    buyNow: handleBuyNow,
    addToCart: handleAddToCart,
};

function Button({ handleEvent, id, text }) {

    const eventHandler = eventHandlers[handleEvent];

    return (
        <button onClick={() => eventHandler(id)}>{text}</button>
    );
}

export default Button;