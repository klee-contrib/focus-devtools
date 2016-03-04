import fetch from 'isomorphic-fetch';
import {loadGrades as loadGradesSvc, loadProjects as loadProjectsSvc, saveAnswer as saveAnswerSvc} from '../example/firebase';

//
// SAVE
//
export const REQUEST_SAVE_ANSWER = 'REQUEST_SAVE_ANSWER';
export const RECEIVE_SAVE_ANSWER = 'RECEIVE_SAVE_ANSWER';
export const ERROR_SAVE_ANSWER = 'ERROR_SAVE_ANSWER';

function requestSaveAnswer(answer){
  return {type: REQUEST_SAVE_ANSWER, payload: answer};
}

function receiveSaveAnswer(jsonEntity){
  return {type: RECEIVE_SAVE_ANSWER, payload: jsonEntity};
}

function errorSaveAnswer(error){
  return {type: ERROR_SAVE_ANSWER, payload: error};
}

export function saveAnswer(project, answer){
  return async dispatch => {
    try{
      console.log('save', project, answer);
      dispatch(requestSaveAnswer(answer));
      const response = await saveAnswerSvc(project, answer);
      const data = await response;
      dispatch(receiveSaveAnswer(data));
    }
    catch(err){
      dispatch(errorSaveAnswer(err));
    }
  }
}


export const REQUEST_LOAD_ANSWERS = 'REQUEST_LOAD_ANSWERS';
export const RECEIVE_LOAD_ANSWERS = 'RECEIVE_LOAD_ANSWERS';
export const ERROR_LOAD_ANSWERS = 'ERROR_LOAD_ANSWERS';

function requestLoadAnswers(){
  return {type: REQUEST_LOAD_ANSWERS};
}

function receiveLoadAnswer(jsonEntity){
  return {type: RECEIVE_LOAD_ANSWERS, payload: jsonEntity};
}

function errorLoadAnswers(error){
  return {type: ERROR_LOAD_ANSWERS, payload: error};
}

export function loadAnswers(){
  return async dispatch => {
    try{
      dispatch(requestLoadAnswers());
      const response = await loadGradesSvc();
      const data = await response;
      dispatch(receiveLoadAnswer(data));
    }
    catch(err){
      dispatch(errorLoadAnswers(err));
    }
  }
}



export const REQUEST_LOAD_PROJECTS = 'REQUEST_LOAD_PROJECTS';
export const RECEIVE_LOAD_PROJECTS = 'RECEIVE_LOAD_PROJECTS';
export const ERROR_LOAD_PROJECTS = 'ERROR_LOAD_PROJECTS';

function requestLoadProjects(){
  return {type: REQUEST_LOAD_PROJECTS};
}

function receiveLoadProjects(jsonEntity){
  return {type: RECEIVE_LOAD_PROJECTS, payload: jsonEntity};
}

function errorLoadProjects(error){
  return {type: ERROR_LOAD_PROJECTS, payload: error};
}

export function loadProjects(){
  return async dispatch => {
    try{
      dispatch(requestLoadProjects());
      const response = await loadProjectsSvc();
      const data = await response;
      dispatch(receiveLoadProjects(data));
    }
    catch(err){
      dispatch(errorLoadProjects(err));
    }
  }
}
