function toggleFilter(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.toggle-icon');

  const isVisible = content.style.display === 'block';
  content.style.display = isVisible ? 'none' : 'block';
  icon.textContent = isVisible ? '+' : '–';
}
