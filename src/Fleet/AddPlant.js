import React, {Component} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import addPlantImg from '../Assets/addPlantImg.png';
import './AddPlant.css';
import {closeAddPlantModal} from "./Actions";
import {addPlant} from "./Actions";

const mapStateToProps = state => {
    return {
        isFetchingAddPlant: state.fleet.isFetchingAddPlant,
        plantName: state.fleet.plantName,
        plantType: state.fleet.plantType,
        location: state.fleet.location,
        monitor_id: state.fleet.monitor_id,
        plantTypeData: state.fleet.plantTypeData,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeAddPlantModal: () => dispatch(closeAddPlantModal()),
        addPlant: (plantName, plantType, monitor_id, location) => dispatch(addPlant(plantName, plantType, monitor_id, location)),
    }
};

class AddPlant extends Component {

    constructor(props) {
        super(props);
        //setting the initial state
        this.state = {
            plantName: {
                value: '',
                valid: false,
            },
            plantType: {
                value: 'African Violet',
                valid: true,
            },
            location: {
                value: '',
                valid: false,
            },
            monitor_id: {
                value: '',
                valid: false,
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAddPlant = this.handleAddPlant.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleChange = e => this.setState({
        [e.target.name]: {
            value: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            valid: this.validate(e.target.name, e.target.value),
        }
    });

    validate = (name, value) => {
        switch (name) {
            case 'plantName':
                return value.length > 0;
            case 'monitor_id':
                return value.length > 0;
            case 'location':
                return value.length >0;
            default:
                return true;
        }
    };

    handleAddPlant = () => {
        if (this.state.plantName.valid && this.state.plantType.valid && this.state.monitor_id.valid && this.state.location.valid) {
            console.log(this.state.plantType);
            this.props.addPlant(this.state.plantName.value, this.state.plantType.value, this.state.monitor_id.value, this.state.location.value);
        }
        else {
            alert("error");
        }
    };

    render() {

        return (
            <div className="add-plant-popup">
                <div className="popup-overlay" onClick={this.props.closeAddPlantModal}/>
                <div className="popup_inner">
                    <div className="popup_inner-border">
                        <div className="ap-title">
                            New Plant
                            <Glyphicon className="exit" glyph="remove" onClick={this.props.closeAddPlantModal}/>
                        </div>
                        <div className="ap-photo" style={{backgroundImage:`url('${addPlantImg}')`}}>
                        </div>
                        <input type="text" value={this.state.plantName.value} onChange={this.handleChange}
                               name="plantName" placeholder="Enter Plant's Name" className="ap-name" required/>

                        <select className="ap-type" value={this.state.plantType.value} onChange={this.handleChange} name="plantType" >
                            {this.props.plantTypeData.map((type,i) => (<option>{type.common_name}</option>))}
                        </select>

                        <input type="number" value={this.state.monitor_id.value} onChange={this.handleChange} name="monitor_id"
                               placeholder="Enter Monitor's ID" className="ap-monitorID" required/>
                        <input type="text" value={this.state.location.value} onChange={this.handleChange}
                               name="location" placeholder="Enter Plant's Location" className="ap-name" required/>

                        <button className="ap-submit" type="submit" onClick={this.handleAddPlant}> {this.props.isFetchingAddPlant ? "Adding Plant" : "Add Plant"} </button>
                    </div>
                </div>
            </div>

        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlant);