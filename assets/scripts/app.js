let topList;
let resultMarkdown = '';

const animeList = document.getElementById('animeList');
axios.get('https://api.jikan.moe/v3/top/anime/1/upcoming')
	.then(response => {
		console.log(response.data);
		if (response.data && response.data.top) {
			topList = response.data.top;
			getCards();
		}
	})
	
function getCards() {
	for (var i = topList.length - 1; i >= 0; i--) {
		resultMarkdown += `
			<div class="card" style="width: 18rem;">
				<img src="${topList[i].image_url}" class="card-img-top" alt="...">
				  	<div class="card-body">
				    	<h5 class="card-title">${topList[i].title}</h5>
				    	<p class="card-text">${topList[i].start_date}</p>
				  	</div>
			</div>`;
		animeList.innerHTML = resultMarkdown;
	}
}


	// .catch(err => {
	// 	console.error(err);
	// })
	// .then(() => {
	// 	console.log('Nothing to do here, Buddy');
	// })