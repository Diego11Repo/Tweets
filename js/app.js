const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

/**
 * Event Listeners
 */
eventListeners();
function eventListeners() {
  /**
   * When the user add a new tweet
   */
  formulario.addEventListener('submit', sendTweet);

  /**
   * When the document is ready
   */
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];
    showTweetsList(tweets);
  });
}

/**
 * Function that executes when the tweet was sent
 */
function sendTweet(e) {
  e.preventDefault();
  const tweet = document.querySelector('#tweet').value;
  const tweetObj = {
    id: Date.now(),
    tweet,
  };
  validarTweet(tweetObj);
}

/**
 * Function that validate the tweet
 */
function validarTweet(tweet) {
  if (tweet.tweet === '') {
    const alert = document.createElement('p');
    const content = document.querySelector('#contenido');

    alert.textContent = 'No puede ir vacío';
    alert.classList.add('error');

    content.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  } else {
    showTweet(tweet);
  }
}

/**
 * Function that will show the tweet on screen
 */
function showTweet(tweet) {
  const list = document.createElement('li');
  const deleteBtn = document.createElement('a');

  deleteBtn.textContent = 'X';
  deleteBtn.classList = 'borrar-tweet';

  deleteBtn.onclick = () => {
    deleteTweet(tweet.id);
  };

  tweets.push(tweet);
  list.textContent = tweet.tweet;
  list.appendChild(deleteBtn);
  listaTweets.appendChild(list);

  formulario.reset();
  sincronizeStorage();
}

/**
 * Function that will add the actual tweets to local storage
 */
function sincronizeStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

/**
 * Function that shows the list of the tweets in local storage
 */
function showTweetsList(tweets) {
  tweets.forEach((tweet) => {
    const list = document.createElement('li');
    const deleteBtn = document.createElement('a');

    list.textContent = tweet.tweet;
    listaTweets.appendChild(list);

    deleteBtn.textContent = 'X';
    deleteBtn.classList = 'borrar-tweet';
    list.appendChild(deleteBtn);

    deleteBtn.onclick = () => {
      deleteTweet(tweet.id);
    };
  });
}

/**
 * Function that delete the tweet
 */
function deleteTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  sincronizeStorage();
  cleanList();
  showTweetsList(tweets);
}

/**
 * Function that clean the tweet list
 */
function cleanList() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
