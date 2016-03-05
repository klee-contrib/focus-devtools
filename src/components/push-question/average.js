import React, {PropTypes} from 'react';
import Button from '../button';
const prettyDate = time => {
  var date = new Date((time || '').replace(/-/g,'/').replace(/[TZ]/g,' ')),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);

	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;

	return day_diff == 0 && (
			diff < 60 && 'just now' ||
			diff < 120 && '1 minute ago' ||
			diff < 3600 && Math.floor( diff / 60 ) + ' minutes ago' ||
			diff < 7200 && '1 hour ago' ||
			diff < 86400 && Math.floor( diff / 3600 ) + ' hours ago') ||
		day_diff == 1 && 'Yesterday' ||
		day_diff < 7 && day_diff + ' days ago' ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + ' weeks ago';
}


const Average = ({grades, lastVote}) => {
  const NB_GRADES = grades.length;
  //Process average
  const average = NB_GRADES > 0 ? (grades.reduce((res, current) => res + current.grade, 0)/ NB_GRADES).toFixed(2) : '-';
  return (
    <div>
      <pre>Note moyenne de votre projet sur {NB_GRADES} notes: </pre>
      <Button onClick={() =>alert(`La note moyenne est ${average}`)}>
        {average}
      </Button>
      <pre> Dernier vote {prettyDate(lastVote)}</pre>
    </div>
  );
}

Average.displayName = 'Average';
Average.defaultProps = {
  grades: []
}
Average.propTypes = {
  grades: PropTypes.array.isRequired,
  lastVote: PropTypes.string
}

export default Average;
