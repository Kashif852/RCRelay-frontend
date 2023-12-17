import React, { useEffect } from 'react';
import { Carousel, Card, Row, Button, List, Col, Typography } from 'antd';
import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../services/productService';
import { fetchProducts } from '../../redux/products/productSlice';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productsStatus = useSelector((state) => state.products.status);
  useEffect(() => {
    if (products.length === 0 && productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, products, productsStatus]);
  
  const specialOffers = [
    {
      id: 1,
      title: '3 for 2 Deal on Apple TVs',
      description: 'Buy 3 Apple TVs for the price of 2!'
    },
    {
      id: 2,
      title: 'Super iPad Bulk Discount',
      description: 'Buy more than 4 Super iPads and the price drops to $499.99 each!'
    },
    {
      id: 3,
      title: 'Free VGA Adapter',
      description: 'Receive a free VGA adapter with every MacBook Pro purchase.'
    },
  ];
  
  
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  },[dispatch,products]);

  return (
    <div className="homepage">
      <Carousel autoplay className="hero-carousel">
      <div>
          <img src="https://ik.imagekit.io/igwjlcyu8dw/deal3_KYhHi2nNkz.png?updatedAt=1702807110670" alt="Free VGA Adapter with MacBook Pro" />
        </div>
        <div>
          <img src="https://ik.imagekit.io/igwjlcyu8dw/deal1_iSCLzKEp5.png?updatedAt=1702807130167" alt="3 for 2 Apple TVs Deal" />
        </div>
        <div>
          <img src="https://ik.imagekit.io/igwjlcyu8dw/deal2_UgdZMQ63v.png?updatedAt=1702807134619" alt="Super iPad Bulk Discount" />
        </div>
      </Carousel>

       <div className="content-section">
        <Title level={2} className="section-title">Featured Products</Title>
        <Row gutter={[16, 16]}> 
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product.id}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.imageUrl} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />}
              >
                <Meta title={product.name} description={product.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="special-offers">
        <Title level={2}>Special Offers</Title>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={specialOffers}
          renderItem={item => (
            <List.Item>
              <Card title={item.title}>
                <p>{item.description}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>

      <div className="about-section">
        <h2>About Relay Computer Store</h2>
        <p>Discover the latest in electronic & smart appliance technology with Relay.</p>
      </div>

      <div className="call-to-action">
      <Link to="/products">
      <Button type="primary" size="large">
        Explore Products
      </Button>
    </Link>
      </div>
    </div>
  );
}

export default HomePage;
