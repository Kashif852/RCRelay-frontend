import React, {useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementItem,
  decrementItem,
  removeItemFromCart,
  selectCartTotal,
  checkoutCart,
  clearCart
} from '../../redux/cart/cartSlice';
import { Avatar, Button, List, Spin } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import "./CheckoutPage.css"

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);
  const checkoutStatus = useSelector((state) => state.cart.status);

  const handleCheckout = useCallback(async () => {
    const itemsToCheckout = Object.entries(cartItems).map(([sku, { quantity }]) => ({
      sku,
      quantity
    }));
    
    try {
      const actionResult = await dispatch(checkoutCart(itemsToCheckout));
      if (checkoutCart?.fulfilled.match(actionResult)) {
        alert(`Checkout successful! Total amount after discount: $${actionResult?.payload}`);
        dispatch(clearCart())
      } else {
        const error = actionResult.error.message;
        alert(`Checkout failed: ${error}`);
      }
    } catch (error) {
      alert(`Checkout failed: ${error.message}`);
    }
  }, [dispatch, cartItems]);

  const handleIncrement = (sku) => {
    dispatch(incrementItem(sku));
  };

  const handleDecrement = (sku) => {
    dispatch(decrementItem(sku));
  };

  const handleRemove = (sku) => {
    dispatch(removeItemFromCart(sku));
  };

  return (
    <div className="checkout-page" style={{ padding: '20px' }}>
      {checkoutStatus === 'loading' ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={Object.values(cartItems)}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button icon={<MinusOutlined />} onClick={() => handleDecrement(item.sku)} disabled={item.quantity <= 1} />,
                  <Button icon={<PlusOutlined />} onClick={() => handleIncrement(item.sku)} />,
                  <Button icon={<DeleteOutlined />} onClick={() => handleRemove(item.sku)} />
                ]}
                style={{ borderBottom: '1px solid #eee' }}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.imageUrl} shape="square" size="large" />}
                  title={item.name}
                  description={
                    <>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price.toFixed(2)}</p>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</span>
            <Button type="primary" size="large" onClick={handleCheckout} disabled={Object.keys(cartItems).length === 0}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
