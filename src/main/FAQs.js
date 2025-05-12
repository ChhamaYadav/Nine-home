function toggleFAQs(element){

        const icon=element.querySelector('.toggle-icon');
        const answer= element.nextElementSibling;

        if(answer.classList.contains('hidden')){
        answer.classList.remove('hidden');
        icon.textContent='-';
        }else{
        answer.classList.add('hidden');
        icon.textContent='+';
        }
}

function showSection(id) {
  const sections = document.querySelectorAll('.faq-section');
  sections.forEach(sec => {
    sec.classList.add('hidden');
    sec.classList.remove('active');
  });
  const selectedSelection= document.getElementById(id);
     selectedSelection.classList.remove('hidden');
  selectedSelection.classList.add('active');
}
