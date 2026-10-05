const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const worksCollection = document.querySelector('.works-collection');
const workFilters = document.querySelector('.works-filters');
const workDialog = document.querySelector('.work-dialog');

if (worksCollection && workFilters && workDialog) {
  const cards = [...worksCollection.querySelectorAll('[data-work-card]')];
  const categories = [...worksCollection.querySelectorAll('[data-work-category]')];
  const dialogImage = workDialog.querySelector('.work-dialog-image');
  const dialogTitle = workDialog.querySelector('#work-dialog-title');
  const dialogYear = workDialog.querySelector('.work-dialog-year');
  const dialogMedium = workDialog.querySelector('.work-dialog-medium');
  const dialogDimensions = workDialog.querySelector('.work-dialog-dimensions');
  const dialogMediumLabel = workDialog.querySelector('[data-work-medium-label]');
  const dialogLayout = workDialog.querySelector('.work-dialog-layout');

  workFilters.addEventListener('click', (event) => {
    const filter = event.target.closest('[data-work-filter]');
    if (!filter) return;

    const category = filter.dataset.workFilter;
    workFilters.querySelectorAll('[data-work-filter]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button === filter));
    });

    cards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });

    categories.forEach((section) => {
      section.hidden = !section.querySelector('[data-work-card]:not([hidden])');
    });
  });

  worksCollection.addEventListener('click', (event) => {
    const trigger = event.target.closest('.work-open');
    if (!trigger) return;

    dialogTitle.textContent = trigger.dataset.title;
    dialogYear.textContent = trigger.dataset.year;
    dialogYear.hidden = !trigger.dataset.year;
    dialogMedium.textContent = trigger.dataset.medium;
    dialogMediumLabel.textContent = trigger.dataset.mediumLabel || 'Technique';
    dialogMedium.parentElement.hidden = !trigger.dataset.medium;
    dialogDimensions.textContent = trigger.dataset.dimensions;
    dialogDimensions.parentElement.hidden = !trigger.dataset.dimensions;
    dialogImage.replaceChildren();
    dialogImage.hidden = trigger.dataset.textOnly === 'true';
    dialogLayout.classList.toggle('is-text-only', trigger.dataset.textOnly === 'true');

    if (trigger.dataset.image) {
      const image = document.createElement('img');
      image.src = trigger.dataset.image;
      image.alt = `${trigger.dataset.title}, ${trigger.dataset.year}`;
      dialogImage.append(image);
    } else if (trigger.dataset.textOnly !== 'true') {
      dialogImage.classList.add('work-image-placeholder');
      const placeholder = document.createElement('span');
      placeholder.textContent = 'IMAGE À AJOUTER / ASSOCIATION À CONFIRMER';
      dialogImage.append(placeholder);
    }

    workDialog.showModal();
  });

  workDialog.addEventListener('close', () => {
    dialogImage.classList.remove('work-image-placeholder');
    dialogImage.hidden = false;
    dialogLayout.classList.remove('is-text-only');
  });
}