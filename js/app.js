document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('profile.html')) {
        initProfilePage();
  } else if (path.includes('admin-panel.html')) {
        initAdminPanel();
  } else if (path.includes('forum.html')) {
        initForumPage();
  }
  // bla.
});

// Perfil
function initProfilePage() {
    console.log('Perfil cargado');
  // logica de editar datos, mostrar posts personales.
}

// Admin
function initAdminPanel() {
    console.log('Admin panel cargado');
  // botones de aprobar/rechazar publicaciones 
}

// Foro
function initForumPage() {
    console.log('Foro cargado');
  // scroll, interacciones
}
