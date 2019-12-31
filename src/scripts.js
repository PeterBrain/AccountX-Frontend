// execute code when DOM has fully loaded
$(document).ready(function () {
    // all statements are only working for app component
    // other statements need to go into the components .ts files
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown({ hover: true, constrainWidth: false });
    $('.tabs').tabs();
});