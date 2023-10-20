// SPDX-License-Identifier: UNKNOWN 
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

contract Inventaris {
    uint totalInventori = 0;

    struct Inventori {
        string nama;
        string kondisi;
        string lokasi;
        string kategori;
        string nomorRegistrasi;
        address pemakai;
        address owner;
    }

    mapping(uint256 => Inventori) public listInventori;

    function jumlahInventori() public view returns (uint) {
        return totalInventori;
    }

    function ambilData(uint index) public view returns (Inventori memory) {
        return listInventori[index];
    }

    function simpanData(
        string memory _nama,
        string memory _lokasi,
        string memory _kondisi,
        string memory _kategori,
        string memory _noReg
    ) public {
        require(bytes(_nama).length > 0, "Nama Tidak Boleh Kosong!");

        address _owner = msg.sender;

        totalInventori++;
        listInventori[totalInventori] = Inventori(
            _nama,
            _kondisi,
            _lokasi,
            _kategori,
            _noReg,
            _owner,
            _owner
        );
    }

    function ubahData(
        uint _index,
        string memory _nama,
        string memory _lokasi,
        string memory _kondisi,
        string memory _kategori,
        string memory _noReg
    ) public {
        require(bytes(_nama).length > 0, "Nama Tidak Boleh Kosong!");

        address _pemakai = msg.sender;

        address _owner = listInventori[_index].owner;

        listInventori[_index] = Inventori(
            _nama,
            _kondisi,
            _lokasi,
            _kategori,
            _noReg,
            _pemakai,
            _owner
        );
    }

    function hapusData(uint _index) public {
        if (_index >= totalInventori) return revert("Data tidak ditemukan");
        totalInventori--;
        return delete listInventori[_index];
    }
}
