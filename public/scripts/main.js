const feedback = document.querySelector('.feedback-response')

if (!feedback.classList.contains('hidden')){
    setTimeout(() => {
        feedback.classList.add('hidden')
    }, 7000);
}