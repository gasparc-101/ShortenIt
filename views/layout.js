let menuIcon = document.querySelector('.fa-bars')
let navigationBar = document.querySelector('.bar')

let listItem = document.querySelectorAll('.link')

let showData = document.querySelector('.data-response')
let send = document.querySelector('.submit')


menuIcon.addEventListener("click", ()=>{
       menuIcon.classList.toggle('fa-times')
       navigationBar.classList.toggle('active')
})

showData.classList.add('hidden')

send.addEventListener('click', (event)=>{
       event.preventDefault()

setTimeout(() => {
       showData.classList.remove('hidden')
}, 2000); // 2000 milliseconds = 2 seconds

setTimeout(() => {
       showData.classList.add('hidden')
}, 30000); 
})  

document.querySelector('.default').classList.add('link-active')


listItem.forEach((item)=>{
       item.addEventListener("click", (event)=>{
              menuIcon.classList.remove('fa-times')
              navigationBar.classList.remove('active')

              listItem.forEach((link) => link.classList.remove('link-active'));

              item.classList.toggle('link-active')
       })
})
