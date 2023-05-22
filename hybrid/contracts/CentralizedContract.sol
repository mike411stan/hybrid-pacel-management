// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CentralizedContract {
    struct Parcel {
        uint256 id;
        string sender;
        string recipient;
        string status;
    }

    Parcel[] public parcels;
    uint256 public nextId;

    function createParcel(string memory _sender, string memory _recipient)
        public
    {
        Parcel memory newParcel = Parcel(
            nextId,
            _sender,
            _recipient,
            "Created"
        );
        parcels.push(newParcel);
        nextId++;
    }

    function updateParcelStatus(uint256 _id, string memory _status) public {
        require(_id < parcels.length, "Invalid parcel ID");
        parcels[_id].status = _status;
    }

    function getParcel(uint256 _id) public view returns (Parcel memory) {
        require(_id < parcels.length, "Invalid parcel ID");
        return parcels[_id];
    }
}
