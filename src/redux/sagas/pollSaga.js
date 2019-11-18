
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// function* fetchInformationSaga(action){
//     try {
//         const status = yield axios.get(`/api/route/${action.payload.url}`);
//         yield put({type:"SET_STATUS",payload: status});
//     } catch (error) {
//         console.log('ERROR in pollInformation Saga', error);
//     }
// }

function* addRouteSaga(action) {
    try {
        
        yield axios.post('/api/route',action.payload.poll);
        yield put({type:'CLEAR_INPUT'});
        
        const route = action.payload.newRouteInput;
        console.log(action.payload);

        // const { history } = history;
        // yield action.payload.history.push(`/${route}`);

    } catch (error) {
        console.log('routeSaga ERROR', error);
        
    }
}


function* rootSaga() {
    yield takeEvery('ADD_ROUTE', addRouteSaga);
    // yield takeEvery('FETCH_STATUS', fetchInformationSaga);
  }
  
  export default rootSaga;