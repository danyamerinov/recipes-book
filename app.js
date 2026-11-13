/* ============================================================
   КУЛИНАРНАЯ КНИГА — Логика + Supabase
   ============================================================ */

// Конфигурация Supabase (замените на свои после создания проекта)
const SUPABASE_URL = 'https://kcnjfavitjjmseskjdcc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbmpmYXZpdGpqbXNlc2tqZGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ1Mzg5ODcsImV4cCI6MjExMDExNDk4N30.Vd0b0w8twWeogXS0lxXquYpCBDSRUhMNIQ085CZYZMc';

let supabase = null;
let recipes = [];
let allRecipes = [];
let currentFilter = 'all';
let searchQuery = '';
let sortBy = 'popularity';

// Инициализация Supabase
function initSupabase() {
  const supabaseLib = window.supabase;

  if (!supabaseLib || !supabaseLib.createClient) {
    console.warn('Supabase клиент не загружен');
    return;
  }

  try {
    supabase = supabaseLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase подключён');
  } catch (e) {
    console.error('Ошибка подключения Supabase:', e);
  }
}

// DOM элементы
const recipesGrid = document.getElementById('recipesGrid');
const recipeCounter = document.getElementById('recipeCounter');
const recipeSearch = document.getElementById('recipeSearch');
const recipeEmpty = document.getElementById('recipesEmpty');
const modal = document.getElementById('recipeModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const navItems = document.querySelectorAll('.nav-item');
const shareBtn = document.getElementById('shareBtn');
const toast = document.getElementById('toast');
const sortBtn = document.getElementById('sortBtn');
const themeToggle = document.getElementById('themeToggle');

// Кэшируем иконки категорий (Emoji-карты для кухонь)
const cuisineIcons = {
  'Домашняя кухня': '🏠',
  'Итальянская': '🇮🇹',
  'Японская': '🇯🇵',
  'Мексиканская': '🇲🇽',
  'Грузинская': '🇬🇪',
  'Французская': '🇫🇷',
  'Индийская': '🇮🇳',
  'Испанская': '🇪🇸'
};

// Генерация плейсхолдера изображения для рецепта
function recipeImageUrl(title) {
  return `https://source.unsplash.com/featured/600x400/?${encodeURIComponent(title)},food`;
}

// Загрузка рецептов из Supabase
async function loadRecipes() {
  if (!supabase) {
    renderFallbackRecipes();
    return;
  }

  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    recipes = data || [];
    allRecipes = [...recipes];
    renderRecipes();
    updateCounter();
  } catch (err) {
    console.error('Ошибка загрузки рецептов:', err);
    renderFallbackRecipes();
  }
}

// Резервный набор рецептов, если Supabase недоступен
function renderFallbackRecipes() {
  recipes = [
    {
      id: 'fb-1', title: 'Борщ классический', cuisine: 'Домашняя кухня',
      description: 'Насыщенный свекольный суп со сметаной.',
      ingredients: ['свекла','капуста','картофель','морковь','говядина','томатная паста','сметана'],
      instructions: 'Отварить говядину, добавить овощи, варить 30 мин, подать со сметаной.',
      prep_time: '20 мин', cook_time: '1 час', servings: 6, image_url: null
    },
    {
      id: 'fb-2', title: 'Пицца Маргарита', cuisine: 'Итальянская',
      description: 'Классическая пицца с томатами, моцареллой и базиликом.',
      ingredients: ['тесто','моцарелла','помидоры','базилик','оливковое масло'],
      instructions: 'Раскатать тесто, выложить томаты и моцареллу, печь 250°C 10–12 мин.',
      prep_time: '15 мин', cook_time: '12 мин', servings: 3, image_url: null
    },
    {
      id: 'fb-3', title: 'Суши ассорти', cuisine: 'Японская',
      description: 'Роллы с лососем, тунецом, авокадо и огурцом.',
      ingredients: ['рис для суши','лосось','тунец','авокадо','огурец','нори'],
      instructions: 'Приготовить рис, выложить на нори с начинкой, свернуть ролл.',
      prep_time: '30 мин', cook_time: '0 мин', servings: 4, image_url: null
    },
    {
      id: 'fb-4', title: 'Хачапури по-аджарски', cuisine: 'Грузинская',
      description: 'Лодочка из теста с сыром сулугуни и яйцом.',
      ingredients: ['мука','дрожжи','сыр сулугуни','яйца','сливочное масло'],
      instructions: 'Замесить тесто, сформировать лодочки, заполнить сыром, печь, добавить яйцо.',
      prep_time: '2 час', cook_time: '20 мин', servings: 4, image_url: null
    },
    {
      id: 'fb-5', title: 'Такос с говядиной', cuisine: 'Мексиканская',
      description: 'Сочные такос с говядиной, авокадо и лаимом.',
      ingredients: ['тортилья','говяжий фарш','фасоль','кукуруза','авокадо','лайм'],
      instructions: 'Обжарить фарш с чили, добавить фасоль и кукурузу, наполнить тортилью.',
      prep_time: '15 мин', cook_time: '15 мин', servings: 4, image_url: null
    },
    {
      id: 'fb-6', title: 'Рататуй', cuisine: 'Французская',
      description: 'Тушёные овощи в provençal стиле.',
      ingredients: ['баклажаны','кабачки','помидоры','лук','чеснок','оливковое масло'],
      instructions: 'Нарезать овощи ломтиками, чередовать в форме, полить маслом, печь 180°C 50 мин.',
      prep_time: '25 мин', cook_time: '55 мин', servings: 4, image_url: null
    },
    {
      id: 'fb-7', title: 'Карри с курицей', cuisine: 'Индийская',
      description: 'Ароматное карри на кокосовом молоке.',
      ingredients: ['курица','кокосовое молоко','карри-порошок','лук','чеснок','имбирь'],
      instructions: 'Обжарить лук с специями, добавить курицу и кокосовое молоко, тушить 20 мин.',
      prep_time: '15 мин', cook_time: '25 мин', servings: 4, image_url: null
    },
    {
      id: 'fb-8', title: 'Паэлья с морепродуктами', cuisine: 'Испанская',
      description: 'Рис с креветками, мидиями и шафраном.',
      ingredients: ['рис','креветки','мидии','шафран','лук','перец','оливковое масло'],
      instructions: 'Обжарить лук и перец, добавить рис и шафран, залить бульоном, добавить морепродукты.',
      prep_time: '20 мин', cook_time: '25 мин', servings: 4, image_url: null
    }
  ];
  allRecipes = [...recipes];
  renderRecipes();
  updateCounter();
}

// Рендер карточек рецептов
function renderRecipes() {
  if (!recipesGrid) return;

  let filtered = allRecipes.filter(r => {
    const matchFilter = currentFilter === 'all' || r.cuisine === currentFilter;
    const matchSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (r.ingredients && r.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchFilter && matchSearch;
  });

  // Сортировка
  if (sortBy === 'popularity') {
    filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (sortBy === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  recipesGrid.innerHTML = '';

  if (filtered.length === 0) {
    if (recipeEmpty) recipeEmpty.style.display = 'block';
    recipesGrid.style.display = 'none';
    updateCounter();
    return;
  }

  if (recipeEmpty) recipeEmpty.style.display = 'none';
  recipesGrid.style.display = 'grid';

  filtered.forEach((recipe, index) => {
    const card = document.createElement('article');
    card.className = 'recipe-card reveal-up';
    card.style.animationDelay = `${index * 0.06}s`;
    card.innerHTML = `
      <div class="recipe-card__img-wrap">
        ${recipe.image_url
          ? `<img class="recipe-card__img" src="${recipe.image_url}" alt="${recipe.title}" loading="lazy">`
          : `<div class="recipe-card__img" style="background:linear-gradient(135deg,#ffe0d2,#fff3e6);display:flex;align-items:center;justify-content:center;font-size:3rem;color:#d84315;">${cuisineIcons[recipe.cuisine] || '🍽️'}</div>`}
        <span class="recipe-card__badge">${recipe.cuisine}</span>
      </div>
      <div class="recipe-card__content">
        <h3 class="recipe-card__title">${escapeHtml(recipe.title)}</h3>
        <p class="recipe-card__desc">${escapeHtml(recipe.description || '')}</p>
        <div class="recipe-card__meta">
          <span>⏱ ${recipe.cook_time || '—'}</span>
          <span>👥 ${recipe.servings || '—'}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openRecipeModal(recipe));
    recipesGrid.appendChild(card);
  });

  requestAnimationFrame(() => {
    document.querySelectorAll('.recipe-card.reveal-up').forEach((el, i) => {
      el.style.animationDelay = `${i * 0.06}s`;
      el.classList.add('animated');
    });
  });

  updateCounter();
}

// Обновление счётчика
function updateCounter() {
  if (!recipeCounter) return;
  const visible = recipesGrid && recipesGrid.style.display === 'none'
    ? 0
    : recipesGrid.querySelectorAll('.recipe-card').length;
  recipeCounter.innerHTML = `Показано <span>${visible}</span> из <span>${allRecipes.length}</span>`;
}

function bindModalCloseButton() {
  const closeBtn = document.getElementById('modalClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
}

// Открытие модального окна с рецептом
async function openRecipeModal(recipe) {
  if (!modalContent) return;

  if (supabase && recipe.id) {
    try {
      await supabase
        .from('recipes')
        .update({ views: (recipe.views || 0) + 1 })
        .eq('id', recipe.id);
    } catch (e) {
      console.log('Не удалось обновить просмотры:', e);
    }
  }

  const ingredientsHtml = (recipe.ingredients || [])
    .map(ing => `<li>${escapeHtml(ing)}</li>`)
    .join('');

  const instructionsHtml = (recipe.instructions || '')
    .split(/\d+\.\s+/)
    .filter(s => s.trim())
    .map(step => `<li>${escapeHtml(step.trim())}</li>`)
    .join('');

  modalContent.innerHTML = `
    <button class="modal__close" id="modalClose" aria-label="Закрыть">×</button>
    <div class="recipe-detail">
      ${recipe.image_url
        ? `<img class="recipe-detail__img" src="${recipe.image_url}" alt="${escapeHtml(recipe.title)}">`
        : `<div class="recipe-detail__img" style="background:linear-gradient(135deg,#ffe0d2,#fff3e6);display:flex;align-items:center;justify-content:center;font-size:4rem;color:#d84315;">${cuisineIcons[recipe.cuisine] || '🍽️'}</div>`}
      <h2 class="recipe-detail__title">${escapeHtml(recipe.title)}</h2>
      <span class="recipe-detail__cuisine">${cuisineIcons[recipe.cuisine] || ''} ${escapeHtml(recipe.cuisine)}</span>
      <div class="recipe-detail__meta">
        <div class="recipe-detail__meta-item">
          <span class="recipe-detail__meta-label">Время приготовления</span>
          <span class="recipe-detail__meta-value">${escapeHtml(recipe.cook_time || '—')}</span>
        </div>
        <div class="recipe-detail__meta-item">
          <span class="recipe-detail__meta-label">Подготовка</span>
          <span class="recipe-detail__meta-value">${escapeHtml(recipe.prep_time || '—')}</span>
        </div>
        <div class="recipe-detail__meta-item">
          <span class="recipe-detail__meta-label">Порции</span>
          <span class="recipe-detail__meta-value">${escapeHtml(recipe.servings || '—')}</span>
        </div>
      </div>
      <div class="recipe-detail__section">
        <h3>Ингредиенты</h3>
        <ul class="recipe-detail__ingredients">${ingredientsHtml}</ul>
      </div>
      <div class="recipe-detail__section">
        <h3>Приготовление</h3>
        <ol class="recipe-detail__instructions">${instructionsHtml}</ol>
      </div>
      <div class="recipe-detail__actions">
        <button class="btn btn--primary" type="button" onclick="window.closeModal()">Закрыть</button>
      </div>
    </div>
  `;

  bindModalCloseButton();

  if (modal) {
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  }
}

// Закрытие модального окна
window.closeModal = function() {
  if (modal) {
    modal.classList.remove('modal--open');
  }
  document.body.style.overflow = '';
};

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModal);
}

// Закрытие по клавише Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Фильтры
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('nav-item--active'));
    item.classList.add('nav-item--active');
    currentFilter = item.dataset.filter || 'all';
    renderRecipes();
  });
});

// Поиск
if (recipeSearch) {
  recipeSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderRecipes();
  });
}

// Сортировка
if (sortBtn) {
  sortBtn.addEventListener('click', () => {
    sortBy = sortBy === 'popularity' ? 'title' : 'popularity';
    const arrow = sortBtn.querySelector('.sort-arrow');
    if (arrow) {
      arrow.textContent = sortBy === 'popularity' ? '▾' : '↑';
    }
    renderRecipes();
  });
}

// Поделиться ссылкой
if (shareBtn) {
  shareBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Кулинарная книга', text: 'Рецепты дома и мира', url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Ссылка скопирована в буфер обмена!');
      });
    }
  });
}

// Показать тост
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('toast--show');
  setTimeout(() => {
    toast.classList.remove('toast--show');
  }, 3000);
}

// Тема
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Инициализация темы
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
  if (themeToggle) themeToggle.textContent = '☀️';
}

// ===== Блок доступа только по ссылке =====
function checkAccess() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const banner = document.getElementById('accessBanner');

  if (!banner || !recipesGrid || !recipeEmpty || !recipeCounter) return;

  if (token) {
    if (supabase) {
      supabase
        .from('access_tokens')
        .select('*')
        .eq('token', token)
        .eq('is_active', true)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            banner.style.display = 'none';
            loadRecipes();
          } else {
            showAccessDenied();
          }
        })
        .catch(() => showAccessDenied());
    } else {
      banner.style.display = 'none';
      loadRecipes();
    }
  } else {
    banner.style.display = 'flex';
    recipesGrid.style.display = 'none';
    recipeEmpty.style.display = 'none';
    recipeCounter.innerHTML = 'Доступ ограничен. Перейдите по invite-ссылке.';
  }
}

function showAccessDenied() {
  const banner = document.getElementById('accessBanner');
  if (banner) {
    banner.style.display = 'flex';
    banner.innerHTML = `
      <div class="access-banner__inner">
        <span class="access-banner__badge" style="background:rgba(255,0,0,0.2);color:#ff4d4d;">⛔ Доступ запрещён</span>
        <span class="access-banner__text">Неверная или неактивная ссылка. Попросите друга прислать рабочую ссылку.</span>
      </div>
    `;
  }
  if (recipesGrid) recipesGrid.style.display = 'none';
  if (recipeEmpty) recipeEmpty.style.display = 'none';
}

// ===== Старт =====
window.addEventListener('DOMContentLoaded', () => {
  initSupabase();
  checkAccess();

  const burger = document.getElementById('navbarBurger');
  const menu = document.getElementById('navbarMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }

  window.addEventListener('scroll', () => {
    const scrollHint = document.querySelector('.hero__scroll');
    if (scrollHint && window.scrollY > 100) {
      scrollHint.style.opacity = '0';
    }
  }, { once: true });
});

/* Вспомогательная функция экранирования HTML */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}
