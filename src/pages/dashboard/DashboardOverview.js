
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import { faFile, faFileAlt, faFolder } from "@fortawesome/free-regular-svg-icons";
import Inventaris from '../../build/contracts/Inventaris.json';
import Web3 from "web3";

export default () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const [total, setTotal] = useState(0);

  const loadData = async () => {

    const web3 = new Web3(window.web3.currentProvider);
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

    var totalx = await contracts.methods.jumlahInventori().call();

    console.log(totalx);;

    setTotal(totalx);
  };

  useEffect(() => {
   loadData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <h1>
            Dashboard
          </h1>
          <h4>
            Aplikasi Manajemen Inventaris
          </h4>
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="jumlah Kategori Aset"
            title="4 Kategori"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faFolder}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Jumlah Lokasi Aset"
            title={total}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faFile}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Jumlah Aset"
            title={total}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faFileAlt}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h1>
            SELAMAT DATANG ADMINISTRATOR ASET BPS
          </h1>
          <h4>
            Aplikasi Manajemen Inventaris
          </h4>
        </div>
      </div>

      {/* <Row>
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <h1>
            Dashboard
          </h1>
          <h4>
            Aplikasi Manajemen Inventaris
          </h4>
        </Col>
      </Row> */}


      {/* <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row> */}
    </>
  );
};
