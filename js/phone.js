const loadPhone = async (searchText='13', isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones= (phones, isShowAll) =>{
    
    const phoneContainer = document.getElementById("mobile-container")

    // Clear Phone Container before adding New Cards
    phoneContainer.textContent= '';

    // show All Button
    const showAllButton = document.getElementById("show-all-btn")
    if(phones.length > 10 && !isShowAll){
        showAllButton.classList.remove("hidden")
    } else {
        showAllButton.classList.add("hidden")
    }


    // Display only first 10 phones IF NOT show all
    if(!isShowAll){
        phones = phones.slice(0,9);
    }


    phones.forEach( phone=> {
        // console.log(phone)
        // step-1 Create a Div
        const phoneCard = document.createElement("div");
        phoneCard.classList= `card bg-gray-200 p-4 shadow-xl`

        // step-2 set inner html

        phoneCard.innerHTML= `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="showHandleDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        </div>
        `;
        // Step-4 append child
        phoneContainer.appendChild(phoneCard)
    });
    // append child
    toggleLoadingspiner(false);
}

// Show Details
const showHandleDetails = async (id) => {
    // console.log("show handle Details", id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

// show phone Details

const showPhoneDetails = (phone) =>{
    console.log(phone);
    // show the modal
    const phoneName = document.getElementById("show-detail-phone-name");
    phoneName.innerText= phone.name;

    const showDetailContainer = document.getElementById("show-detail-container")
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p>Brand: ${phone.brand}</p>
    <p>Stroage: ${phone?.mainFeatures?.storage} </p>
    <p><span>GPS:</span>${phone?.others?.GPS}</p>
    
    `

    // Show the modal
    show_details_modal.showModal();
}

// Handle Search Button

const handleSearch = (isShowAll) =>{
    toggleLoadingspiner(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

// const handleSearch2 = () => {
//     toggleLoadingspiner(true);
//     const searchField = document.getElementById("search-field2");
//     const searchText = searchField.value;
//     loadPhone(searchText)
// }

// Loading Spinner

const toggleLoadingspiner = (isLoading) =>{
    const loadingSpinner = document.getElementById("loading-spinner");
    if(isLoading){
        loadingSpinner.classList.remove("hidden")
    } else {
        loadingSpinner.classList.add("hidden")
    }
}

// Handale Show All

const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone()