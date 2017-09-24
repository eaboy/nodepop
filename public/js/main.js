const container = $('.container');

function getData(resource, successCallback, errorCallback, filter) {
	$.ajax({
		url: 'http://localhost:3000/api/'+resource+(filter || ''),
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

function renderAd(ad) {
	const status = ad.onSale ? 'On sale' : 'Searching';
	return `<div class="ad">
				<div class="image">
					<img src="images/${ad.image}" alt="" class="src">
				</div>
				<div class="info">
					<p class="name">Name: ${ad.name}</p>
					<p status">Status: ${status}</p>
					<p class="price">Price: ${ad.price} €</p>
					<p class="tags">Tags: ${ad.tags}</p>
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
	}, error => {
		console.log(error);
	}, filter);
	return false;
});