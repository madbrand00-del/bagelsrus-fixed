const SUPABASE_URL = "https://cyubtlxuovmlowpghodk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ldxPNaJKZ9EbhDJX5S_pVA_7rDSF9dw";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const STORAGE_PREFIX = "bagelsrus_v4";
const STORAGE_KEYS = {
  menu: `${STORAGE_PREFIX}_menu`,
  cart: `${STORAGE_PREFIX}_cart`,
  orders: `${STORAGE_PREFIX}_orders`,
  lastContact: `${STORAGE_PREFIX}_last_contact`,
  menuVersion: `${STORAGE_PREFIX}_menu_version`
};

const MENU_VERSION = 8;

const sectionsConfig = {
  breakfast: [
    { id: "bagels", title: "Bagels", subtitle: "Classic bagels baked fresh and ready to build your favorite breakfast." },
    { id: "creamCheese", title: "Cream Cheese", subtitle: "Choose your cream cheese flavor first, then pick 2oz or 7oz." },
    { id: "specialties", title: "Breakfast Specialties", subtitle: "Breakfast sandwiches, platters, bowls, and house specialties." },
    { id: "sides", title: "Breakfast Sides", subtitle: "Extra add-ons and morning favorites." },
    { id: "bakery", title: "Bakery", subtitle: "Fresh-baked sweet treats and rotating bakery items." },
    { id: "drinks", title: "Drinks", subtitle: "Morning drinks and bottled refreshers." }
  ],
  lunch: [
    { id: "sandwiches", title: "Lunch Sandwiches", subtitle: "Hearty lunch sandwiches and deli-style melts with your bagel, cheese, additions, and removals." },
    { id: "sides", title: "Lunch Sides", subtitle: "Classic sides to complete your meal." },
    { id: "bakery", title: "Bakery", subtitle: "Fresh-baked sweet treats and rotating bakery items." },
    { id: "drinks", title: "Drinks", subtitle: "Cold and hot drink options." }
  ]
};

const imageBank = {
  bagel: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80",
  creamCheese: "https://images.unsplash.com/photo-1571167561589-fd4f107fd5cb?auto=format&fit=crop&w=900&q=80",
  breakfastSandwich: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
  lox: "https://images.unsplash.com/photo-1569739441380-3b7f506b8c5c?auto=format&fit=crop&w=900&q=80",
  pancakes: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80",
  grits: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",
  biscuit: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80",
  omelette: "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=900&q=80",
  side: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
  fries: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80",
  bakery: "https://images.unsplash.com/photo-1606312619344-989c6a55316d?auto=format&fit=crop&w=900&q=80",
  drinks: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
};

const customOptions = {
  bagels: ["Plain", "Everything", "Asiago", "Cinnamon Raisin", "Blueberry", "Jalapeno Cheddar", "Sesame", "Salt", "Onion", "Poppy Seed"],
  creamCheeses: ["Plain", "Strawberry", "Scallion", "Honey Walnut", "Chocolate", "Caper", "Hot Honey"],
  cheeseOptions: ["American", "Cheddar", "Swiss", "Provolone", "Pepper Jack"],
  eggStyles: ["Scrambled", "Over Easy", "Over Medium", "Over Hard", "Sunny Side", "Fried"],
  platterMeats: ["Bacon", "Sausage Patty", "Sausage Link", "Ham", "Steak"],
  sausageStyles: ["Patty", "Link"],
  cookieFlavors: ["Chocolate Chip", "Sugar", "Oatmeal Raisin"],
  muffinFlavors: ["Blueberry", "Chocolate Chip"],
  omeletteToppings: ["American Cheese", "Cheddar Cheese", "Swiss Cheese", "Pepper Jack Cheese", "Bacon", "Sausage Patty", "Sausage Link", "Ham", "Steak", "Onion", "Mushroom", "Spinach", "Tomato", "Bell Peppers"],
  lunchAdditions: ["Lettuce", "Tomato", "Onion", "Pickles", "Jalapeños", "Extra Cheese", "Extra Bacon"],
  friesSizes: ["Small", "Large"],
  drinkSizes: ["Small", "Large"]
};

const defaultMenu = {

breakfast: {
  bagels: [
    { name: "Plain", price: 2.25, desc: "Classic soft and chewy New York-style bagel.", image: "images/plain-bagel.jpg" },
    { name: "Everything", price: 2.25, desc: "Garlic, onion, sesame, poppy & salt blend.", image: "images/everything-bagel.jpg" },
    { name: "Asiago", price: 2.75, desc: "Baked with savory Asiago cheese crust.", image: "images/asiago-bagel.jpg" },
    { name: "Cinnamon Raisin", price: 2.50, desc: "Sweet cinnamon swirl with plump raisins.", image: "images/cinnamon-raisin-bagel.jpg" },
    { name: "Blueberry", price: 2.75, desc: "Lightly sweet with real blueberry flavor.", image: "images/blueberry-bagel.jpg" },
    { name: "Jalapeno Cheddar", price: 2.50, desc: "Cheddar baked in with a mild jalapeño kick.", image: "images/jalapeno-cheddar-bagel.jpg" },
    { name: "Sesame", price: 2.25, desc: "Toasty sesame seeds on a classic base.", image: "images/sesame-bagel.jpg" },
    { name: "Salt", price: 2.25, desc: "Traditional bagel topped with coarse salt.", image: "images/salt-bagel.jpg" },
    { name: "Onion", price: 2.25, desc: "Baked with roasted onion flakes.", image: "images/onion-bagel.jpg" },
    { name: "Poppy Seed", price: 2.25, desc: "Nutty poppy seed crust.", image: "images/poppy-seed-bagel.jpg" }
  ],

  creamCheese: [
    { name: "Plain", price: 1.75, desc: "Classic cream cheese spread.", image: "images/plain-cream-cheese.jpg", customizable: true, configType: "creamCheeseTub", sizes: { "2oz": 1.75, "7oz": 5.50 }, pricePrefix: "From" },
    { name: "Strawberry", price: 2.00, desc: "Lightly sweet with real berry flavor.", image: "images/strawberry-cream-cheese.jpg", customizable: true, configType: "creamCheeseTub", sizes: { "2oz": 2.00, "7oz": 6.00 }, pricePrefix: "From" },
    { name: "Scallion", price: 2.00, desc: "Savory cream cheese with fresh green onion.", image: "images/scallion-cream-cheese.jpg", customizable: true, configType: "creamCheeseTub", sizes: { "2oz": 2.00, "7oz": 6.00 }, pricePrefix: "From" },
    { name: "Honey Walnut", price: 2.00, desc: "Sweet honey with crunchy walnuts.", image: "images/honey-walnut-cream-cheese.jpg", customizable: true, configType: "creamCheeseTub", sizes: { "2oz": 2.00, "7oz": 6.00 }, pricePrefix: "From" },
    { name: "Chocolate", price: 2.00, desc: "Dessert-style, creamy cocoa spread.", image: "images/chocolate-cream-cheese.jpg", customizable: true, configType: "creamCheeseTub", sizes: { "2oz": 2.00, "7oz": 6.00 }, pricePrefix: "From" },
    { name: "Caper", price: 2.00, desc: "Briny deli-style spread, perfect with lox.", image: "images/caper-cream-cheese.jpg", customizable: true, configType: "creamCheeseTub", sizes: { "2oz": 2.00, "7oz": 6.00 }, pricePrefix: "From" },
  ],

  specialties: [
    { name: "Bacon, Egg & Cheese", price: 8.50, desc: "Crispy bacon, fluffy egg, melted cheese on your choice of bagel.", image: "images/bacon-egg-cheese.jpg", customizable: true, configType: "breakfastSandwich", baseIngredients: ["Bacon", "Egg", "Cheese"] },
    { name: "Sausage, Egg & Cheese", price: 8.50, desc: "Savory sausage with egg and cheese, toasted hot.", image: "images/sausage-egg-cheese.jpg", customizable: true, configType: "breakfastSandwich", baseIngredients: ["Sausage", "Egg", "Cheese"], requireSausageStyle: true },
    { name: "Ham, Egg & Cheese", price: 8.50, desc: "Grilled ham, egg, and melty cheese.", image: "images/ham-egg-cheese.jpg", customizable: true, configType: "breakfastSandwich", baseIngredients: ["Ham", "Egg", "Cheese"] },
    { name: "Steak, Egg & Cheese", price: 8.50, desc: "Grilled steak, fluffy egg, and melted cheese on a toasted bagel.", image: "images/steak-egg-cheese.jpg", customizable: true, configType: "breakfastSandwich", baseIngredients: ["Steak", "Egg", "Cheese"] },
    { name: "Lox & Cream Cheese", price: 12.50, desc: "Smoked salmon, cream cheese, tomato, onion & capers on a bagel.", image: "images/lox-cream-cheese.jpg", customizable: true, configType: "loxBagel", baseIngredients: ["Lox", "Cream Cheese", "Tomato", "Onion", "Capers"] },
    { name: "Bagel & Cream Cheese", price: 3.75, desc: "Any bagel with your choice of cream cheese.", image: "images/bagel-cream-cheese.jpg", customizable: true, configType: "bagelCreamCheese" },
    { name: "Bagel Breakfast Platter", price: 8.00, desc: "Two eggs, choice of meat, home fries or grits, and a bagel.", image: "images/bagel-breakfast-platter.jpg", customizable: true, configType: "breakfastPlatter" },
    { name: "Pancake Platter", price: 12.00, desc: "Fluffy pancakes with butter & syrup, choice of meat.", image: "images/pancake-platter.jpg", customizable: true, configType: "pancakePlatter" },
    { name: "Loaded Grits/Hashbrown Bowl", price: 12.00, desc: "Cheesy grits or hashbrowns topped with eggs, meat, and cheese.", image: "images/loaded-grits-hashbrown-bowl.jpg", customizable: true, configType: "loadedBowl" },
    { name: "Biscuits & Gravy", price: 9.00, desc: "Buttermilk biscuits smothered in house sausage gravy.", image: "images/biscuits-gravy.jpg", customizable: true, configType: "biscuits" },
    { name: "Build-Your-Own Omelette", price: 11.00, desc: "Choose your toppings. The first 2 toppings are included, each extra topping is +$1.", image: "images/build-your-own-omelette.jpg", customizable: true, configType: "omelette" }
  ],

  sides: [
    { name: "Egg", price: 2.00, desc: "Cooked your way.", image: "images/egg.jpg", customizable: true, configType: "eggSide" },
    { name: "Grits", price: 2.00, desc: "Creamy southern-style.", image: "images/grits.jpg" },
    { name: "Hashbrowns", price: 3.00, desc: "Crispy, golden potatoes.", image: "images/hashbrowns.jpg" },
    { name: "Bacon", price: 4.50, desc: "Thick, crispy strips.", image: "images/bacon.jpg" },
    { name: "Sausage", price: 4.50, desc: "Choose patty or link.", image: "images/sausage.jpg", customizable: true, configType: "sausageSide" },
    { name: "Ham", price: 4.50, desc: "Warm sliced ham.", image: "images/ham.jpg" },
    { name: "Lox", price: 7.00, desc: "Premium smoked salmon.", image: "images/lox.jpg" },
    { name: "Pickles", price: 1.00, desc: "Classic deli spears.", image: "images/pickles.jpg" },
    { name: "Pancake", price: 4.00, desc: "Single fluffy pancake.", image: "images/pancake.jpg" },
    { name: "Biscuit", price: 2.50, desc: "Buttery southern biscuit.", image: "images/biscuit.jpg" }
  ],

  bakery: [
    { name: "Cookies", price: 2.50, desc: "Fresh-baked classic flavors daily.", image: "images/cookies.jpg", customizable: true, configType: "cookieFlavor" },
    { name: "Brownie", price: 4.00, desc: "Rich, fudgy chocolate brownie.", image: "images/brownie.jpg" },
    { name: "Muffins", price: 3.50, desc: "Rotating bakery-style muffins.", image: "images/muffins.jpg", customizable: true, configType: "muffinFlavor" }
  ],

  drinks: [
    { name: "Water Bottle", price: 2.50, desc: "Cold bottled water.", image: "images/water-bottle.jpg" },
    { name: "Coffee", price: 2.50, desc: "Choose small or large after selecting.", image: "images/coffee.jpg", customizable: true, configType: "sizedDrink", sizes: { Small: 2.50, Large: 3.00 }, pricePrefix: "From" },
    { name: "Orange Juice", price: 3.00, desc: "Choose small or large after selecting.", image: "images/orange-juice.jpg", customizable: true, configType: "sizedDrink", sizes: { Small: 3.00, Large: 4.00 }, pricePrefix: "From" },
    { name: "Fountain Drink", price: 2.50, desc: "Choose small or large after selecting.", image: "images/fountain-drink.jpg", customizable: true, configType: "sizedDrink", sizes: { Small: 2.50, Large: 3.00 }, pricePrefix: "From" }
  ]
}  ,
lunch: {
  sandwiches: [
    { name: "Chicken Salad Sandwich", price: 10.50, desc: "House chicken salad with lettuce & tomato on a toasted bagel.", image: "images/chicken-salad-sandwich.jpg", customizable: true, configType: "lunchSandwich", baseIngredients: ["Chicken Salad", "Lettuce", "Tomato"] },
    { name: "Tuna Melt", price: 12.50, desc: "Creamy tuna salad and melted cheese, grilled hot.", image: "images/tuna-melt.jpg", customizable: true, configType: "lunchSandwich", baseIngredients: ["Tuna Salad", "Cheese"] },
    { name: "BLT", price: 10.50, desc: "Bacon, lettuce, tomato & mayo on a toasted bagel.", image: "images/blt.jpg", customizable: true, configType: "lunchSandwich", baseIngredients: ["Bacon", "Lettuce", "Tomato", "Mayo"] },
    { name: "Reuben", price: 12.50, desc: "Corned beef, Swiss, sauerkraut & Russian dressing, pressed hot.", image: "images/reuben.jpg", customizable: true, configType: "lunchSandwich", baseIngredients: ["Corned Beef", "Swiss", "Sauerkraut", "Russian Dressing"] },
    { name: "Turkey Club", price: 13.00, desc: "Turkey, bacon, lettuce, tomato & mayo, double stacked.", image: "images/turkey-club.jpg", customizable: true, configType: "lunchSandwich", baseIngredients: ["Turkey", "Bacon", "Lettuce", "Tomato", "Mayo"] },
    { name: "Chipotle Turkey Melt", price: 12.50, desc: "Turkey, pepper jack, chipotle mayo, grilled.", image: "images/chipotle-turkey-melt.jpg", customizable: true, configType: "lunchSandwich", baseIngredients: ["Turkey", "Pepper Jack", "Chipotle Mayo"] },
    { name: "Jalapeño Chicken Melt", price: 12.50, desc: "Grilled chicken, jalapeños & cheddar with spicy aioli.", image: "images/jalapeno-chicken-melt.jpg", customizable: true, configType: "lunchSandwich", baseIngredients: ["Chicken", "Jalapeños", "Cheddar", "Spicy Aioli"] }
  ],

  sides: [
    { name: "Bags of Chips", price: 2.50, desc: "Crispy packaged chips.", image: "images/bags-of-chips.jpg" },
    { name: "Pickle", price: 1.00, desc: "Classic deli pickle.", image: "images/pickle.jpg" },
    { name: "Fries", price: 3.50, desc: "Hot and crispy fries.", image: "images/fries.jpg" },
    { name: "Loaded Fries", price: 6.00, desc: "Choose small or large after selecting.", image: "images/loaded-fries.jpg", customizable: true, configType: "loadedFries", sizes: { Small: 6.00, Large: 10.00 }, pricePrefix: "From" }
  ],

  bakery: [
    { name: "Cookies", price: 2.50, desc: "Fresh-baked classic flavors daily.", image: "images/cookies.jpg", customizable: true, configType: "cookieFlavor" },
    { name: "Brownie", price: 4.00, desc: "Rich, fudgy chocolate brownie.", image: "images/brownie.jpg" },
    { name: "Muffins", price: 3.50, desc: "Rotating bakery-style muffins.", image: "images/muffins.jpg", customizable: true, configType: "muffinFlavor" }
  ],

  drinks: [
    { name: "Water Bottle", price: 2.50, desc: "Cold bottled water.", image: "images/water-bottle.jpg" },
    { name: "Coffee", price: 2.50, desc: "Choose small or large after selecting.", image: "images/coffee.jpg", customizable: true, configType: "sizedDrink", sizes: { Small: 2.50, Large: 3.00 }, pricePrefix: "From" },
    { name: "Orange Juice", price: 3.00, desc: "Choose small or large after selecting.", image: "images/orange-juice.jpg", customizable: true, configType: "sizedDrink", sizes: { Small: 3.00, Large: 4.00 }, pricePrefix: "From" },
    { name: "Fountain Drink", price: 2.50, desc: "Choose small or large after selecting.", image: "images/fountain-drink.jpg", customizable: true, configType: "sizedDrink", sizes: { Small: 2.50, Large: 3.00 }, pricePrefix: "From" }
  ]
}
};

let currentTab = "breakfast";
let menuData = loadMenuData();
let cart = loadStorage(STORAGE_KEYS.cart, []);
let orders = [];
let adminLoggedIn = false;
let cashierLoggedIn = false;
let kitchenLoggedIn = false;

const menuContainer = document.getElementById("menuContainer");
const cartItemsEl = document.getElementById("cartItems");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartTaxEl = document.getElementById("cartTax");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountBadgeEl = document.getElementById("cartCountBadge");
const checkoutSummaryEl = document.getElementById("checkoutSummary");
const checkoutHistoryEl = document.getElementById("checkoutHistory");
const checkoutMessageEl = document.getElementById("checkoutMessage");

function loadStorage(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadMenuData() {
  const savedVersion = Number(localStorage.getItem(STORAGE_KEYS.menuVersion) || 0);
  const savedMenu = loadStorage(STORAGE_KEYS.menu, null);

  if (savedVersion !== MENU_VERSION || !savedMenu) {
    localStorage.setItem(STORAGE_KEYS.menuVersion, String(MENU_VERSION));
    saveStorage(STORAGE_KEYS.menu, structuredClone(defaultMenu));
    return structuredClone(defaultMenu);
  }

  return savedMenu;
}

function persistMenu() {
  saveStorage(STORAGE_KEYS.menu, menuData);
  localStorage.setItem(STORAGE_KEYS.menuVersion, String(MENU_VERSION));
}

function persistCart() {
  saveStorage(STORAGE_KEYS.cart, cart);
}

function money(value) {
  return `$${Number(value).toFixed(2)}`;
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function normalizePhone(value) {
  return value.replace(/\D/g, "");
}

function uid() {
  return window.crypto?.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function openMenuFromHash() {
  const hash = window.location.hash.replace("#", "").trim();
  if (!hash) return;

  const lunchSections = ["sandwiches"];
  currentTab = lunchSections.includes(hash) ? "lunch" : "breakfast";

  document.querySelectorAll(".menu-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === currentTab);
  });

  if (document.getElementById("menuContainer")) {
    renderMenu();
  }

  requestAnimationFrame(() => {
    const target = document.getElementById(`${currentTab}-${hash}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function openDashboardFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const dashboard = params.get("dashboard");

  if (dashboard === "admin") {
    openModal("adminDashboardModal");
    populateAdminSelects();
  }

  if (dashboard === "cashier") {
    renderCashierOrders();
    openModal("cashierDashboardModal");
  }

  if (dashboard === "kitchen") {
    renderKitchenOrders();
    openModal("kitchenDashboardModal");
  }
}

function initOrderTypeToggle() {
  const orderTypeInputs = document.querySelectorAll('input[name="orderType"]');
  const deliveryWrap = document.getElementById("deliveryAddressWrap");

  if (!orderTypeInputs.length || !deliveryWrap) return;

  function updateOrderTypeUI() {
    const selected = document.querySelector('input[name="orderType"]:checked')?.value;
    deliveryWrap.classList.toggle("hidden", selected !== "Delivery");
  }

  orderTypeInputs.forEach(input => {
    input.addEventListener("change", updateOrderTypeUI);
  });

  updateOrderTypeUI();
}

document.addEventListener("DOMContentLoaded", async () => {
  if (document.getElementById("menuContainer")) {
    renderMenu();
  }

  if (document.getElementById("cartItems")) {
    renderCart();
  }

  bindGlobalButtons();

  if (document.querySelector(".menu-tab")) {
    initMenuTabs();
  }

  if (document.getElementById("editMealSelect") && document.getElementById("addMealSelect")) {
    initAdminEditor();
  }

  if (document.getElementById("guestName")) {
    hydrateCheckoutContact();
    initOrderTypeToggle();
  }

  if (document.getElementById("cashierOrders")) {
    await renderCashierOrders();
  }

  if (document.getElementById("menuContainer")) {
    await fetchLiveMenu();
  }

  openMenuFromHash();
  openDashboardFromQuery();
});

function bindGlobalButtons() {
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      persistCart();
      renderCart();
    });
  }

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", async () => {
      if (!cart.length) {
        showToast("Your cart is empty.");
        return;
      }
      renderCheckoutSummary();
      hydrateCheckoutContact();
      await renderCheckoutHistory();
      closeModal("cartModal");
      openModal("checkoutModal");
    });
  }

  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", placeOrder);
  }

  const authAccessBtn = document.getElementById("authAccessBtn");
  if (authAccessBtn) {
    authAccessBtn.addEventListener("click", () => openModal("adminLoginModal"));
  }

  const cashierAccessBtn = document.getElementById("cashierAccessBtn");
  if (cashierAccessBtn) {
    cashierAccessBtn.addEventListener("click", () => openModal("cashierLoginModal"));
  }

  const cartToggleBtn = document.getElementById("cartToggleBtn");
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener("click", () => openModal("cartModal"));
  }

  const openAdminLoginChoice = document.getElementById("openAdminLoginChoice");
  if (openAdminLoginChoice) {
    openAdminLoginChoice.addEventListener("click", () => {
      closeModal("authChooserModal");
      openModal("adminLoginModal");
    });
  }

  const openCashierLoginChoice = document.getElementById("openCashierLoginChoice");
  if (openCashierLoginChoice) {
    openCashierLoginChoice.addEventListener("click", () => {
      closeModal("authChooserModal");
      openModal("cashierLoginModal");
    });
  }

  const submitAdminLogin = document.getElementById("submitAdminLogin");
  if (submitAdminLogin) {
    submitAdminLogin.addEventListener("click", adminLogin);
  }

  const submitCashierLogin = document.getElementById("submitCashierLogin");
  if (submitCashierLogin) {
    submitCashierLogin.addEventListener("click", cashierLogin);
  }

  const submitKitchenLogin = document.getElementById("submitKitchenLogin");
  if (submitKitchenLogin) {
    submitKitchenLogin.addEventListener("click", kitchenLogin);
  }

  const logoutAdminBtn = document.getElementById("logoutAdminBtn");
  if (logoutAdminBtn) {
    logoutAdminBtn.addEventListener("click", adminLogout);
  }

  const logoutCashierBtn = document.getElementById("logoutCashierBtn");
  if (logoutCashierBtn) {
    logoutCashierBtn.addEventListener("click", cashierLogout);
  }

  const logoutKitchenBtn = document.getElementById("logoutKitchenBtn");
  if (logoutKitchenBtn) {
    logoutKitchenBtn.addEventListener("click", kitchenLogout);
  }

  const refreshOrdersBtn = document.getElementById("refreshOrdersBtn");
  if (refreshOrdersBtn) {
    refreshOrdersBtn.addEventListener("click", renderCashierOrders);
  }

  const refreshKitchenOrdersBtn = document.getElementById("refreshKitchenOrdersBtn");
  if (refreshKitchenOrdersBtn) {
    refreshKitchenOrdersBtn.addEventListener("click", renderKitchenOrders);
  }

  ["guestEmail", "guestPhone"].forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener("input", renderCheckoutHistory);
    }
  });

  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      closeModal(btn.dataset.close || btn.closest(".modal")?.id);
    });
  });

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
      if (event.target === modal) closeModal(modal.id);
    });
  });
}

function initMenuTabs() {
  document.querySelectorAll(".menu-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      currentTab = btn.dataset.tab;
      document.querySelectorAll(".menu-tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.tab === currentTab);
      });
      renderMenu();
      const contentArea = document.querySelector(".content-area");
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function normalizeSectionKey(section) {
  const raw = String(section || "").trim().toLowerCase();
  const sectionMap = {
    bagels: "bagels",
    cream_cheese: "creamCheese",
    creamcheese: "creamCheese",
    specialties: "specialties",
    sides: "sides",
    bakery: "bakery",
    drinks: "drinks",
    sandwiches: "sandwiches"
  };
  return sectionMap[raw] || raw;
}

function buildOptionsMap(optionRows, valueRows) {
  const valuesByOptionId = {};
  for (const value of valueRows || []) {
    if (!valuesByOptionId[value.option_id]) valuesByOptionId[value.option_id] = [];
    valuesByOptionId[value.option_id].push(value);
  }

  for (const optionId in valuesByOptionId) {
    valuesByOptionId[optionId].sort((a, b) => Number(a.display_order || 0) - Number(b.display_order || 0));
  }

  const optionsByMenuItemId = {};
  for (const option of optionRows || []) {
    if (!optionsByMenuItemId[option.menu_item_id]) {
      optionsByMenuItemId[option.menu_item_id] = [];
    }

    optionsByMenuItemId[option.menu_item_id].push({
      ...option,
      values: valuesByOptionId[option.id] || []
    });
  }

  return optionsByMenuItemId;
}

function getOptionByName(options, optionName) {
  return (options || []).find(
    option => String(option.option_name || "").trim().toLowerCase() === optionName.trim().toLowerCase()
  );
}

function mapSupabaseRowsToMenu(rows, optionsByMenuItemId = {}) {
  const liveMenu = structuredClone(defaultMenu);



  for (const row of rows) {
    const meal = String(row.meal || "").trim().toLowerCase();
    const section = normalizeSectionKey(row.section);

    if (!liveMenu[meal] || !liveMenu[meal][section]) {
      console.warn("Skipped row with unmatched meal/section:", row);
      continue;
    }

    const normalizedRowName = String(row.name || "")
      .replace(/ cream cheese$/i, "")
      .trim()
      .toLowerCase();

    const fallbackItem = defaultMenu[meal]?.[section]?.find(item => {
      const normalizedItemName = String(item.name || "").trim().toLowerCase();
      return normalizedItemName === normalizedRowName || normalizedItemName === String(row.name || "").trim().toLowerCase();
    });

    const itemOptions = optionsByMenuItemId[row.id] || [];
    const sizeOption = getOptionByName(itemOptions, "Size");
    const bagelTypeOption = getOptionByName(itemOptions, "Bagel Type");
    const cheeseOption = getOptionByName(itemOptions, "Cheese");
    const eggStyleOption = getOptionByName(itemOptions, "Egg Style");
    const meatChoiceOption = getOptionByName(itemOptions, "Meat Choice");

    const bagelTypeValues = bagelTypeOption?.values?.map(value => value.value_name) || null;
    const cheeseValues = cheeseOption?.values?.map(value => value.value_name) || null;
    const eggStyleValues = eggStyleOption?.values?.map(value => value.value_name) || null;
    const meatChoiceValues = meatChoiceOption?.values?.map(value => value.value_name) || null;

    let supabaseSizes = fallbackItem?.sizes;
    let supabasePricePrefix = fallbackItem?.pricePrefix;

    if (sizeOption?.values?.length) {
      supabaseSizes = {};
      for (const value of sizeOption.values) {
        supabaseSizes[value.value_name] = Number(row.price) + Number(value.price_adjustment || 0);
      }
      supabasePricePrefix = "From";
    }

    const existingIndex = liveMenu[meal][section].findIndex(item =>
  String(item.name || "").trim().toLowerCase() === String(row.name || "").trim().toLowerCase()
);

const newItem = {
  id: row.id,
  menuItemId: row.id,
  name: row.name,
  price: Number(row.price),
  desc: row.description || "",
  image: row.image_url || imageBank[section] || imageBank.bagel,
  customizable: fallbackItem?.customizable || false,
  configType: fallbackItem?.configType,
  baseIngredients: fallbackItem?.baseIngredients,
  requireSausageStyle: fallbackItem?.requireSausageStyle,
  sizes: supabaseSizes,
  pricePrefix: supabasePricePrefix,
  bagelTypeOptions: bagelTypeValues,
  cheeseOptions: cheeseValues,
  eggStyleOptions: eggStyleValues,
  meatChoiceOptions: meatChoiceValues
};

if (existingIndex >= 0) {
  liveMenu[meal][section][existingIndex] = newItem;
} else {
  liveMenu[meal][section].push(newItem);
}
  }

  return liveMenu;
}

async function fetchLiveMenu() {
  const { data: menuRows, error: menuError } = await supabaseClient
    .from("menu_items")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (menuError) {
    console.error("Supabase menu load failed:", menuError);
    return;
  }

  if (!menuRows || !menuRows.length) {
    console.warn("No active menu items found in Supabase.");
    return;
  }

  const menuItemIds = menuRows.map(row => row.id);

  const { data: optionRows, error: optionError } = await supabaseClient
    .from("menu_item_options")
    .select("*")
    .in("menu_item_id", menuItemIds)
    .order("display_order", { ascending: true });

  if (optionError) {
    console.error("Supabase option load failed:", optionError);
    return;
  }

  const optionIds = (optionRows || []).map(row => row.id);
  let valueRows = [];

  if (optionIds.length) {
    const { data: loadedValueRows, error: valueError } = await supabaseClient
      .from("menu_item_option_values")
      .select("*")
      .in("option_id", optionIds)
      .order("display_order", { ascending: true });

    if (valueError) {
      console.error("Supabase option values load failed:", valueError);
      return;
    }

    valueRows = loadedValueRows || [];
  }

  const optionsByMenuItemId = buildOptionsMap(optionRows || [], valueRows || []);

  menuData = mapSupabaseRowsToMenu(menuRows, optionsByMenuItemId);
  persistMenu();
  renderMenu();
}

function renderMenu() {
  if (!menuContainer) return;

  const sectionDefs = sectionsConfig[currentTab];
  menuContainer.innerHTML = sectionDefs.map(section => {
    const items = menuData[currentTab][section.id] || [];
    return `
      <section class="menu-section" id="${currentTab}-${section.id}">
        <div class="section-heading">
          <div>
            <h2>${section.title}</h2>
            <p>${section.subtitle}</p>
          </div>
        </div>
        <div class="item-grid">
          ${items.map((item, index) => renderMenuItemCard(item, section.id, currentTab, index)).join("")}
        </div>
      </section>
    `;
  }).join("");

  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const meal = btn.dataset.meal;
      const section = btn.dataset.section;
      const index = Number(btn.dataset.index);
      const item = menuData[meal][section][index];

      if (item.customizable) {
        openCustomizationModal(item, meal, section);
      } else {
        addSimpleItemToCart(item, meal, section);
      }
    });
  });
}

function renderMenuItemCard(item, section, meal, index) {
  const price = item.pricePrefix ? `${item.pricePrefix} ${money(item.price)}` : money(item.price);

  return `
    <article class="menu-item-card">
      <img class="item-image" src="${item.image || imageBank.bagel}" alt="${item.name}" />
      <div class="item-content">
        <div class="item-title-row">
          <strong>${item.name}</strong>
          <span class="price-badge">${price}</span>
        </div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-actions">
          <button class="primary-btn add-cart-btn" data-meal="${meal}" data-section="${section}" data-index="${index}">
            ${item.customizable ? "Customize" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function addSimpleItemToCart(item, meal, section) {
  cart.push({
    id: uid(),
    menuItemId: item.id || item.menuItemId || null,
    meal,
    section,
    name: item.name,
    basePrice: Number(item.price),
    finalPrice: Number(item.price),
    quantity: 1,
    desc: item.desc,
    customizations: []
  });

  persistCart();
  renderCart();
}

function updateCartToggle() {
  if (!cartCountBadgeEl) return;
  cartCountBadgeEl.textContent = String(cart.length);
}

function renderCart() {
  if (!cartItemsEl) return;

  updateCartToggle();

  if (!cart.length) {
    cartItemsEl.innerHTML = `<div class="empty-state">Your cart is empty.</div>`;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <h4>
          ${item.name}
          <span style="float:right">${money(Number(item.finalPrice) * Number(item.quantity || 1))}</span>
        </h4>
        ${item.customizations?.length ? `<p>${item.customizations.join(" • ")}</p>` : `<p>${item.desc || ""}</p>`}
        <div style="display:flex; gap:8px; align-items:center; margin-top:8px;">
          <button class="ghost-btn small-btn decrease-qty-btn" data-id="${item.id}">-</button>
          <span><strong>${item.quantity || 1}</strong></span>
          <button class="ghost-btn small-btn increase-qty-btn" data-id="${item.id}">+</button>
          <button class="ghost-btn small-btn remove-cart-btn" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `).join("");
  }

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.finalPrice) * Number(item.quantity || 1)), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cartSubtotalEl) cartSubtotalEl.textContent = money(subtotal);
  if (cartTaxEl) cartTaxEl.textContent = money(tax);
  if (cartTotalEl) cartTotalEl.textContent = money(total);

  document.querySelectorAll(".remove-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      cart = cart.filter(item => item.id !== btn.dataset.id);
      persistCart();
      renderCart();
    });
  });

  document.querySelectorAll(".increase-qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = cart.find(cartItem => cartItem.id === btn.dataset.id);
      if (!item) return;
      item.quantity = Number(item.quantity || 1) + 1;
      persistCart();
      renderCart();
    });
  });

  document.querySelectorAll(".decrease-qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = cart.find(cartItem => cartItem.id === btn.dataset.id);
      if (!item) return;

      item.quantity = Number(item.quantity || 1) - 1;
      if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== btn.dataset.id);
      }

      persistCart();
      renderCart();
    });
  });
}

function renderCheckoutSummary() {
  if (!checkoutSummaryEl) return;

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.finalPrice) * Number(item.quantity || 1)), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  checkoutSummaryEl.innerHTML = `
    ${cart.map(item => `
      <div class="cart-item">
        <h4>
          ${item.name} x${item.quantity || 1}
          <span style="float:right">${money(Number(item.finalPrice) * Number(item.quantity || 1))}</span>
        </h4>
        ${item.customizations?.length ? `<p>${item.customizations.join(" • ")}</p>` : `<p>${item.desc || ""}</p>`}
        <div style="display:flex; gap:8px; align-items:center; margin-top:8px; flex-wrap:wrap;">
          <button class="ghost-btn small-btn checkout-decrease-qty-btn" data-id="${item.id}">-</button>
          <span><strong>${item.quantity || 1}</strong></span>
          <button class="ghost-btn small-btn checkout-increase-qty-btn" data-id="${item.id}">+</button>
          ${item.meal && item.section ? `<button class="ghost-btn small-btn checkout-edit-btn" data-id="${item.id}">Edit</button>` : ""}
        </div>
      </div>
    `).join("")}
    <div class="cart-summary">
      <div class="summary-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
      <div class="summary-row"><span>Estimated Tax</span><strong>${money(tax)}</strong></div>
      <div class="summary-row total"><span>Total</span><strong>${money(total)}</strong></div>
    </div>
  `;

  document.querySelectorAll(".checkout-increase-qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = cart.find(cartItem => cartItem.id === btn.dataset.id);
      if (!item) return;
      item.quantity = Number(item.quantity || 1) + 1;
      persistCart();
      renderCart();
      renderCheckoutSummary();
    });
  });

  document.querySelectorAll(".checkout-decrease-qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = cart.find(cartItem => cartItem.id === btn.dataset.id);
      if (!item) return;

      item.quantity = Number(item.quantity || 1) - 1;
      if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== btn.dataset.id);
      }

      persistCart();
      renderCart();
      renderCheckoutSummary();
    });
  });

  document.querySelectorAll(".checkout-edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      editCartItem(btn.dataset.id);
    });
  });
}

function hydrateCheckoutContact() {
  const lastContact = loadStorage(STORAGE_KEYS.lastContact, null);
  if (!lastContact) return;

  const guestName = document.getElementById("guestName");
  const guestEmail = document.getElementById("guestEmail");
  const guestPhone = document.getElementById("guestPhone");

  if (guestName) guestName.value = lastContact.name || "";
  if (guestEmail) guestEmail.value = lastContact.email || "";
  if (guestPhone) guestPhone.value = lastContact.phone || "";
}

async function renderCheckoutHistory() {
  if (!checkoutHistoryEl) return;

  const emailField = document.getElementById("guestEmail");
  const email = normalizeEmail(emailField?.value || "");

  if (!email) {
    checkoutHistoryEl.innerHTML = `Enter an email to see previous orders.`;
    return;
  }

  const { data: orderRows, error: ordersError } = await supabaseClient
    .from("orders")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(5);

  if (ordersError) {
    console.error("Failed to load previous orders:", ordersError);
    checkoutHistoryEl.innerHTML = `<div class="empty-state">Failed to load previous orders.</div>`;
    return;
  }

  if (!orderRows || !orderRows.length) {
    checkoutHistoryEl.innerHTML = `<div class="empty-state">No saved orders found yet.</div>`;
    return;
  }

  const orderIds = orderRows.map(order => order.id);

  const { data: itemRows, error: itemsError } = await supabaseClient
    .from("order_items")
    .select("*")
    .in("order_id", orderIds);

  if (itemsError) {
    console.error("Failed to load previous order items:", itemsError);
    checkoutHistoryEl.innerHTML = `<div class="empty-state">Failed to load previous order items.</div>`;
    return;
  }

  const itemsByOrderId = {};
  for (const item of itemRows || []) {
    if (!itemsByOrderId[item.order_id]) itemsByOrderId[item.order_id] = [];
    itemsByOrderId[item.order_id].push(item);
  }

  const previousOrders = orderRows.map(order => ({
    ...order,
    items: itemsByOrderId[order.id] || []
  }));

  checkoutHistoryEl.innerHTML = previousOrders.map(order => `
    <div class="history-card">
      <p><strong>Order:</strong> ${order.order_number || order.id}</p>
      <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleString()}</p>
      <div>
        <strong>Items:</strong>
        ${
          order.items.length
            ? `<ul style="margin:6px 0 0 18px; padding:0;">
                ${order.items.map(item => `
                  <li style="margin-bottom:6px;">
                    ${item.item_name}
                    ${item.customizations ? `<br><small style="opacity:0.8;">${item.customizations}</small>` : ""}
                  </li>
                `).join("")}
              </ul>`
            : " No items found"
        }
      </div>
      <button class="ghost-btn small-btn order-again-btn" data-order-id="${order.id}">
        Order Again
      </button>
    </div>
  `).join("");

  document.querySelectorAll(".order-again-btn").forEach(btn => {
    btn.addEventListener("click", () => orderAgain(btn.dataset.orderId, previousOrders));
  });
}

function orderAgain(orderId, previousOrders) {
  const selectedOrder = previousOrders.find(order => String(order.id) === String(orderId));
  if (!selectedOrder) return;

  const rebuiltItems = selectedOrder.items.map(item => ({
    id: uid(),
    menuItemId: item.menu_item_id || null,
    meal: "",
    section: "",
    name: item.item_name,
    basePrice: Number(item.base_price || 0),
    finalPrice: Number(item.line_total || 0),
    quantity: Number(item.quantity || 1),
    desc: "",
    customizations: item.customizations ? item.customizations.split(" • ") : []
  }));

  cart.push(...rebuiltItems);
  persistCart();
  renderCart();
  renderCheckoutSummary();
}

async function placeOrder() {
  if (!checkoutMessageEl) return;

  checkoutMessageEl.textContent = "";

  if (!cart.length) {
    checkoutMessageEl.textContent = "Your cart is empty.";
    return;
  }

  const name = document.getElementById("guestName")?.value.trim() || "";
  const email = normalizeEmail(document.getElementById("guestEmail")?.value || "");
  const phone = normalizePhone(document.getElementById("guestPhone")?.value || "");
  const notes = document.getElementById("orderNotes")?.value.trim() || "";
  const orderType = "Pickup";
const deliveryAddress = "";

  if (!name) {
    checkoutMessageEl.textContent = "Please enter your name.";
    return;
  }

  if (!email && !phone) {
    checkoutMessageEl.textContent = "Please enter an email or phone number.";
    return;
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    checkoutMessageEl.textContent = "Please enter a valid email address.";
    return;
  }

  if (phone && phone.length < 10) {
    checkoutMessageEl.textContent = "Please enter a valid phone number.";
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (Number(item.finalPrice) * Number(item.quantity || 1)), 0);
  const tax = subtotal * 0.08;
  const orderNumber = `BRU-${Date.now().toString().slice(-6)}`;

  const { data, error } = await supabaseClient
    .from("orders")
    .insert([
      {
        customer_name: name,
        email,
        phone,
        order_status: "Pending",
        subtotal,
        tax,
        notes: `${orderType}${deliveryAddress ? ` • ${deliveryAddress}` : ""}${notes ? ` • ${notes}` : ""}`,
        pickup_time: null,
        order_number: orderNumber
      }
    ])
    .select();

  if (error) {
    console.error("Order insert failed:", error);
    checkoutMessageEl.textContent = `Failed to place order: ${error.message}`;
    return;
  }

  const newOrder = data?.[0];
  if (!newOrder?.id) {
    checkoutMessageEl.textContent = "Order was created, but no order ID was returned.";
    return;
  }

  const orderItemsPayload = cart.map(item => ({
    order_id: newOrder.id,
    menu_item_id: item.menuItemId || null,
    item_name: item.name,
    base_price: Number(item.basePrice || item.finalPrice || 0),
    quantity: Number(item.quantity || 1),
    customizations: item.customizations?.length ? item.customizations.join(" • ") : null,
    line_total: Number(item.finalPrice || 0) * Number(item.quantity || 1)

    
  }));

  const { error: orderItemsError } = await supabaseClient
    .from("order_items")
    .insert(orderItemsPayload);

  if (orderItemsError) {
    console.error("Order items insert failed:", orderItemsError);
    checkoutMessageEl.textContent = `Order saved, but items failed to save: ${orderItemsError.message}`;
    return;
  }

await fetch("/.netlify/functions/send-order-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    orderNumber,
    name,
    email,
    phone,
    orderType,
    deliveryAddress,
    notes,
    items: cart,
    subtotal,
    tax,
    total: subtotal + tax
  })
});

  saveStorage(STORAGE_KEYS.lastContact, { name, email, phone });

  cart = [];
  persistCart();
  renderCart();
  await renderCashierOrders();
  closeModal("checkoutModal");
  clearCheckoutInputs();

showOrderSuccess(orderNumber);
}

function clearCheckoutInputs() {
  ["guestName", "guestEmail", "guestPhone", "orderNotes", "deliveryAddress"].forEach(id => {
    const field = document.getElementById(id);
    if (field) field.value = "";
  });

  const pickupRadio = document.querySelector('input[name="orderType"][value="Pickup"]');
  if (pickupRadio) pickupRadio.checked = true;

  initOrderTypeToggle();

  if (checkoutHistoryEl) {
    checkoutHistoryEl.innerHTML = `Enter an email to see previous orders.`;
  }
}

function openCustomizationModal(item, meal, section) {
  const modalContent = document.getElementById("itemModalContent");
  if (!modalContent) return;

  modalContent.innerHTML = buildCustomizationMarkup(item);
  openModal("itemModal");

  const submitBtn = document.getElementById("submitCustomItem");
  if (!submitBtn) return;

  submitBtn.addEventListener("click", () => {
    const builtItem = collectCustomization(item, meal, section);
    if (!builtItem.valid) {
      alert(builtItem.message);
      return;
    }

    cart.push(builtItem.item);
    persistCart();
    renderCart();
    closeModal("itemModal");
  }, { once: true });
}

function editCartItem(cartItemId) {
  const cartItem = cart.find(item => item.id === cartItemId);
  if (!cartItem) return;

  let sourceItem = null;
  let sourceMeal = cartItem.meal || "";
  let sourceSection = cartItem.section || "";

  if (sourceMeal && sourceSection) {
    sourceItem = menuData[sourceMeal]?.[sourceSection]?.find(
      item => String(item.id || item.menuItemId) === String(cartItem.menuItemId)
    );
  }

  if (!sourceItem) {
    for (const mealKey in menuData) {
      for (const sectionKey in menuData[mealKey]) {
        const foundItem = menuData[mealKey][sectionKey].find(
          item => String(item.id || item.menuItemId) === String(cartItem.menuItemId)
        );

        if (foundItem) {
          sourceItem = foundItem;
          sourceMeal = mealKey;
          sourceSection = sectionKey;
          break;
        }
      }
      if (sourceItem) break;
    }
  }

  if (!sourceItem || !sourceItem.customizable) {
    showToast("This item can’t be edited.");
    return;
  }

  cart = cart.filter(item => item.id !== cartItemId);
  persistCart();
  renderCart();
  renderCheckoutSummary();

  openCustomizationModal(sourceItem, sourceMeal, sourceSection);
}

function buildCustomizationMarkup(item) {
  const note = `<p class="tiny-note">Required choices must be made before adding this item.</p>`;
  let fields = "";

  switch (item.configType) {
    case "creamCheeseTub":
      fields = `
        <div class="customization-block">
          <h3>Choose Size *</h3>
          ${renderRadioGroup("sizeChoice", Object.keys(item.sizes))}
        </div>
      `;
      break;

    case "breakfastSandwich":
      fields = `
        <div class="customization-block">
          <h3>Choose Bagel *</h3>
          ${renderRadioGroup("bagelChoice", item.bagelTypeOptions || customOptions.bagels)}
        </div>
        <div class="customization-block">
          <h3>Choose Cheese *</h3>
          ${renderRadioGroup("cheeseChoice", item.cheeseOptions || customOptions.cheeseOptions)}
        </div>
        ${item.requireSausageStyle ? `
          <div class="customization-block">
            <h3>Sausage Style *</h3>
            ${renderRadioGroup("sausageStyleChoice", customOptions.sausageStyles)}
          </div>
        ` : ""}
        <div class="customization-block">
          <h3>Remove Ingredients (optional)</h3>
          ${renderCheckboxGroup("removeIngredients", item.baseIngredients || [])}
        </div>
        <div class="customization-block">
          <h3>Additions (+$1 each)</h3>
          ${renderCheckboxGroup("additions", ["Extra Egg", "Extra Cheese", "Tomato", "Onion", "Jalapeños"])}
        </div>
      `;
      break;

    case "lunchSandwich":
      fields = `
        <div class="customization-block">
          <h3>Choose Bagel *</h3>
          ${renderRadioGroup("bagelChoice", customOptions.bagels)}
        </div>
        <div class="customization-block">
          <h3>Choose Cheese *</h3>
          ${renderRadioGroup("cheeseChoice", item.cheeseOptions || customOptions.cheeseOptions)}
        </div>
        <div class="customization-block">
          <h3>Removals (optional)</h3>
          ${renderCheckboxGroup("removeIngredients", item.baseIngredients || [])}
        </div>
        <div class="customization-block">
          <h3>Additions (+$1 each)</h3>
          ${renderCheckboxGroup("additions", customOptions.lunchAdditions)}
        </div>
      `;
      break;

    case "loxBagel":
      fields = `
        <div class="customization-block">
          <h3>Choose Bagel *</h3>
          ${renderRadioGroup("bagelChoice", customOptions.bagels)}
        </div>
        <div class="customization-block">
          <h3>Remove Ingredients (optional)</h3>
          ${renderCheckboxGroup("removeIngredients", item.baseIngredients || [])}
        </div>
        <div class="customization-block">
          <h3>Additions (+$1 each)</h3>
          ${renderCheckboxGroup("additions", ["Extra Lox", "Extra Cream Cheese", "Tomato", "Onion", "Capers"])}
        </div>
      `;
      break;

    case "bagelCreamCheese":
      fields = `
        <div class="customization-block">
          <h3>Choose Bagel *</h3>
          ${renderRadioGroup("bagelChoice", customOptions.bagels)}
        </div>
        <div class="customization-block">
          <h3>Choose Cream Cheese *</h3>
          ${renderRadioGroup("creamCheeseChoice", customOptions.creamCheeses)}
        </div>
      `;
      break;

    case "breakfastPlatter":
      fields = `
        <div class="customization-block">
          <h3>Choose Bagel *</h3>
          ${renderRadioGroup("bagelChoice", customOptions.bagels)}
        </div>
        <div class="customization-block">
          <h3>Egg Style *</h3>
          ${renderRadioGroup("eggStyleChoice", item.eggStyleOptions || customOptions.eggStyles)}
        </div>
        <div class="customization-block">
          <h3>Choose Meat *</h3>
          ${renderRadioGroup("meatChoice", item.meatChoiceOptions || customOptions.platterMeats)}
        </div>
        <div class="customization-block">
          <h3>Choose Side *</h3>
          ${renderRadioGroup("sideChoice", ["Home Fries", "Grits"])}
        </div>
      `;
      break;

    case "pancakePlatter":
      fields = `
        <div class="customization-block">
          <h3>Choose Meat *</h3>
          ${renderRadioGroup("meatChoice", item.meatChoiceOptions || customOptions.platterMeats)}
        </div>
      `;
      break;

    case "loadedBowl":
      fields = `
        <div class="customization-block">
          <h3>Choose Base *</h3>
          ${renderRadioGroup("baseChoice", ["Grits", "Hashbrowns"])}
        </div>
        <div class="customization-block">
          <h3>Egg Style *</h3>
          ${renderRadioGroup("eggStyleChoice", item.eggStyleOptions || customOptions.eggStyles)}
        </div>
        <div class="customization-block">
          <h3>Choose Meat *</h3>
          ${renderRadioGroup("meatChoice", item.meatChoiceOptions || customOptions.platterMeats)}
        </div>
        <div class="customization-block">
          <h3>Choose Cheese *</h3>
          ${renderRadioGroup("cheeseChoice", item.cheeseOptions || customOptions.cheeseOptions)}
        </div>
      `;
      break;

    case "biscuits":
      fields = `
        <div class="customization-block">
          <h3>Extra Gravy? *</h3>
          ${renderRadioGroup("gravyChoice", ["No Extra Gravy", "Add Extra Gravy (+$1)"])}
        </div>
      `;
      break;

    case "omelette":
      fields = `
        <div class="customization-block">
          <h3>Choose Toppings *</h3>
          <p class="tiny-note">First 2 toppings included. Each topping after 2 is +$1.</p>
          ${renderCheckboxGroup("omeletteToppings", customOptions.omeletteToppings)}
        </div>
      `;
      break;

    case "eggSide":
      fields = `
        <div class="customization-block">
          <h3>Egg Style *</h3>
          ${renderRadioGroup("eggStyleChoice", item.eggStyleOptions || customOptions.eggStyles)}
        </div>
      `;
      break;

    case "sausageSide":
      fields = `
        <div class="customization-block">
          <h3>Sausage Style *</h3>
          ${renderRadioGroup("sausageStyleChoice", customOptions.sausageStyles)}
        </div>
      `;
      break;

    case "cookieFlavor":
      fields = `
        <div class="customization-block">
          <h3>Choose Cookie Flavor *</h3>
          ${renderRadioGroup("bakeryFlavorChoice", customOptions.cookieFlavors)}
        </div>
      `;
      break;

    case "muffinFlavor":
      fields = `
        <div class="customization-block">
          <h3>Choose Muffin Flavor *</h3>
          ${renderRadioGroup("bakeryFlavorChoice", customOptions.muffinFlavors)}
        </div>
      `;
      break;

    case "sizedDrink":
    case "loadedFries":
      fields = `
        <div class="customization-block">
          <h3>Choose Size *</h3>
          ${renderRadioGroup("sizeChoice", Object.keys(item.sizes))}
        </div>
      `;
      break;

    default:
      fields = `<p>No customization available.</p>`;
  }

  return `
    <div class="section-heading">
      <div>
        <h2>${item.name}</h2>
        <p>${item.desc}</p>
      </div>
      <div class="price-badge">${item.pricePrefix ? `${item.pricePrefix} ${money(item.price)}` : money(item.price)}</div>
    </div>
    ${note}
    ${fields}
    <button class="primary-btn full-btn" id="submitCustomItem">Add to Cart</button>
  `;
}

function renderRadioGroup(name, options) {
  return `
    <div class="option-row">
      ${options.map(option => `
        <label class="option-pill">
          <input type="radio" name="${name}" value="${option}">
          <span>${option}</span>
        </label>
      `).join("")}
    </div>
  `;
}

function renderCheckboxGroup(name, options) {
  return `
    <div class="option-row">
      ${options.map(option => `
        <label class="option-pill">
          <input type="checkbox" name="${name}" value="${option}">
          <span>${option}</span>
        </label>
      `).join("")}
    </div>
  `;
}

function getCheckedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(input => input.value);
}

function buildCartItem(item, meal, section, customizations, extraCost = 0, nameOverride = null) {
  return {
    id: uid(),
    menuItemId: item.id || item.menuItemId || null,
    meal,
    section,
    name: nameOverride || item.name,
    basePrice: Number(item.price),
    finalPrice: Number(item.price) + Number(extraCost),
    quantity: 1,
    desc: item.desc,
    customizations
  };
}

function collectCustomization(item, meal, section) {
  if (item.configType === "creamCheeseTub") {
    const size = getCheckedValue("sizeChoice");
    if (!size) return { valid: false, message: "Please choose a size." };

    const finalPrice = Number(item.sizes[size]);
    return {
      valid: true,
      item: {
        id: uid(),
        menuItemId: item.id || item.menuItemId || null,
        meal,
        section,
        name: item.name,
        basePrice: Number(item.price),
        finalPrice,
        quantity: 1,
        desc: item.desc,
        customizations: [`Size: ${size}`]
      }
    };
  }

  if (item.configType === "breakfastSandwich") {
    const bagel = getCheckedValue("bagelChoice");
    const cheese = getCheckedValue("cheeseChoice");
    const sausageStyle = item.requireSausageStyle ? getCheckedValue("sausageStyleChoice") : "";

    if (!bagel || !cheese || (item.requireSausageStyle && !sausageStyle)) {
      return { valid: false, message: "Please complete the required sandwich choices." };
    }

    const removed = getCheckedValues("removeIngredients");
    const additions = getCheckedValues("additions");
    const customizations = [`Bagel: ${bagel}`, `Cheese: ${cheese}`];

    if (sausageStyle) customizations.push(`Sausage: ${sausageStyle}`);
    if (removed.length) customizations.push(`Remove: ${removed.join(", ")}`);
    if (additions.length) customizations.push(`Add: ${additions.join(", ")}`);

    return { valid: true, item: buildCartItem(item, meal, section, customizations, additions.length) };
  }

  if (item.configType === "lunchSandwich") {
    const bagel = getCheckedValue("bagelChoice");
    const cheese = getCheckedValue("cheeseChoice");

    if (!bagel || !cheese) {
      return { valid: false, message: "Please choose a bagel and cheese." };
    }

    const removed = getCheckedValues("removeIngredients");
    const additions = getCheckedValues("additions");
    const customizations = [`Bagel: ${bagel}`, `Cheese: ${cheese}`];

    if (removed.length) customizations.push(`Remove: ${removed.join(", ")}`);
    if (additions.length) customizations.push(`Add: ${additions.join(", ")}`);

    return { valid: true, item: buildCartItem(item, meal, section, customizations, additions.length) };
  }

  if (item.configType === "loxBagel") {
    const bagel = getCheckedValue("bagelChoice");
    if (!bagel) return { valid: false, message: "Please choose a bagel." };

    const removed = getCheckedValues("removeIngredients");
    const additions = getCheckedValues("additions");
    const customizations = [`Bagel: ${bagel}`];

    if (removed.length) customizations.push(`Remove: ${removed.join(", ")}`);
    if (additions.length) customizations.push(`Add: ${additions.join(", ")}`);

    return { valid: true, item: buildCartItem(item, meal, section, customizations, additions.length) };
  }

  if (item.configType === "bagelCreamCheese") {
    const bagel = getCheckedValue("bagelChoice");
    const creamCheese = getCheckedValue("creamCheeseChoice");

    if (!bagel || !creamCheese) {
      return { valid: false, message: "Please choose a bagel and cream cheese flavor." };
    }

    return {
      valid: true,
      item: buildCartItem(item, meal, section, [`Bagel: ${bagel}`, `Cream Cheese: ${creamCheese}`])
    };
  }

  if (item.configType === "breakfastPlatter") {
    const bagel = getCheckedValue("bagelChoice");
    const eggStyle = getCheckedValue("eggStyleChoice");
    const meat = getCheckedValue("meatChoice");
    const side = getCheckedValue("sideChoice");

    if (!bagel || !eggStyle || !meat || !side) {
      return { valid: false, message: "Please complete all platter selections." };
    }

    return {
      valid: true,
      item: buildCartItem(item, meal, section, [
        `Bagel: ${bagel}`,
        `Egg Style: ${eggStyle}`,
        `Meat: ${meat}`,
        `Side: ${side}`
      ])
    };
  }

  if (item.configType === "pancakePlatter") {
    const meat = getCheckedValue("meatChoice");
    if (!meat) return { valid: false, message: "Please choose a meat option." };

    return {
      valid: true,
      item: buildCartItem(item, meal, section, [`Meat: ${meat}`])
    };
  }

  if (item.configType === "loadedBowl") {
    const base = getCheckedValue("baseChoice");
    const eggStyle = getCheckedValue("eggStyleChoice");
    const meat = getCheckedValue("meatChoice");
    const cheese = getCheckedValue("cheeseChoice");

    if (!base || !eggStyle || !meat || !cheese) {
      return { valid: false, message: "Please complete all bowl selections." };
    }

    return {
      valid: true,
      item: buildCartItem(item, meal, section, [
        `Base: ${base}`,
        `Egg Style: ${eggStyle}`,
        `Meat: ${meat}`,
        `Cheese: ${cheese}`
      ])
    };
  }

  if (item.configType === "biscuits") {
    const gravy = getCheckedValue("gravyChoice");
    if (!gravy) return { valid: false, message: "Please choose a gravy option." };

    const extraCost = gravy.includes("Add Extra") ? 1 : 0;
    return { valid: true, item: buildCartItem(item, meal, section, [gravy], extraCost) };
  }

  if (item.configType === "omelette") {
    const toppings = getCheckedValues("omeletteToppings");
    if (!toppings.length) {
      return { valid: false, message: "Please choose at least one topping." };
    }

    const extraCost = Math.max(0, toppings.length - 2);
    const customizations = [`Toppings: ${toppings.join(", ")}`];
    if (extraCost) customizations.push(`Extra Toppings Charge: +${money(extraCost)}`);

    return { valid: true, item: buildCartItem(item, meal, section, customizations, extraCost) };
  }

  if (item.configType === "eggSide") {
    const eggStyle = getCheckedValue("eggStyleChoice");
    if (!eggStyle) return { valid: false, message: "Please choose an egg style." };

    return { valid: true, item: buildCartItem(item, meal, section, [`Egg Style: ${eggStyle}`]) };
  }

  if (item.configType === "sausageSide") {
    const sausageStyle = getCheckedValue("sausageStyleChoice");
    if (!sausageStyle) return { valid: false, message: "Please choose patty or link." };

    return { valid: true, item: buildCartItem(item, meal, section, [`Sausage: ${sausageStyle}`]) };
  }

  if (item.configType === "cookieFlavor") {
    const flavor = getCheckedValue("bakeryFlavorChoice");
    if (!flavor) return { valid: false, message: "Please choose a cookie flavor." };

    return {
      valid: true,
      item: buildCartItem(item, meal, section, [`Flavor: ${flavor}`], 0, `${item.name} - ${flavor}`)
    };
  }

  if (item.configType === "muffinFlavor") {
    const flavor = getCheckedValue("bakeryFlavorChoice");
    if (!flavor) return { valid: false, message: "Please choose a muffin flavor." };

    return {
      valid: true,
      item: buildCartItem(item, meal, section, [`Flavor: ${flavor}`], 0, `${item.name} - ${flavor}`)
    };
  }

  if (item.configType === "sizedDrink" || item.configType === "loadedFries") {
    const size = getCheckedValue("sizeChoice");
    if (!size) return { valid: false, message: "Please choose a size." };

    const finalPrice = Number(item.sizes[size]);
    return {
      valid: true,
      item: {
        id: uid(),
        menuItemId: item.id || item.menuItemId || null,
        meal,
        section,
        name: item.name,
        basePrice: Number(item.price),
        finalPrice,
        quantity: 1,
        desc: item.desc,
        customizations: [`Size: ${size}`]
      }
    };
  }

  return { valid: true, item: buildCartItem(item, meal, section, []) };
}

function adminLogin() {
  const username = document.getElementById("adminUsername")?.value.trim() || "";
  const password = document.getElementById("adminPassword")?.value.trim() || "";
  const message = document.getElementById("adminLoginMessage");

  if (!username) {
    if (message) message.textContent = "Please enter a username.";
    return;
  }

  if (password !== "Bagel01!") {
    if (message) message.textContent = "Incorrect password.";
    return;
  }

  adminLoggedIn = true;
  if (message) message.textContent = "";
  window.location.href = "order.html?dashboard=admin";
}

function cashierLogin() {
  const username = document.getElementById("cashierUsername")?.value.trim() || "";
  const password = document.getElementById("cashierPassword")?.value.trim() || "";
  const message = document.getElementById("cashierLoginMessage");

  if (!username) {
    if (message) message.textContent = "Please enter a username.";
    return;
  }

  if (password !== "Bagel01!") {
    if (message) message.textContent = "Incorrect password.";
    return;
  }

  cashierLoggedIn = true;
  if (message) message.textContent = "";
  window.location.href = "order.html?dashboard=cashier";
}

function kitchenLogin() {
  const username = document.getElementById("kitchenUsername")?.value.trim() || "";
  const password = document.getElementById("kitchenPassword")?.value.trim() || "";
  const message = document.getElementById("kitchenLoginMessage");

  if (!username) {
    if (message) message.textContent = "Please enter a username.";
    return;
  }

  if (password !== "Bagel01!") {
    if (message) message.textContent = "Incorrect password.";
    return;
  }

  kitchenLoggedIn = true;
  if (message) message.textContent = "";
  window.location.href = "order.html?dashboard=kitchen";
}

function kitchenLogout() {
  kitchenLoggedIn = false;
  closeModal("kitchenDashboardModal");

  const usernameField = document.getElementById("kitchenUsername");
  const passwordField = document.getElementById("kitchenPassword");
  if (usernameField) usernameField.value = "";
  if (passwordField) passwordField.value = "";
}

function adminLogout() {
  adminLoggedIn = false;
  closeModal("adminDashboardModal");

  const user = document.getElementById("adminUsername");
  const pass = document.getElementById("adminPassword");
  if (user) user.value = "";
  if (pass) pass.value = "";
}

function cashierLogout() {
  cashierLoggedIn = false;
  closeModal("cashierDashboardModal");

  const user = document.getElementById("cashierUsername");
  const pass = document.getElementById("cashierPassword");
  if (user) user.value = "";
  if (pass) pass.value = "";
}

function initAdminEditor() {
  const editMealSelect = document.getElementById("editMealSelect");
  const addMealSelect = document.getElementById("addMealSelect");
  if (!editMealSelect || !addMealSelect) return;

  const mealOptions = Object.keys(sectionsConfig)
    .map(meal => `<option value="${meal}">${capitalize(meal)}</option>`)
    .join("");

  editMealSelect.innerHTML = mealOptions;
  addMealSelect.innerHTML = mealOptions;

  editMealSelect.addEventListener("change", populateEditSections);
  document.getElementById("editSectionSelect")?.addEventListener("change", populateEditItems);
  document.getElementById("editItemSelect")?.addEventListener("change", loadSelectedItemIntoForm);
  addMealSelect.addEventListener("change", populateAddSections);
  document.getElementById("saveItemBtn")?.addEventListener("click", saveEditedItem);
  document.getElementById("deleteItemBtn")?.addEventListener("click", deleteEditedItem);
  document.getElementById("addItemBtn")?.addEventListener("click", addNewItem);

  const resetBtn = document.getElementById("resetMenuBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      await fetchLiveMenu();
      populateAdminSelects();
      showToast("Reloaded menu from Supabase.");
    });
  }

  populateAdminSelects();
}

function populateAdminSelects() {
  populateEditSections();
  populateAddSections();
}

function populateEditSections() {
  const editMealSelect = document.getElementById("editMealSelect");
  const editSectionSelect = document.getElementById("editSectionSelect");
  if (!editMealSelect || !editSectionSelect) return;

  const meal = editMealSelect.value || "breakfast";
  const sections = sectionsConfig[meal]
    .map(section => `<option value="${section.id}">${section.title}</option>`)
    .join("");

  editSectionSelect.innerHTML = sections;
  populateEditItems();
}

function populateEditItems() {
  const editMealSelect = document.getElementById("editMealSelect");
  const editSectionSelect = document.getElementById("editSectionSelect");
  const editItemSelect = document.getElementById("editItemSelect");
  if (!editMealSelect || !editSectionSelect || !editItemSelect) return;

  const meal = editMealSelect.value || "breakfast";
  const section = editSectionSelect.value;
  const items = menuData[meal][section] || [];

  editItemSelect.innerHTML = items.map((item, idx) => `<option value="${idx}">${item.name}</option>`).join("");
  loadSelectedItemIntoForm();
}

function loadSelectedItemIntoForm() {
  const editMealSelect = document.getElementById("editMealSelect");
  const editSectionSelect = document.getElementById("editSectionSelect");
  const editItemSelect = document.getElementById("editItemSelect");
  if (!editMealSelect || !editSectionSelect || !editItemSelect) return;

  const meal = editMealSelect.value || "breakfast";
  const section = editSectionSelect.value;
  const index = Number(editItemSelect.value || 0);
  const item = menuData[meal][section]?.[index];
  if (!item) return;

  const editName = document.getElementById("editName");
  const editPrice = document.getElementById("editPrice");
  const editDesc = document.getElementById("editDesc");
  const editImage = document.getElementById("editImage");

  if (editName) editName.value = item.name;
  if (editPrice) editPrice.value = item.price;
  if (editDesc) editDesc.value = item.desc;
  if (editImage) editImage.value = item.image || "";
}

async function saveEditedItem() {
  const meal = document.getElementById("editMealSelect")?.value;
  const section = document.getElementById("editSectionSelect")?.value;
  const index = Number(document.getElementById("editItemSelect")?.value);
  if (!meal || !section) return;

  const currentItem = menuData[meal][section][index];
  if (!currentItem?.id) {
    showToast("This item is missing a Supabase row id.");
    return;
  }

  const updates = {
    name: document.getElementById("editName")?.value.trim() || "",
    price: Number(document.getElementById("editPrice")?.value),
    description: document.getElementById("editDesc")?.value.trim() || "",
    image_url: document.getElementById("editImage")?.value.trim() || currentItem.image,
    meal,
    section
  };

  const { error } = await supabaseClient
    .from("menu_items")
    .update(updates)
    .eq("id", currentItem.id);

  if (error) {
    console.error("Update failed:", error);
    showToast(`Failed to update item: ${error.message}`);
    return;
  }

  await fetchLiveMenu();
  populateAdminSelects();
  showToast("Item updated.");
}

async function deleteEditedItem() {
  const meal = document.getElementById("editMealSelect")?.value;
  const section = document.getElementById("editSectionSelect")?.value;
  const index = Number(document.getElementById("editItemSelect")?.value);
  if (!meal || !section) return;

  const currentItem = menuData[meal][section][index];
  if (!currentItem?.id) {
    showToast("This item is missing a Supabase row id.");
    return;
  }

  const { data, error } = await supabaseClient
    .from("menu_items")
    .delete()
    .eq("id", currentItem.id)
    .select();

  if (error) {
    showToast(`Failed to delete item: ${error.message}`);
    return;
  }

  if (!data || !data.length) {
    showToast("No row was deleted.");
    return;
  }

  await fetchLiveMenu();
  populateAdminSelects();
  renderMenu();
  showToast("Item deleted.");
}

function populateAddSections() {
  const addMealSelect = document.getElementById("addMealSelect");
  const addSectionSelect = document.getElementById("addSectionSelect");
  if (!addMealSelect || !addSectionSelect) return;

  const meal = addMealSelect.value || "breakfast";
  const sections = sectionsConfig[meal]
    .map(section => `<option value="${section.id}">${section.title}</option>`)
    .join("");

  addSectionSelect.innerHTML = sections;
}

async function addNewItem() {
  const meal = document.getElementById("addMealSelect")?.value;
  const section = document.getElementById("addSectionSelect")?.value;
  const name = document.getElementById("addName")?.value.trim() || "";
  const price = Number(document.getElementById("addPrice")?.value);
  const desc = document.getElementById("addDesc")?.value.trim() || "";
  const image = document.getElementById("addImage")?.value.trim() || imageBank.bagel;

  if (!meal || !section) return;

  if (!name || !price || !desc) {
    showToast("Please fill in name, price, and description.");
    return;
  }

  const existingItems = menuData[meal][section] || [];
  const displayOrder = existingItems.length + 1;

  const newItem = {
    meal,
    section,
    name,
    price,
    description: desc,
    image_url: image,
    is_active: true,
    display_order: displayOrder
  };

  const { data, error } = await supabaseClient
    .from("menu_items")
    .insert([newItem])
    .select();

  if (error) {
    showToast(`Failed to add item: ${error.message}`);
    return;
  }

  if (!data || !data.length) {
    showToast("No item was added.");
    return;
  }

  await fetchLiveMenu();
  populateAdminSelects();
  renderMenu();

  ["addName", "addPrice", "addDesc", "addImage"].forEach(id => {
    const field = document.getElementById(id);
    if (field) field.value = "";
  });

  showToast("New item added.");
}

async function renderCashierOrders() {
  const container = document.getElementById("cashierOrders");
  if (!container) return;

  const { data: orderRows, error: ordersError } = await supabaseClient
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (ordersError) {
    console.error("Failed to load orders:", ordersError);
    container.innerHTML = `<div class="empty-state">Failed to load orders.</div>`;
    return;
  }

  if (!orderRows || !orderRows.length) {
    container.innerHTML = `<div class="empty-state">No orders yet.</div>`;
    return;
  }

  const orderIds = orderRows.map(order => order.id);

  const { data: itemRows, error: itemsError } = await supabaseClient
    .from("order_items")
    .select("*")
    .in("order_id", orderIds);

  if (itemsError) {
    console.error("Failed to load order items:", itemsError);
    container.innerHTML = `<div class="empty-state">Failed to load order items.</div>`;
    return;
  }

  const itemsByOrderId = {};
  for (const item of itemRows || []) {
    if (!itemsByOrderId[item.order_id]) itemsByOrderId[item.order_id] = [];
    itemsByOrderId[item.order_id].push(item);
  }

  orders = orderRows.map(order => ({
    ...order,
    items: itemsByOrderId[order.id] || []
  }));

  container.innerHTML = orders.map(order => `
    <div class="order-card">
      <h4>Order ${order.order_number || order.id}</h4>
      <p><strong>Placed:</strong> ${new Date(order.created_at).toLocaleString()}</p>
      <p><strong>Customer:</strong> ${order.customer_name || "Guest"}${order.email ? ` • ${order.email}` : ""}${order.phone ? ` • ${order.phone}` : ""}</p>
      ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ""}
      <p><strong>Items:</strong> ${
        order.items.length
          ? order.items.map(item => `${item.item_name} x${item.quantity || 1} (${money(item.line_total)})`).join(", ")
          : "No items found"
      }</p>
      <p><strong>Subtotal:</strong> ${money(order.subtotal || 0)}</p>
      <p><strong>Tax:</strong> ${money(order.tax || 0)}</p>
      <p><strong>Status:</strong> <span class="order-status ${statusClass(order.order_status)}">${order.order_status || "Pending"}</span></p>
      <div class="order-actions">
        <button class="primary-btn small-btn order-action" data-id="${order.id}" data-status="Kitchen">Accept & Send to Kitchen</button>
        <button class="danger-btn small-btn order-action" data-id="${order.id}" data-status="Denied">Deny</button>
        <button class="complete-btn small-btn order-action" data-id="${order.id}" data-status="Completed">Complete</button>
        </div>
    </div>
  `).join("");

  document.querySelectorAll(".order-action").forEach(btn => {
    btn.addEventListener("click", () => updateOrderStatus(btn.dataset.id, btn.dataset.status));
  });
}

async function renderKitchenOrders() {
  const container = document.getElementById("kitchenOrders");
  if (!container) return;

  const { data: orderRows, error: ordersError } = await supabaseClient
    .from("orders")
    .select("*")
    .eq("order_status", "Kitchen")
    .order("created_at", { ascending: true });

  if (ordersError) {
    console.error("Failed to load kitchen orders:", ordersError);
    container.innerHTML = `<div class="empty-state">Failed to load kitchen orders.</div>`;
    return;
  }

  if (!orderRows || !orderRows.length) {
    container.innerHTML = `<div class="empty-state">No kitchen orders right now.</div>`;
    return;
  }

  const orderIds = orderRows.map(order => order.id);

  const { data: itemRows, error: itemsError } = await supabaseClient
    .from("order_items")
    .select("*")
    .in("order_id", orderIds);

  if (itemsError) {
    console.error("Failed to load kitchen order items:", itemsError);
    container.innerHTML = `<div class="empty-state">Failed to load kitchen order items.</div>`;
    return;
  }

  const itemsByOrderId = {};
  for (const item of itemRows || []) {
    if (!itemsByOrderId[item.order_id]) itemsByOrderId[item.order_id] = [];
    itemsByOrderId[item.order_id].push(item);
  }

  const kitchenOrders = orderRows.map(order => ({
    ...order,
    items: itemsByOrderId[order.id] || []
  }));

  container.innerHTML = kitchenOrders.map(order => `
    <div class="kitchen-ticket">
      <h4>Order ${order.order_number || order.id}</h4>
      <p><strong>Placed:</strong> ${new Date(order.created_at).toLocaleString()}</p>
      <p><strong>Customer:</strong> ${order.customer_name || "Guest"}</p>
      <p><strong>Status:</strong> <span class="order-status status-kitchen">${order.order_status}</span></p>
      ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ""}

      <div class="kitchen-items">
        <strong>Items:</strong>
        <ul>
          ${order.items.map(item => `
            <li>
              ${item.item_name} x${item.quantity || 1}
              ${item.customizations ? `<br><small>${item.customizations}</small>` : ""}
            </li>
          `).join("")}
        </ul>
      </div>

      <div class="order-actions">
        <button class="primary-btn small-btn kitchen-action" data-id="${order.id}" data-status="Ready">Mark Ready</button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".kitchen-action").forEach(btn => {
    btn.addEventListener("click", () => updateOrderStatus(btn.dataset.id, btn.dataset.status));
  });
}

async function updateOrderStatus(id, status) {
  const { data: updatedOrders, error } = await supabaseClient
    .from("orders")
    .update({ order_status: status })
    .eq("id", Number(id))
    .select();

  if (error) {
    console.error("Failed to update order status:", error);
    showToast(`Failed to update status: ${error.message}`, "error");
    return;
  }

  const updatedOrder = updatedOrders?.[0];

  if (status === "Completed" && updatedOrder?.email) {
    try {
      await fetch("/.netlify/functions/send-order-ready-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderNumber: updatedOrder.order_number || updatedOrder.id,
          name: updatedOrder.customer_name || "Customer",
          email: updatedOrder.email
        })
      });
    } catch (emailError) {
      console.error("Ready email failed:", emailError);
    }
  }

  if (status === "Completed" && updatedOrder?.phone) {
  try {
    await fetch("/.netlify/functions/send-order-ready-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        orderNumber: updatedOrder.order_number || updatedOrder.id,
        name: updatedOrder.customer_name || "Customer",
        phone: updatedOrder.phone
      })
    });
  } catch (textError) {
    console.error("Ready text failed:", textError);
  }
}

  await renderCashierOrders();
  await renderKitchenOrders();
}

function statusClass(status) {
  return {
    Accepted: "status-accepted",
    Kitchen: "status-kitchen",
    Denied: "status-denied",
    Ready: "status-ready",
    Completed: "status-completed",
    Pending: ""
  }[status] || "";
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("hidden");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("hidden");
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function showOrderSuccess(orderNumber) {
  document.body.innerHTML = `
    <div style="
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#f7f1e8;
      font-family:Inter, sans-serif;
      padding:24px;
      text-align:center;
    ">
      <div style="
        background:white;
        padding:36px;
        border-radius:22px;
        max-width:480px;
        box-shadow:0 18px 40px rgba(50,24,7,0.12);
      ">
        <h1 style="color:#5d2f05;margin-bottom:12px;">Order Placed!</h1>
        <p style="font-size:18px;color:#6f5c4f;">
          Thank you for ordering from Bagels'R'us.
        </p>
        <p style="font-size:20px;">
          <strong>Order #${orderNumber}</strong>
        </p>
        <a href="index.html" style="
          display:inline-block;
          margin-top:22px;
          background:#8b4c00;
          color:white;
          padding:14px 22px;
          border-radius:14px;
          text-decoration:none;
          font-weight:700;
        ">
          Back to Home
        </a>
      </div>
    </div>
  `;
}

function showToast(message, type = "info") {
  const oldToast = document.getElementById("siteToast");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.id = "siteToast";
  toast.textContent = message;

  toast.style.cssText = `
    position: fixed;
    bottom: 22px;
    right: 22px;
    z-index: 9999;
    background: ${type === "error" ? "#b53a2d" : "#8b4c00"};
    color: white;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    box-shadow: 0 10px 24px rgba(0,0,0,0.18);
    max-width: 280px;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

