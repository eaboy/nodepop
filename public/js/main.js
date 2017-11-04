const container = $('.container');

function getData(resource, successCallback, errorCallback, filter) {
	$.ajax({
		url: '../api/'+resource+(filter || ''),
		method: 'get',
		success: successCallback,
		error: errorCallback
	});
}

function renderData(ads) {
	let html = '';
	ads.forEach(function(ad) {
		html += renderAd(ad);
	});
	container.html(html);
}

function i18nTags(tags){
	let tagsHtml = '';
	tags.forEach(tag => {
		tagsHtml += `<span data-i18n="home.${tag}"></span>, `;
	});
	return tagsHtml.slice(0, tagsHtml.length - 2);
}

function renderAd(ad) {
	const status = ad.onSale ? 'onsale' : 'searching';
	return `<div class="ad">
				<div class="image">
					<img src="images/${ad.image}" alt="" class="src">
				</div>
				<div class="info">
					<p class="name"><span data-i18n="home.name"></span>: ${ad.name}</p>
					<p class="status"><span data-i18n="home.status"></span>: <span data-i18n="home.${status}"></span></p>
					<p class="price"><span data-i18n="home.price"></span>: ${ad.price} €</p>
					<p class="tags"><span data-i18n="home.tags"></span>: ${i18nTags(ad.tags)}</p>
				</div>
			</div>`;
}

function getFilter(element) {
	let filter = '?';
	let price = '';
	let tags = '';
	$(element).serializeArray().forEach((item) => {
		if(item.value){
			if(item.name === 'priceFrom') {
				price += `${item.value}-`;
			} else if (item.name === 'priceTo') {
				price = price.slice(0, -1);
				price += `-${item.value}`;			
			} else if (item.name === 'tags') {
				tags += `${item.value},`;
			} else {
				filter += `${item.name}=${item.value}&`;
			}
		}
	});
	if(price) {
		filter += `price=${price}&`;
	}
	if(tags){
		tags = tags.slice(0, -1);
		filter += `tags=${tags}&`;
	}
	filter = filter.slice(0, -1);
	return filter;
}

getData('ads', ads => {
	renderData(ads.rows);
}, error => {
	console.log(error);
});

$('#filters').submit(function() {
	const filter = getFilter(this);
	getData('ads', ads => {
		renderData(ads.rows);
        $('.filters').localize();
        $('.container').localize();
	}, error => {
		console.log(error);
	}, filter);
	return false;
});