let menuIcon = document.querySelector('.fa-bars')
let navigationBar = document.querySelector('.bar')
let listItem = document.getElementsByClassName('link')

menuIcon.addEventListener("click", ()=>{
       menuIcon.classList.toggle('fa-times')
       navigationBar.classList.toggle('active')
})

document.querySelector('.data-response').classList.ad('hidden')
