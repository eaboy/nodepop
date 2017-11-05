

function setErrorMessage(err) {
	err.message = '';
	if(err.status === 404){
		err.message = __('NOT_FOUND');
	}
	if(err.errors) {
		Object.keys(err.errors).forEach( item => {
			if(err.errors[item].kind === 'required') {
				err.message += __('FIELD_REQUIRED',err.errors[item].path);
			}
			if(err.errors[item].kind === 'enum') {
				err.message += __('NOT_VALID', {field:err.errors[item].path, value:err.errors[item].value})
			}
		});
	}

	if(err.path === 'price' && isNaN(err.value)){
		err.message = __('NOT_A_NUMBER', err.path);
	}

	if(err.path === '_id') {
		err.message = __('NOT_VALID_ID', err.value);
	}
	if (process.env.LOG_FORMAT !== 'nolog'){
		console.log(err);
		console.log('Error: ',err.message);
	}
}

module.exports = setErrorMessage;