const logout = () => {
    localStorage.removeItem('intraUser');
};

window.logout = logout;