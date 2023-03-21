// import { ConnectWallet } from "@thirdweb-dev/react";
import Navbar from './Components/Navbar/Navbar';
import { useContract, useContractWrite, useContractRead } from '@thirdweb-dev/react';
import React, { useState, useEffect } from 'react';
import "./styles/Home.css";
import {ethers} from 'ethers';

// define the contract address for the FundMe smart contract

const contractAddress = "0x735884465c2b42dfA6fE98EFbCfE88dE8f3D397A";





// define the Home component
export default function Home() {
  const currentDate = new Date();


  // use the custom hook to retrieve the contract instance
  const {contract} = useContract(contractAddress);

  const minDate = new Date().toISOString().slice(0, 10);

  // use the custom hook to retrieve the list of campaigns from the contract
  const  {data: Readinfo} = useContractRead(contract, "getListofCampaigns");
  
  // define state variables to store user inputs for creating a campaign and donating to a campaign
  const [contributions, setContributions] = useState(0);
  const [title, setTitle] = useState("");
  const [amountNeeded, setamountNeeded] = useState(0);
  const [deadline, setDeadline] = useState("");

  // use the custom hook to create a new campaign in the contract
  const {mutateAsync: Create_Fundme} = useContractWrite(contract, "createCampaign");

  // use the custom hook to donate to an existing campaign in the contract
  const {mutateAsync: donate} = useContractWrite(contract, "contribute");

  const {mutateAsync: claim} = useContractWrite(contract, "withdrawFunds")



  // define the function to create a new campaign
  const CreateFundme = async () =>{
    try{
      await Create_Fundme([title, amountNeeded, deadline]);
      alert("Campaign created successfully") //notification when user creates campaign
    }
    catch (error){
      console.log(error);
      alert("Error Creating Campaign")
    }
  };


  // define the function to donate to an existing campaign
  const Donate = async (event, id) =>{
    try{
      event.preventDefault();
      await donate([id, {value: ethers.utils.parseEther(contributions)}]);
      alert("Funds donated successfully") //notification when user donates to campaign
    }
    catch (error){
      console.log(error);
      alert("Error donating funds")
    }
  };



  //define a function to withdraw fundz
  const Claim = async (event, id) =>{
    event.preventDefault();
    try{
      await claim([id])

    }
    catch(error){
      alert(`Error: ${error.message}`);
    }
  }




  // define event handlers to update the state variables for the user inputs
  const TitlehandleChange = (event) =>{
    setTitle(event.target.value);
  }


  const NeededhandleChange = (event) =>{
    setamountNeeded(event.target.value);
  }

  // This event handles the time conversion to unix time so as to populate the struct on the smart contract
  const DeadlinehandleChange = (event) =>{
    const deadlineDate = new Date(event.target.value);
    const diffTime = Math.abs(deadlineDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDeadline(diffDays);
  }



  const contributehandleChange = (event) =>{
    setContributions(event.target.value);
  }


    // render the Home component
  return (
    <div className="container">
      <main className="main">
        <Navbar />
        <h1 className="title">
          Fundme
        </h1>



        <div className="grid">
          <div  className="card" style={{idth : 800}}>
            <h2>Create a Fundme &rarr;</h2>
            <input type="text" required onChange={TitlehandleChange} placeholder='Title of project'/>
            <input type="text" required step={0.01}  onChange={NeededhandleChange} placeholder='Ether needed(Eth)'/>
            <input type="date" required onChange={DeadlinehandleChange} placeholder='Deadline' min={minDate}/>
            <button onClick = {CreateFundme}>Create</button>

          </div>


          <div  className="cardbox">
            <ol>
                {Readinfo && Readinfo.map((camp, index) => (
                  <li key={index}>

                    <>
                    <div className='box'>
                      <h3>Campaign Title: {camp.title}</h3>
                      <h3>Amount Needed: {parseInt(camp.amountNeeded._hex)} Eth</h3>
                      <h3>Amount Raised: {parseInt(camp.amountRaised._hex)/(10**18)} Eth</h3>
                      {/* <h3>Deadline: {new Date(camp.deadline).getTime() - Date.now() / (1000*3600*24)} days left</h3> */}
                      <h3>Deadline: {parseInt(camp.deadline._hex)} days left</h3>
                      <button onClick={event => Claim(event, parseInt(camp.camp_id._hex))}>Withdraw</button>

                      <input className='donate' step={0.01} type="number" onChange={
                        contributehandleChange}  placeholder='Enter amount to Donate'></input>
                      <button id='donate' onClick={event => Donate(event, parseInt(camp.camp_id._hex))}>Donate</button>
                    </div>
                    </>
                    {console.log(camp.deadline)}
                    {console.log(typeof(camp.deadline))}
                  </li>
                ))}
            </ol>

          </div>

        </div>
      </main>
    </div>


  );
}
