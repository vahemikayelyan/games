const Diamond = ({ rotate }: { rotate?: boolean }) => {
  const transform: number = rotate ? 180 : 0;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      transform={`rotate(${transform})`}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M431.76 256c-69 42.24-137.27 126.89-175.76 224.78C217.51 382.89 149.25 298.24 80.24 256c69-42.24 137.27-126.89 175.76-224.78C294.49 129.11 362.75 213.76 431.76 256z"
        fill="red"
      />
    </svg>
  );
};

export default Diamond;
