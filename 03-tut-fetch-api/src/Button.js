const Button = ({ reqType, setReqType, buttonText }) => {
    return (
        <button
            className={reqType === buttonText ? 'selected' : null}
            type="button"
            onClick={() => setReqType(buttonText)}
        >
            {buttonText}
        </button>
    );
};

export default Button;
