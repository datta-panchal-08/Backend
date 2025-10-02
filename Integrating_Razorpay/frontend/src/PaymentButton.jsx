// PaymentButton.jsx
import axios from 'axios';
import React from 'react';

const PaymentButton = ({ amount }) => {
  const handlePayment = async() => {

    const {data:order} = await axios.post("http://localhost:3000/api/payment/create-order");

    const options = {
      key: "rzp_test_RObRDFCo79JM0p", // Razorpay Test Key ID
      amount: order.amount, // amount in paise
      currency: order.currency,
      name: "My Company",
      description: "Test Transaction",
      handler: async function (response) {
        const {razorpay_orderId, razorpay_paymentId,razorpay_signature} = response;
        try {
             await axios.post("http://localhost:3000/api/payment/verify",{
                razorpayOrderId:razorpay_orderId,
                razorpayPaymentId:razorpay_paymentId,
                razorpaySignature:razorpay_signature
             })
        } catch (error) {
            console.log(error);
        }
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button 
      onClick={handlePayment} 
      style={{
        padding: "10px 30px",
        backgroundColor: "#3399cc",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;
