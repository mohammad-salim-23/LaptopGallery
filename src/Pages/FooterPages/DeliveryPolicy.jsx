import React from 'react';

const DeliveryPolicy = () => {
  return (
    <div className="bg-blue-50 p-8 rounded-lg shadow-md text-gray-800 my-24">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Delivery Policy</h2>
      <p className="mb-6">
        We are committed to providing reliable and efficient delivery services to ensure your products reach you safely and on time. Please review our delivery terms below:
      </p>
      <h3 className="text-xl font-semibold text-blue-500">Delivery Times</h3>
      <p className="mb-4">
        Orders placed will be processed and dispatched within 1-2 business days. Delivery times vary based on your location and shipping method, typically ranging from 3-7 business days.
      </p>
      <h3 className="text-xl font-semibold text-blue-500">Shipping Charges</h3>
      <p className="mb-4">
        Shipping charges are calculated based on your location and order size. For orders over $50, we offer free shipping within certain regions.
      </p>
      <h3 className="text-xl font-semibold text-blue-500">Tracking Information</h3>
      <p>
        Once your order has shipped, you will receive an email with tracking details. You can also track your order status on our website under "Order Tracking."
      </p>
    </div>
  );
};

export default DeliveryPolicy;
