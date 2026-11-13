/* Кулинарная книга — рецепты, фотографии и модальные окна */
(() => {
  'use strict';

  const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
  const recipes = [
    { id: 'borsch', title: 'Борщ классический', cuisine: 'Домашняя кухня', description: 'Насыщенный свекольный суп со сметаной и ароматной зеленью.', ingredients: ['Свёкла','Капуста','Картофель','Морковь','Говядина','Томатная паста','Сметана'], instructions: ['Сварите говядину до мягкости и сохраните бульон.','Нарежьте овощи; свёклу слегка потушите с томатной пастой.','Добавьте картофель и капусту в бульон, затем свёклу с морковью.','Варите до готовности овощей и подавайте со сметаной.'], prep_time: '20 мин', cook_time: '1 час', servings: 6, image: photo('photo-1547592180-85f173990554'), ingredientImages: ['photo-1594282486552-05b4d80fbb9f','photo-1597362925123-77861d3fbac7','photo-1518977676601-b53f82aba655','photo-1445282768818-728615cc910a','photo-1607623814075-e51df1bdc82f','photo-1547592180-85f173990554','photo-1482049016688-2d3e1b311543'] },
    { id: 'pizza', title: 'Пицца Маргарита', cuisine: 'Итальянская', description: 'Тонкое тесто, спелые томаты, моцарелла и свежий базилик.', ingredients: ['Тесто','Моцарелла','Помидоры','Базилик','Оливковое масло'], instructions: ['Разогрейте духовку до 250°C.','Растяните тесто, добавьте томатный соус и моцареллу.','Выпекайте 10–12 минут до золотистой корочки.','Добавьте базилик и немного оливкового масла.'], prep_time: '15 мин', cook_time: '12 мин', servings: 3, image: photo('photo-1579751626657-72bc17010498'), ingredientImages: ['photo-1565299624946-b28f40a0ae38','photo-1486297678162-eb2a19b0a32d','photo-1546094096-0df4bcaaa337','photo-1618375569909-3c8616cf7733','photo-1474979266404-7eaacbcd87c5'] },
    { id: 'sushi', title: 'Суши ассорти', cuisine: 'Японская', description: 'Роллы с лососем, тунцом, авокадо и хрустящим огурцом.', ingredients: ['Рис для суши','Лосось','Тунец','Авокадо','Огурец','Нори'], instructions: ['Промойте рис и сварите его до мягкости.','Смешайте рисовый уксус с рисом и дайте ему остыть.','Выложите рис и начинку на лист нори.','Сверните ролл, нарежьте и подавайте с соевым соусом.'], prep_time: '30 мин', cook_time: '0 мин', servings: 4, image: photo('photo-1579871494447-9811cf80d66c'), ingredientImages: ['photo-1586201375761-83865001e31c','photo-1519708227418-c8fd9a32b7a2','photo-1535399831218-d5bd36d1a6b3','photo-1523049673857-eb18f1d7b578','photo-1604977042946-1eecc30f269e','photo-1617196034796-73dfa7b1fd56'] },
    { id: 'khachapuri', title: 'Хачапури по-аджарски', cuisine: 'Грузинская', description: 'Румяная лодочка из теста с расплавленным сыром и яйцом.', ingredients: ['Мука','Дрожжи','Сыр сулугуни','Яйца','Сливочное масло'], instructions: ['Замесите мягкое дрожжевое тесто и оставьте его подняться.','Сформируйте лодочки и наполните тёртым сыром.','Выпекайте до золотистой корочки.','Добавьте яйцо и кусочек масла, подавайте горячим.'], prep_time: '2 часа', cook_time: '20 мин', servings: 4, image: photo('photo-1600628422019-7f6f0f3e8b08'), ingredientImages: ['photo-1627485937980-221c88ac04f9','photo-1625944525533-473f1a3d54e7','photo-1486297678162-eb2a19b0a32d','photo-1506976785307-8732e854ad03','photo-1589985270826-4b7bb135bc9d'] },
    { id: 'tacos', title: 'Такос с говядиной', cuisine: 'Мексиканская', description: 'Сочные такос с пряной говядиной, авокадо и лаймом.', ingredients: ['Тортильи','Говяжий фарш','Фасоль','Кукуруза','Авокадо','Лайм'], instructions: ['Обжарьте фарш с луком и специями до готовности.','Добавьте фасоль и кукурузу, прогрейте начинку.','Наполните тортильи мясом и овощами.','Подавайте с авокадо и соком лайма.'], prep_time: '15 мин', cook_time: '15 мин', servings: 4, image: photo('photo-1552332386-f8dd00dc2f85'), ingredientImages: ['photo-1565299585323-38d6b0865b47','photo-1607623814075-e51df1bdc82f','photo-1551754655-cd27e38d2076','photo-1551754655-cd27e38d2076','photo-1523049673857-eb18f1d7b578','photo-1513558161293-cdaf765edfd7'] },
    { id: 'ratatouille', title: 'Рататуй', cuisine: 'Французская', description: 'Нежное запечённое ассорти из овощей и прованских трав.', ingredients: ['Баклажаны','Кабачки','Помидоры','Лук','Чеснок','Оливковое масло'], instructions: ['Нарежьте овощи тонкими кружочками.','Выложите их чередующимися рядами в форму.','Добавьте чеснок, травы, соль и оливковое масло.','Запекайте при 180°C около 50 минут.'], prep_time: '25 мин', cook_time: '55 мин', servings: 4, image: photo('photo-1572453800999-e8d2d1589b7c'), ingredientImages: ['photo-1518977676601-b53f82aba655','photo-1501004318641-b39e6451bec6','photo-1546094096-0df4bcaaa337','photo-1508747703725-719777637510','photo-1615477550927-6ec8445f60f4','photo-1474979266404-7eaacbcd87c5'] },
    { id: 'curry', title: 'Карри с курицей', cuisine: 'Индийская', description: 'Ароматное сливочное карри с курицей и кокосовым молоком.', ingredients: ['Курица','Кокосовое молоко','Карри','Лук','Чеснок','Имбирь'], instructions: ['Обжарьте лук, чеснок и имбирь до аромата.','Добавьте кусочки курицы и обжарьте до золотистого цвета.','Вмешайте карри и кокосовое молоко.','Тушите 20 минут и подавайте с рисом.'], prep_time: '15 мин', cook_time: '25 мин', servings: 4, image: photo('photo-1603894584373-5ac82b2ae398'), ingredientImages: ['photo-1607623814075-e51df1bdc82f','photo- Coconut','photo-1596040033229-a9821ebd058d','photo-1508747703725-719777637510','photo-1615477550927-6ec8445f60f4','photo-1615485290382-441e4d049cb5'] },
    { id: 'paella', title: 'Паэлья с морепродуктами', cuisine: 'Испанская', description: 'Золотистый рис с креветками, мидиями и ароматным шафраном.', ingredients: ['Рис','Креветки','Мидии','Шафран','Лук','Сладкий перец','Оливковое масло'], instructions: ['Обжарьте лук и перец в широкой сковороде.','Добавьте рис и шафран, перемешайте.','Влейте горячий бульон и готовьте на небольшом огне.','Добавьте морепродукты и доведите рис до готовности.'], prep_time: '20 мин', cook_time: '25 мин', servings: 4, image: photo('photo-1534080564583-6be75777b70a'), ingredientImages: ['photo-1586201375761-83865001e31c','photo-1565680018434-b513d5e5fd47','photo-1559737558-2f5a35f4523b','photo-1596040033229-a9821ebd058d','photo-1508747703725-719777637510','photo-1513558161293-cdaf765edfd7','photo-1474979266404-7eaacbcd87c5'] }
  ];

  const icons = { 'Домашняя кухня': '🏠', 'Итальянская': '🇮🇹', 'Японская': '🇯🇵', 'Мексиканская': '🇲🇽', 'Грузинская': '🇬🇪', 'Французская': '🇫🇷', 'Индийская': '🇮🇳', 'Испанская': '🇪🇸' };
  const $ = id => document.getElementById(id);
  const esc = value => { const el = document.createElement('span'); el.textContent = String(value ?? ''); return el.innerHTML; };
  const img = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
  let activeFilter = 'all';
  let query = '';
  let sortTitle = false;

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
    const ingredients = recipe.ingredients.map((name, i) => {
      const imageId = recipe.ingredientImages[i] || recipe.image.split('?')[0].replace('https://images.unsplash.com/', '');
      return `<li class="ingredient-card"><img src="${img(imageId, 240)}" alt="${esc(name)}" loading="lazy" onerror="this.classList.add('image-fallback');this.removeAttribute('src')"><span>${esc(name)}</span></li>`;
    }).join('');
    const steps = recipe.instructions.map((step, i) => `<li><span class="step-number">${i + 1}</span><span>${esc(step)}</span></li>`).join('');

    content.innerHTML = `
      <button class="modal__close" id="modalClose" type="button" aria-label="Закрыть рецепт">×</button>
      <div class="recipe-detail">
        <div class="recipe-detail__hero"><img class="recipe-detail__img" src="${recipe.image}" alt="${esc(recipe.title)}" fetchpriority="high" onerror="this.classList.add('image-fallback');this.removeAttribute('src')"><span class="recipe-detail__photo-label">${icons[recipe.cuisine] || '🍽️'} ${esc(recipe.cuisine)}</span></div>
        <h2 class="recipe-detail__title">${esc(recipe.title)}</h2>
        <p class="recipe-detail__description">${esc(recipe.description)}</p>
        <div class="recipe-detail__meta"><div class="recipe-detail__meta-item"><span class="recipe-detail__meta-label">Готовка</span><span class="recipe-detail__meta-value">⏱ ${esc(recipe.cook_time)}</span></div><div class="recipe-detail__meta-item"><span class="recipe-detail__meta-label">Подготовка</span><span class="recipe-detail__meta-value">🔪 ${esc(recipe.prep_time)}</span></div><div class="recipe-detail__meta-item"><span class="recipe-detail__meta-label">Порции</span><span class="recipe-detail__meta-value">🍽️ ${esc(recipe.servings)}</span></div></div>
        <section class="recipe-detail__section"><h3>Ингредиенты <span class="section-caption">Всё для идеального вкуса</span></h3><ul class="recipe-detail__ingredients">${ingredients}</ul></section>
        <section class="recipe-detail__section"><h3>Приготовление <span class="section-caption">Шаг за шагом</span></h3><ol class="recipe-detail__instructions">${steps}</ol></section>
        <button class="btn btn--primary recipe-done" type="button" onclick="window.closeModal()">Готово, спасибо!</button>
      </div>`;

    const closeButton = $('modalClose');
    if (closeButton) closeButton.addEventListener('click', closeModal);
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeButton) closeButton.focus();
  }

  function renderRecipes() {
    const grid = $('recipesGrid');
    const empty = $('recipesEmpty');
    const counter = $('recipeCounter');
    if (!grid) return;
    const term = query.trim().toLocaleLowerCase('ru');
    const filtered = recipes.filter(recipe => {
      const text = [recipe.title, recipe.description, recipe.cuisine, ...recipe.ingredients].join(' ').toLocaleLowerCase('ru');
      return (activeFilter === 'all' || recipe.cuisine === activeFilter) && text.includes(term);
    });
    if (sortTitle) filtered.sort((a,b) => a.title.localeCompare(b.title, 'ru'));
    grid.replaceChildren();
    filtered.forEach((recipe, index) => {
      const card = document.createElement('article');
      card.className = 'recipe-card';
      card.tabIndex = 0;
      card.setAttribute('role','button');
      card.setAttribute('aria-label',`Открыть рецепт: ${recipe.title}`);
      card.style.setProperty('--card-index', index);
      card.innerHTML = `<div class="recipe-card__img-wrap"><img class="recipe-card__img" src="${recipe.image}" alt="${esc(recipe.title)}" loading="lazy" onerror="this.classList.add('image-fallback');this.removeAttribute('src')"><span class="recipe-card__badge">${icons[recipe.cuisine] || ''} ${esc(recipe.cuisine)}</span><span class="recipe-card__open-hint">Открыть рецепт <span aria-hidden="true">↗</span></span></div><div class="recipe-card__content"><h3 class="recipe-card__title">${esc(recipe.title)}</h3><p class="recipe-card__desc">${esc(recipe.description)}</p><div class="recipe-card__meta"><span>⏱ ${esc(recipe.cook_time)}</span><span>👥 ${esc(recipe.servings)} порции</span></div></div>`;
      card.addEventListener('click', () => openRecipe(recipe));
      card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openRecipe(recipe); } });
      grid.appendChild(card);
    });
    grid.style.display = filtered.length ? 'grid' : 'none';
    if (empty) empty.style.display = filtered.length ? 'none' : 'block';
    if (counter) counter.innerHTML = `Показано <span>${filtered.length}</span> из <span>${recipes.length}</span>`;
  }

  function toast(message) {
    const el = $('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('toast--show');
    window.setTimeout(() => el.classList.remove('toast--show'), 2800);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const banner = $('accessBanner');
    if (banner) banner.style.display = new URLSearchParams(location.search).has('token') ? 'none' : 'flex';
    document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('nav-item--active'));
      item.classList.add('nav-item--active'); activeFilter = item.dataset.filter || 'all'; renderRecipes();
    }));
    const search = $('recipeSearch');
    if (search) search.addEventListener('input', event => { query = event.target.value; renderRecipes(); });
    const sort = $('sortBtn');
    if (sort) sort.addEventListener('click', () => { sortTitle = !sortTitle; const arrow = sort.querySelector('.sort-arrow'); if (arrow) arrow.textContent = sortTitle ? '↑' : '▾'; renderRecipes(); });
    const overlay = $('modalOverlay');
    if (overlay) overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
    document.querySelectorAll('.category-card').forEach(card => card.addEventListener('click', () => {
      const button = [...document.querySelectorAll('.nav-item')].find(item => item.dataset.filter === card.dataset.category);
      if (button) button.click();
      const section = $('recipes'); if (section) section.scrollIntoView({ behavior: 'smooth' });
    }));
    const burger = $('navbarBurger'); const menu = $('navbarMenu');
    if (burger && menu) burger.addEventListener('click', () => menu.classList.toggle('active'));
    const share = $('shareBtn');
    if (share) share.addEventListener('click', async () => {
      try { if (navigator.share) await navigator.share({ title: 'Кулинарная книга', url: location.href }); else { await navigator.clipboard.writeText(location.href); toast('Ссылка скопирована!'); } }
      catch (error) { if (error.name !== 'AbortError') toast('Не удалось поделиться ссылкой.'); }
    });
    const theme = $('themeToggle');
    if (theme) {
      try { if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark'); } catch (_) {}
      theme.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
      theme.addEventListener('click', () => { const dark = document.documentElement.classList.toggle('dark'); theme.textContent = dark ? '☀️' : '🌙'; try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) {} });
    }
    renderRecipes();
  });
})();
