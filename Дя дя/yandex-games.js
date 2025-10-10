// Интеграция с Яндекс.Играми
class YandexGamesIntegration {
    constructor() {
        this.ysdk = null;
        this.player = null;
        this.isInitialized = false;
    }

    async init() {
        try {
            // Проверяем, запущена ли игра в Яндекс.Играх
            if (typeof window.ysdk !== 'undefined') {
                this.ysdk = window.ysdk;
                await this.ysdk.ready;
                
                // Получаем информацию об игроке
                this.player = this.ysdk.getPlayer();
                
                // Инициализируем рекламу
                this.initAds();
                
                this.isInitialized = true;
                console.log('Яндекс.Игры SDK инициализирован');
                
                // Показываем уведомление о том, что игра запущена в Яндекс.Играх
                this.showYandexGamesNotification();
            }
        } catch (error) {
            console.log('Яндекс.Игры SDK недоступен:', error);
        }
    }

    initAds() {
        if (!this.ysdk) return;

        try {
            // Инициализируем рекламу
            this.ysdk.adv.showFullscreenAdv({
                callbacks: {
                    onOpen: () => {
                        console.log('Реклама открыта');
                    },
                    onClose: (wasShown) => {
                        console.log('Реклама закрыта, показана:', wasShown);
                    },
                    onError: (error) => {
                        console.log('Ошибка рекламы:', error);
                    }
                }
            });
        } catch (error) {
            console.log('Ошибка инициализации рекламы:', error);
        }
    }

    showYandexGamesNotification() {
        // Показываем специальное уведомление для игроков Яндекс.Игр
        setTimeout(() => {
            if (window.game && window.game.showNotification) {
                window.game.showNotification('🎮 Добро пожаловать в Яндекс.Игры!');
            }
        }, 2000);
    }

    // Метод для показа рекламы между играми
    showInterstitialAd() {
        if (!this.ysdk || !this.isInitialized) return;

        try {
            this.ysdk.adv.showFullscreenAdv({
                callbacks: {
                    onOpen: () => {
                        console.log('Межстраничная реклама открыта');
                    },
                    onClose: (wasShown) => {
                        console.log('Межстраничная реклама закрыта, показана:', wasShown);
                    },
                    onError: (error) => {
                        console.log('Ошибка межстраничной рекламы:', error);
                    }
                }
            });
        } catch (error) {
            console.log('Ошибка показа рекламы:', error);
        }
    }

    // Метод для показа рекламы за награду
    showRewardedAd(callback) {
        if (!this.ysdk || !this.isInitialized) {
            // Если SDK недоступен, просто выполняем callback
            if (callback) callback(true);
            return;
        }

        try {
            this.ysdk.adv.showRewardedVideo({
                callbacks: {
                    onOpen: () => {
                        console.log('Реклама за награду открыта');
                    },
                    onRewarded: () => {
                        console.log('Награда получена');
                        if (callback) callback(true);
                    },
                    onClose: () => {
                        console.log('Реклама за награду закрыта');
                        if (callback) callback(false);
                    },
                    onError: (error) => {
                        console.log('Ошибка рекламы за награду:', error);
                        if (callback) callback(false);
                    }
                }
            });
        } catch (error) {
            console.log('Ошибка показа рекламы за награду:', error);
            if (callback) callback(false);
        }
    }

    // Метод для сохранения прогресса в облаке Яндекс.Игр
    async saveProgress(data) {
        if (!this.player || !this.isInitialized) return;

        try {
            await this.player.setData(data);
            console.log('Прогресс сохранен в облаке Яндекс.Игр');
        } catch (error) {
            console.log('Ошибка сохранения в облаке:', error);
        }
    }

    // Метод для загрузки прогресса из облака Яндекс.Игр
    async loadProgress() {
        if (!this.player || !this.isInitialized) return null;

        try {
            const data = await this.player.getData();
            console.log('Прогресс загружен из облака Яндекс.Игр');
            return data;
        } catch (error) {
            console.log('Ошибка загрузки из облака:', error);
            return null;
        }
    }
}

// Создаем глобальный экземпляр интеграции
window.yandexGamesIntegration = new YandexGamesIntegration();
