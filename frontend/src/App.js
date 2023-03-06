// import { ConnectWallet } from "@thirdweb-dev/react";
import Navbar from './Components/Navbar/Navbar';
import { useContract, useContractWrite, useContractRead } from '@thirdweb-dev/react';
import React, { useState, useEffect } from 'react';
import "./styles/Home.css";
import {ethers} from 'ethers';
import { Indexed } from 'ethers/lib/utils';
import { useLazyMint } from '@thirdweb-dev/react';

// define the contract address for the FundMe smart contract
const contractAddress = "0x877E3Ba57c79eC457702d9cfa7A1C1D45178efc2";



// define the Home component
export default function Home() {

  // use the custom hook to retrieve the contract instance
  const {contract} = useContract(contractAddress);

  // use the custom hook to retrieve the list of campaigns from the contract
  const  {data: Readinfo} = useContractRead(contract, "getListofCampaigns")
  
  // define state variables to store user inputs for creating a campaign and donating to a campaign
  const [contributions, setContributions] = useState(0);
  const [title, setTitle] = useState("");
  const [amountNeeded, setamountNeeded] = useState(0);
  const [deadline, setDeadline] = useState(0);

  // use the custom hook to create a new campaign in the contract
  const {mutateAsync: Create_Fundme} = useContractWrite(contract, "createCampaign");

  // use the custom hook to donate to an existing campaign in the contract
  const {mutateAsync: donate} = useContractWrite(contract, "contribute");







  // define the function to create a new campaign
  const CreateFundme = () =>{
    Create_Fundme([title, amountNeeded, deadline]);
  }


  // define the function to donate to an existing campaign
  const Donate = () =>{
    donate({value: ethers.utils.parseEther(contributions)});
  }


  // define event handlers to update the state variables for the user inputs
  const TitlehandleChange = (event) =>{
    setTitle(event.target.value);
  }

  const NeededhandleChange = (event) =>{
    setamountNeeded(event.target.value);
  }

  const DeadlinehandleChange = (event) =>{
    setDeadline(event.target.value);
  }



  // const RaisedhandleChange = (event) =>{

  // }

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
          <div  className="card" style={{width : 800}}>
            <h2>Create a Fundme &rarr;</h2>
            <input type="text" required onChange={TitlehandleChange} placeholder='Title of project'/>
            <input type="text" required step={0.01}  onChange={NeededhandleChange} placeholder='Ether needed(Eth)'/>
            <input type="text" required onChange={DeadlinehandleChange} placeholder='Deadline'/>
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
                      <h3>Amount Raised: {parseInt(camp.amountRaised._hex)} Eth</h3>
                      <h3>Deadline: {parseInt(camp.deadline._hex)} days</h3>
                      <input className='donate' step={0.01} type="number" onChange={contributehandleChange}  placeholder='Enter amount to Donate'></input>
                      <button id='donate' onClick={Donate}>Donate</button>
                    </div>
                    </>
                  </li>
                ))}
            </ol>

          </div>

        </div>
      </main>
    </div>


  );
}
