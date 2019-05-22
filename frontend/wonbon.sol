pragma solidity ^0.4.19;
contract aaa {
    
    struct parcel{
        address sender;
        address receiver;
        address deliverer;
        uint coin;
    }

    mapping (string => parcel) box;


    function A_TO_D(address receiv, address deliver_, string memory parcel_) payable public {
        box[parcel_] = parcel(msg.sender, receiv, deliver_, msg.value);
    }

    function D_TO_R(address deliver_, string memory parcel_) payable public {
        require(box[parcel_].receiver == msg.sender);
        deliver_.transfer(box[parcel_].coin);
        delete box[parcel_];
    }
    
    function show_box(string parcel_) public view returns (address sender, address receiver, address deliverer, uint coin) {
        return (box[parcel_].sender, box[parcel_].receiver, box[parcel_].deliverer, box[parcel_].coin);
    }
    
}