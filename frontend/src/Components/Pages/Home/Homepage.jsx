import React from 'react';
import { useState, useEffect } from 'react';
import { useContract, useContractWrite, useContractRead } from '@thirdweb-dev/react';
import Typical from "react-typical";

// const contractAddress = "0xBA1c59B81D9B88d41064db2a4507A5D2E8c531FE"
const contractAddress = "0xc0caE712b495c0BE9E80865a4F4fD9F654f5a940"

// import App from '../../../App';

import "../../../styles/Home.css";


const Homepage = () => {


  const {contract} = useContract(contractAddress);

  const {data: Readamount} = useContractRead(contract, "boxBalance");
  const {data: Readdays} = useContractRead(contract, "numberDays");
  const {mutateAsync: create_box} = useContractWrite(contract, "createBox");
  const {mutateAsync: deposit_funds} = useContractWrite(contract, "depositFunds");
  const {mutateAsync: withdraw_funds} = useContractWrite(contract, "withdraw");

// This line of code handles the state changes of amount n days values on creating box
//amount n day are the parameters passed in when the function is called.
  const [amount, setAmount] = useState(0);
  const [day, setDay] = useState(0);

//this line handles the read value functions
// this takes care of reading the values from the smart contract
  const [value, setValue] = useState(0);
  const [days, setDays] = useState(0);

  const [witval, setWitval] = useState(0);


  // useEffect takes note of the change made by rerendering it withou having to refresh the browser
    useEffect(() => {
        if(Readamount) setValue(parseInt(Readamount._hex));
        if(Readdays) setDays(parseInt(Readdays._hex));
  }, [Readamount, Readdays]);



  // this calls the createbox function in our smart contract
  const CreateBox = () =>{
    create_box([amount, day]);
  }


  // calls the withdraw function in our smart contract
  const Withdraw = () =>{

    withdraw_funds();
    setReadamount(0)

  }



// this handles the state changes made by users from the input field
  const AmounthandleChange = (event) =>{
    setAmount(event.target.value);

  }

  const DayshandleChange = (event) =>{
    setDay(event.target.value);

  }




  return (


    <div>

      <p className="description">
        {" "}

        <Typical 

          loop = {1}
          // wrapper = "p"
          steps = {[
            "Hello, Welcome to PiggyBank", 2000,
            "Do you have a bad spending habit?", 2000,
            "Say no More!!", 2000,
            "Start locking your funds on our network", 2000,
            "And withdraw them when time elapses", 2000,
            "click on the connect wallet button to proceed...", 2000
          ]}

        />

      </p>
      
      <div className='card'>
        <div className='lockfunds'>
          <label id='textlabel'>Create a Piggy</label>
          <input step={0.01} onChange={AmounthandleChange} type="number" placeholder='Enter an amount to save' />
          <label id='textlabel'>Enter Lock time in days</label>
          <input type="number" onChange={DayshandleChange} placeholder='Number of days to lock your funds' />
          <button id="btnn" onClick={CreateBox}>Lock Funds</button>
        </div>
      </div>

      <div className='detailscard'>
          <label id='textlabel'>Locked Amount</label>
          <h3>{value} Eth</h3>
          <label id='textlabel'>Locked Days</label>
          <h3>{days} Days</h3>
          <button className='wit' onClick={Withdraw}>withdraw</button>
      </div>

    </div>

  )
}

export default Homepage