import {
    OPEN_PLANT_MODAL,
    CLOSE_PLANT_MODAL,
    OPEN_ADDPLANT_MODAL_SUCESS,
    CLOSE_ADDPLANT_MODAL,
    ADDPLANT_FAILED,
    ADDPLANT_SUCCESS,
    POST_REQ,
    GETPLANTS_SUCCESS,
    GETPLANTS_FAILED,
    REMOVEPLANT_FAILED,
    REMOVEPLANT_SUCCESS,
    GETTYPEPREF_SUCCESS,
    GETTYPEPREF_FAILED,
} from './Actions';
import {LOGIN_SUCCESS} from "../authentication/Actions";

const initState = {
    isFetchingPlants: false,
    isFetchingAddPlant: false,
    isFetchingPlantPreferences: false,
    plantModal: false,
    addPlantModal: false,
    plantModalData: null,
    plants: [],
    fleetTypes: [],
};

export default function(state = initState, action) {
    switch(action.type) {
        case POST_REQ:
            return action.to === '/getPlants' ? {...state, isFetchingPlants: true} :
                action.to === '/getTypePref' ? {...state, isFetchingPlantPreferences: true} :
                {...state, isFetchingAddPlant: true};
        case OPEN_PLANT_MODAL:
            return {...state, plantModal:true, plantModalData: action.plant };
        case CLOSE_PLANT_MODAL:
            return {...state, plantModal:false, plantModalData: null};
        case OPEN_ADDPLANT_MODAL_SUCESS:
            return {...state, addPlantModal: true, plantTypeData: action.plantTypeData};
        case CLOSE_ADDPLANT_MODAL:
            return {...state, addPlantModal: false};
        case GETTYPEPREF_SUCCESS:
            return{...state, isFetchingPlantPreferences: false, typePrefData: action.typePrefData,};
        case GETTYPEPREF_FAILED:
            return{...state, isFetchingPlantPreferences: false, };
        case ADDPLANT_SUCCESS:
            return{...state, plants: [...state.plants, action.data], isFetchingAddPlant: false, addPlantModal: false};
        case ADDPLANT_FAILED:
            return{...initState, isFetchingAddPlant: false};
        case GETPLANTS_SUCCESS:
            return{...state, plants: action.plantData, fleetTypes: action.fleetTypes, isFetchingPlants: false};
        case GETPLANTS_FAILED:
            return{...initState, isFetchingPlants: false};
        case REMOVEPLANT_SUCCESS:
            let newPlants = [...state.plants].filter(item => item.plant_id !== action.plant_id);
            return{...state, plantModal: false, plants: newPlants};
        case REMOVEPLANT_FAILED:
            return{...state};

        default:
            return state;
    }
}
