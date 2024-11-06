import React from 'react';
import { FiMail, FiBox, FiClock, FiRefreshCw } from 'react-icons/fi';

const ReturnPolicy = () => {
  return (
    <div className="my-24 return-policy-container p-8 max-w-3xl mx-auto my-10 bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-purple-700 text-center">Return Policy</h2>
      
      <p className="text-center text-gray-700 mb-8">
        Your satisfaction is our priority! If you're not completely happy with your purchase, follow the steps below to return your item.
      </p>
      
      <div className="mb-6">
        <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-600">
          <FiClock className="mr-2 text-purple-700" /> Eligibility for Returns
        </h3>
        <ul className="ml-6 list-disc text-gray-700">
          <li>Returns are accepted within <span className="font-semibold">30 days</span> of purchase.</li>
          <li>Items must be in <span className="font-semibold">original condition</span>—unused, unworn, and with original packaging.</li>
          <li>Proof of purchase is required for all returns.</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-600">
          <FiBox className="mr-2 text-purple-700" /> Non-Returnable Items
        </h3>
        <ul className="ml-6 list-disc text-gray-700">
          <li>Gift cards, digital downloads, and perishable goods.</li>
          <li>Items not in their original condition or damaged for reasons not due to our error.</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-600">
          <FiRefreshCw className="mr-2 text-purple-700" /> Return Process
        </h3>
        <ol className="ml-6 list-decimal text-gray-700 space-y-2">
          <li>Contact our support at <a href="mailto:support@example.com" className="text-blue-600 hover:underline">support@example.com</a> to initiate your return.</li>
          <li>Repackage your item securely in its original packaging and include proof of purchase.</li>
          <li>Ship to the return address provided by our support team. Note: return shipping costs are the customer’s responsibility unless due to our error.</li>
        </ol>
      </div>
      
      <div className="mb-6">
        <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-600">
          <FiRefreshCw className="mr-2 text-purple-700" /> Refunds
        </h3>
        <p className="text-gray-700">
          After receiving and inspecting the item, we’ll notify you regarding the approval status of your refund. If approved, refunds will be processed to your original payment method within 5-7 business days.
        </p>
      </div>
      
      <p className="text-center text-gray-700 mt-8">
        Questions? Reach out to our support team at <a href="www.laptopgallery24.com" className="text-blue-600 font-semibold hover:underline">Support@laptopgallery24.com</a>.
      </p>
    </div>
  );
};

export default ReturnPolicy;
