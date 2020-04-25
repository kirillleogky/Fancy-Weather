export default function showLanguages(event) {
  if (!event.target.matches('.choose_btn')) {
    const dropdowns = document.querySelector('.language_buttons');
    if (dropdowns.classList.contains('show')) {
      dropdowns.classList.remove('show');
    }
  } else {
    document.getElementById('myDropdown').classList.toggle('show');
  }
}
