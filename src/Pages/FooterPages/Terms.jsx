import React from 'react';

const Terms = () => {
  return (
    <div className="bg-green-50 p-8 rounded-lg shadow-md text-gray-800 my-24">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Terms and Conditions</h2>
      <p className="mb-6">
        By accessing and using our website, you agree to be bound by our terms and conditions outlined below. Please read carefully.
      </p>
      <h3 className="text-xl font-semibold text-green-500">User Agreement</h3>
      <p className="mb-4">
        By using this site, you confirm that you will not misuse our services or engage in any fraudulent activities. We reserve the right to restrict access to users who violate these terms.
      </p>
      <h3 className="text-xl font-semibold text-green-500">Returns and Refunds</h3>
      <p className="mb-4">
        Our return policy allows for returns within 30 days of purchase. To initiate a return, please contact our support team. Refunds are processed within 7-10 business days upon receiving the returned item.
      </p>
      <h3 className="text-xl font-semibold text-green-500">Privacy Policy</h3>
      <p>
        Your privacy is important to us. We commit to protecting your personal information as outlined in our Privacy Policy.
      </p>
    </div>
  );
};

export default Terms;
