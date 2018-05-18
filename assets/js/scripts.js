/** Like font function */
function likeFont(event) {
  event.preventDefault();

  let elem = event.target;
  let likeUrl = elem.getAttribute('href');

  fetch(likeUrl, {method: 'put'})
    .then(res => {
        if (res.ok) {
          window.location.reload(true);
        }
      }
    )
    .catch(err => {
      console.log(err);
    })
}
