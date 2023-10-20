import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import Auth from '../build/contracts/Auth.json';

import { useHistory } from 'react-router-dom';
import Switch from "react-switch";

function App() {
    const history = useHistory();
    const [loaded, setLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        loadBlockchainData();
        //loadContract();
        return () => clearTimeout(timer);
    }, []);

    const loadBlockchainData = async () => {
        console.log("loadBlockchainData");
        const web3 = window.web3;
        const webeProvider = new Web3(
            Web3.givenProvider || "http://localhost:7545"
        );
        const accounts = await webeProvider.eth.getAccounts();

        setAccount(accounts[0]);
        console.log(account);

        const netId = await web3.eth.net.getId();
        const deployedNetwork = Auth.networks[netId];

        const userAuth = new web3.eth.Contract(
            Auth.abi,
            deployedNetwork.address
        );
        console.log('contract');
        console.log(userAuth);

        setContract(userAuth);
        console.log('contract state');
        console.log(contract);
    };

    const handleRegister = async () => {
        // Simulasi logika login (ganti dengan logika yang sesuai)

        if (email == '' || password == '') {
            alert('Silahkan isi email dan password terlebih dahulu');
            return;
        }

        console.log(contract);

        await contract.methods.registerUser(account, name, email, password, isAdmin).send({ from: account });

        history.goBack();

    };



    return (
        <div className="App">
            <div className="container">
                <h1 className="mt-4">Form Daftar</h1>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nama"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    <span>&nbsp;Apakah User Ini Adalah Seorang Admin?</span>
                    </label>

                </div>

                <button className="btn btn-primary" onClick={handleRegister}>Daftar</button>
            </div>
        </div>
    );
}

export default App;
