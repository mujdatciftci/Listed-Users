async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed");
    }
    const data = await response.json();
    renderUsers(data);
  } catch (error) {
    alert(error.message);
  }
}

function renderUsers(data) {
  let html = "";
  data.forEach((user) => {
    let name = user.name.split(" ");
    let surname = name[name.length - 1];
    let index = Math.floor(Math.random() * 100);
    let gender = Math.random() < 0.5 ? "men" : "women";
    let imageUrl = `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
    html += `
              <div class="col-8 col-sm-12 col-lg-10 col-xl-8 mx-auto">
                     <div class="row gap-1 card-wrapper justify-content-center">
                            <div class="col-sm-5 col-md-4">
                                   <div class="card h-100 mx-auto">
                                   <div class="card-body">
                                          <img
                                          src="${imageUrl}"
                                          class="rounded-circle card-img-top mb-3"
                                          alt="Profile Picture"
                                          />
                                   <h5 id="name" class="text-center">${user.name}</h5>
                                   <h5 id="surname" class=" text-center mb-4">${surname}</h5>
                                   <span class="text-center text-muted txt-light">ID:</span>
                                   <span id="id" class="text-center text-muted txt-light">${user.id}</span>
                                   <p id="email" class="txt-light">Email: ${user.email}</p>
                                    </div>
                                   </div>
                            </div>
              <div class="col-sm-6 col-md-7">
                     <div class="card h-100 mx-auto">
                     <div class="card-header py-3">
                     <h5 class="card-title m-0">Company Details</h5>
                     </div>
                     <div class="card-body">
                     <ul class="list-group list-group-flush">
                     <li class="list-group-item">
                            <i class="fa-solid fa-building"></i>
                            <span class="mx-3 txt-light">${user.company.name}</span>
                     </li>
                     </ul>
                     </div>
                     <div class="card-header py-3">
                     <h5 class="card-title m-0">Address</h5>
                     </div>
                     <div class="card-body">
                     <ul class="list-group list-group-flush">
                     <li class="list-group-item">
                            <i class="fa-solid fa-location-dot"></i>
                            <span class="mx-3 txt-light">${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</span>
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
                            <span class="mx-3 txt-light">${user.phone}</span>
                     </li>
                     <li class="list-group-item">
                            <i class="fa-solid fa-earth-americas"></i>
                            <span class="mx-3 txt-light">${user.website}</span>
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
}

document.addEventListener("DOMContentLoaded", async () => {
  await getUsers();
});
