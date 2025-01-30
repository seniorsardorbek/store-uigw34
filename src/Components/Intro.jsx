/** @format */
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Radio ,Input} from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"
import api from '../shared/axios.js';
const Intro = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({ category: '' , s :""});
    const navigate = useNavigate()
    useEffect(() => {
        api.get(`/products?${data?.category ? `category=${data.category}` : ''}${data?.s ? `s=${data.s}` : ''}`)
            .then((products) => setProducts(products?.data?.data))
            .catch((error) => console.log(error));
    }, [data.category , data.s]);
    useEffect(() => {
        api.get('/category')
            .then((products) => setCategories(products?.data?.data))
            .catch((error) => console.log(error));
    }, []);
    console.log(products);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };
    console.log(data);
    return (
        <div className="container flex flex-col gap-3 mx-auto m-4">
             <Input  onChange={handleChange} name='s'  label="Search with name" />
             <div className='flex '>

            <div className="flex flex-col w-[20%]">
                <Radio onChange={handleChange} name={'category'} value={''}  label={"All"} />
                {categories.map((category) => (
                    <Radio onChange={handleChange} name={'category'} value={category?._id} label={category?.title} />
                ))}
            </div>
            <div className="flex flex-wrap gap-10">
                {products.map((product) => (
                    <Card onClick={() => navigate('products/' + product?._id)} className="mt-6 w-96">
                        <CardHeader color="blue-gray" className="relative h-56">
                            <img src={'http://localhost:3000/' + product.images[0]} alt="card-image" />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {product?.name} {product?.price}
                            </Typography>
                            <Typography>{product?.color}</Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button>Read More</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
             </div>
        </div>
    );
};

export default Intro;
