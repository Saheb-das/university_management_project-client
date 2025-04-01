const TypingAnimation = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] px-4 py-2 rounded-lg bg-muted">
        <div className="flex space-x-2">
          <div
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingAnimation;
