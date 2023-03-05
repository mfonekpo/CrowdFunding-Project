// import { ConnectWallet } from "@thirdweb-dev/react";
import Navbar from './Components/Navbar/Navbar';
import { useContract, useContractWrite, useContractRead } from '@thirdweb-dev/react';
import React, { useState, useEffect } from 'react';
import "./styles/Home.css";
import {ethers} from 'ethers';
import { Indexed } from 'ethers/lib/utils';
import { useLazyMint } from '@thirdweb-dev/react';
const contractAddress = "0x877E3Ba57c79eC457702d9cfa7A1C1D45178efc2";



export default function Home() {

  const {contract} = useContract(contractAddress);

  const  {data: Readinfo} = useContractRead(contract, "getListofCampaigns")

  const {mutateAsync: Create_Fundme} = useContractWrite(contract, "createCampaign");
  const {mutateAsync: donate} = useContractWrite(contract, "contribute");
  const {mutateAsync: withdrawFunds} = useContractWrite(contract, "withdraw");




  const [title, setTitle] = useState("");
  const [amountNeeded, setamountNeeded] = useState(0);
  const [deadline, setDeadline] = useState(0);
  // const [campaigns, setcampaigns] = useState([]);


  // const [contributions, setContributions] = useState([]);


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
    // console.log(Readinfo);
  }



  const Donate = () =>{
    donate();
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

                {Readinfo && Readinfo.map((camp) => (

                    <>
                    <h3>Campaign Title {camp.title}</h3>
                    <h3>Amount Needed {parseInt(camp.amountNeeded._hex)}</h3>
                    <h3>Amount Raised {parseInt(camp.amountRaised._hex)}</h3>
                    <h3>Deadline {parseInt(camp.deadline._hex)} days</h3>
                    </>

                ))}


          </div>


          <div  className="card">
            <button onClick={withdraw}>Withdraw</button>
          </div>



        </div>
      </main>
    </div>


  );
}
