export function showToast(text) {
    document.getElementById('liveToast').style.display = 'block';
    document.getElementById('toastText').textContent = text;
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show();
}

export const hideToast = () => {
    document.getElementById('liveToast').style.display = 'none';
}