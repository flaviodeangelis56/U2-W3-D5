const productId = new URLSearchParams(window.location.search).get("productId");
const URL = "https://striveschool-api.herokuapp.com/api/product/" + productId;

window.onload = async () => {
  try {
    const resp = await fetch(URL, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTYwMWMwMzRmZjAwMTQwM2Y0ZTEiLCJpYXQiOjE2OTI5NDc5NjksImV4cCI6MTY5NDE1NzU2OX0.RmDJ-wyOZWTvDGk23sXp-tV_71kjs7-I20KqUp3yo9s",
      },
    });
    const productObj = await resp.json();
    console.log(productObj);
    const spinner = document.getElementById("spinner");
    spinner.remove();
    const { name, description, brand, imageUrl, price } = productObj;
    const main = document.getElementById("main");
    const div = document.createElement("div");
    div.innerHTML = `<img src="${imageUrl}" alt="${name}" class="detailImg"/>
<h2 class="mt-5 mb-3">${name}</h2>
<p class="mb-3">${brand}</p>
<p class="mb-3">
${description}
</p>
<h4 class="mb-3">${price}$</h4>
<a href="index.html?productId=${productObj._id}" class="btn btn-warning mb-5">edit product</a>`;
    main.appendChild(div);
  } catch (error) {
    console.log(error);
  }
};
