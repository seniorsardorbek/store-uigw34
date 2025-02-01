/** @format */

import { Carousel } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../shared/axios.js';

export default function ProductDetails() {
    const [product, setProduct] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [orderQuantity, setOrderQuantity] = useState(1);
    const [orderStatus, setOrderStatus] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        api.get(`/products/${id}`)
            .then((response) => setProduct(response?.data?.data))
            .catch((error) => console.log(error));
        getComments();
    }, [id]);

    function getComments() {
        api.get(`/comments/${id}`)
            .then((response) => setComments(response?.data))
            .catch((error) => console.log(error));
    }

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;
        api.post(`/comments`, { message: newComment, productId: id })
            .then(() => {
                setNewComment('');
                getComments();
            })
            .catch((error) => console.log(error));
    };

    const handleOrder = () => {
        if (orderQuantity > product.quantity) {
            setOrderStatus('Insufficient stock.');
            return;
        }

        api.post(`/orders`, { products: [id], quantity: orderQuantity })
            .then(() => {
                setOrderStatus('Order placed successfully!');
                setProduct((prev) => ({ ...prev, quantity: prev.quantity - orderQuantity }));
            })
            .catch(() => setOrderStatus('Failed to place the order.'));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <Carousel className="h-80 w-full rounded-lg overflow-hidden">
                {product.images?.map((img, index) => (
                    <img key={index} src={`http://localhost:3000/${img}`} alt={product.name} className="h-full w-full object-cover" />
                ))}
            </Carousel>

            <div className="mt-6">
                <p className="text-lg font-semibold">Price: {product.price}</p>
                <p className="text-gray-600">Color: {product.color}</p>
                <p className="text-gray-600">Quantity: {product.quantity} available</p>
                <p className="text-gray-600">Category: {product.categoryId?.title}</p>
                <p className="text-gray-500 text-sm mt-2">Created at: {new Date(product.created_at).toLocaleDateString()}</p>
                <p className="text-gray-500 text-sm">Updated at: {new Date(product.updated_at).toLocaleDateString()}</p>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium">Quantity:</label>
                <input type="number" value={orderQuantity} min="1" max={product.quantity} onChange={(e) => setOrderQuantity(parseInt(e.target.value))} className="border rounded px-2 py-1 w-20" />
                <button onClick={handleOrder} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Place Order
                </button>
                {orderStatus && <p className="mt-2 text-sm text-green-600">{orderStatus}</p>}
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold">Comments</h2>
                <div className="space-y-4">
                    <div className="mt-4 flex gap-2">
                        <input type="message" value={newComment} onChange={(e) => setNewComment(e.target.value)} className="border p-2 flex-1 rounded-lg" placeholder="Write a comment..." />
                        <button onClick={handleCommentSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            Submit
                        </button>
                    </div>
                    {[...comments]?.reverse().map((comment, index) => (
                        <div key={index} className="border p-4 rounded-lg bg-gray-50 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-xl font-semibold">{comment.userId?.fullname.charAt(0)}</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{comment.userId.fullname}</h3>
                                    <p className="text-sm text-gray-500">
                                        @{comment.userId.username} ({comment.userId.role})
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-2">{comment.message}</p>
                            <p className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
