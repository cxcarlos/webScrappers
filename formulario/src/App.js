import React, {Fragment, useState, useRef, useEffect} from "react";
//import {v4 as uulotev4} from 'uulote';
import PaymentList from "./components/PaymentList";
//import logo from './logo.svg';
import './App.css';

const KEY = 'payApp.payments';

function App() {

  const [payments, setPayments] = useState([
    { date: "2020-05-13", reference: '00035189', lote: '54945'},
  ])
  
  const paymentRef = useRef();
  const paymentLoteRef = useRef();
  const paymentDateRef = useRef();

  useEffect(() => {
    const storedpayments = JSON.parse(localStorage.getItem(KEY));
    if(storedpayments){
      setPayments(storedpayments);
    }

  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(payments))
  }, [payments]);

  const togglePayment = (lote) => {
    const newpayments = [...payments];
    const payment = newpayments.find((payment) => payment.lote === lote);
    payment.completed = !(payment.completed);
    setPayments(newpayments); // lo volvoemos a enviar con el estado cambiado
  }

  const handlePaymentAdd = () => {
    const reference = paymentRef.current.value;
    const lote = paymentLoteRef.current.value;
    if(reference ==="" && lote === "")return;
    setPayments((prevpayments) => {
      return [...prevpayments, {date: paymentDateRef.current.value, reference, lote}]
    })

    paymentRef.current.value = null ;
    paymentLoteRef.current.value = null ;
  }

  const handlerClearAll = () => {
    const newpayments = payments.filter(payment => !payment.completed)
    setPayments(newpayments);
  }

  return (
    <Fragment>
      <br/>
        Referencia: <input ref={paymentRef} type='text' placeholder="# Referencia"/>
      <br/>
         Lote: <input ref={paymentLoteRef} type='text' placeholder="# Lote"/>
      <br/>
        Fecha: <input type="date" ref={paymentDateRef} name="date" min="2000-01-01" max="2030-12-31" required/>
      <br/>
      <button type='submit' onClick={handlePaymentAdd} >Agregar</button>
      <button type='submit'onClick={handlerClearAll}>Eliminar</button>
      <br/><br/><br/>

      <PaymentList payments={payments} togglePayment={togglePayment}/>
      
    </Fragment>
  );
}

export default App;
