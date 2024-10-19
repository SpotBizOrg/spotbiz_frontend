export const BACKEND_URL = "http://localhost:8080/api/v1";
export const getNotificationCount = (): number => {
    const count = localStorage.getItem('NOTIFICATION_COUNT');
    return count ? parseInt(count, 10) : 0; 
};

export const setNotificationCount = (): void => {
    let count = localStorage.getItem('NOTIFICATION_COUNT');
    let count2 = count ? parseInt(count, 10) + 1 : 1; 
    localStorage.setItem('NOTIFICATION_COUNT', count2.toString()); 
};

export const resetNotificationCount = (): void => {
    localStorage.setItem('NOTIFICATION_COUNT', '0'); 
};
