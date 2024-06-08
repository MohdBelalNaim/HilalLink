const CircularIcon = ({ children, disabled, className = "bg-gray-400" }) => {
  return (
    <button
      disabled={disabled}
      className={`max-sm:bg-gray-400/25 grid place-items-center w-12 max-sm:w-10 aspect-square rounded-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400/50 text-white hover:bg-gray-500 active:scale-95 transition-transform ${className}`}
    >
      {children}
    </button>
  );
};

export default CircularIcon;
