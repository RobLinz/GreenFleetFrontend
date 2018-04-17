import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import './MainFleet.css';
import PlantPage from "./PlantPage";
import AddPlant from "./AddPlant";


import {connect} from 'react-redux';
import {openPlantModal, closePlantModal, openAddPlantModal, closeAddPlantModal, getPlants} from "./Actions";
import {logoutUser} from "../authentication/Actions";

const mapStateToProps = state => {
    return {
        isFetchingPlants: state.fleet.isFetchingPlants,
        isFetchingAddPlant: state.fleet.isFetchingAddPlant,
        isFetchingPlantTypes: state.fleet.isFetchingPlantTypes,
        plantModal: state.fleet.plantModal,
        addPlantModal: state.fleet.addPlantModal,
        plants: state.fleet.plants,
        fleetTypes: state.fleet.fleetTypes,
        firstname: state.auth.firstname,
        hidden: [],
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openPlantModal: (plant) => dispatch(openPlantModal(plant)),
        closePlantModal: () => dispatch(closePlantModal()),
        openAddPlantModal: () => dispatch(openAddPlantModal()),
        closeAddPlantModal: () => dispatch(closeAddPlantModal()),
        logoutUser: () => dispatch(logoutUser()),
        getPlants: () => dispatch(getPlants()),
    }
};


class MainFleet extends Component {
    constructor(props) {
        super(props);
        //setting the initial state
        this.state = {};

        this.handleLogout = this.handleLogout.bind(this);
        this.handleViewPlant = this.handleViewPlant.bind(this);
        this.handleOpenAddPlantModal = this.handleOpenAddPlantModal.bind(this);
        this.plantStatusColor = this.plantStatusColor.bind(this);
    }

    componentDidMount() {
        this.props.getPlants();
    }

    handleLogout = async event => {
        event.preventDefault();
        console.log(this.props.isLoggedIn);

        try {
            await this.props.logoutUser();
            console.log(this.props.isLoggedIn);

            if (!this.props.isLoggedIn) {
                this.props.history.push("/login");
            }
        }
        catch (error) {
            alert("error");
        }
    };

    handleViewPlant = (plant) => {
        console.log("handling view plant", plant);
        this.props.openPlantModal(plant);
    };

    plantStatusColor = (moisture_reading, watering_pref, temp_reading, temp_low, temp_high) => {
        let track = 0;
        if(watering_pref === null){
            track = 0;
        }
        else if (watering_pref === "moist" && moisture_reading < 200) {
            track = track + 1;
        }
        else if (watering_pref === "partly" && (moisture_reading < 100 || moisture_reading > 200)) {
            track = track + 1;
        }
        else if (watering_pref === "dry" && moisture_reading > 100) {
            track = track + 1;
        }

        if(temp_reading === null){
            track=0;
        }
        else if (temp_reading < temp_low || temp_reading > temp_high) {
            track = track + 1;
        }

        switch (track) {
            case 0:
                return "#a2d05e";
            case 1:
                return "#fbd726";
            case 2:
                return "#d62e2e";
            default:
                return "#a2d05e";
        }

    };

    handleOpenAddPlantModal = () => {
        console.log("handling add plant");
        this.props.openAddPlantModal();
    };


    render() {

        return (
            <div className="Home-fleet">
                <header className="App-header">
                    <title>GreenFleet</title>
                </header>

                <body>
                {this.props.plantModal && <PlantPage/>}
                {this.props.addPlantModal && <AddPlant/>}

                <div className="nav">
                    <div className="logo" onClick={() => this.props.history.push("/home")}>GreenFleet</div>
                    <div className="navButton" onClick={this.handleLogout}>Log Out</div>
                </div>


                <div className="content">


                    <div className="fleet-title">
                        <div className="border-line-pseudo">
                            <div className="fleet-label">
                                <h2> Your Fleet </h2>
                                <h4> Welcome {this.props.firstname}! </h4>
                            </div>

                        </div>
                    </div>

                    <div className="fleet-info">

                        <div className="fleet">
                            {this.props.isFetchingPlants ? "LOADING FLEET" :
                                this.props.plants.length === 0 ? "No plants yet? Add some to your fleet!" :
                                    this.props.plants.map((plant, i) => <div className="plantListItem" key={i}>

                                            <div className="plantImg" onClick={() => this.handleViewPlant(plant)}
                                                 style={{backgroundImage: `url('${ require(`../Assets/${plant.plantType}.png`) }')`}}/>

                                        <div className="plantName" onClick={() => this.handleViewPlant(plant)}>
                                            {plant.plantName}
                                        </div>
                                        <div className="plantSummary">


                                            <div className="plant-green-icon"
                                                 style={{backgroundColor: this.plantStatusColor(plant.moisture_reading, plant.watering_pref, plant.temp_reading, plant.temp_low, plant.temp_high)}}>
                                            </div>


                                            <div className="plant-writing">
                                                {plant.plantType}
                                            </div>
                                        </div>
                                    </div>)
                            }

                        </div>

                        <div className="fleet-stats">
                            <div className="edit-fleet-buttons">
                                <div className="add-plant-glyph-button" >
                                    <Glyphicon glyph="plus-sign" onClick={this.handleOpenAddPlantModal}/>
                                </div>
                                <div className="size">
                                    <span className="summary-stat-title">Fleet Size: </span>{this.props.plants.length}
                                </div>

                            </div>

                            <div className="fleet-tips">
                                <h3 className="tips-title"> Taking care of your fleet </h3>
                                <ol className="tips-list">
                                    <li> Make sure your pots have drainage holes. </li>
                                    <li> Remove dead leaves from your plant, let the plant feed only the healthy
                                        leaves.
                                    </li>
                                    <li> If you notice your plant leaning, put a stake in the soil and tie up the plant
                                        to support upwards growth.
                                    </li>
                                    <li> Most importantly, keep an eye on your plants and check in often!</li>
                                </ol>
                                <br/>
                                <div className="writing">
                                    Taking care of your fleet can really vary plant to plant! While there are general care things you always do,
                                    it is important to remember the diversity of care that each individual needs to recieve.
                                    Below we have a list of all the plants in your fleet with a little more grooming information about them. Now grow away!
                                </div>
                                <br/>
                                {this.props.isFetchingPlants ? "LOADING TYPE INFO" :
                                    this.props.fleetTypes.length === 0 ? " " :
                                        this.props.fleetTypes.map((type, i) => (
                                            <ol className="typeListItem" key={i}>
                                                <span className="common"> {type.common_name} </span>
                                                <li>
                                                    <span className="a"> Origin: </span> {type.origin}
                                                </li>
                                                <li>
                                                    <span className="a"> Scientific Name: </span> {type.scientific_name}
                                                </li>
                                                <li>
                                                    <span className="a"> Soil Preference: </span> {type.soil_pref}
                                                </li>
                                                <li>
                                                    <span className="a"> Grooming Tips: </span> {type.grooming}
                                                </li>

                                            </ol>
                                        ))
                                }

                            </div>


                        </div>
                    </div>
                </div>

                </body>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(MainFleet);

//src={`url(require('path/to/dir/${plant.imageName}.png}')))`}}

//style={{backgroundColor: this.plantStatusColor(plant) ? green : condition ? yellow : red}}