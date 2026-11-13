/* Вкусно дома — работает без серверной базы; свои рецепты, избранное и покупки хранятся локально. */
(() => {
  'use strict';
  const photo = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=960&q=82`;
  const recipes = [
    {id:'chicken',title:'Курица с картошкой в духовке',category:'Ужин',minutes:55,servings:4,rating:4.9,tags:['Сытно','Для семьи'],description:'Румяная курица, мягкий картофель и ароматные травы — всё запекается в одной форме.',image:photo('photo-1532550907401-a500c9a57435'),ingredients:['Куриные бёдра — 800 г','Картофель — 700 г','Лук — 1 шт.','Чеснок — 3 зубчика','Растительное масло — 2 ст. л.','Паприка — 1 ч. л.','Соль и перец — по вкусу'],steps:['Разогрейте духовку до 200 °C. Картофель нарежьте крупными дольками, лук — перьями.','Смешайте масло, измельчённый чеснок, паприку, соль и перец. Обмажьте смесью курицу и картофель.','Выложите всё в форму одним слоем. Запекайте 45–55 минут до румяной корочки и полной готовности курицы.','Перед подачей посыпьте зеленью.']},
    {id:'pasta',title:'Паста с томатами и сыром',category:'Ужин',minutes:25,servings:3,rating:4.8,tags:['Быстро','Без сложностей'],description:'Простой ужин из макарон, томатов и тянущегося сыра — готовится, пока накрываете на стол.',image:photo('photo-1473093295043-cdd812d0e601'),ingredients:['Паста — 300 г','Помидоры — 3 шт.','Чеснок — 2 зубчика','Твёрдый сыр — 70 г','Оливковое масло — 2 ст. л.','Базилик — несколько листьев','Соль — по вкусу'],steps:['Отварите пасту в подсоленной воде согласно упаковке. Оставьте половину стакана воды от варки.','На сковороде прогрейте масло, добавьте чеснок и нарезанные томаты. Готовьте 7–8 минут.','Добавьте пасту и немного воды от варки, перемешайте. Посыпьте тёртым сыром и базиликом.']},
    {id:'pancakes',title:'Пышные оладьи на кефире',category:'Завтрак',minutes:20,servings:4,rating:4.9,tags:['Завтрак','Любимый рецепт'],description:'Мягкие, пышные оладьи из простых продуктов. Подавайте со сметаной, мёдом или вареньем.',image:photo('photo-1528207776546-365bb710ee93'),ingredients:['Кефир — 250 мл','Яйцо — 1 шт.','Мука — 200 г','Сахар — 2 ст. л.','Сода — ½ ч. л.','Соль — щепотка','Масло для жарки'],steps:['Кефир слегка подогрейте, смешайте с яйцом, сахаром и солью.','Постепенно добавьте муку и соду. Перемешайте до густого однородного теста и оставьте на 5 минут.','Жарьте небольшие оладьи на среднем огне с двух сторон до золотистой корочки.']},
    {id:'soup',title:'Суп с фрикадельками',category:'Обед',minutes:40,servings:5,rating:4.8,tags:['Обед','Для всей семьи'],description:'Лёгкий домашний суп с картофелем, овощами и нежными мясными фрикадельками.',image:photo('photo-1547592180-85f173990554'),ingredients:['Фарш — 350 г','Картофель — 3 шт.','Морковь — 1 шт.','Лук — 1 шт.','Рис — 2 ст. л.','Вода или бульон — 2 л','Соль, перец и зелень'],steps:['Поставьте воду или бульон нагреваться. Картофель нарежьте кубиками, морковь натрите.','Смешайте фарш с рисом, солью и перцем. Сформируйте небольшие фрикадельки.','Добавьте картофель в кипящую воду, через 10 минут опустите фрикадельки и овощи.','Варите ещё 15–20 минут до готовности. Подавайте с зеленью.']},
    {id:'syrniki',title:'Сырники с творогом',category:'Завтрак',minutes:25,servings:3,rating:4.9,tags:['Завтрак','Просто'],description:'Золотистые сырники с мягкой серединкой. Вкусно со сметаной, ягодами или сгущёнкой.',image:photo('photo-1563050839-a9b9f4d45a38'),ingredients:['Творог — 400 г','Яйцо — 1 шт.','Мука — 3 ст. л. и немного для обсыпки','Сахар — 1–2 ст. л.','Ванильный сахар — по желанию','Масло для жарки'],steps:['Разомните творог вилкой, смешайте с яйцом, сахаром и мукой.','Сформируйте сырники, слегка обваляйте в муке.','Жарьте на небольшом количестве масла на среднем огне по 3–4 минуты с каждой стороны.','При желании накройте крышкой на пару минут, чтобы сырники пропеклись внутри.']},
    {id:'buckwheat',title:'Гречка с грибами и луком',category:'Обед',minutes:30,servings:3,rating:4.7,tags:['Без мяса','Бюджетно'],description:'Рассыпчатая гречка и обжаренные грибы — сытный обед из доступных продуктов.',image:photo('photo-1476124369491-e7addf5db371'),ingredients:['Гречка — 200 г','Шампиньоны — 250 г','Лук — 1 шт.','Морковь — 1 шт.','Вода — 400 мл','Масло — 2 ст. л.','Соль и перец'],steps:['Промойте гречку, залейте водой и варите под крышкой до готовности.','Нарежьте грибы и лук, морковь натрите. Обжарьте лук с морковью 4 минуты.','Добавьте грибы и готовьте, пока не выпарится жидкость. Посолите и поперчите.','Смешайте с готовой гречкой и прогрейте всё вместе пару минут.']},
    {id:'applepie',title:'Яблочный пирог на каждый день',category:'Выпечка',minutes:60,servings:8,rating:4.8,tags:['Выпечка','К чаю'],description:'Нежный домашний пирог с яблоками и корицей из того, что обычно есть на кухне.',image:photo('photo-1535920527002-b35e96722eb9'),ingredients:['Яблоки — 3–4 шт.','Мука — 200 г','Яйца — 3 шт.','Сахар — 150 г','Сливочное масло — 80 г','Разрыхлитель — 1 ч. л.','Корица — по вкусу'],steps:['Разогрейте духовку до 180 °C. Яблоки очистите по желанию и нарежьте ломтиками.','Взбейте яйца с сахаром. Добавьте растопленное масло, муку и разрыхлитель.','Выложите тесто в форму, сверху разложите яблоки и посыпьте корицей.','Выпекайте 35–45 минут. Проверьте готовность деревянной шпажкой.']},
    {id:'potatoes',title:'Картошка по-домашнему на сковороде',category:'Ужин',minutes:30,servings:3,rating:4.6,tags:['Быстро','Из магазина'],description:'Хрустящая снаружи и мягкая внутри картошка с луком и зеленью.',image:photo('photo-1518977676601-b53f82aba655'),ingredients:['Картофель — 700 г','Лук — 1 шт.','Масло — 3 ст. л.','Укроп — небольшой пучок','Соль и перец'],steps:['Нарежьте картофель брусочками и обсушите полотенцем.','Разогрейте масло на широкой сковороде. Выложите картофель и жарьте, нечасто перемешивая.','Когда картофель почти готов, добавьте нарезанный лук. Посолите и готовьте до золотистой корочки.','Посыпьте укропом перед подачей.']}
  ];
  const $ = id => document.getElementById(id);
  const esc = value => { const el = document.createElement('span'); el.textContent = String(value ?? ''); return el.innerHTML; };
  const read = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch (_) { return fallback; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { toast('Браузер не смог сохранить изменения.'); return false; } };
  let favorites = read('vd-favorites', []);
  let shopping = read('vd-shopping', []);
  let customRecipes = read('vd-recipes', []);
  let activeCategory = 'all';
  let searchTerm = '';
  let sortMode = 'popular';
  let favoritesOnly = false;

  function allRecipes() { return [...customRecipes, ...recipes]; }
  function toast(message) { const el = $('toast'); if (!el) return; el.textContent = message; el.classList.add('toast--show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('toast--show'), 2600); }
  function updateCounts() { $('favoriteCount').textContent = favorites.length; $('shoppingCount').textContent = shopping.filter(item => !item.checked).length; }
  function imageMarkup(url, title, className = '') { return `<img class="${className}" src="${esc(url || '')}" alt="${esc(title)}" loading="lazy" onerror="this.classList.add('photo-missing');this.removeAttribute('src')">`; }

  function render() {
    const grid = $('recipeGrid');
    const term = searchTerm.trim().toLocaleLowerCase('ru');
    let list = allRecipes().filter(recipe => {
      const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(' ') : '';
      const searchable = `${recipe.title} ${recipe.description || ''} ${recipe.category || ''} ${ingredients}`.toLocaleLowerCase('ru');
      const matchesCategory = activeCategory === 'all' || (activeCategory === 'Быстро' ? Number(recipe.minutes) <= 30 : recipe.category === activeCategory);
      const matchesFavorite = !favoritesOnly || favorites.includes(recipe.id);
      return matchesCategory && matchesFavorite && searchable.includes(term);
    });
    if (sortMode === 'quick') list.sort((a,b) => a.minutes - b.minutes);
    if (sortMode === 'title') list.sort((a,b) => a.title.localeCompare(b.title,'ru'));
    if (sortMode === 'popular') list.sort((a,b) => b.rating - a.rating);
    grid.innerHTML = list.map((recipe,index) => `<article class="recipe-card" style="--i:${index}" tabindex="0" role="button" data-recipe="${esc(recipe.id)}" aria-label="Открыть рецепт ${esc(recipe.title)}"><div class="recipe-card__photo">${imageMarkup(recipe.image,recipe.title,'recipe-card__img')}<span class="photo-tag">${esc(recipe.category)}</span><button class="favorite-btn ${favorites.includes(recipe.id)?'is-favorite':''}" type="button" data-favorite="${esc(recipe.id)}" aria-label="${favorites.includes(recipe.id)?'Убрать из':'Добавить в'} избранное">${favorites.includes(recipe.id)?'♥':'♡'}</button><span class="photo-time">⏱ ${esc(recipe.minutes)} мин</span></div><div class="recipe-card__body"><div class="recipe-rating">★★★★★ <span>${Number(recipe.rating || 4.7).toFixed(1)}</span></div><h3>${esc(recipe.title)}</h3><p>${esc(recipe.description)}</p><div class="card-bottom"><span>🍽 ${esc(recipe.servings || 4)} порции</span><span class="card-link">Рецепт <b>→</b></span></div></div></article>`).join('');
    $('emptyState').hidden = list.length > 0;
    $('resultCount').textContent = `Найдено рецептов: ${list.length}`;
    $('totalRecipes').textContent = allRecipes().length;
    $('allCount').textContent = allRecipes().length;
    updateCounts();
  }

  function openRecipe(recipe) {
    const modal = $('recipeModal');
    const list = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    $('modalBody').innerHTML = `<div class="recipe-detail">${imageMarkup(recipe.image,recipe.title,'recipe-detail__image')}<div class="recipe-detail__content"><span class="eyebrow eyebrow--dark">${esc(recipe.category)} · ${esc(recipe.minutes)} минут</span><h2 id="modalTitle">${esc(recipe.title)}</h2><p class="recipe-detail__desc">${esc(recipe.description)}</p><div class="recipe-meta"><span>⏱ ${esc(recipe.minutes)} мин</span><span>🍽 ${esc(recipe.servings || 4)} порции</span><span>★ ${Number(recipe.rating||4.7).toFixed(1)}</span></div><div class="recipe-detail__section"><div class="detail-heading"><h3>Что понадобится</h3><button class="text-button" id="addIngredients" type="button">＋ В покупки</button></div><ul class="ingredient-list">${list.map(item=>`<li><span class="ingredient-dot"></span>${esc(item)}</li>`).join('')}</ul></div><div class="recipe-detail__section"><h3>Готовим пошагово</h3><ol class="step-list">${(recipe.steps||[]).map((step,i)=>`<li><b>${i+1}</b><span>${esc(step)}</span></li>`).join('')}</ol></div><button class="button button--primary recipe-modal-fav" type="button" id="modalFavorite">${favorites.includes(recipe.id)?'♥ В избранном':'♡ В избранное'}</button></div></div>`;
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll');
    $('addIngredients').addEventListener('click',()=>addToShopping(list));
    $('modalFavorite').addEventListener('click',()=>toggleFavorite(recipe.id));
    modal.querySelector('[data-close-modal]').focus?.();
  }
  function closeRecipe() { const el=$('recipeModal'); el.classList.remove('is-open'); el.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); }
  function toggleFavorite(id) { favorites = favorites.includes(id) ? favorites.filter(item=>item!==id) : [...favorites,id]; write('vd-favorites',favorites); render(); const recipe=allRecipes().find(item=>item.id===id); if ($('recipeModal').classList.contains('is-open')&&recipe) openRecipe(recipe); }
  function addToShopping(ingredients) {
    const existing = new Set(shopping.map(item=>item.name.toLocaleLowerCase('ru')));
    ingredients.forEach(name=>{ if (!existing.has(name.toLocaleLowerCase('ru'))) shopping.push({name,checked:false}); });
    write('vd-shopping',shopping); renderShopping(); updateCounts(); toast('Ингредиенты добавлены в список покупок');
  }
  function renderShopping() {
    const list=$('shoppingList');
    list.innerHTML=shopping.length ? shopping.map((item,index)=>`<li class="shopping-item ${item.checked?'is-checked':''}"><label><input type="checkbox" data-shop-check="${index}" ${item.checked?'checked':''}><span>${esc(item.name)}</span></label><button type="button" data-shop-remove="${index}" aria-label="Удалить продукт">×</button></li>`).join('') : '<li class="shopping-empty">Список пока пуст. Откройте рецепт и нажмите «В покупки».</li>';
    updateCounts();
  }
  function showDrawer() { $('shoppingDrawer').classList.add('is-open'); $('shoppingDrawer').setAttribute('aria-hidden','false'); renderShopping(); }
  function hideDrawer() { $('shoppingDrawer').classList.remove('is-open'); $('shoppingDrawer').setAttribute('aria-hidden','true'); }
  function openAddRecipe() { $('addRecipeModal').classList.add('is-open'); $('addRecipeModal').setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll'); }
  function closeAddRecipe() { $('addRecipeModal').classList.remove('is-open'); $('addRecipeModal').setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); }

  document.addEventListener('DOMContentLoaded',()=>{
    const theme = read('vd-theme','light'); if(theme==='dark') document.documentElement.classList.add('dark');
    $('themeToggle').textContent=theme==='dark'?'☀':'☾';
    $('themeToggle').addEventListener('click',()=>{const dark=document.documentElement.classList.toggle('dark');write('vd-theme',dark?'dark':'light');$('themeToggle').textContent=dark?'☀':'☾';});
    $('searchInput').addEventListener('input',event=>{searchTerm=event.target.value;render();});
    $('sortSelect').addEventListener('change',event=>{sortMode=event.target.value;render();});
    $('filters').addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(!button)return;activeCategory=button.dataset.category;favoritesOnly=activeCategory==='favorites';document.querySelectorAll('.filter-chip').forEach(item=>item.classList.toggle('is-active',item===button));render();});
    $('recipeGrid').addEventListener('click',event=>{const fav=event.target.closest('[data-favorite]');if(fav){event.stopPropagation();toggleFavorite(fav.dataset.favorite);return;}const card=event.target.closest('[data-recipe]');if(card){const recipe=allRecipes().find(item=>item.id===card.dataset.recipe);if(recipe)openRecipe(recipe);}});
    $('recipeGrid').addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-recipe]')){event.preventDefault();const recipe=allRecipes().find(item=>item.id===event.target.dataset.recipe);if(recipe)openRecipe(recipe);}});
    $('clearSearch').addEventListener('click',resetFilters); $('emptyReset').addEventListener('click',resetFilters);
    function resetFilters(){searchTerm='';$('searchInput').value='';activeCategory='all';favoritesOnly=false;document.querySelectorAll('.filter-chip').forEach((item,index)=>item.classList.toggle('is-active',index===0));render();}
    $('favoritesToggle').addEventListener('click',()=>{favoritesOnly=!favoritesOnly;activeCategory=favoritesOnly?'favorites':'all';document.querySelectorAll('.filter-chip').forEach((item,index)=>item.classList.toggle('is-active',favoritesOnly?item.dataset.category==='favorites':index===0));document.querySelector('#recipes').scrollIntoView({behavior:'smooth'});render();});
    $('shoppingOpen').addEventListener('click',showDrawer); document.querySelectorAll('[data-close-drawer]').forEach(item=>item.addEventListener('click',hideDrawer));
    $('shoppingList').addEventListener('change',event=>{if(event.target.matches('[data-shop-check]')){shopping[Number(event.target.dataset.shopCheck)].checked=event.target.checked;write('vd-shopping',shopping);renderShopping();}});
    $('shoppingList').addEventListener('click',event=>{const button=event.target.closest('[data-shop-remove]');if(button){shopping.splice(Number(button.dataset.shopRemove),1);write('vd-shopping',shopping);renderShopping();}});
    $('shoppingClear').addEventListener('click',()=>{shopping=[];write('vd-shopping',shopping);renderShopping();});
    $('shoppingCopy').addEventListener('click',async()=>{const text=shopping.map(item=>`${item.checked?'☑':'☐'} ${item.name}`).join('\n');try{await navigator.clipboard.writeText(text);toast('Список скопирован');}catch(_){toast(text||'Список пуст');}});
    document.querySelectorAll('[data-close-modal]').forEach(item=>item.addEventListener('click',closeRecipe));
    document.querySelectorAll('[data-close-add]').forEach(item=>item.addEventListener('click',closeAddRecipe));
    $('addRecipeOpen').addEventListener('click',openAddRecipe);
    $('recipeForm').addEventListener('submit',event=>{event.preventDefault();const form=new FormData(event.currentTarget);const recipe={id:`mine-${Date.now()}`,title:String(form.get('title')).trim(),category:String(form.get('category')),minutes:Number(form.get('minutes'))||30,servings:4,rating:5,description:String(form.get('description')||'Мой домашний рецепт'),image:String(form.get('image')||'').trim(),ingredients:String(form.get('ingredients')).split('\n').map(line=>line.trim()).filter(Boolean),steps:String(form.get('steps')).split('\n').map(line=>line.trim()).filter(Boolean)};customRecipes=[recipe,...customRecipes];write('vd-recipes',customRecipes);event.currentTarget.reset();closeAddRecipe();resetFilters();toast('Рецепт сохранён в этом браузере');});
    $('surpriseBtn').addEventListener('click',()=>{const list=allRecipes();const recipe=list[Math.floor(Math.random()*list.length)];if(recipe)openRecipe(recipe);});
    $('menuToggle').addEventListener('click',()=>document.querySelector('.topnav').classList.toggle('is-open'));
    document.querySelectorAll('.topnav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('.topnav').classList.remove('is-open')));
    document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('searchInput').focus();}if(event.key==='Escape'){closeRecipe();closeAddRecipe();hideDrawer();}});
    render();renderShopping();
  });
})();
