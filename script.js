const result = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const sizeSelect = document.getElementById("sizeSelect");
const categoryButtons = document.querySelectorAll(".category-btn");
const url = "./data.json";
let data;
let currentCategory = "all";

async function addMatras() {
    const response = await fetch(url);
    data = await response.json();
    console.log(data);
    for (let i = 0; i < data.sizes.length; i++) {
        sizeSelect.innerHTML += `
            <option value="${data.sizes[i]}">
                ${data.sizes[i].replace("x", " × ")}
            </option>
        `;
    }
    showProducts();
}
function showProducts() {
    result.innerHTML = "";
    const searchText = searchInput.value.toLowerCase();
    const selectedSize = sizeSelect.value;
    for (let i = 0; i < data.products.length; i++) {
        const product = data.products[i];
        if (
            currentCategory !== "all" &&
            product.category !== currentCategory
        ) {
            continue;
        }
        if (
            !product.name.toLowerCase().includes(searchText) &&
            !product.category.toLowerCase().includes(searchText)
        ) {
            continue;
        }
        const price = product.prices[selectedSize];
        result.innerHTML += `
            <div class="bg-white rounded-3xl shadow-md p-5">
                <div class="bg-[#f3f5ff] rounded-2xl h-64 flex items-center justify-center overflow-hidden">
                    <img
                        src="./images/matras2.png"
                        alt="${product.name}"
                        class="w-full h-full object-contain"
                    >
                </div>
                <h2 class="text-2xl font-semibold mt-5">
                    ${product.name}
                </h2>
                <p class="text-gray-500 text-lg mt-2">
                    ${product.category}
                </p>
                <strong class="text-2xl block mt-4">
                    ${price.toLocaleString("ru-RU")} ₸
                </strong>
            </div>
        `;
    }
}
searchInput.addEventListener("input", function () {
    showProducts();
});
sizeSelect.addEventListener("change", function () {
    showProducts();
});
for (let i = 0; i < categoryButtons.length; i++) {
    categoryButtons[i].addEventListener("click", function () {
        currentCategory = categoryButtons[i].dataset.category;
        showProducts();
    });
}
window.addEventListener("load", addMatras);