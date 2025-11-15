async function loadPartials() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const sidebarPlaceholder = document.getElementById('sidebar-placeholder');

  // Header
  if (headerPlaceholder && !headerPlaceholder.hasChildNodes()) {
    try {
      const res = await fetch('partials/headernav.html');
      const html = await res.text();
      headerPlaceholder.innerHTML = html;
    } catch (err) {
      console.error('Error cargando header:', err);
    }
  }

  // Sidebar
  if (sidebarPlaceholder && !sidebarPlaceholder.hasChildNodes()) {
    try {
      const res = await fetch('partials/sidebar.html');
      const html = await res.text();
      sidebarPlaceholder.innerHTML = html;
    } catch (err) {
      console.error('Error cargando sidebar:', err);
    }
  }
  try {
    const res = await fetch('partials/accessibility.html');
    const html = await res.text();
    document.getElementById('accessibility-placeholder').innerHTML = html;

    
    initAccessibilityPopup();
    initKeyboardNavigation();
    } catch (err) {
      console.error('Error cargando accesibilidad:', err);
    }
 // Breadcrumbs
    const breadcrumbsPlaceholder = document.getElementById('breadcrumbs-placeholder');
    if (breadcrumbsPlaceholder) {
      try {
        const res = await fetch('partials/breadcrumbs.html');
        const html = await res.text();
        breadcrumbsPlaceholder.innerHTML = html;
        
        if (typeof customizeBreadcrumbs === 'function') {
          customizeBreadcrumbs();
        }
      } catch (err) {
        console.error("Error cargando breadcrumbs:", err);
      }
    }
  


  setTimeout(() => {
    initSidebarScripts();
    initUserInterface();
    initMobileSearchToggle();
    setupLoginModal();
    initAccessibilityPopup();
    initKeyboardNavigation();
  }, 50);

 

}



/*FUNCION DE CARO */
function initSidebarScripts() {
    // MODO OSCURO PERSISTENTE
    const themeSwitch = document.getElementById('theme-switch');
    const themeIcon = document.querySelector('.theme-icon');
    const themeLabel = document.getElementById('theme-label');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
        themeIcon.src = 'Images/Icons/moon.svg';
        themeIcon.alt = 'Luna';
        themeLabel.textContent = 'Modo oscuro';
    } else {
        document.body.classList.remove('dark-mode');
        themeSwitch.checked = false;
        themeIcon.src = 'Images/Icons/sun.svg';
        themeIcon.alt = 'Sol';
        themeLabel.textContent = 'Modo claro';
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.body.classList.add('dark-mode');
            themeIcon.src = 'Images/Icons/moon.svg';
            themeIcon.alt = 'Luna';
            themeLabel.textContent = 'Modo oscuro';
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.src = 'Images/Icons/sun.svg';
            themeIcon.alt = 'Sol';
            themeLabel.textContent = 'Modo claro';
            localStorage.setItem('theme', 'light');
        }
    });

    // Sidebar colapsable
    /*const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');

    if (menuButton && sidebar) {
        const overlay = document.createElement('div');
        overlay.classList.add('sidebar-overlay');
        document.body.appendChild(overlay);

        menuButton.addEventListener('click', () => {
            const isCollapsed = sidebar.classList.toggle('collapsed');
            overlay.classList.toggle('active', !isCollapsed);
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.add('collapsed');
            overlay.classList.remove('active');
        });
    }*/
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.menu-button');

    if (!sidebar || !menuButton) {
        setTimeout(initSidebarScripts, 200);
        return;
    }

    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('sidebar-overlay');
        document.body.appendChild(overlay);
    }

    menuButton.replaceWith(menuButton.cloneNode(true));
    const menuBtnNew = document.querySelector('.menu-button');

    menuBtnNew.addEventListener('click', () => {
        const isCollapsed = sidebar.classList.toggle('collapsed');
        overlay.classList.toggle('active', !isCollapsed);
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.add('collapsed');
        overlay.classList.remove('active');
    });

    // para cel, cerrar sidebar
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.add('collapsed');
          overlay.classList.remove('active');
        }
    });
}

function initMobileSearchToggle() {
    const searchWrapper = document.querySelector('.search-wrapper');
    const searchToggleBtn = document.querySelector('[data-toggle-search]');
    const searchInput = document.querySelector('.search-input');

    if (!searchWrapper || !searchToggleBtn) return;

    searchToggleBtn.addEventListener('click', () => {
      const isOpen = searchWrapper.classList.toggle('open');

      if (isOpen) {
        searchInput && searchInput.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (
        searchWrapper.classList.contains('open') &&
        !searchWrapper.contains(e.target) &&
        !e.target.closest('[data-toggle-search]')
      ) {
        searchWrapper.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchWrapper.classList.remove('open');
      }
    });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initMobileSearchToggle();
  }, 100);
});


function initUserInterface() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole'); 

  const headerActionsAll = document.querySelectorAll('.header-actions');
  const userHeaderUL = headerActionsAll.length > 1 ? headerActionsAll[1] : headerActionsAll[0];

  if (!userHeaderUL) {
    setTimeout(initUserInterface, 150);
    return;
  }

  userHeaderUL.innerHTML = '';

  const sidebarAdminLink = document.querySelector('.sidebar a[href="categories.html"]');

  if (!isLoggedIn) {
    userHeaderUL.innerHTML = `
      <li class="header-action">
        
        <button class="header-login-btn" type="button"><a href="log-in.html">
          <img src="Images/Icons/user.svg" alt="Iniciar sesión"></a>
          <div class="header-action-tooltip">Iniciar sesión</div>
        </button>
        
      </li>
    `;
    if (sidebarAdminLink) sidebarAdminLink.parentElement.style.display = 'none';
  } else {
    userHeaderUL.innerHTML = `
      <li class="header-action">
        <button>
          <a href="create-post.html">
            <img src="Images/Icons/create-post.svg" alt="Crear publicación">
          </a>
          <div class="header-action-tooltip">Crear publicación</div>
        </button>
      </li>
      <li class="header-action">
        <input type="checkbox" class="profile-menu-visibility" id="profile-menu-visibility-checkbox"/>
        <button class="profile-menu-button" type="button">
          <label for="profile-menu-visibility-checkbox" class="header-action-profile-label">
            <img src="Images/Icons/user.svg" alt="Perfil">
          </label>
          <div class="header-action-tooltip">Perfil</div>
        </button>

        <ul class="profile-menu">
          <li class="profile-menu-item">
            <a href="profile.html" class="profile-menu-link">
              <div class="profile-menu-item-left">
                <div class="profile-menu-item-title">Mi perfil</div>
              </div>
              <div class="profile-menu-item-right">
                <img class="profile-menu-item-icon" src="Images/Icons/next.svg" alt="siguiente">
              </div>
            </a>
          </li>
          ${userRole === 'admin' ? `
          <li class="profile-menu-item">
            <a href="admin.html" class="profile-menu-link">
              <div class="profile-menu-item-left">
                <div class="profile-menu-item-title">Panel de administración</div>
              </div>
              <div class="profile-menu-item-right">
                <img class="profile-menu-item-icon" src="Images/Icons/next.svg" alt="siguiente">
              </div>
            </a>
          </li>
           <li class="profile-menu-item">
                    <a href="categories.html" class="profile-menu-link">
                        <div class="profile-menu-item-left">
                            <div class="profile-menu-item-title">
                                Administrar categorías
                            </div>
                        </div>
                        <div class="profile-menu-item-right">
                            <img class="profile-menu-item-icon" src="Images/Icons/next.svg" alt="siguiente">
                        </div>
                    </a>
                </li>` : ''}
          <li class="profile-menu-item profile-menu-item-logout">
            <button type="button" class="profile-menu-logout-button">Cerrar sesión</button>
          </li>
        </ul>
      </li>
    `;

    if (sidebarAdminLink) {
      sidebarAdminLink.parentElement.style.display = (userRole === 'admin') ? 'block' : 'none';
    }

    const logoutBtn = userHeaderUL.querySelector('.profile-menu-logout-button');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        location.reload(); 
        window.location.href = "index.html";
      });
    }
  }
}

function initAccessibilityPopup() {
  const popupBtn = document.getElementById('accessibility-btn');
  const popup = document.getElementById('accessibility-popup');
  const decreaseBtn = document.getElementById('decrease-font');
  const increaseBtn = document.getElementById('increase-font');
  const resetBtn = document.getElementById('reset-font');

  if (!popupBtn || !popup) return;

  // Abrir / cerrar popup
  popupBtn.addEventListener('click', () => {
    popup.classList.toggle('open');
    popup.setAttribute(
      'aria-hidden',
      popup.classList.contains('open') ? 'false' : 'true'
    );
  });

  document.addEventListener('click', (e) => {
    if (!popup.contains(e.target) && !popupBtn.contains(e.target)) {
      popup.classList.remove('open');
      popup.setAttribute('aria-hidden', 'true');
    }
  });

  // tamaño etra
  let currentScale = parseFloat(localStorage.getItem('fontScale')) || 100;
  document.documentElement.style.fontSize = `${currentScale}%`;

  const applyScale = (value) => {
    currentScale = Math.max(80, Math.min(150, value));
    document.documentElement.style.fontSize = `${currentScale}%`;
    localStorage.setItem('fontScale', currentScale);
  };

  decreaseBtn?.addEventListener('click', () => applyScale(currentScale - 10));
  increaseBtn?.addEventListener('click', () => applyScale(currentScale + 10));
  resetBtn?.addEventListener('click', () => applyScale(100));

  // daltonismo

  const colorButtons = document.querySelectorAll('[data-color-mode]');
  const body = document.body;

  colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.colorMode;

      body.classList.remove(
        ...Array.from(body.classList).filter(cls => cls.startsWith("color-blind-"))
      );

      if (mode === "normal") {
        localStorage.removeItem("colorBlindMode");
        return;
      }

      body.classList.add(`color-blind-${mode}`);
      localStorage.setItem("colorBlindMode", mode);
    });
  });

  const savedMode = localStorage.getItem("colorBlindMode");
  if (savedMode) {
    body.classList.add(`color-blind-${savedMode}`);
  }

  // lector de voz
  const ttsStart    = document.getElementById("tts-start");
  const ttsStop     = document.getElementById("tts-stop");
  const ttsReadAll  = document.getElementById("tts-read-all");
  const ttsStopAll  = document.getElementById("tts-stop-all");

  let ttsQueue = [];
  let currentUtterance = null;
  let currentIndex = -1;
  let ttsSpeaking = false;

  function clearHighlights() {
    document.querySelectorAll(".tts-highlight").forEach(el => {
      el.classList.remove("tts-highlight");
    });
  }

  function stopAllReading() {
    window.speechSynthesis.cancel();
    ttsSpeaking = false;
    currentUtterance = null;
    currentIndex = -1;
    ttsQueue = [];
    clearHighlights();
  }

  function getTextFromElement(el) {
    if (!el) return "";

    if (el.placeholder) return el.placeholder.trim();

    if (el.classList.contains("tooltip")) return el.innerText.trim();

    const text = el.innerText || el.textContent;
    return text ? text.trim() : "";
  }

  // LECTURA POR SELECCIon
  if (ttsStart && ttsStop) {
    ttsStart.addEventListener("click", () => {
      const selectedText = window.getSelection().toString().trim();

      if (!selectedText) {
        alert("Selecciona algún texto en la página primero.");
        return;
      }

      stopAllReading();

      currentUtterance = new SpeechSynthesisUtterance(selectedText);
      currentUtterance.lang = "es-ES";
      currentUtterance.rate = 1;
      currentUtterance.pitch = 1;

      ttsSpeaking = true;
      window.speechSynthesis.speak(currentUtterance);

      currentUtterance.onend = () => {
        ttsSpeaking = false;
      };
    });

    ttsStop.addEventListener("click", () => {
      stopAllReading();
    });
  }

  //  LECTURA COMPLETA
  function readNextParagraph() {
    if (currentIndex >= ttsQueue.length) {
      stopAllReading();
      return;
    }

    const element = ttsQueue[currentIndex];
    const text = getTextFromElement(element);

    if (!text) {
      currentIndex++;
      readNextParagraph();
      return;
    }

    clearHighlights();
    element.classList.add("tts-highlight");

    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = "es-ES";
    currentUtterance.rate = 1;
    currentUtterance.pitch = 1;

    currentUtterance.onend = () => {
      currentIndex++;
      readNextParagraph();
    };

    window.speechSynthesis.speak(currentUtterance);
  }

  if (ttsReadAll) {
    ttsReadAll.addEventListener("click", () => {
      stopAllReading();

      const content = document.querySelector(".content");
      if (!content) {
        alert("No se encontró la sección principal de contenido (.content)");
        return;
      }

      const paragraphs = content.querySelectorAll(`
        h1, h2, h3, h4,
        p,
        li,
        label,
        button,
        option,
        .tooltip,
        .post,
        input[placeholder],
        textarea[placeholder]
      `);

      ttsQueue = Array.from(paragraphs);

      if (ttsQueue.length === 0) {
        alert("No hay texto disponible para leer.");
        return;
      }

      currentIndex = 0;
      readNextParagraph();
    });
  }

  if (ttsStopAll) {
    ttsStopAll.addEventListener("click", () => {
      stopAllReading();
    });
  }

}


/*mav teclado */

let keyboardNavEnabled = true; 
let keyboardScrollHandler = null;

function enableKeyboardNavigation() {
  keyboardNavEnabled = true;
}

function disableKeyboardNavigation() {
  keyboardNavEnabled = false;
}

function initKeyboardNavigation() {

  if (keyboardScrollHandler) {
    return;
  }

  keyboardScrollHandler = (e) => {

    if (!keyboardNavEnabled) return;

    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    const scrollAmount = 60;

    switch (e.key.toLowerCase()) {
      case "arrowdown":
      case "s":
        window.scrollBy({ top: scrollAmount, behavior: "smooth" });
        break;

      case "arrowup":
      case "w":
        window.scrollBy({ top: -scrollAmount, behavior: "smooth" });
        break;

      case "arrowleft":
      case "a":
        window.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        break;

      case "arrowright":
      case "d":
        window.scrollBy({ left: scrollAmount, behavior: "smooth" });
        break;

      case " ":
        e.preventDefault();
        window.scrollBy({ top: scrollAmount * 3, behavior: "smooth" });
        break;
    }
  };

  document.addEventListener("keydown", keyboardScrollHandler);
}

document.addEventListener("focusin", (e) => {
  if (!keyboardNavEnabled) return;
  e.target.scrollIntoView({ behavior: "smooth", block: "center" });
});


function extractReadableText(element) {
  let text = "";

  if (element.nodeType === Node.TEXT_NODE) {
    return element.textContent.trim();
  }

  if (element.placeholder) {
    text += " " + element.placeholder;
  }

  if (element.tagName === "IMG" && element.alt) {
    text += " " + element.alt;
  }

  if (element.tagName === "OPTION") {
    text += " " + element.textContent.trim();
  }

  if (element.classList.contains("tooltip")) {
    text += " " + element.textContent.trim();
  }

  element.childNodes.forEach(child => {
    text += " " + extractReadableText(child);
  });

  return text;
}

function readContent() {
  const content = document.querySelector(".content");

  if (!content) {
    alert("No se encontró .content");
    return;
  }

  const text = extractReadableText(content);

  if (!text.trim()) {
    alert("No se encontró texto para leer");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-MX";
  speechSynthesis.speak(utterance);
}


document.addEventListener('DOMContentLoaded', loadPartials);