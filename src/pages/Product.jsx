import { Carousel } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../shared/axios.js";

export default function ProductDetails() {
  const [product, setProduct] = useState({
    _id: "6717bc6b1c98e91566382063",
    name: "IPhone 15 pro",
    price: "1000$",
    images: ["1729608811554-_ (1).jpeg"],
    quantity: 100,
    color: "white",
    categoryId: {
      title: "Xiaomi",
      description: "All xiaomi products",
    },
    created_at: "2024-10-22T14:53:31.559Z",
    updated_at: "2024-10-22T14:53:31.559Z",
  });

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const id = useParams().id;

  function getComments () {
    api.get(`/comments/${id}`)
    .then((response) => setComments(response?.data))
    .catch((error) => console.log(error));
  }
  useEffect(() => {
    api.get(`/products/${id}`)
      .then((response) => setProduct(response?.data?.data))
      .catch((error) => console.log(error));
getComments()
   
  }, [id]);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    api.post(`/comments`, { message: newComment , productId: id })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment("");
        getComments()

      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <Carousel className="h-80 w-full rounded-lg overflow-hidden">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:3000/${img}`}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ))}
      </Carousel>
      <div className="mt-6">
        <p className="text-lg font-semibold">Price: {product.price}</p>
        <p className="text-gray-600">Color: {product.color}</p>
        <p className="text-gray-600">Quantity: {product.quantity} available</p>
        <p className="text-gray-600">Category: {product.categoryId.title}</p>
        <p className="text-gray-500 text-sm mt-2">
          Created at: {new Date(product.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm">
          Updated at: {new Date(product.updated_at).toLocaleDateString()}
        </p>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Add to Cart
      </button>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Comments</h2>
        <div className="mt-4">
          {comments.map((comment, index) => (
            <div key={index} className="border-b py-2">
              <p>{comment?.message}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            type="message"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="border p-2 flex-1 rounded-lg"
            placeholder="Write a comment..."
          />
          <button 
            onClick={handleCommentSubmit} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
