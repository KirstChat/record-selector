const Button = ({ label, clickHandler, color }) => {
    return (
        <button
            className={`font-mono bg-${color}-700 hover:bg-${color}-800 focus:bg-${color}-800 rounded-lg shadow-xl shadow-${color}-950/50 py-2 px-6 text-white`}
            onClick={clickHandler}
        >
            {label}
        </button>
    );
};

export default Button;
