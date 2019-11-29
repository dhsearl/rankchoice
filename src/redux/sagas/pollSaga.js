import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchInformationSaga(action) {
    try {
        const status = yield axios.get(`/api/poll/${action.payload.url}`);
        yield put({ type: "SET_STATUS", payload: status });
    } catch (error) {
        console.log('ERROR in pollInformation Saga', error);
    }
}

function* addPhoneNumber(action) {
    try {
        yield axios.post('/api/poll/text', action.payload);

    } catch (error) {
        console.log("Error in addPhoneNumber saga", error)
    }
}

function* addRouteSaga(action) {
    try {
        //Sending in two objects:
        // poll {}
        // history {}
        // Send the poll to api/route route
        console.log("addRouteSaga getting:", action.payload);
        yield axios.post('/api/poll', action.payload.poll);
        // Set our pollSaga setup back to starting value
        yield put({ type: 'RESET_INPUT' });

        // Push the user to that poll's url
        const route = action.payload.poll.url.replace(/-$/, "");
        const { history } = action.payload;
        yield history.push(`/${route}`);

    } catch (error) {
        console.log('routeSaga ERROR', error);

    }
}

function* checkUrlSaga(action) {
    try {
        console.log('In checkUrlSaga with:', action.payload);
        const urlIsTaken = yield axios.post('/api/poll/url', action.payload);
        console.log('Got back', urlIsTaken.data);
        yield put({ type: "SET_URL_TAKEN", payload: urlIsTaken.data })
    } catch (error) {
        console.log('Error in checkUrlSaga', error);

    }
}


// {this.props.winner.idea_text}
function* getWinnerSaga(action) {
    try {
        // yield put({ type: "WAITING_MODE", payload: true })
        console.log("in getWinnerSaga with", action.payload)
        const winner = yield axios.get(`/api/poll/winner/${action.payload}`)
        yield console.log("got Back", winner);
        if (winner) {
            yield put({ type: "WAITING_MODE", payload: false })
            yield put({ type: "SET_WINNER", payload: winner.data })
        }

    } catch (error) {
        console.log('Error in getWinnerSaga', error);
    }
}

function* rootSaga() {
    yield takeLatest('GET_WINNER', getWinnerSaga);
    yield takeLatest('URL_INPUT', checkUrlSaga);
    yield takeEvery('ADD_ROUTE', addRouteSaga);
    yield takeEvery('FETCH_STATUS', fetchInformationSaga);
    yield takeEvery('ADD_PHONE_NUMBER', addPhoneNumber);
}

export default rootSaga;