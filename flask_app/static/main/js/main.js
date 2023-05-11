
// Burger menu visibility on click
const burgerMenu = document.getElementById("menuBurger")
const feedbackForm = document.getElementById("feedbackForm")
document.addEventListener("click", (event) => {
    if (event.target.id === 'burgerMenuPic'){
        temp = burgerMenu.style.display
        if (temp === '' || temp === 'none'){
            console.log(temp)
            burgerMenu.style.display = "inherit";
        }
        else{burgerMenu.style.display = "none";}
    }
});

document.addEventListener("click", (event) => {
    if (event.target.id === 'feedbackButton'){
        temp = feedbackForm.style.display
        if (temp === '' || temp === 'none'){
            console.log(temp)
            feedbackForm.style.display = "flex";
        }
        else{feedbackForm.style.display = "none";}
    }
});