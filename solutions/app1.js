const setCookie = (data) => {
    const now = new Date();
    now.setTime(new Date().getTime() + 15 * 60000);
    const expires = now.toUTCString();
    document.cookie = `token=${data};expires=${expires}`;
}

export default setCookie;