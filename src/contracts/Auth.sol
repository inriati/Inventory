// SPDX-License-Identifier: UNKNOWN
pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

contract Auth {
    struct User {
        address addr;
        string name;
        string email;
        string password;
        string role;
    }

    mapping(address => User) user;

    // user registration function
    function registerUser(
        address _address,
        string memory _name,
        string memory _email,
        string memory _password,
        bool _isAdmin
    ) public returns (bool) {
        require(user[_address].addr != msg.sender);
        user[_address].addr = _address;
        user[_address].name = _name;
        user[_address].email = _email;
        user[_address].password = _password;
        user[_address].role = _isAdmin ? "admin" : "user";
        return true;
    }

    // user login function
    function loginUser(
        address _address,
        string memory _email,
        string memory _password
    ) public view returns (bool) {
        if (
            keccak256(abi.encodePacked(user[_address].password)) ==
            keccak256(abi.encodePacked(_password)) &&
            keccak256(abi.encodePacked(user[_address].email)) ==
            keccak256(abi.encodePacked(_email))
        ) {
            return true;
        } else {
            return false;
        }
    }

    function checkRole(address _address) public view returns (string memory) {
        return user[_address].role;
    }
}
