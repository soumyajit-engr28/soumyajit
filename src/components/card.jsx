const Card = ({ children }) => {
  return (
    <div className="
    bg-white/10 backdrop-blur-xl 
    border border-white/10 
    rounded-2xl p-5 
    shadow-lg 
    hover:shadow-blue-500/20 
    hover:-translate-y-1 hover:scale-[1.02] 
    transition duration-300">
      {children}
    </div>
  );
};

export default Card;