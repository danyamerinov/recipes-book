/* Кулинарная книга — клиентская логика */
(() => {
  'use strict';

  const recipes = [
    { id: 'fb-1', title: 'Борщ классический', cuisine: 'Домашняя кухня', description: 'Насыщенный свекольный суп со сметаной.', ingredients: ['свекла', 'капуста', 'картофель', 'морковь', 'говядина', 'томатная паста', 'сметана'], instructions: 'Отварить говядину, добавить овощи, варить 30 мин, подать со сметаной.', prep_time: '20 мин', cook_time: '1 час', servings: 6 },
    { id: 'fb-2', title: 'Пицца Маргарита', cuisine: 'Итальянская', description: 'Классическая пицца с томатами, моцареллой и базиликом.', ingredients: ['тесто', 'моцарелла', 'помидоры', 'базилик', 'оливковое масло'], instructions: 'Раскатать тесто, выложить томаты и моцареллу, печь 250°C 10–12 мин.', prep_time: '15 мин', cook_time: '12 мин', servings: 3 },
    { id: 'fb-3', title: 'Суши ассорти', cuisine: 'Японская', description: 'Роллы с лососем, тунцом, авокадо и огурцом.', ingredients: ['рис для суши', 'лосось', 'тунец', 'авокадо', 'огурец', 'нори'], instructions: 'Приготовить рис, выложить на нори с начинкой, свернуть ролл.', prep_time: '30 мин', cook_time: '0 мин', servings: 4 },
    { id: 'fb-4', title: 'Хачапури по-аджарски', cuisine: 'Грузинская', description: 'Лодочка из теста с сыром сулугуни и яйцом.', ingredients: ['мука', 'дрожжи', 'сыр сулугуни', 'яйца', 'сливочное масло'], instructions: 'Замесить тесто, сформировать лодочки, заполнить сыром, испечь и добавить яйцо.', prep_time: '2 часа', cook_time: '20 мин', servings: 4 },
    { id: 'fb-5', title: 'Такос с говядиной', cuisine: 'Мексиканская', description: 'Сочные такос с говядиной, авокадо и лаймом.', ingredients: ['тортилья', 'говяжий фарш', 'фасоль', 'кукуруза', 'авокадо', 'лайм'], instructions: 'Обжарить фарш с чили, добавить фасоль и кукурузу, наполнить тортильи.', prep_time: '15 мин', cook_time: '15 мин', servings: 4 },
    { id: 'fb-6', title: 'Рататуй', cuisine: 'Французская', description: 'Тушёные овощи в провансальском стиле.', ingredients: ['баклажаны', 'кабачки', 'помидоры', 'лук', 'чеснок', 'оливковое масло'], instructions: 'Нарезать овощи ломтиками, выложить в форму, полить маслом и запекать при 180°C около 50 минут.', prep_time: '25 мин', cook_time: '55 мин', servings: 4 },
    { id: 'fb-7', title: 'Карри с курицей', cuisine: 'Индийская', description: 'Ароматное карри на кокосовом молоке.', ingredients: ['курица', 'кокосовое молоко', 'карри-порошок', 'лук', 'чеснок', 'имбирь'], instructions: 'Обжарить лук со специями, добавить курицу и кокосовое молоко, тушить 20 минут.', prep_time: '15 мин', cook_time: '25 мин', servings: 4 },
    { id: 'fb-8', title: 'Паэлья с морепродуктами', cuisine: 'Испанская', description: 'Рис с креветками, мидиями и шафраном.', ingredients: ['рис', 'креветки', 'мидии', 'шафран', 'лук', 'перец', 'оливковое масло'], instructions: 'Обжарить лук и перец, добавить рис и шафран, залить бульоном, затем добавить морепродукты.', prep_time: '20 мин', cook_time: '25 мин', servings: 4 }
  ];

  const icons = { 'Домашняя кухня': '🏠', 'Итальянская': '🇮🇹', 'Японская': '🇯🇵', 'Мексиканская': '🇲🇽', 'Грузинская': '🇬🇪', 'Французская': '🇫🇷', 'Индийская': '🇮🇳', 'Испанская': '🇪🇸' };
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => {
    const node = document.createElement('span');
    node.textContent = String(value ?? '');
    return node.innerHTML;
  };

  let activeFilter = 'all';
  let query = '';
  let sortByTitle = false;

  function closeModal() {
    const modal = $('recipeModal');
    if (!modal) return;
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  window.closeModal = closeModal;

  function openRecipe(recipe) {
    const modal = $('recipeModal');
    const content = $('modalContent');
    if (!modal || !content) return;

    const ingredients = recipe.ingredients.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    const instructionParts = recipe.instructions.match(/[^.!?]+[.!?]?/g) || [recipe.instructions];
    const instructions = instructionParts.map(step => step.trim()).filter(Boolean).map(step => `<li>${escapeHtml(step)}</li>`).join('');

    content.innerHTML = `
      <button class="modal__close" id="modalClose" type="button" aria-label="Закрыть">×</button>
      <div class="recipe-detail">
        <div class="recipe-detail__img" role="img" aria-label="${escapeHtml(recipe.title)}" style="background:linear-gradient(135deg,#ffe0d2,#fff3e6);display:flex;align-items:center;justify-content:center;font-size:4rem;color:#d84315;">${icons[recipe.cuisine] || '🍽️'}</div>
        <h2 class="recipe-detail__title">${escapeHtml(recipe.title)}</h2>
        <span class="recipe-detail__cuisine">${icons[recipe.cuisine] || ''} ${escapeHtml(recipe.cuisine)}</span>
        <p>${escapeHtml(recipe.description)}</p>
        <div class="recipe-detail__meta">
          <div class="recipe-detail__meta-item"><span class="recipe-detail__meta-label">Время приготовления</span><span class="recipe-detail__meta-value">${escapeHtml(recipe.cook_time)}</span></div>
          <div class="recipe-detail__meta-item"><span class="recipe-detail__meta-label">Подготовка</span><span class="recipe-detail__meta-value">${escapeHtml(recipe.prep_time)}</span></div>
          <div class="recipe-detail__meta-item"><span class="recipe-detail__meta-label">Порции</span><span class="recipe-detail__meta-value">${escapeHtml(recipe.servings)}</span></div>
        </div>
        <div class="recipe-detail__section"><h3>Ингредиенты</h3><ul class="recipe-detail__ingredients">${ingredients}</ul></div>
        <div class="recipe-detail__section"><h3>Приготовление</h3><ol class="recipe-detail__instructions">${instructions}</ol></div>
      </div>`;

    const closeButton = $('modalClose');
    if (closeButton) closeButton.addEventListener('click', closeModal);
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function renderRecipes() {
    const grid = $('recipesGrid');
    const empty = $('recipesEmpty');
    const counter = $('recipeCounter');
    if (!grid) return;

    const normalizedQuery = query.trim().toLocaleLowerCase('ru');
    const filtered = recipes.filter(recipe => {
      const matchesFilter = activeFilter === 'all' || recipe.cuisine === activeFilter;
      const searchable = [recipe.title, recipe.description, recipe.cuisine, ...recipe.ingredients].join(' ').toLocaleLowerCase('ru');
      return matchesFilter && searchable.includes(normalizedQuery);
    });
    if (sortByTitle) filtered.sort((a, b) => a.title.localeCompare(b.title, 'ru'));

    grid.replaceChildren();
    filtered.forEach(recipe => {
      const card = document.createElement('article');
      card.className = 'recipe-card reveal-up';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Открыть рецепт: ${recipe.title}`);
      card.innerHTML = `<div class="recipe-card__img-wrap"><div class="recipe-card__img" style="background:linear-gradient(135deg,#ffe0d2,#fff3e6);display:flex;align-items:center;justify-content:center;font-size:3rem;color:#d84315;">${icons[recipe.cuisine] || '🍽️'}</div><span class="recipe-card__badge">${escapeHtml(recipe.cuisine)}</span></div><div class="recipe-card__content"><h3 class="recipe-card__title">${escapeHtml(recipe.title)}</h3><p class="recipe-card__desc">${escapeHtml(recipe.description)}</p><div class="recipe-card__meta"><span>⏱ ${escapeHtml(recipe.cook_time)}</span><span>👥 ${escapeHtml(recipe.servings)}</span></div></div>`;
      card.addEventListener('click', () => openRecipe(recipe));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openRecipe(recipe);
        }
      });
      grid.appendChild(card);
    });

    grid.style.display = filtered.length ? 'grid' : 'none';
    if (empty) empty.style.display = filtered.length ? 'none' : 'block';
    if (counter) counter.innerHTML = `Показано <span>${filtered.length}</span> из <span>${recipes.length}</span>`;
  }

  function showToast(message) {
    const toast = $('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('toast--show');
    window.setTimeout(() => toast.classList.remove('toast--show'), 3000);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const banner = $('accessBanner');
    const hasInviteToken = new URLSearchParams(window.location.search).has('token');
    if (banner) banner.style.display = hasInviteToken ? 'none' : 'flex';

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(navItem => navItem.classList.remove('nav-item--active'));
        item.classList.add('nav-item--active');
        activeFilter = item.dataset.filter || 'all';
        renderRecipes();
      });
    });

    const search = $('recipeSearch');
    if (search) search.addEventListener('input', event => { query = event.target.value; renderRecipes(); });

    const sortButton = $('sortBtn');
    if (sortButton) sortButton.addEventListener('click', () => {
      sortByTitle = !sortByTitle;
      const arrow = sortButton.querySelector('.sort-arrow');
      if (arrow) arrow.textContent = sortByTitle ? '↑' : '▾';
      renderRecipes();
    });

    const overlay = $('modalOverlay');
    if (overlay) overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

    const burger = $('navbarBurger');
    const menu = $('navbarMenu');
    if (burger && menu) burger.addEventListener('click', () => menu.classList.toggle('active'));

    document.querySelectorAll('.category-card').forEach(card => card.addEventListener('click', () => {
      const category = card.dataset.category;
      const navItem = [...document.querySelectorAll('.nav-item')].find(item => item.dataset.filter === category);
      if (navItem) navItem.click();
      const section = $('recipes');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }));

    const shareButton = $('shareBtn');
    if (shareButton) shareButton.addEventListener('click', async event => {
      event.preventDefault();
      try {
        if (navigator.share) await navigator.share({ title: 'Кулинарная книга', text: 'Рецепты дома и мира', url: window.location.href });
        else if (navigator.clipboard) { await navigator.clipboard.writeText(window.location.href); showToast('Ссылка скопирована!'); }
        else showToast(window.location.href);
      } catch (error) {
        if (error.name !== 'AbortError') showToast('Не удалось поделиться ссылкой.');
      }
    });

    const themeButton = $('themeToggle');
    if (themeButton) {
      try {
        if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
        themeButton.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
      } catch (_) { /* Хранилище браузера может быть недоступно. */ }
      themeButton.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        themeButton.textContent = isDark ? '☀️' : '🌙';
        try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (_) { /* Игнорируем блокировку хранилища. */ }
      });
    }

    renderRecipes();
  });
})();
