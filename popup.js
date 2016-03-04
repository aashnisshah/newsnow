var settings = {
	api_key: '',
	base_url: 'http://api.nytimes.com/svc/topstories/v1/',
	central_url: '.json?api-key='
}

document.addEventListener('DOMContentLoaded', function() {
	// get the articles
	var articles = get_articles();

	// display the articles information
	if(articles == null) {
		// display an error message
	} else {
		// display movie information
		update_html_display(articles.results);
	}
});

/*
 * Get top technology articles
 */
function get_articles() {
	var url = settings.base_url + 'technology' + settings.central_url + settings.api_key;

	var Httpreq = new XMLHttpRequest();
	Httpreq.open("Get", url, false);
	Httpreq.send(null);

	var nowPlayingMovies = Httpreq.responseText;
	var json_obj = JSON.parse(nowPlayingMovies);
	console.log(json_obj);
	return json_obj;
}

/* 
 * update the html page to display media articles
 */
function update_html_display(articles) {

	var articlesDiv = document.getElementById('articles');

	for(article in articles) {
		// create div container for article
		var newArticleDiv = document.createElement('div');
		newArticleDiv.className = 'list-group';

		// create link for list item
		var articleLink = document.createElement('a');
		articleLink.className = 'list-group-item active';
		articleLink.href = articles[article].url;
		articleLink.tabIndex = -1;

		// create h4 header for title
		var articleTitle = document.createElement('h2');
		articleTitle.innerText = articles[article].title;
		articleTitle.className = 'article-name';

		// create p for article abstract
		var articleAbstract = document.createElement('p');
		articleAbstract.innerText = articles[article].abstract;

		// append all the children
		articleLink.appendChild(articleTitle);
		articleLink.appendChild(articleAbstract);
		newArticleDiv.appendChild(articleLink);
		articlesDiv.appendChild(newArticleDiv);
	}

}

/* this eventListener allows us to create a new tab when we click on 
 * a link in a chrome extension 
 */
window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})