import { Row, Col } from 'react-bootstrap';
import Product from '@/components/Product';
import { useEffect, useState } from 'react';
import { ProductType } from '@/types';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<ProductType[]>('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products?.map((product) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
