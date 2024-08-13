import React, { useEffect, useState } from 'react';

const CollectUserData = () => {
    const [ipData, setIpData] = useState(null);
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        // Получение IP-адреса через внешний API
        fetch('https://api.ipify.org?format=json')
            .then((response) => response.json())
            .then((data) => {
                setIpData(data.ip);
                console.log('IP Address:', data.ip);

                // Запись IP-адреса в localStorage
                localStorage.setItem('ipData', data.ip);
            })
            .catch((error) => console.error('Error getting IP address:', error));

        // Проверка поддержки Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;
                    const geoData = {
                        latitude,
                        longitude,
                        accuracy,
                    };
                    setGeoData(geoData);
                    console.log('Geo Data:', geoData);

                    // Запись геоданных в localStorage
                    localStorage.setItem('geoData', JSON.stringify(geoData));
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation API not supported by this browser.');
        }

        // Собираем информацию о браузере и операционной системе
        const browserData = {
            userAgent: navigator.userAgent,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            platform: navigator.platform,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            windowSize: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            cookiesEnabled: navigator.cookieEnabled,
            localStorage: window.localStorage.length,
            sessionStorage: window.sessionStorage.length,
        };

        // Логируем собранные данные в консоль
        console.log('Browser Data:', browserData);

        // Запись данных в localStorage
        localStorage.setItem('browserData', JSON.stringify(browserData));
    }, []);

    return (
        <div>
            <h1>Сбор данных пользователя</h1>
            <p>Данные пользователя были записаны и выведены в консоль.</p>
            {ipData && <p>Ваш IP-адрес: {ipData}</p>}
            {geoData && (
                <p>
                    Ваши геоданные: Широта: {geoData.latitude}, Долгота: {geoData.longitude}
                </p>
            )}
        </div>
    );
};

export default CollectUserData;
