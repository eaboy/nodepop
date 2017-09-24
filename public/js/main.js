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

getData('ads', ads => {
	renderData(ads.rows);
}, error => {
	console.log(error);
});

$('#filters').submit(function() {
	let filter = '?';
	$(this).serializeArray().forEach((item) => {
		filter += `${item.name}=${item.value}&`;
	});
	filter = filter.slice(0, -1);
	console.log(filter);
	getData('ads', ads => {
		renderData(ads.rows);
	}, error => {
		console.log(error);
	}, filter);
	return false;
});