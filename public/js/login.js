
const loginForm = $('#login-form')[0];

function login(email, password){
	$.ajax({
		url: '../api/authenticate?lang='+lang,
		method: 'post',
		data: {
			email,
			password
		},
		success: (data) => {
			if(data.success){
                loginForm.reset();
				saveToken(data.token);
			} else {
                loginForm[1].value = '';
				showMessage(data.error);
			}
		}
	})
}

function saveToken(token){
    localStorage.setItem('token', token);
    
    getData('ads', ads => {
        renderData(ads.rows);
        $('.filters').localize();
        $('.container').localize();
    }, error => {
        console.log(error);
    });
}

function showMessage(message){
	$('.message').text(message);
}

$('#login-form').submit(function() {
	const email = loginForm[0].value;
	const pass = loginForm[1].value;
    login(email, pass);
	return false;
});