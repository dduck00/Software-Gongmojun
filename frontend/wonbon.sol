pragma solidity ^0.5.8;

contract matc {
    
    struct parcel{
        address sender;
        address receiver;
        address deliverer;
    }

    mapping (string => parcel) box;


    function make_parcel(address sender, address receiver, address deliverer, string memory data) public {
        box[data] = parcel(sender, receiver, deliverer);
    }

}