import React from "react";
import { Search, MessageCircle, Heart, Share2 } from "lucide-react";
import stock1 from "../assets/stock-1.jpg";
import stock2 from "../assets/stock-2.jpg";
import stock3 from "../assets/stock-3.jpg";
import stock4 from "../assets/stock-4.jpg";
const categories = ["Trending", "Hot News", "Popular", "Latest"];

const posts = [
  {
    id: 1,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image: stock1,
  },
  {
    id: 2,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock2,
  },
  {
    id: 3,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock3,
  },
  {
    id: 4,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image: stock4,
  },
  {
    id: 5,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock3
  },{
    id: 1,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image: stock1,
  },
  {
    id: 2,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock2,
  },
  {
    id: 3,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock3,
  },
  {
    id: 4,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image: stock4,
  },
  {
    id: 5,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock3
  },{
    id: 1,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image: stock1,
  },
  {
    id: 2,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock2,
  },
  {
    id: 3,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock3,
  },
  {
    id: 4,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image: stock4,
  },
  {
    id: 5,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock3
  },{
    id: 1,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image: stock1,
  },
  {
    id: 2,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock2,
  },
  {
    id: 3,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock3,
  },
  {
    id: 4,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image: stock4,
  },
  {
    id: 5,
    title: "EUR/JPY 12HOURS Aixa by Japsku Jnpade",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry...",
    image:stock3
  },
];

const WatchList: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white p-6 py-20">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6">Community</h1>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-800 p-3 rounded-lg mb-6 w-full md:w-1/2">
        <Search className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Enter Your Email Here"
          className="bg-transparent outline-none text-white w-full"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm ${
              category === "Hot News"
                ? "bg-indigo-600"
                : "bg-gray-700 hover:bg-indigo-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-900 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-400 text-sm">{post.description}</p>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>Comment</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Like</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
