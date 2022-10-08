const Club = ({ rotate }: { rotate?: boolean }) => {
  const transform: number = rotate ? 180 : 0;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      transform={`rotate(${transform})`}
    >
      <path
        d="M477.443 295.143a104.45 104.45 0 0 1-202.26 36.67c-.08 68.73 4.33 114.46 69.55 149h-177.57c65.22-34.53 69.63-80.25 69.55-149a104.41 104.41 0 1 1-66.34-136.28 104.45 104.45 0 1 1 171.14 0 104.5 104.5 0 0 1 135.93 99.61z"
        fill="black"
      ></path>
    </svg>
  );
};

export default Club;
