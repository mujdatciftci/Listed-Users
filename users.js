(async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Users not found");
    }
    const data = await response.json();

    renderUsers(data);
  } catch (error) {
    renderErrorMessage(error.message);
  }
})();

function renderUsers(data) {
  let html = "";
  data.forEach((user, index) => {
    let name = user.name.split(" ");
    let surname = name[name.length - 1];
    let gender = () => {
      if (Math.random() < 0.5) {
        return "men";
      } else {
        return "women";
      }
    };
    let imageUrl = `https://randomuser.me/api/portraits/${gender()}/${index}.jpg`;

    const params = new URLSearchParams();
    params.append("userId", user.id);
    const url = `posts.html?${params.toString()}`;

    html += `
              <div class="col-8 col-sm-12 col-lg-10 col-xl-8 mx-auto">
                     <div class="row gap-1 card-wrapper justify-content-center">
                            <div class="col-sm-5 col-md-4 card-left hidden-left">
                                   <div class="card h-100 mx-auto">
                                          <div class="card-body">
                                                 <img
                                                 src="${imageUrl}"
                                                 class="rounded-circle card-img-top mb-3"
                                                 alt="Profile Picture"
                                                 />
                                                 <h5 id="name" class="text-center">${
                                                   name[0]
                                                 }</h5>
                                                 <h5 id="surname" class=" text-center mb-4">${surname}</h5>
                                                 <span class="text-center">ID:</span>
                                                 <span id="id" class="text-center text-muted txt-light">${
                                                   user.id
                                                 }</span>
                                                 <div class="d-flex">
                                                        <span id="email">Email:&nbsp;</span>
                                                        <span id="email" class="txt-light">${user.email.toLowerCase()}</span>
                                                 </div>
                                                 <a href="${url}" class="btn btn-success text-center d-block mt-3">Show Posts</a>
                                          </div>
                                   </div>
                            </div>
                            <div class="col-sm-6 col-md-7 card-right hidden-right">
                                   <div class="card h-100 mx-auto">
                                   <div class="card-header py-3">
                                          <h5 class="card-title m-0">Company Details</h5>
                                   </div>
                                   <div class="card-body">
                                          <ul class="list-group list-group-flush">
                                                 <li class="list-group-item">
                                                        <i class="fa-solid fa-building"></i>
                                                        <span class="mx-3 txt-light">${
                                                          user.company.name
                                                        }</span>
                                                 </li>
                                          </ul>
                                   </div>
                                   <div class="card-header py-3">
                                          <h5 class="card-title m-0">Address</h5>
                                   </div>
                                   <div class="card-body">
                                          <ul class="list-group list-group-flush">
                                                 <li class="list-group-item d-flex">
                                                        <i class="fa-solid fa-location-dot my-auto"></i>
                                                        <span class="mx-3 txt-light">${
                                                          user.address.street
                                                        }, ${
      user.address.suite
    }, ${user.address.city}, ${user.address.zipcode}</span>
                                                 </li>
                                          </ul>
                                   </div>
                                   <div class="card-header py-3">
                                          <h5 class="card-title m-0">Contact</h5>
                                   </div>
                                   <div class="card-body">
                                          <ul class="list-group list-group-flush">
                                                 <li class="list-group-item">
                                                        <i class="fa-solid fa-phone"></i>
                                                        <span class="mx-3 txt-light">${
                                                          user.phone
                                                        }</span>
                                                 </li>
                                                 <li class="list-group-item">
                                                        <i class="fa-solid fa-earth-americas"></i>
                                                        <span class="mx-3 txt-light">${
                                                          user.website
                                                        }</span>
                                                 </li>
                                          </ul>
                                   </div>
                            </div>
                     </div>
              </div>
        </div>
        <hr>
              `;
  });
  document.querySelector("#user-cards").innerHTML = html;
  visibleElements();
}

function renderErrorMessage(error) {
  document.getElementById("errorMessageUser").innerHTML = ` 
                 <div class="alert alert-danger mx-auto animate__animated animate__fadeInUp mt-3">
                 ${error}
                 </div>
       `;
  setTimeout(function () {
    document.querySelector(".alert").classList.add("animate__animated animate__fadeOutUp");
  }, 2000);
  setTimeout(function () {
    document.getElementById("errorMessageUser").innerHTML = "";
  }, 2200);
}

function visibleElements() {
  const sectionsLeft = document.querySelectorAll(".card-left");
  const sectionsRight = document.querySelectorAll(".card-right");


  const observerLeft = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observerLeft.unobserve(entry.target); 
          }
      });
  }, {
      threshold: 0.5 
  });

  sectionsLeft.forEach(section => {
      observerLeft.observe(section); 
  });

  const observerRight = new IntersectionObserver(entries => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('visible');
               observerRight.unobserve(entry.target); 
           }
       });
   }, {
       threshold: 0.5 
   });
 
   sectionsRight.forEach(section => {
       observerRight.observe(section); 
   });
}
