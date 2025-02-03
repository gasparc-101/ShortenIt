let menuIcon = document.querySelector('.fa-bars')
let navigationBar = document.querySelector('.bar')
let listItem = document.querySelectorAll('.link')
let showData = document.querySelector('.data-response')
let send = document.querySelector('.submit')
const copyButton = document.querySelector('.send-copy');
const paragraph = document.querySelector('.response-link');

menuIcon.addEventListener("click", ()=>{
       menuIcon.classList.toggle('fa-times')
       navigationBar.classList.toggle('active')
})

if (!paragraph.innerText){
    showData.classList.add('hidden')
}

if (!showData.classList.contains('hidden')) {
       // Hide the div after 30 seconds
       setTimeout(() => {
           showData.classList.add('hidden');
       }, 30000); // 30,000 milliseconds = 30 seconds
   }




console.log(`${copyButton}, ${paragraph}`)


copyButton.addEventListener('click', () => {
       // Use navigator.clipboard.writeText to copy text
       navigator.clipboard.writeText(paragraph.textContent)
           .then(() => {
               // Optional: Alert the user that the text was copied
               alert('Text copied to clipboard!');
           })
           .catch(err => {
               // Handle any errors
               console.error('Failed to copy text: ', err);
           });
   });