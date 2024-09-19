import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import prod from "./products.json";
import "../index.css";

interface ProductAttributes {
  title: string;
  company: string;
  price: number;
  description: string;
  image: string;
}

interface ProductData {
  [key: string]: {
    attributes: ProductAttributes;
  };
}

function Details() {
  const [id, setId] = useState<string | number | null>(
    localStorage.getItem("id")
  );
  const [product, setProduct] = useState<ProductAttributes | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    } else if (prod.data[id]) {
      setProduct(prod.data[id].attributes);
    }
  }, [id, navigate]);

  const amount = useRef<HTMLSelectElement>(null);

  const notify = () => toast("Added to cart");

  return (
    <div className="mx-[183px] py-20">
      <div className="flex flex-col md:flex-row p-6 bg-background rounded-lg ">
        <div className="md:w-1/2">
          <img
            src={product?.image}
            width={512}
            height={384}
            className="h-[384px] rounded-lg w-[512px]"
            alt={product?.title}
          />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h2 className="capitalize text-3xl font-bold">{product?.title}</h2>
          <h3 className="text-xl text-neutral-content font-bold mt-2">
            {product?.company}
          </h3>
          <p className="text-lg font-semibold mt-4">
            {product?.price ? product.price / 100 + "$" : ""}
          </p>
          <p className="mt-6 leading-8">{product?.description}</p>
          <div className="mt-2"></div>
          <div className="mt-4">
            <label htmlFor="amount" className="block font-semibold text-muted">
              Amount
            </label>
            <select
              id="amount"
              ref={amount}
              className="mt-1 p-2 border border-border rounded-md w-[320px] h-[48px]"
            >
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-black btn-md mt-8" onClick={notify}>
            ADD TO BAG
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Details;
