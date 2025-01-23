/** @format */
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import api from '../shared/axios.js';
const Intro = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        api.get('/products')
            .then((products) => setProducts(products?.data?.data))
            .catch((error) => console.log(error));
    }, []);
    console.log(products);

    return (
        <div className='container flex gap-3 mx-auto m-4'>
            {products.map((product) => (
                <Card className="mt-6 w-96">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img
                         src={'http://localhost:3000/' + product.images[0]}
                            alt="card-image"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {product?.name} {product?.price}
                        </Typography>
                        <Typography>
                            {
                                product?.color
                            }
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">

                        <Button>
                            <Link>
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default Intro;
