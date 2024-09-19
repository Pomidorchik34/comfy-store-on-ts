import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";

interface ProductAttributes {
  title: string;
  company: string;
  category: string;
  price: number;
  image: string;
}

interface Product {
  id: number;
  attributes: ProductAttributes;
}

interface ProductResponse {
  data: Product[];
}

function Home() {
  const [products, setProducts] = useState<ProductResponse>({ data: [] });
  const [category, setCategory] = useState<string>("all");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [company, setCompany] = useState<string>("all");
  const [price, setPrice] = useState<number>(100000);

  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  function handleSearch(event: React.MouseEvent<HTMLButtonElement>) {
    let copied = [...products.data];
    if (category !== "all") {
      copied = copied.filter((value) => {
        return (
          value.attributes.category.toLowerCase() === category.toLowerCase()
        );
      });
    }
    if (company !== "all") {
      copied = copied.filter((value) => {
        return value.attributes.company.toLowerCase() === company.toLowerCase();
      });
    }
    copied = copied.filter((value) => {
      return value.attributes.price <= price;
    });
    setFilteredData(copied);
  }

  let navigate = useNavigate();
  let cards = useRef<HTMLDivElement[]>([]);

  function onClicked(event: React.MouseEvent<HTMLDivElement>) {
    const id = (event.target as HTMLDivElement).id;
    console.log(id);
    localStorage.setItem("id", id);
    navigate("/details");
  }

  return (
    <>
      <div className="container root flex justify-center items-center mt-20 flex-col">
        <div className="container-filter flex flex-wrap items-center justify-center p-10 mr-[200px]">
          <form action="" className="">
            <label>
              Search Product
              <input type="text" className="input-filter" />
            </label>
            <label>
              Select Category
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                <option value="all">all</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </label>
            <label>
              Select Company
              <select
                value={company}
                onChange={(event) => {
                  setCompany(event.target.value);
                }}
              >
                <option value="all">all</option>
                <option value="Milacron Inc.">Milacron Inc.</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Homestead</option>
              </select>
            </label>
            <label>
              Sort by
              <select>
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </label>
          </form>
          <div className="bottom-container">
            <label className="range-label">
              Select priceㅤㅤㅤㅤㅤ{price / 100 + ".00$"}
              <input
                className="range range-primary in"
                onChange={(e) => {
                  setPrice(Number(e.target.value) * 1000);
                }}
                step={1}
                type="range"
              />
            </label>
            <label>
              Free Shipping
              <input className="chk" type="checkbox" name="" id="" />
            </label>
            <div className="btns">
              <button onClick={handleSearch} style={{ background: "#057aff" }}>
                SEARCH
              </button>
              <button style={{ background: "#c149ad" }}>RESET</button>
            </div>
          </div>
        </div>
        <div className="cards" ref={cards}>
          {!filteredData.length &&
            products.data.map((value, index) => {
              return (
                <div
                  onClick={onClicked}
                  key={index}
                  id={index.toString()}
                  className="card flex items-center gap-4"
                >
                  <img
                    id={index.toString()}
                    src={value.attributes.image}
                    alt=""
                    className="rounded-xl h-64 mt-4 md:h-48 object-cover"
                  />

                  <h2
                    id={index.toString()}
                    className="card-title capitalize tracking-wider pt-4"
                  >
                    {value.attributes.title}
                  </h2>
                  <span id={index.toString()}>
                    {value.attributes.price / 100 + "$"}
                  </span>
                </div>
              );
            })}
          {filteredData.length > 0 &&
            filteredData.map((value, index) => {
              return (
                <div
                  onClick={onClicked}
                  key={index}
                  id={index.toString()}
                  className="card flex items-center gap-4"
                >
                  <img
                    id={index.toString()}
                    src={value.attributes.image}
                    alt=""
                    className="rounded-xl h-64 mt-4 md:h-48 object-cover"
                  />

                  <h2
                    id={index.toString()}
                    className="card-title capitalize tracking-wider pt-4"
                  >
                    {value.attributes.title}
                  </h2>
                  <span id={index.toString()}>
                    {value.attributes.price / 100 + "$"}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
