/*
 * action types
 */
export const OPEN_PLANT_MODAL = 'OPEN_PLANT_MODAL';
export const CLOSE_PLANT_MODAL = 'CLOSE_PLANT_MODAL';
export const OPEN_ADDPLANT_MODAL_SUCESS = 'OPEN_ADDPLANT_MODAL_SUCESS';
export const OPEN_ADDPLANT_MODAL_FAILED = 'OPEN_ADDPLANT_MODAL_FAILED';
export const CLOSE_ADDPLANT_MODAL = 'CLOSE_ADDPLANT_MODAL';
export const LOGOUT_USER = 'LOGOUT_USER';
export const ADDPLANT_SUCCESS = 'ADDPLANT_SUCCESS';
export const ADDPLANT_FAILED = 'ADDPLANT_FAILED';
export const GETPLANTS_SUCCESS = 'GETPLANTS_SUCCESS';
export const GETPLANTS_FAILED = 'GETPLANTS_FAILED';
export const REMOVEPLANT_SUCCESS = 'REMOVEPLANT_SUCCESS ';
export const REMOVEPLANT_FAILED = 'REMOVEPLANT_FAILED ';
export const POST_REQ = 'POST_REQ';
export const GETTYPEPREF_SUCCESS = 'GETTYPEPREF_SUCCESS';
export const GETTYPEPREF_FAILED = 'GETTYPEPREF_FAILED';

export const postReq = (to, body) => {
    return {
        type: POST_REQ,
        to,
        body,
    }
};

/*
 * action creators
 */

/* MODALS */

/*Thunk GETPLANTTYPES*/
export const openAddPlantModal = () => dispatch => {
    let userToken = localStorage.getItem('userToken');
    let reqBody = {
        userToken,
    };
    dispatch(postReq('/getPlantTypes', reqBody));
    return fetch('/getPlantTypes', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(reqBody)
    }).then(res => res.json()).then(data => {
        console.log(data);
        if(data.response !== 'Plants types obtained and listed!'){
            dispatch(openAddPlantModalFailed(data.response))
        }
        else{
            dispatch(openAddPlantModalSuccess(data.plantTypeData))
        }

    }).catch(err => {
        dispatch(openAddPlantModalFailed(err))
    })
};

export const openAddPlantModalSuccess = plantTypeData => {
    return {
        type: OPEN_ADDPLANT_MODAL_SUCESS,
        plantTypeData,
    }
};

export const openAddPlantModalFailed = error => {
    return {
        type: OPEN_ADDPLANT_MODAL_FAILED,
        error,
    }
};

export const closeAddPlantModal = () => {
    return {
        type: CLOSE_ADDPLANT_MODAL,
    }
};

export const openPlantModal = (plant) => {
    return {
        type: OPEN_PLANT_MODAL,
        plant
    }
};

export const closePlantModal = () => {
    return {
        type: CLOSE_PLANT_MODAL,
    }
};


/*Thunk ADDPLANT*/
export const addPlant = (plantName, plantType, monitor_id, location) => dispatch => {
    let userToken = localStorage.getItem('userToken');
    let reqBody = {
        plantName,
        plantType,
        monitor_id,
        location,
        userToken
    };
    dispatch(postReq('/addPlant', reqBody));
    return fetch('/addPlant', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(reqBody)
    }).then(res => res.json()).then(data => {
        if(data.response !== 'plant added!'){
            dispatch(addPlantFailed(data.response))
        }
        else{
            dispatch(addPlantSuccess(data.data))
        }

    }).catch(err => {
        dispatch(addPlantFailed(err))
    })
};

export const addPlantSuccess = data => {
    return {
        type: ADDPLANT_SUCCESS,
        data,
    }
};

export const addPlantFailed = error => {
    return {
        type: ADDPLANT_FAILED,
        error,
    }
};

/*Thunk GETPLANT*/
export const getPlants = () => dispatch => {
    let userToken = localStorage.getItem('userToken');
    let reqBody = {
        userToken
    };
    dispatch(postReq('/getPlants', reqBody));
    return fetch('/getPlants', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(reqBody)
    }).then(res => res.json()).then(data => {
        //console.log(data);
        if(data.response !== 'Plants, Plant Type info, and Plant sensor info obtained!'){
            dispatch(getPlantsFailed(data.response))
        }
        else{
            dispatch(getPlantsSuccess(data.plantData, data.fleetTypes))
        }

    }).catch(err => {
        dispatch(getPlantsFailed(err))
    })
};


export const getPlantsSuccess = (plantData, fleetTypes) => {
    return {
        type: GETPLANTS_SUCCESS,
        plantData,
        fleetTypes,
    }
};

export const getPlantsFailed = error => {
    return {
        type: GETPLANTS_FAILED,
        error,
    }
};

/*Thunk REMOVEPLANT*/
export const removePlant = (plant_id) => dispatch => {
    let userToken = localStorage.getItem('userToken');
    let reqBody = {
        userToken,
        plant_id,
    };
    dispatch(postReq('/removePlant', reqBody));
    return fetch('/removePlant', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(reqBody)
    }).then(res => res.json()).then(data => {
        console.log(data);
        if(data.response !== 'Plants has been deleted. Rest in Pieces little plant buddy'){
            dispatch(removePlantFailed(data.response))
        }
        else{
            dispatch(removePlantSuccess(plant_id))
        }

    }).catch(err => {
        dispatch(getPlantsFailed(err))
    })
};


export const removePlantSuccess = plant_id => {
    return {
        type: REMOVEPLANT_SUCCESS,
        plant_id,
    }
};

export const removePlantFailed = error => {
    return {
        type: REMOVEPLANT_FAILED,
        error,
    }
};

/*Thunk GETTYPEPREF*/
export const getTypePref = (plantType) => dispatch => {
    let userToken = localStorage.getItem('userToken');
    let reqBody = {
        userToken,
        plantType,
    };
    dispatch(postReq('/getTypePref', reqBody));
    return fetch('/getTypePref', {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(reqBody)
    }).then(res => res.json()).then(data => {
        console.log(data);
        if(data.response !== 'Plant Type preferences obtained!'){
            dispatch(getTypePrefFailed(data.response))
        }
        else{
            dispatch(getTypePrefSuccess(data.typePrefData))
        }

    }).catch(err => {
        dispatch(getTypePrefFailed(err))
    })
};


export const getTypePrefSuccess = typePrefData => {
    return {
        type: GETTYPEPREF_SUCCESS,
        typePrefData,
    }
};

export const getTypePrefFailed = error => {
    return {
        type: GETTYPEPREF_FAILED,
        error,
    }
};
