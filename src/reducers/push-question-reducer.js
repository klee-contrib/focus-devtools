import {
  SHOW_DX_QUESTION,
  REQUEST_SAVE_ANSWER,
  ERROR_SAVE_ANSWER,
  RECEIVE_SAVE_ANSWER,
  DX_QUESTION_NEW_RESPONSES
} from '../actions/push-question-actions';





const DEFAULT_PUSH_QUESTION_STATE = {
  isQuestionVisible: false,
  isAnswering: false,
  lastDate: null,
  answers: {}
}
function pushQuestionReducer(state = DEFAULT_PUSH_QUESTION_STATE, action){
  const {error, otherStateProps} =  state;
  switch (action.type) {
    case SHOW_DX_QUESTION:
      return { ...state, isQuestionVisible: true};
    case REQUEST_SAVE_ANSWER:
      return {...otherStateProps, isAnswering: true}
    case ERROR_SAVE_ANSWER:
      return {...state, isAnswering: false, error: action.payload}
    case RECEIVE_SAVE_ANSWER:
      return {...otherStateProps, projectAnswers: action.payload, isAnswering: false, isQuestionVisible: false, lastDate: new Date().toISOString()};
    case DX_QUESTION_NEW_RESPONSES:
      return {...state, answers: action.payload};
    default:
     return state;
  }
}
export default pushQuestionReducer;
