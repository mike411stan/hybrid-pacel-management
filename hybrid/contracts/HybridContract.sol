// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract HybridContract {
    struct Parcel {
        uint256 id;
        string sender;
        string recipient;
        string status;
    }

    Parcel[] public parcels;
    uint256 public nextId;

    address public aggregatorAddress =
        0x694AA1769357215DE4FAC081bf1f309aDC325306;

    function createParcel(string memory _sender, string memory _recipient)
        public
    {
        parcels.push(Parcel(nextId, _sender, _recipient, "Created"));
        nextId++;
    }

    function updateParcelStatus(uint256 _id) public {
        require(_id < nextId, "Invalid parcel ID");

        Parcel storage parcel = parcels[_id];
        int256 temperature = getTemperature();

        if (temperature > 25) {
            parcel.status = "Hot";
        } else if (temperature < 15) {
            parcel.status = "Cold";
        } else {
            parcel.status = "Normal";
        }
    }

    function getParcel(uint256 _id) public view returns (Parcel memory) {
        require(_id < nextId, "Invalid parcel ID");
        return parcels[_id];
    }

    function getTemperature() private view returns (int256) {
        AggregatorV3Interface aggregator = AggregatorV3Interface(
            aggregatorAddress
        );
        (, int256 temperature, , , ) = aggregator.latestRoundData();
        return temperature;
    }
}
