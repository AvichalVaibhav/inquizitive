import React from 'react';

const StudySetCardForm = (props) => (
	<div className="card-form">
		<h2>{props.index + 1}</h2>
		<label>
			<input type="text" 
					onChange={props.update('term')} 
					placeholder="Enter term"
					value={props.card.term}/>
			<br/>
			TERM
		</label>
		<br/>
		<label>
			<input type="text" 
					onChange={props.update('definition')} 
					placeholder="Enter definition"
					value={props.card.definition} />
			<br/>
			DEFINITION
		</label>
	</div>
);

export default StudySetCardForm;