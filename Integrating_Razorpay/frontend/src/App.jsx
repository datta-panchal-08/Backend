import { useState } from "react"
import axios from 'axios';
import { useEffect } from "react";
import PaymentButton from "./PaymentButton";
const App = () => {

  const [product,setProduct] = useState(null);

  const getAllProducts = async() =>{
    
    const res = await axios.get("http://localhost:3000/api/product/");

    if(res.status === 200){
      setProduct(res?.data?.products);
    }
  }

  const purchaseHandler = () =>{
    alert("Purchased")
  }

  useEffect(()=>{
    getAllProducts();    
  },[])
   
      console.log(product);


  return (
    <div className='main'>
      {
        product && product.map ((p)=>{
            return <div key={p._id} className="card">
              <div className="card-img">
                <img src={p.image} alt="" />
              </div>
              <div className="content">
                <h3>{p.title} <small className="btn">{p.category}</small> </h3>
                <h4>₹{p.price.amount} <span>{p.price.currency}</span> </h4>
                <p>{p.description}</p>
                <PaymentButton/>
              </div>
            </div>
        })
      }
    </div>
  )
}

export default App