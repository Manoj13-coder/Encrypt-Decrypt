pragma solidity ^0.5.1;

contract Secret{
    
    mapping(bytes32 => string) hash;
    bytes32 random;
    function encrypt(string memory message) public{
        bytes32 temp = keccak256(abi.encodePacked(message));
        random = temp;
        hash[temp] = message;
    }
    function get_hash() public view returns(bytes32){
        return random;
    }
    function decrypt(bytes32 key) public view returns(string memory){
        return hash[key];
    }
    function del_hash(bytes32 key) public{
        delete(hash[key]);
    }
   
}