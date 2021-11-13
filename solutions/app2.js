const setCookie = (token, data) => {
    const now = new Date();
    now.setTime(new Date().getTime() + 15 * 60000);
    const expires = now.toUTCString();
    document.cookie = `${token}=${data};expires=${expires}`;
}
setCookie("viewed", 5);
setCookie("uid", 354774631237);
setCookie("ssid", "Bx55OWbHJ0Vt_IGIF");

const cookieHandler = {
    getAll() {
        const keyValuePairs = document.cookie.split("; ");
        const keyValuePairs_2d = keyValuePairs.map(item => item.split('='));
        keyValuePairs_2d.forEach(item => item[1] = Number.isNaN(Number(item[1])) ? item[1] : Number(item[1]));
        return keyValuePairs_2d.reduce((a, v) => ({...a,[v[0]]: v[1]}), {});
    },
    toSessionStorage() {
        const cookies = cookieHandler.getAll();
        for (let [key, value] of Object.entries(cookies)) {
            if (cookies.hasOwnProperty(key)) {
                sessionStorage.setItem(key, value);
            }
        }
    },

    flush() {
        const cookies = cookieHandler.getAll();

        for (let key in cookies) {
            if (cookies.hasOwnProperty(key)) document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        }
    }

}

export {
    cookieHandler
};