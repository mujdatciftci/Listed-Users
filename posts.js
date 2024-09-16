const getUrl = window.location.search;
const urlParams = new URLSearchParams(getUrl);
const userId = urlParams.get("userId");

(async function getPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts' + userId);
    if (!response.ok) {
      throw new Error("User's Posts not found.");
    }else {
        const data = await response.json();
        const responseUsername = await fetch('https://jsonplaceholder.typicode.com/users');
        const dataUsername = await responseUsername.json();
        let postHtml = "";
        data.forEach((data) => {
          postHtml += `
                <div class="card mb-3 post">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-2 p-0 text-center">
                        <img src="https://via.placeholder.com/50" alt="User Avatar" class="img-fluid rounded-circle" />
                      </div>
                      <div class="col-9 px-3 px-sm-2 px-lg-1 px-xl-0 align-self-center">
                        <h5>${dataUsername[userId - 1].name}</h5>
                      </div>
                    </div>
                    <hr>
                    <h5 class="card-title mt-4">${data.title.charAt(0).toUpperCase() + data.title.slice(1)}</h5>
                    <p class="txt-light">${data.body.charAt(0).toUpperCase() + data.body.slice(1)}</p>
                  </div>
                </div>
          `;
          document.getElementById("post").innerHTML = postHtml;
        });
        visibleElements();
      }
   
  } catch (error) {
    renderErrorMessage(error.message);
  }
})();

function renderErrorMessage(error) {
  document.getElementById("errorMessage").innerHTML = ` 
            <div class="alert alert-danger mx-auto animate__animated animate__fadeInUp">
            ${error}
            </div>
  `;
   setTimeout(function() {
    document.querySelector(".alert").classList.add("animate__fadeOutUp");
  }, 2000);
  setTimeout(function(){
    document.getElementById("errorMessage").innerHTML = "";
  },2200)
}

function visibleElements() {
  const sectionsPost = document.querySelectorAll(".post");


  const observerPost = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible-post');
              observerPost.unobserve(entry.target); 
          }
      });
  }, {
      threshold: 0.5 
  });

  sectionsPost.forEach(section => {
    observerPost.observe(section); 
  });

}