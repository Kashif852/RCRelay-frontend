import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Tag, Spin } from 'antd';
import './ProductsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cart/cartSlice';
import { fetchDiscounts } from '../../redux/discount/discountSlice';

const { Meta } = Card;
const { Title } = Typography;

function ProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const discounts = useSelector((state) => state.discounts.discounts);
  const discountsStatus = useSelector((state) => state.discounts.status);

  useEffect(() => {
    if (discounts.length === 0 ) {
      dispatch(fetchDiscounts());
    }
  }, [dispatch, discounts, discountsStatus]);

  const renderPriceTag = (product, discounts) => {
    let tagColor = 'blue'; 
    let tagText = `Price: $${product.price.toFixed(2)}`; 
    if (discounts && Array.isArray(discounts)) {
      const discount = discounts.find(d => d.sku === product.sku);
  
      if (discount) {
        // eslint-disable-next-line default-case
        switch (discount.type) {
          case 'xfory':
            tagText = `${discount.threshold} for the price of ${discount.threshold - 1}`;
            tagColor = 'green';
            break;
          case 'bulk':
            tagText = `Bulk Discount: $${discount.discountPrice.toFixed(2)} each for ${discount.threshold}+`;
            tagColor = 'orange'; 
            break;
        }
      }
    }
  
    return <Tag color={tagColor}>{tagText}</Tag>;
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (products.length < 1 || discounts.length < 1) {
    return <div className="loading-container"><Spin size="large" /></div>;
  }

  return (
    <div className="products-page">
      <Title level={1} className="page-title">Our Products</Title>
      <Row gutter={[16, 16]}>
      {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={product?.id}>
            <Card
              hoverable
              cover={<img alt={product?.name} src={product?.imageUrl} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />}
              actions={[
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              ]}
            >
              <p>Price: ${product?.price}</p>
              <Meta
                title={product?.name}
                description={<>
                  {renderPriceTag(product, discounts)}
                </>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ProductsPage;



