import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';

import { InvTable, TransactionsTable } from "../components/Tables";
import { Routes } from "../routes";
import { useEffect, useState } from "react";
import Inventaris from '../build/contracts/Inventaris.json';

export default () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    (async () => {
      const web3 = window.web3;
      // Load account
      const accounts = await web3.eth.getAccounts();
      //console.log(accounts.pop());
      setAccount(accounts.pop());
      const networkId = await web3.eth.net.getId();
      const networkData = Inventaris.networks[networkId];

      var contracts;
      if (networkData) {
        contracts = new web3.eth.Contract(Inventaris.abi, networkData.address);
        console.log(contracts);
        setContract(contracts);
      } else {
        window.alert('Smart contract not deployed to detected network.');
      }
      console.log(contracts);

      var total = await contracts.methods.jumlahInventori().call();

      console.log(total);

      var data = [];

      for (let index = 1; index <= total; index++) {
        var datum = await contracts.methods.ambilData(index).call();
        data.push({
          index: index,
          nama: datum.nama,
          lokasi: datum.lokasi,
          kondisi: datum.kondisi,
          kategori: datum.kategori,
          nomorRegistrasi: datum.nomorRegistrasi,
          pemakai: datum.pemakai,
          owner: datum.owner
        });
      }

      console.log(data);

      setLists(data);
    })();
  }, []);

  const deleteData = async (index) => {
    console.log(index);
    await contract.methods.hapusData(index);
    window.location.reload(false);
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Volt</Breadcrumb.Item>
            <Breadcrumb.Item active>Transactions</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Transactions</h4>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to={{ pathname: Routes.TambahData.path, state: { accounts: account, contracts: contract } }} className="btn btn-primary">Tambah Data</Link>
          {/* <ButtonGroup>
            <Button variant="outline-primary" size="sm" onClick={}>Tambah Data</Button>
            <Button variant="outline-primary" size="sm">Edit Data</Button>
          </ButtonGroup> */}
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <InvTable inv={lists} account={account} contract={contract} deleteData={deleteData} />
    </>
  );
};
