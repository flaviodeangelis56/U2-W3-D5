const URL = "https://striveschool-api.herokuapp.com/api/product/";

window.onload = async () => {
  try {
    const resp = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTYwMWMwMzRmZjAwMTQwM2Y0ZTEiLCJpYXQiOjE2OTI5NDc5NjksImV4cCI6MTY5NDE1NzU2OX0.RmDJ-wyOZWTvDGk23sXp-tV_71kjs7-I20KqUp3yo9s",
      },
    });
    const products = await resp.json();
    console.log(products);
    const spinner = document.getElementById("spinner");
    spinner.remove();
    products.forEach(productObj => {
      const row = document.getElementById("row");
      const col = document.createElement("div");
      col.className = "col-md-4 my-5 ";
      col.innerHTML = `
      <div class="card" style="height: 400px">
       <img src="${productObj.imageUrl}" class="card-img-top" alt="${productObj.name}" style="height: 200px"/>
        <div class="card-body">
         <h5 class="card-title">${productObj.name}</h5>
         <p class="card-text">
          ${productObj.description}
         </p>
         <p class="card-text">
         ${productObj.price}$
        </p>
         <a href="index.html?productId=${productObj._id}" class="btn btn-warning">edit product</a>
         <a href="details.html?productId=${productObj._id}" class="btn btn-dark">product details</a>
        </div>
      </div>`;
      row.appendChild(col);
    });
  } catch (error) {
    console.log(error);
  }
};
