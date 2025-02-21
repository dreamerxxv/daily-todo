export default function Navbar() {
  return (
    <div className="w-[400px] md:w-[600px] lg:w-[800px] justify-between bg-gradient-to-r from-rose-300 to-purple-300 rounded-full isolate flex gap-x-6 overflow-hidden bg-gray-50 px-3 py-3.5 sm:px-3.5">
      <div className="flex flex-row justify-between gap-y-1">
        <p className="text-sm/6 ml-4 text-gray-900 text-left items-center">
          <strong className="font-extrabold text-xl">Daily Todo Note</strong>
        </p>
      </div>
      
        <span
          className="flex-none rounded-full mr-4 bg-gray-900 px-1.5 py-1 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
            />
          </svg>

          {/* Arrow Right */}
          {/* <span aria-hidden="true">&rarr;</span> */}
        </span>
    </div>
  );
}
