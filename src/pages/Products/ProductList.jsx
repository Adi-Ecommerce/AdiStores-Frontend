import React,{useState, useEffect} from 'react'
import { Button } from '../../components/ui/button'
import axios from "axios";
function ProductList() {
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BackendURL}/api/product`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    function truncateWords(text, wordLimit) {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product, i) => (
              <div
                  key={i}
                  className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col items-center text-center"
              >
                  <img
                      src={product.image}
                      alt="Product"
                      className="w-32 h-32 object-cover mb-3 rounded-md object-top"
                  />
                  <p className="font-medium text-gray-800">{truncateWords(product.name, 5)}</p>
                  <p className="text-sm text-gray-500 mb-3">{product.price}</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                      View Details
                  </Button>
              </div>
          ))}
      </div>
  )
}

export default ProductList
