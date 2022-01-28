import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import useDarkMode from "./hook/useDarkMode";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectRegion, setSelectRegion] = useState("");
  const [colorTheme, setTheme] = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const [filterSelectRegion, setFilterSelectRegion] =
    useState("Filter by Region");
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        // console.log(response.data);
        setCountries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCountries();
  }, []);
  useDarkMode();
  return (
    <div className="bg-[#fafafa] dark:bg-[#202c37] transition">
      <nav className="  h-20 flex items-center justify-center shadow-md bg-white dark:bg-[#2b3945] text-white">
        <div className="container px-4 md:px-0  mx-auto flex items-center justify-between ">
          <h1 className="font-bold text-2xl text-black dark:text-white">
            Where in the world?
          </h1>
          <button
            className="transition"
            onClick={() => {
              setTheme(colorTheme);
            }}
          >
            {colorTheme === "light" ? (
              <span>
                <i className="far fa-moon text-white"></i> Dark Mode
              </span>
            ) : (
              <span className="text-black">
                <i className="far fa-moon"></i> Light Mode
              </span>
            )}
          </button>
        </div>
      </nav>
      <div>
        <div className="container  mx-auto px-4 md:flex md:px-0  justify-between my-12 ">
          <label
            htmlFor="input"
            className="flex items-center justify-center shadow p-3 placeholder:text-gray-700 rounded-md w-full mb-10  md:w-[500px] bg-white dark:bg-[#2b3945] dark:placeholder:text-white"
          >
            {colorTheme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2.5 -2.5 24 24"
                width="24"
                fill="white"
              >
                <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-2.5 -2.5 24 24"
                width="24"
                fill="black"
              >
                <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"></path>
              </svg>
            )}

            <input
              name="input"
              className="border-none ml-2 flex-1 w-full outline-none  dark:bg-[#2b3945] dark:placeholder:text-white dark:text-white opacity-75"
              type="text"
              placeholder="Search for a country"
              onChange={(e) => {
                setSearchCountry(e.target.value);
                // console.log(searchCountry);
              }}
            />
          </label>
          <div className="relative">
            <button
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className=" flex items-center justify-between px-4 bg-white text-dark shadow-lg opacity-75 dark:bg-[#2b3945] dark:text-white text-opacity-75  h-12 w-44 rounded"
            >
              {" "}
              {filterSelectRegion}
              {isOpen === true ? (
                <i className="transition fas fa-angle-down rotate-180"></i>
              ) : (
                <i className="transition fas fa-angle-down"></i>
              )}
            </button>
            {isOpen && (
              <div className=" absolute flex items-start justify-center flex-col px-6 py-4 bg-white text-dark shadow-lg text-opacity-75  dark:bg-[#2b3945] dark:text-white   w-44 rounded top-14">
                <button
                  className="mb-1 w-full text-left "
                  onClick={() => {
                    setSelectRegion("Asia");
                    setFilterSelectRegion("Asia");
                    setIsOpen(false);
                  }}
                >
                  Asia
                </button>
                <button
                  className="mb-1 w-full text-left"
                  onClick={() => {
                    setSelectRegion("Europe");
                    setFilterSelectRegion("Europe");
                    setIsOpen(false);
                  }}
                >
                  Europe
                </button>
                <button
                  className="mb-1 w-full text-left"
                  onClick={() => {
                    setSelectRegion("America");
                    setFilterSelectRegion("Amerika");
                    setIsOpen(false);
                  }}
                >
                  America
                </button>
                <button
                  className="mb-1 w-full text-left"
                  onClick={() => {
                    setSelectRegion("Africa");
                    setFilterSelectRegion("Africa");
                    setIsOpen(false);
                  }}
                >
                  Africa
                </button>
                <button
                  className=" w-full text-left"
                  onClick={() => {
                    setSelectRegion("Oceania");
                    setFilterSelectRegion("Oceania");
                    setIsOpen(false);
                  }}
                >
                  Oceania
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="container min-h-screen mx-auto ">
          <div className="container pb-5 px-16  md:grid sm:grid  sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3   gap-10 xl:grid-cols-4 grid-flow-row">
            {countries
              .filter((value) => {
                if (searchCountry === "") {
                  return value;
                } else if (
                  value.name.common
                    .toLowerCase()
                    .includes(searchCountry.toLocaleLowerCase())
                ) {
                  return value;
                }
              })
              .filter((filtered) => {
                if (filtered.continents[0].includes(selectRegion)) {
                  return filtered;
                }
              })
              .map((country, index) => (
                <div
                  className="border box-border shadow-md rounded-lg overflow-hidden bg-white dark:border-none dark:bg-[#2b3945] mb-5 mx-auto max-w-[361px] md:mb-0"
                  key={index}
                >
                  <img
                    className="object-cover w-full  h-[220px]"
                    src={country.flags.svg}
                    alt=""
                  />
                  <div className="p-5 mb-6 ">
                    <h3 className="text-xl font-bold my-3 dark:text-white">
                      {country.name.common}
                    </h3>
                    <div>
                      <span className="font-semibold mr-1 dark:text-white ">
                        Population:
                      </span>{" "}
                      <span className="text-black dark:text-white dark:opacity-75">
                        {country.population.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold mr-1 dark:text-white">
                        Region:
                      </span>
                      <span className="text-black dark:text-white dark:opacity-75">
                        {country.region}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold mr-1 dark:text-white">
                        Capital:
                      </span>{" "}
                      <span className="text-black dark:text-white dark:opacity-75">
                        {country.capital}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          ;
        </div>
      </div>
    </div>
  );
}

export default App;
