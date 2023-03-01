// import { ConnectWallet } from "@thirdweb-dev/react";
import Navbar from './Components/Navbar/Navbar';
import { useContract, useContractWrite, useContractRead } from '@thirdweb-dev/react';
import React, { useState, useEffect } from 'react';
import "./styles/Home.css";
import {ethers} from 'ethers';
// import { useLazyMint } from '@thirdweb-dev/react';
const contractAddress = "0x602007e0b0Cd6bfB41E0D03e5a6e780EbD4eB1A2";



export default function Home() {

  const {contract} = useContract(contractAddress);

  const  {data: Readinfo} = useContractRead(contract, "contributions")

  const {mutateAsync: Create_Fundme} = useContractWrite(contract, "createCampaign");
  const {mutateAsync: donate} = useContractWrite(contract, "contribute");
  const {mutateAsync: withdrawFunds} = useContractWrite(contract, "withdraw");
  const {mutateAsync: deleteCampaign} = useContractWrite(contract, "deleteCampaign");



  const [title, setTitle] = useState("");
  const [amountNeeded, setamountNeeded] = useState(0);
  // const [contributions, setContributions] = useState([]);
  const [deadline, setDeadline] = useState(0);


  // useEffect(() => {
  //   async function fetchData() {
  //     const goal = await crowdfunding.methods.goal().call();
  //     const raised = await crowdfunding.methods.raised().call();
  //     const count = await crowdfunding.methods.contributorsCount().call();
  //     const contributions = [];
  //     for (let i = 0; i < count; i++) {
  //       const contributor = await crowdfunding.methods.contributors(i).call();
  //       contributions.push(contributor);
  //     }
  //     setGoal(goal);
  //     setRaised(raised);
  //     setContributions(contributions);
  //   }
  //   fetchData();
  // }, []);

  // async function contribute() {
  //   setMessage('Waiting for transaction to complete...');
  //   const accounts = await web3.eth.getAccounts();
  //   await crowdfunding.methods.contribute().send({
  //     from: accounts[0],
  //     value: web3.utils.toWei(value, 'ether')
  //   });
  //   setMessage('Contribution successful!');
  // }

  // async function withdraw() {
  //   setMessage('Waiting for transaction to complete...');
  //   const accounts = await web3.eth.getAccounts();
  //   await crowdfunding.methods.withdraw().send({
  //     from: accounts[0]
  //   });
  //   setMessage('Withdrawal successful!');
  // }



  const CreateFundme = () =>{
    Create_Fundme([title, amountNeeded, deadline]);
    console.log(Readinfo(0x3b0ea55b30337Ce8a0b85b8f4542d0d9fcFDB487));
  }



  const Donate = () =>{
    donate();
  }



  const Delete = () =>{
    deleteCampaign();
  }



  const withdraw = () =>{
    withdrawFunds();
  }



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

  // const contributehandleChange = (event) =>{
  //   setContributions(event.target.value);
  // }

  const deletehandleChange = (event) =>{

  }

  return (
    <div className="container">
      <main className="main">
      <Navbar />
        <h1 className="title">
          Fundme
        </h1>


        {/* <div className="connect">
          <ConnectWallet />
        </div> */}

        <div className="grid">
          <div  className="card">

            <h2>Create a Fundme &rarr;</h2>
            <input type="text" onChange={TitlehandleChange} placeholder='Title of project'/>
            <input type="text" step={0.01}  onChange={NeededhandleChange} placeholder='Ether needed(Eth)'/>
            <input type="text" onChange={DeadlinehandleChange} placeholder='Deadline'/>
            {/* <input type="text" onChange={RaisedhandleChange} placeholder='Ether Raised'/> */}
            <button onClick = {CreateFundme}>Create</button>

          </div>

          {/* <div  className="card">
            <h2>Contribute &rarr;</h2>
            <input step={0.01} type="number" onChange={contributehandleChange} placeholder='Donate to a cauze'/>
            <button onClick={Donate}>Donate</button>
          </div> */}

          <div  className="card">
            <h2>Delete A Fundme &rarr;</h2>
            <input type="text" onChange={deletehandleChange} placeholder='input address'/>
            <button onClick={Delete}>Delete</button>
          </div>


          <div  className="card">
            <h3></h3>
            <h3></h3>
            <h3></h3>
            <h3></h3>
          </div>


          <div  className="card">
            <button onClick={withdraw}>Withdraw</button>
          </div>



        </div>
      </main>
    </div>


  );
}
