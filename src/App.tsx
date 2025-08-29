import "./index.css";
import { useState, useEffect, type MouseEventHandler } from "react";

interface CoffeeListing {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number | null;
  votes: number;
  popular: boolean;
  available: boolean;
}

function App() {
  const [coffees, setCoffees] = useState<CoffeeListing[]>([]);
  const [data, setData] = useState<CoffeeListing[]>([]);
  const [selected, setSelected] = useState("all");

  const fetchData = async () => {
    const data = await fetch(
      "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json"
    );
    return await data.json();
  };

  const handleButtonClick = (buttonName: string)=> {

    if (buttonName === "all") {
      setCoffees(data);
      setSelected("all")
    } else if (buttonName === "available") {
      setCoffees(data.filter((coffee) => coffee.available));
      setSelected("available")
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setData(data);
      setCoffees(data);
    };
    loadData();
  }, []);

  return (
    <main className="w-full min-h-screen font-dm-sans flex flex-col items-center text-5xl font-bold bg-[#121315] ">
      <div className="bg-[url('/bg-cafe-sm.jpg')] md:bg-[url('/bg-cafe-lg.jpg')] bg-no-repeat w-full bg-cover h-100 flex justify-center pt-40  "></div>
      <section className="relative md:-top-40 -top-80 bg-[#1c1d1f] md:w-5/6 w-16/17 flex flex-col items-center p-2 h-fit rounded-xl mb-10 md:mb-40 overflow-x-hidden">
        <div className="flex flex-col justify-center items-center bg-[url('/vector.svg')] bg-no-repeat  md:bg-size-[300px] h-48 bg-right p-1 pt-40">
          <h1 className="text-white mb-3 text-4xl">Our Collection</h1>
          <p className="text-lg md:text-xl text-[#4D5562] text-center md:w-2xl w-full">
            Introducing our Coffee Collection, a selection of unique coffees
            from different roast types and origins, expertly roasted in small
            batches and shipped fresh weekly.
          </p>
        </div>
        <div className="flex gap-4 justify-center mt-30">
          <button className={`text-white p-2 text-xl ${selected === "all" ? "bg-[#6F757C] rounded-md" : ""} `}  onClick={() => handleButtonClick("all")}>All Products</button>
          <button className={`text-white p-2 text-xl ${selected === "available" ? "bg-[#6F757C] rounded-md" : ""} `} onClick={() => handleButtonClick("available")}>Available Now</button>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-20 mt-20 pb-10">
          {coffees.map((coffee) => (
            <div key={coffee.id} className="flex flex-col gap-1">
              <div>
                <div className="relative ">
                  <img
                    src={coffee.image}
                    alt={coffee.name}
                    className=" md:w-90 rounded-lg mb-2"
                  />
                  {coffee.popular && (
                    <div className="absolute top-4 left-4 text-sm bg-[#F6C768] p-1.5 rounded-full w-20 flex items-center justify-center">
                      Popular
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-white text-lg">{coffee.name}</h2>
                  <p className="bg-[#BEE3CC] text-lg p-1 rounded-sm">
                    {coffee.price}
                  </p>
                </div>
                <div className="flex justify-between text-lg text-white">
                  {coffee.rating !== null ? (
                    <div className="flex">
                      <img className="w-6" src="/Star_fill.svg" alt="Star" />
                      {coffee.rating} ({coffee.votes} votes)
                    </div>
                  ) : (
                    <>
                      <img className="w-6" src="/Star.svg" alt="Star" />
                      No rating
                    </>
                  )}
                  {!coffee.available && (
                    <p className="text-red-500">Sold out</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
