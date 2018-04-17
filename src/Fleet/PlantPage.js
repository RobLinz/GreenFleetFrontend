import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import './PlantPage.css';
import {connect} from 'react-redux';
import {closePlantModal, removePlant, getTypePref} from './Actions';

const mapStateToProps = state => {
    return {
        plantModalData: state.fleet.plantModalData,
        typePrefData: state.fleet.typePrefData,
        isFetchingPlantPreferences: state.fleet.isFetchingPlantPreferences,
        userData: state.auth,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closePlantModal: () => dispatch(closePlantModal()),
        removePlant: (plantModalData) => dispatch(removePlant(plantModalData)),
        getTypePref: (typePrefData) => dispatch(getTypePref(typePrefData)),
    }
};


class PlantPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmModalOpen: false,
            plantModalData: {
                plant_id: this.props.plantModalData.plant_id,
                plantType: this.props.plantModalData.plantType,
                monitor_id: this.props.plantModalData.monitor_id,
            },
        };

        this.handleRemovePlant = this.handleRemovePlant.bind(this);
        this.promptConfirm = this.promptConfirm.bind(this);
        this.closePlantModal = this.closePlantModal.bind(this);
        this.handleMoistureReading = this.handleMoistureReading.bind(this);
        this.handleMoisturePref = this.handleMoisturePref.bind(this);
        this.plantStatusMessage = this.plantStatusMessage.bind(this);
    }

    componentDidMount() {
        this.props.getTypePref(this.state.plantModalData.plantType);
    }

    promptConfirm = () => this.setState({confirmModalOpen: true});

    handleRemovePlant = () => {
        this.props.removePlant(this.state.plantModalData.plant_id);
        this.setState({confirmModalOpen: false})
    };

    closePlantModal = () => {
        this.setState({confirmModalOpen: false})
    };

    handleMoistureReading = (moisture_reading) => {
        if(moisture_reading < 100 ){
            return "Dry"
        }
        else if(moisture_reading > 200){
            return "Moist"
        }
        else {
            return "Damp"
        }
    };

    handleMoisturePref = (moisture_pref) => {
        if(moisture_pref === 'dry' ){
            return "Dry"
        }
        else if(moisture_pref === "moist"){
            return "Moist"
        }
        else {
            return "Damp"
        }
    };

    plantStatusMessage = (moisture_reading, watering_pref, temp_reading, temp_low, temp_high) => {
        let m = 0;
        let t = 0;
        let key = 0;
        console.log("IN ");

        if(watering_pref === null){
            m = 0;
        }
        else if (watering_pref === "moist" && moisture_reading < 200) {
            m = 1;
        }
        else if (watering_pref === "partly" &&  moisture_reading > 200) {
            m = 5;
        }
        else if (watering_pref === "partly" && moisture_reading < 100) {
            m = 1;
        }
        else if (watering_pref === "dry" && moisture_reading > 100) {
            m = 20;
        }

        console.log(m);
        console.log(m===0);

        if(temp_reading === null){
            t = 0;
        }
        else if (temp_reading < temp_low) {
            t = 10;
        }
        else if ( temp_reading > temp_high){
            t = 7;
        }

        console.log(t);
        console.log(t===1);

        key = t+m;
        console.log(key);

        switch (key) {
            case 11:
                return "Water your plant and move it to a warmer location.";
            case 8:
                return "Water your plant and move it to a cooler location.";
            case 15 || 30:
                return "Be careful, you may have over watered your plant. Also move your plant to a warmer location.";
            case 27:
                return "Be careful, you may have over watered your plant. Also move your plant to a cooler location.";
            case 1:
                return "Water your plant!";
            case 20:
                return "You may have over watered your plant. Be careful next time!";
            case 5:
                return "You may have over watered your plant. Be careful next time!";
            case 10:
                return "Brrrrrr. Move your plant to a warmer location.";
            case 7:
                return "It's getting hot in here! Move your plant to a cooler location.";
            default:
                return " ";
        }

    };

    render() {
        console.log(this.props);

        return (
            <div className="plant-page-popup">
                <div className="popup-overlay" onClick={this.props.closePlantModal}/>
                <div className="popup_inner">
                    {
                        this.state.confirmModalOpen &&

                        <div className="confirmModal-overlay">
                            <div className="confirmModal">

                                <div className="confirm"> Confirm</div>
                                <div className="delete-prompt"> Are you sure you want to delete this plant?</div>

                                <button className="confirm-cancel" onClick={this.closePlantModal}> Cancel</button>
                                <button className="confirm-remove" onClick={this.handleRemovePlant}> Remove</button>

                            </div>
                        </div>
                    }
                    <div className="plant-form">


                        <div className="plant-img"
                             style={this.props.plantModalData.plantType ? {backgroundImage: `url('${ require(`../Assets/${this.props.plantModalData.plantType}.png`) }')`} : {backgroundColor: '#666666'}}>
                            <div className="rip" onClick={this.promptConfirm}>
                                <Glyphicon className="trash" glyph="trash"/>
                            </div>
                        </div>

                        <div className="plant-info">
                            <div className="top">
                                <Glyphicon className="exit" glyph="remove" onClick={this.props.closePlantModal}/>
                            </div>
                            <div className="mid">
                                <h2> {this.props.plantModalData.plantName} </h2>
                                <h4><span className="title"> Type: </span> {this.props.plantModalData.plantType} </h4>
                                <h4><span className="title"> Location: </span> {this.props.plantModalData.location}
                                </h4>
                                <h4><span className="title"> Monitor ID: </span> {this.props.plantModalData.monitor_id}
                                </h4>
                                <h4> {this.props.typePrefData && this.props.userData.pets === 1 && this.props.typePrefData.pet_safe === 0 ?
                                    <div><h4><span
                                        className="warn"> Warning:  </span> {this.props.plantModalData.plantName} is
                                        not pet safe! </h4></div>
                                    : " "}
                                </h4>
                                <h4 className="message"> {this.props.typePrefData ?
                                    <div className="action">
                                     {this.plantStatusMessage(this.props.plantModalData.moisture_reading, this.props.typePrefData.watering_pref, this.props.plantModalData.temp_reading, this.props.typePrefData.temp_low, this.props.typePrefData.temp_high)}
                                    </div>
                                    : " "}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="plant-stats">
                        <div className="plant-stats-box-l">
                            <div className="topRow">
                                <div className="icon">
                                    <Glyphicon className="tint" glyph="tint"/>
                                </div>
                                <div className="pref">
                                    <div className="pref-title">
                                        Preferred Moisture:
                                    </div>
                                    <div className="sensor">
                                        {this.props.typePrefData ?  this.handleMoisturePref(this.props.typePrefData.watering_pref) : "loading"} </div>
                                </div>
                            </div>

                            <div className="bottomRow">
                                <div className="icon">
                                    <svg fill="#2d86d2" height="24" viewBox="0 0 24 24" width="24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"/>
                                    </svg>
                                </div>
                                <div className="reading">
                                    <div className="reading-title">
                                        Moisture Reading:
                                    </div>
                                    <div className="sensor">
                                        {this.handleMoistureReading(this.props.plantModalData.moisture_reading)}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="plant-stats-box-r">
                            <div className="topRow">
                                <div className="icon">
                                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                                    </svg>
                                </div>

                                <div className="pref">
                                    <div className="pref-title">
                                        Preferred Temperature:
                                    </div>
                                    <div className="sensor">
                                        °{this.props.typePrefData ? this.props.typePrefData.temp_low : "loading"}
                                        - °{this.props.typePrefData ? this.props.typePrefData.temp_high : "loading"}F
                                    </div>
                                </div>
                            </div>

                            <div className="bottomRow">
                                <div className="icon">
                                    <svg fill="#d83a3e" height="24" viewBox="0 0 24 24" width="24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path
                                            d="M15 9H9c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1zm-3 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM7.05 6.05l1.41 1.41C9.37 6.56 10.62 6 12 6s2.63.56 3.54 1.46l1.41-1.41C15.68 4.78 13.93 4 12 4s-3.68.78-4.95 2.05zM12 0C8.96 0 6.21 1.23 4.22 3.22l1.41 1.41C7.26 3.01 9.51 2 12 2s4.74 1.01 6.36 2.64l1.41-1.41C17.79 1.23 15.04 0 12 0z"/>
                                    </svg>
                                </div>

                                <div className="reading">
                                    <div className="reading-title">
                                        Temperature Reading:
                                    </div>
                                    <div className="sensor">
                                        °{this.props.plantModalData.temp_reading}F
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PlantPage);

/*

 */