import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import { useCookies } from 'react-cookie';
import Auth from '../build/contracts/Auth.json';
import { Routes } from "../routes";
import { Redirect, Link, useHistory } from 'react-router-dom';


function App() {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['is_logged_in', 'role']);

    const [loaded, setLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        loadWeb3();
        const timer = setTimeout(() => setLoaded(true), 1000);
        loadBlockchainData();
        return () => clearTimeout(timer);
    }, []);



    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    };

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

        setContract(userAuth);
        console.log(contract);
    };

    const handleLogin = async () => {
        // Simulasi logika login (ganti dengan logika yang sesuai)

        if (email == '' || password == '') {
            alert('Silahkan isi email dan password terlebih dahulu');
            return;
        }

        const check = await contract.methods.loginUser(account, email, password)
            .call();

        console.log("Check : " + check);
        if (check) {
            let expires = new Date();
            expires.setTime(expires.getTime() + (36000 * 1000));
            setCookie('is_logged_in', true, { path: '/', expires });

            const role = await contract.methods.checkRole(account).call();

            setCookie('role', role, { path: '/', expires });

            history.replace(Routes.DashboardOverview.path);
        } else {
            alert('Username atau password salah.');
        }
    };

    if (cookies.is_logged_in === true) {
        return (<Redirect to={Routes.DashboardOverview.path} />);
    }
    return (
        <div className="App">
            <div className="container d-flex justify-content-center align-items-center mt-6">
    <div className="card" style={{ width: "400px" }}>
        <div className="card-body">
            <h1 className="card-title">Form Login</h1>
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
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            &nbsp;
            <Link to={{ pathname: Routes.Register.path }} className="btn btn-success">Daftar</Link>
        </div>
    </div>
</div>

        </div>
    );
}

export default App;
