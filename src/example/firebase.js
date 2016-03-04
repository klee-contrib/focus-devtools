import Firebase from 'firebase';
const URL = 'https://focus-weather.firebaseio.com/';
let fb;
let snapShot;

export const populate = (isPopulate = true) => {
  if(!isPopulate){return;}
  checkFB();
  fb.set({'focus-devtools': {
      grades: [{date: new Date().getTime(), user: 'test', grade: 5}],
      nbPersons: 4
    }
  })
}

export const init = (/*{onValue, onChildAdded}*/next =  ()=>{}) => {
  fb = new Firebase(URL);
  fb.on('value', sn => {
    snapShot = sn;
    console.log('snapshot value', sn.val())
    //onValue(sn);
    next();
  });
//  fb.on('child_added', (child, key) => onChildAdded({[key]: child}));
}

const checkFB = () => {
  if(!fb){
    throw new Error('The connexion on should be initialized first');
  }
  if(!snapShot){
    throw new Error('The snapShot should be initialized first');
  }
}

export const loadGrades = () => {
  return new Promise((resolve, reject) => {
    fb.child('grades').once('value', data =>{
      resolve(data);
    });
  });
}

export const loadProjects = () => {
  return new Promise((resolve, reject) => {
    fb.child('grades').once('value', data => {
      resolve(Object.keys(data));
    });
  });
}

const getValueFromGrades = gradesObj => {
  return Object.keys(gradesObj).reduce((res, current) => {
    res.push(gradesObj[current]);
    return res;
  }, []);
}

export const saveAnswer = (project, answer) => {
  //validate answer
  return new Promise((resolve, reject) => {
        fb.child(project).child('grades').push(answer, data => {
            //console.log('grades', answer, data)


            fb.child(project).child('grades').once('value', d => resolve(getValueFromGrades(d.val())));
        });
  });
}
