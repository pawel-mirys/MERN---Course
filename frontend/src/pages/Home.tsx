import { Row, Col } from 'react-bootstrap';
import Product from '@/components/Product';
import { useGetProductsQuery } from '@/store/apis/productsApi';

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const productsToRender = (): React.ReactNode => {
    let content: JSX.Element = <></>;

    if (isLoading) {
      content = <h2>fetching data...</h2>;
    } else if (error) {
      if ('status' in error) {
        const errMsg =
          'error' in error ? error.error : JSON.stringify(error.data);
        content = <h2>{errMsg}</h2>;
      }
    } else {
      content = (
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
    }

    return content;
  };

  return <>{productsToRender()}</>;
};

export default Home;
