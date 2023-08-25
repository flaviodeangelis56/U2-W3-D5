// const URL = "https://striveschool-api.herokuapp.com/api/product/";

const productId = new URLSearchParams(window.location.search).get("productId");
const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

const buttonCreate = document.getElementById("create");
const buttonDelete = document.getElementById("delete");
const buttonReset = document.getElementById("reset");
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
    if (productId) {
      buttonCreate.innerText = "Edit Product";
      const { name, description, brand, imageUrl, price } = productObj;
      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("brand").value = brand;
      document.getElementById("imageURL").value = imageUrl;
      document.getElementById("price").value = price;

      buttonDelete.classList.remove("d-none");
      buttonReset.classList.add("d-none");
    }
  } catch (error) {
    console.log("error");
  }
};

const createFunction = async event => {
  event.preventDefault();
  const productName = document.getElementById("name").value;
  const productDescription = document.getElementById("description").value;
  const productBrand = document.getElementById("brand").value;
  const productImageURL = document.getElementById("imageURL").value;
  const productPrice = document.getElementById("price").value;
  console.log(productName);

  const newProduct = {
    name: productName,
    description: productDescription,
    brand: productBrand,
    imageUrl: productImageURL,
    price: parseInt(productPrice),
  };
  try {
    await fetch(URL, {
      method: productId ? "PUT" : "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTYwMWMwMzRmZjAwMTQwM2Y0ZTEiLCJpYXQiOjE2OTI5NDc5NjksImV4cCI6MTY5NDE1NzU2OX0.RmDJ-wyOZWTvDGk23sXp-tV_71kjs7-I20KqUp3yo9s",
      },
    });
    window.location.assign("./homepage.html");
  } catch (error) {
    console.log(error);
  }
};

buttonDelete.onclick = async () => {
  const askConfirm = confirm("You are about to delete the product, are you sure you want to?");
  if (askConfirm) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTYwMWMwMzRmZjAwMTQwM2Y0ZTEiLCJpYXQiOjE2OTI5NDc5NjksImV4cCI6MTY5NDE1NzU2OX0.RmDJ-wyOZWTvDGk23sXp-tV_71kjs7-I20KqUp3yo9s",
      },
    });
    window.location.assign("./homepage.html");
  } else {
    alert("product deletion cancelled");
  }
};

buttonReset.onclick = () => {
  const askConfirm = confirm("You are about to reset the form, are you sure you want to?");
  if (askConfirm) {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("imageURL").value = "";
    document.getElementById("price").value = "";
  } else {
    alert("reset cancelled");
  }
};
