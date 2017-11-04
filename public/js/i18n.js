
const urlParams = new URLSearchParams(window.location.search);
const availableLangs = ['en', 'es'];
const lang = availableLangs.includes(urlParams.get('lang')) ? urlParams.get('lang') : 'en';

$.getJSON(`../locales/${lang}.json`, data => {
    const translation = data;
    
    i18next.init({
        lng: lang,
        resources: {[lang]:translation}
    }, function(err, t) {
        jqueryI18next.init(i18next, $);
        $('.filters').localize();
        $('.container').localize();
    });
});

let langsHtml = '';

function renderHtmlLang(language){
	if (language === lang ) {
		return `<a class="lang active-lang" href="?lang=${language}">${language}</a>`
	} else {
		return `<a class="lang" href="?lang=${language}">${language}</a>`
	}
}

availableLangs.forEach(availableLang => {
	langsHtml += renderHtmlLang(availableLang);	
});

$('.lang-selector').html(langsHtml);