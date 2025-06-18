import { CdekApi, TARIFF_CODES } from '../src';

// Загружаем переменные окружения из .env файла
import * as dotenv from 'dotenv';
dotenv.config();

// Конфигурация с реальными учетными данными из переменных окружения
const config = {
  clientId: process.env.CDEK_CLIENT_ID || '**********',
  clientSecret: process.env.CDEK_CLIENT_SECRET || '*********************',
  baseUrl: process.env.CDEK_BASE_URL || 'https://api.cdek.ru', // Используем рабочую среду по умолчанию
  timeout: process.env.CDEK_TIMEOUT ? parseInt(process.env.CDEK_TIMEOUT) : 30000,
};

async function testAuthWithDetails() {
  console.log('🔐 Детальное тестирование авторизации...');
  console.log(`📋 Параметры запроса:`);
  console.log(`   URL: ${config.baseUrl}/v2/oauth/token`);
  console.log(`   Client ID: ${config.clientId.substring(0, 4)}****${config.clientId.substring(config.clientId.length - 4)}`);
  console.log(`   Client Secret: ${config.clientSecret.substring(0, 4)}****${config.clientSecret.substring(config.clientSecret.length - 4)}`);
  console.log(`   Timeout: ${config.timeout}ms`);
  
  const cdek = new CdekApi(config);
  
  try {
    // Попробуем простой запрос для проверки авторизации
    console.log('🔄 Отправляем запрос авторизации...');
    const regions = await cdek.getRegions('RU', 1, 0);
    console.log('✅ Авторизация успешна!');
    console.log(`📊 Получено регионов: ${Array.isArray(regions) ? regions.length : 'неизвестно'}`);
    return true;
  } catch (error) {
    console.error('❌ Ошибка авторизации:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        console.log('💡 Ошибка 401 Unauthorized - возможные причины:');
        console.log('   1. Неверные учетные данные (Client ID или Client Secret)');
        console.log('   2. Учетные данные устарели или заблокированы');
        console.log('   3. Учетная запись не имеет доступа к API');
        console.log('   4. Превышен лимит запросов');
        console.log('   5. Неправильный формат запроса авторизации');
        console.log('');
        console.log('🔧 Рекомендации:');
        console.log('   - Проверьте учетные данные в личном кабинете СДЭК');
        console.log('   - Убедитесь, что API включен для вашего аккаунта');
        console.log('   - Попробуйте создать новые учетные данные');
        console.log('   - Обратитесь в поддержку СДЭК');
      } else if (error.message.includes('403')) {
        console.log('💡 Ошибка 403 Forbidden - доступ запрещен');
      } else if (error.message.includes('429')) {
        console.log('💡 Ошибка 429 Too Many Requests - превышен лимит запросов');
      } else if (error.message.includes('500')) {
        console.log('💡 Ошибка 500 - проблема на стороне сервера СДЭК');
      } else {
        console.log('💡 Неизвестная ошибка - проверьте подключение к интернету');
      }
    }
    return false;
  }
}

async function testDifferentEnvironments() {
  console.log('\n🌍 Тестирование различных сред API...');
  
  const environments = [
    { name: 'Рабочая среда', url: 'https://api.cdek.ru' },
    { name: 'Тестовая среда', url: 'https://api.edu.cdek.ru' },
  ];
  
  for (const env of environments) {
    console.log(`\n🔍 Тестируем ${env.name} (${env.url})...`);
    
    const testConfig = {
      ...config,
      baseUrl: env.url,
    };
    
    const cdek = new CdekApi(testConfig);
    
    try {
      const regions = await cdek.getRegions('RU', 1, 0);
      console.log(`✅ ${env.name} работает! Получено регионов: ${Array.isArray(regions) ? regions.length : 'неизвестно'}`);
    } catch (error) {
      console.error(`❌ ${env.name} недоступна:`, error instanceof Error ? error.message : error);
    }
  }
}

async function liveExample() {
  console.log('🚀 Запуск живого примера работы с API СДЭК\n');
  console.log('📋 Конфигурация:');
  console.log(`   Client ID: ${config.clientId.substring(0, 4)}****${config.clientId.substring(config.clientId.length - 4)}`);
  console.log(`   Base URL: ${config.baseUrl}`);
  console.log(`   Timeout: ${config.timeout}ms`);
  console.log(`   Используются переменные окружения: ${process.env.CDEK_CLIENT_ID ? 'Да' : 'Нет'}`);
  console.log(`   Файл .env загружен: ${process.env.CDEK_CLIENT_ID ? 'Да' : 'Нет'}`);
  console.log('');

  // Тестируем различные среды
  await testDifferentEnvironments();
  
  // Детальное тестирование авторизации
  const authSuccess = await testAuthWithDetails();
  
  if (!authSuccess) {
    console.log('\n❌ Не удалось авторизоваться в API СДЭК');
    console.log('');
    console.log('📝 Для использования с переменными окружения:');
    console.log('   1. Скопируйте env.example в .env:');
    console.log('      cp env.example .env');
    console.log('   2. Отредактируйте .env файл с вашими данными:');
    console.log('      CDEK_CLIENT_ID=ваш_client_id');
    console.log('      CDEK_CLIENT_SECRET=ваш_client_secret');
    console.log('      CDEK_BASE_URL=https://api.cdek.ru');
    console.log('   3. Запустите пример снова:');
    console.log('      npm run example');
    return;
  }

  try {
    // Инициализация клиента
    const cdek = new CdekApi(config);
    console.log('✅ Клиент СДЭК инициализирован');

    // Пример 1: Расчет стоимости доставки
    console.log('\n📦 Пример 1: Расчет стоимости доставки');
    console.log('От: Москва (код 44)');
    console.log('До: Санкт-Петербург (код 137)');
    console.log('Вес: 2 кг, размеры: 30x20x15 см');

    const tariffRequest = {
      tariff_code: TARIFF_CODES.PACKAGE_WAREHOUSE_TO_WAREHOUSE,
      from_location: { code: 44 }, // Москва
      to_location: { code: 137 },  // Санкт-Петербург
      packages: [{
        weight: 2000, // 2 кг
        length: 30,
        width: 20,
        height: 15,
      }],
    };

    const tariffResult = await cdek.calculateTariff(tariffRequest);
    console.log('✅ Расчет выполнен успешно:');
    console.log(`   Тариф: ${TARIFF_CODES.PACKAGE_WAREHOUSE_TO_WAREHOUSE} (Посылка склад-склад)`);
    console.log(`   Стоимость доставки: ${tariffResult.delivery_sum} ${tariffResult.currency}`);
    console.log(`   Срок доставки: ${tariffResult.period_min}-${tariffResult.period_max} дней`);
    console.log(`   Общая стоимость: ${tariffResult.total_sum} ${tariffResult.currency}`);
    console.log(`   Расчетный вес: ${tariffResult.weight_calc} г`);

    // Пример 2: Получение списка ПВЗ в Москве
    console.log('\n🏪 Пример 2: Поиск пунктов выдачи в Москве');
    
    // Сначала найдем код города Москва
    const moscowCities = await cdek.getCities({
      city: 'Москва',
      size: 1,
    });
    
    if (Array.isArray(moscowCities) && moscowCities.length > 0) {
      const moscowCode = moscowCities[0].code;
      console.log(`📍 Найден код города Москва: ${moscowCode}`);
      
      const deliveryPoints = await cdek.getDeliveryPoints({
        city_code: moscowCode, // Используем найденный код города
        have_cash: true, // С возможностью оплаты наличными
        take_only: true, // Только для получения
      });

      console.log(`✅ Найдено ${Array.isArray(deliveryPoints) ? deliveryPoints.length : 0} пунктов выдачи:`);
      if (Array.isArray(deliveryPoints) && deliveryPoints.length > 0) {
        deliveryPoints.slice(0, 3).forEach((point, index) => {
          console.log(`   ${index + 1}. ${point.name || 'Без названия'}`);
          console.log(`      Адрес: ${point.location?.address || 'Не указан'}`);
          console.log(`      Телефон: ${point.phones?.[0]?.number || 'Не указан'}`);
          console.log(`      Режим работы: ${point.work_time || 'Не указан'}`);
        });
      } else {
        console.log('   Пункты выдачи не найдены в Москве с указанными параметрами');
        console.log('   💡 Попробуем поиск без ограничений...');
        
        // Попробуем поиск без ограничений
        const allDeliveryPoints = await cdek.getDeliveryPoints({
          city_code: moscowCode,
        });
        
        console.log(`✅ Найдено ${Array.isArray(allDeliveryPoints) ? allDeliveryPoints.length : 0} пунктов выдачи без ограничений:`);
        if (Array.isArray(allDeliveryPoints) && allDeliveryPoints.length > 0) {
          allDeliveryPoints.slice(0, 3).forEach((point, index) => {
            console.log(`   ${index + 1}. ${point.name || 'Без названия'}`);
            console.log(`      Адрес: ${point.location?.address || 'Не указан'}`);
            console.log(`      Тип: ${point.type || 'Не указан'}`);
          });
        }
      }
    } else {
      console.log('❌ Не удалось найти город Москва');
    }

    // Пример 3: Получение списка городов
    console.log('\n🏙️ Пример 3: Поиск городов по названию');
    
    const cities = await cdek.getCities({
      city: 'Новосибирск',
      size: 5,
    });

    console.log(`✅ Найдено ${Array.isArray(cities) ? cities.length : 0} городов с названием "Новосибирск":`);
    if (Array.isArray(cities) && cities.length > 0) {
      cities.forEach((city, index) => {
        console.log(`   ${index + 1}. ${city.city || 'Без названия'} (код: ${city.code || 'Не указан'})`);
        console.log(`      Регион: ${city.region || 'Не указан'}`);
        console.log(`      Страна: ${city.country_code || 'Не указана'}`);
      });
    }

    // Пример 4: Получение списка регионов России
    console.log('\n🗺️ Пример 4: Список регионов России');
    
    const regions = await cdek.getRegions('RU', 10, 0);
    
    console.log(`✅ Найдено ${Array.isArray(regions) ? regions.length : 0} регионов России:`);
    if (Array.isArray(regions) && regions.length > 0) {
      regions.forEach((region, index) => {
        console.log(`   ${index + 1}. ${region.region || 'Без названия'} (код: ${region.region_code || 'Не указан'})`);
      });
    }

    // Пример 5: Расчет по всем доступным тарифам
    console.log('\n📊 Пример 5: Расчет по всем доступным тарифам');
    console.log('От: Екатеринбург (код 270)');
    console.log('До: Казань (код 270)');
    console.log('Вес: 1 кг');

    const allTariffsRequest = {
      from_location: { code: 270 }, // Екатеринбург
      to_location: { code: 270 },   // Казань
      packages: [{
        weight: 1000, // 1 кг
        length: 20,
        width: 15,
        height: 10,
      }],
    };

    const allTariffs = await cdek.calculateTariffList(allTariffsRequest);
    console.log(`✅ Доступно ${Array.isArray(allTariffs) ? allTariffs.length : 0} тарифов:`);
    if (Array.isArray(allTariffs) && allTariffs.length > 0) {
      allTariffs.slice(0, 5).forEach((tariff, index) => {
        console.log(`   ${index + 1}. ${tariff.tariff_name || 'Без названия'} (код: ${tariff.tariff_code})`);
        console.log(`      Стоимость: ${tariff.delivery_sum} ${tariff.currency || 'RUB'}`);
        console.log(`      Срок: ${tariff.period_min}-${tariff.period_max} дней`);
      });
    } else {
      console.log('   Тарифы не найдены для указанного маршрута');
      console.log('   💡 Возможно, нет доступных тарифов между этими городами');
    }

    console.log('\n🎉 Все примеры выполнены успешно!');
    console.log('💡 Для переключения на тестовую среду используйте: cdek.setTestMode()');
    console.log('📚 Документация API: https://api.cdek.ru/v2/');

  } catch (error) {
    console.error('❌ Ошибка при выполнении примера:', error);
    
    if (error instanceof Error) {
      console.error('Детали ошибки:', error.message);
    }
  }
}

// Запуск примера
if (require.main === module) {
  liveExample();
}

export { liveExample }; 