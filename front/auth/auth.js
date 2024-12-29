const logout = () => {
    localStorage.removeItem('intraUser');
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');
    login.style.removeProperty('display');
    logout.style.display = 'none';
    logoutAlert();
}

const login = () => {
    localStorage.setItem('intraUser', 'true');
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');
    login.style.display = 'none';
    logout.style.removeProperty('display');
}

login();
// logout();

async function polling(url, options = {}, interval = 1000, retries = 10, shouldStop = () => false) {
    let attempts = 0;

    return new Promise((resolve, reject) => {
        const poll = async () => {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Проверяем, нужно ли остановить поллинг
                if (shouldStop(data)) {
                    return resolve(data);
                }

                attempts++;
                if (attempts >= retries) {
                    return reject();
                }

                // Задержка перед следующим запросом
                setTimeout(poll, interval);
            } catch (error) {
                return reject(error);
            }
        };

        poll();
    });
}


function logoutAlert() {
    const language = localStorage.getItem('language') || 'en';
    const transObj = translations[language];
    alert(transObj.user_is_unuauthorized);
}

const loginTry = () => {
    // Пример использования
    polling(
        'https://localhost:8081/is_logged_in/',
        { method: 'GET' },
        1000,
        200,
        (data) => data.is_logged_in === 'true'
    )
        .then((result) => {
            const language = localStorage.getItem('language') || 'en';
            const transObj = translations[language];
            alert(transObj.user_is_authorized);
        })
}

window.loginTry = loginTry;
window.logout = logout;
window.polling = polling;
