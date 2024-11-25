function Button({handleEvent, text}) {

    return (
        <button onClick={handleEvent}>{text}</button>
    )
}

export default Button