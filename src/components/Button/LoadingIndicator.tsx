const LoadingIndicator = () => {
  return (
    <svg
      data-testid="loading-indicator"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="14"
      height="14"
      viewBox="0 0 70 50"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <circle fill="currentColor" stroke="none" cx="15" cy="25" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill="currentColor" stroke="none" cx="35" cy="25" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill="currentColor" stroke="none" cx="55" cy="25" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  );
};

export { LoadingIndicator };
