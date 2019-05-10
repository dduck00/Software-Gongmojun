pragma solidity >=0.4.21 <0.6.0;

contract test{
    struct product{
        address sender;
        address receiver;
        address deliver;
        string location;
    }

    mapping (string => product) private PTD; // product and deliver 매핑
    mapping (address => uint32) private point;


    function sender_to_deliver(string memory sender, string memory receiver, string memory deliver, string memory product_code) public{
        product memory a = product(sender, receiver, deliver, product_code);
        PTD[a] = a;


    }



}