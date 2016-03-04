import {RECEIVE_SAVE_ANSWER} from '../actions/entity';

const DEFAULT_STATE = {
  isQuestionVisible: true
};


function dxReducer(state = DEFAULT_STATE, {type, payload}){
 const {data} = state;
 switch (type) {
  case RECEIVE_SAVE_ANSWER:
      return { ...state, grades: payload, isQuestionVisible: false};
  default:
      return state
  }
}

function surveyReducer(state, action){

}



export default dxReducer;
