import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import getBaseUrl from "../../utils/baseURL";
import { MdIncompleteCircle } from "react-icons/md";
import RevenueChart from "./RevenueChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {/* Summary Cards */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Products",
            value: data?.totalBooks,
            color: "purple",
            icon: (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            ),
          },
          {
            label: "Total Sales",
            value: `$${data?.totalSales}`,
            color: "green",
            icon: (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            ),
          },
          {
            label: "Trending Books in This Month",
            value: data?.trendingBooks,
            extra: "(13%)",
            color: "red",
            icon: (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            ),
          },
          {
            label: "Total Orders",
            value: data?.totalOrders,
            color: "blue",
            icon: <MdIncompleteCircle className="h-6 w-6" />,
          },
        ].map(({ label, value, extra, color, icon }, i) => (
          <div
            key={i}
            className="flex items-center p-6 bg-white shadow rounded-xl">
            <div
              className={`inline-flex items-center justify-center h-14 w-14 text-${color}-600 bg-${color}-100 rounded-full mr-4`}>
              {icon}
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-800">
                {value}
              </div>
              {extra && (
                <div className="text-sm text-gray-500 font-medium">{extra}</div>
              )}
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Grid Area */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        {/* Revenue Chart */}
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-xl">
          <div className="px-6 py-4 font-semibold border-b text-gray-700">
            Orders per Month
          </div>
          <div className="p-4 flex-grow bg-gray-50 rounded-b-xl">
            <RevenueChart />
          </div>
        </div>

        {/* Orders Left */}
        <div className="flex items-center p-6 bg-white shadow rounded-xl">
          <div className="inline-flex items-center justify-center h-14 w-14 text-yellow-600 bg-yellow-100 rounded-full mr-4">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6">
              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                fill="#fff"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-800">02</div>
            <div className="text-sm text-gray-500">Orders left</div>
          </div>
        </div>

        {/* Website Visits */}
        <div className="flex items-center p-6 bg-white shadow rounded-xl">
          <div className="inline-flex items-center justify-center h-14 w-14 text-teal-600 bg-teal-100 rounded-full mr-4">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-800">139</div>
            <div className="text-sm text-gray-500">
              Website visits (last day)
            </div>
          </div>
        </div>

        {/* Users by Average Order */}
        <div className="row-span-3 bg-white shadow rounded-xl">
          <div className="flex items-center justify-between px-6 py-4 font-semibold border-b text-gray-700">
            <span>Users by Average Order</span>
            <button
              className="flex items-center text-sm text-gray-500 hover:text-gray-600"
              aria-haspopup="true">
              Descending
              <svg
                className="ml-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto max-h-96 p-4 space-y-4">
            {[
              ["Annette Watson", 9.3, "women/82"],
              ["Calvin Steward", 8.9, "men/81"],
              ["Ralph Richards", 8.7, "men/80"],
              ["Bernard Murphy", 8.2, "men/79"],
              ["Arlene Robertson", 8.2, "women/78"],
              ["Jane Lane", 8.1, "women/77"],
              ["Pat Mckinney", 7.9, "men/76"],
              ["Norman Walters", 7.7, "men/75"],
            ].map(([name, score, img], i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://randomuser.me/api/portraits/${img}.jpg`}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <span className="text-gray-700">{name}</span>
                </div>
                <span className="font-semibold text-gray-800">{score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder Chart */}
        <div className="flex flex-col row-span-3 bg-white shadow rounded-xl">
          <div className="px-6 py-4 font-semibold border-b text-gray-700">
            Students by Type
          </div>
          <div className="flex items-center justify-center flex-grow bg-gray-100 border-2 border-gray-200 border-dashed p-10 text-gray-400 text-xl">
            Chart
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="text-right text-sm mt-10 text-gray-500">
        <span>
          Recreated on Codepen with{" "}
          <a
            href="https://tailwindcss.com/"
            className="text-teal-500 hover:underline">
            Tailwind CSS
          </a>{" "}
          by Azri Kahar. Original design by{" "}
          <a
            href="https://dribbble.com/shots/10711741-Free-UI-Kit-for-Figma-Online-Courses-Dashboard"
            className="text-purple-500 hover:underline">
            Chili Labs
          </a>
        </span>
      </footer>
    </>
  );
};

export default Dashboard;
