console.log("Fetching news...");

const apiKey = '1a380e3d960a469aaa4c33fe5d0dd44a';
const newsAccordion = document.getElementById('newsAccordion');
const loading = document.getElementById('loading');

const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`, true);

xhr.onload = function () {
  if (this.status === 200) {
    const json = JSON.parse(this.responseText);
    const articles = json.articles;

    if (!articles.length) {
      loading.textContent = "No news articles available.";
      return;
    }

    let newsHtml = articles.map((element, index) => {
      return `
        <div class="card">
          <div class="card-header" id="heading${index}">
            <h2 class="mb-0">
              <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse"
                data-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                <h5>${element.title}</h5>
              </button>
            </h2>
          </div>
          <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
            <div class="card-body">
              ${element.description ? element.description : "No description available."}
              <br><a href="${element.url}" target="_blank">Read more</a>
            </div>
          </div>
        </div>`;
    }).join('');

    newsAccordion.innerHTML = newsHtml;
    loading.style.display = 'none';
  } else {
    loading.textContent = "Failed to load news. Please try again later.";
    console.error("Error loading news:", this.statusText);
  }
};

xhr.onerror = function () {
  loading.textContent = "Error connecting to news server.";
};

xhr.send();
