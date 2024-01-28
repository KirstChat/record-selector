const Button = ({ clickHandler, color, label }) => {
    return (
        <button
            className={`font-mono font-bold bg-${color}-700 hover:bg-${color}-800 focus:bg-${color}-800 rounded shadow-xl shadow-${color}-950/50 py-2 px-6 text-white text-sm md:text-lg`}
            onClick={clickHandler}
        >
            {label}
        </button>
    );
};

export default Button;
