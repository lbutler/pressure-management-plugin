const MapPin = () => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 14 14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clip-rule="evenodd"
      d="m7 14s5-5 5-9c0-2.76142-2.23858-5-5-5s-5 2.23858-5 5c0 4 5 9 5 9zm0-6c1.65685 0 3-1.34315 3-3s-1.34315-3-3-3-3 1.34315-3 3 1.34315 3 3 3z"
      fill="currentColor"
      fill-rule="evenodd"
    />
  </svg>
);

const CogIcon = () => (
  <svg
    height="14"
    fill="#fff"
    viewBox="9 0 55 55"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M56.74,20.89l-1-2.31c3.33-7.53,3.11-7.75,2.46-8.41L54,6l-.42-.35h-.49c-.26,0-1,0-7.51,2.93l-2.38-1C40.09,0,39.77,0,38.87,0h-6c-.9,0-1.25,0-4.1,7.66l-2.37,1C22,6.78,19.45,5.84,18.75,5.84l-.56,0-4.58,4.49c-.7.65-.94.88,2.58,8.3l-1,2.3c-7.79,3-7.79,3.3-7.79,4.23v5.89c0,.92,0,1.25,7.82,4l1,2.29c-3.33,7.53-3.11,7.76-2.46,8.41L18,50l.42.37h.5c.25,0,1,0,7.5-3l2.38,1C31.9,56,32.21,56,33.12,56h6c.92,0,1.25,0,4.11-7.66l2.39-1c4.37,1.85,6.93,2.79,7.61,2.79l.57,0,4.62-4.52c.66-.66.89-.89-2.62-8.28l1-2.3c7.81-3,7.81-3.33,7.81-4.23V24.93C64.57,24,64.57,23.68,56.74,20.89ZM36,37.8A9.8,9.8,0,1,1,46,28,9.91,9.91,0,0,1,36,37.8Z" />
  </svg>
);

const WarningIcon = () => (
  <svg
    width="14"
    height="18"
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.721 14.9184L11.7228 1.00806C10.95 -0.336021 9.05002 -0.336018 8.2772 1.00806L0.278993 14.9184C-0.504795 16.2816 0.455921 18 2.00179 18H17.9982C19.5441 18 20.5048 16.2815 19.721 14.9184ZM11.5 4H8.5L9 12H11L11.5 4ZM10 16.5C10.9665 16.5 11.75 15.7165 11.75 14.75C11.75 13.7835 10.9665 13 10 13C9.0335 13 8.25 13.7835 8.25 14.75C8.25 15.7165 9.0335 16.5 10 16.5Z"
      fill="#FF9A5C"
    ></path>
  </svg>
);

const ChevronLeft = () => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 14 14"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clip-rule="evenodd"
      d="m6.82876 7 2.9238 3.3415-1.50515 1.317-4.07619-4.6585 4.07619-4.6585 1.50515 1.31701z"
      fill="currentColor"
      fill-rule="evenodd"
    />
  </svg>
);

export { MapPin, CogIcon, WarningIcon, ChevronLeft };
