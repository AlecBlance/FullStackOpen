import { useSelector } from "react-redux";

const Notification = ({ inDashboard }) => {
  const notification = useSelector((state) => state.notification);

  return (
    notification && (
      <div
        className={` mb-6 py-2 px-5 font-semibold flex items-center text- ${
          notification.error
            ? "bg-red-200 text-red-600"
            : "bg-green-200 text-green-600"
        } ${inDashboard === null && "fixed z-10 bottom-2"}`}
      >
        {notification.error ? (
          <svg
            className="h-8 w-8 mr-3"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <linearGradient
              id="linear-gradient"
              gradientUnits="userSpaceOnUse"
              x1="1.762"
              x2="22.238"
              y1="12"
              y2="12"
            >
              <stop offset="0" stopColor="#ed4424" />
              <stop offset="1" stopColor="#be1e2d" />
            </linearGradient>
            <g id="_13" data-name="13">
              <path
                d="m22.10352 11.5-4.61817-8a.99985.99985 0 0 0 -.86621-.5h-9.23779a.99985.99985 0 0 0 -.86621.5l-4.61914 8a1.002 1.002 0 0 0 0 1l4.61914 8a.99985.99985 0 0 0 .86621.5h9.23779a.99985.99985 0 0 0 .86621-.5l4.61817-8a.99963.99963 0 0 0 0-1zm-6.06152 7.5h-8.0835l-4.0415-7 4.0415-7h8.0835l4.041 7zm-5.042-6v-5a1 1 0 0 1 2 0v5a1 1 0 0 1 -2 0zm2.00488 3a1.00488 1.00488 0 1 1 -1.00488-1.00488 1.00809 1.00809 0 0 1 1.00488 1.00488z"
                fill="url(#linear-gradient)"
              />
            </g>
          </svg>
        ) : (
          <svg
            className="h-8 w-8 mr-3"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Flat_Color" fill="#20bf55" data-name="Flat Color">
              <path d="m12 22.75a10.75 10.75 0 0 1 0-21.5 10.53 10.53 0 0 1 4.82 1.15.75.75 0 0 1 -.68 1.34 9 9 0 0 0 -4.14-1 9.25 9.25 0 1 0 9.25 9.26 2 2 0 0 0 0-.25.75.75 0 1 1 1.5-.14v.39a10.76 10.76 0 0 1 -10.75 10.75z" />
              <path d="m11.82 15.41a.7.7 0 0 1 -.52-.22l-4.83-4.74a.75.75 0 0 1 0-1.06.77.77 0 0 1 1.07 0l4.29 4.23 9.65-9.49a.77.77 0 0 1 1.07 0 .75.75 0 0 1 0 1.06l-10.18 10a.74.74 0 0 1 -.55.22z" />
            </g>
          </svg>
        )}
        <p>{notification.message}</p>
      </div>
    )
  );
};

export default Notification;
