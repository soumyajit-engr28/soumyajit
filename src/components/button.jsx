const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full py-2 rounded-xl 
        bg-linear-to-r from-orange-500 to-red-500 
        hover:scale-105 
        transition transform duration-300 
        font-semibold
      "
    >
      {text}
    </button>
  );
};

export default Button;