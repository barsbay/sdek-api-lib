import { CdekApi, TARIFF_CODES, SERVICE_CODES, formatPhoneNumber, validateOrder } from '../src';
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.CDEK_CLIENT_ID || '';
const clientSecret = process.env.CDEK_CLIENT_SECRET || '';
const baseUrl = process.env.CDEK_BASE_URL;
const timeout = process.env.CDEK_TIMEOUT ? Number(process.env.CDEK_TIMEOUT) : undefined;

async function advancedExample() {
  console.log('🚀 Продвинутый пример работы с API СДЭК\n');

  const cdek = new CdekApi({
    clientId,
    clientSecret,
    ...(baseUrl ? { baseUrl } : {}),
    ...(timeout ? { timeout } : {}),
  });

  try {
    // 1. Расчет по всем доступным тарифам
    console.log('📊 Пример 1: Расчет по всем доступным тарифам');
    console.log('От: Екатеринбург (код 270)');
    console.log('До: Казань (код 270)');
    console.log('Вес: 1 кг\n');

    const allTariffs = await cdek.calculateTariffList({
      from_location: { code: 270 }, // Екатеринбург
      to_location: { code: 270 },   // Казань
      packages: [{ 
        weight: 1000, 
        length: 30, 
        width: 20, 
        height: 10 
      }],
    });

    console.log(`✅ Доступно ${Array.isArray(allTariffs) ? allTariffs.length : 0} тарифов:`);
    if (Array.isArray(allTariffs)) {
      allTariffs.slice(0, 5).forEach((tariff, index) => {
        console.log(`   ${index + 1}. ${tariff.tariff_name} (код: ${tariff.tariff_code})`);
        console.log(`      Стоимость: ${tariff.total_sum} ${tariff.currency}`);
        console.log(`      Срок: ${tariff.period_min}-${tariff.period_max} дней`);
      });
    }

    // 2. Поиск городов по названию
    console.log('\n🏙️ Пример 2: Поиск городов по названию');
    const cities = await cdek.getCities({
      city: 'Новосибирск',
      size: 5,
    });

    console.log(`✅ Найдено ${Array.isArray(cities) ? cities.length : 0} городов с названием "Новосибирск":`);
    if (Array.isArray(cities)) {
      cities.forEach((city, index) => {
        console.log(`   ${index + 1}. ${city.city} (код: ${city.code})`);
        console.log(`      Регион: ${city.region || 'Не указан'}`);
        console.log(`      Страна: ${city.country_code || 'Не указана'}`);
      });
    }

    // 3. Список регионов России
    console.log('\n🗺️ Пример 3: Список регионов России');
    const regions = await cdek.getRegions('RU', 10, 0);
    
    console.log(`✅ Найдено ${Array.isArray(regions) ? regions.length : 0} регионов России:`);
    if (Array.isArray(regions)) {
      regions.forEach((region, index) => {
        console.log(`   ${index + 1}. ${region.region} (код: ${region.region_code})`);
      });
    }

    // 4. Поиск пунктов выдачи с фильтрами
    console.log('\n🏪 Пример 4: Поиск пунктов выдачи с фильтрами');
    
    // Найдем код города Санкт-Петербург
    const spbCities = await cdek.getCities({
      city: 'Санкт-Петербург',
      size: 1,
    });
    
    if (Array.isArray(spbCities) && spbCities.length > 0) {
      const spbCode = spbCities[0].code;
      console.log(`📍 Найден код города Санкт-Петербург: ${spbCode}`);
      
      const deliveryPoints = await cdek.getDeliveryPoints({
        city_code: spbCode,
        have_cashless: true, // С безналичной оплатой
        is_dressing_room: true, // С примерочной
        weight_max: 5000, // Максимальный вес 5 кг
      });

      console.log(`✅ Найдено ${Array.isArray(deliveryPoints) ? deliveryPoints.length : 0} подходящих пунктов выдачи:`);
      if (Array.isArray(deliveryPoints) && deliveryPoints.length > 0) {
        deliveryPoints.slice(0, 3).forEach((point, index) => {
          console.log(`   ${index + 1}. ${point.name || 'Без названия'}`);
          console.log(`      Адрес: ${point.location?.address || 'Не указан'}`);
          console.log(`      Тип: ${point.type || 'Не указан'}`);
          console.log(`      Режим работы: ${point.work_time || 'Не указан'}`);
        });
      } else {
        console.log('   Пункты выдачи не найдены с указанными параметрами');
      }
    } else {
      console.log('❌ Не удалось найти город Санкт-Петербург');
    }

    // 5. Создание заказа (пример без реального создания)
    console.log('\n📦 Пример 5: Подготовка данных для создания заказа');
    const orderData = {
      tariff_code: 136, // Посылка склад-склад
      recipient: {
        name: 'Иванов Иван Иванович',
        phones: [{ number: '+7 923 123-45-67' }],
        email: 'ivanov@example.com',
      },
      from_location: { 
        code: 270, 
        address: 'Новосибирск, ул. Ленина, 1' 
      },
      to_location: { 
        code: 44, 
        address: 'Москва, Красная площадь, 1' 
      },
      packages: [{
        number: '1',
        weight: 2000,
        length: 40,
        width: 30,
        height: 20,
        items: [
          { 
            name: 'Ноутбук', 
            ware_key: 'LAPTOP-001', 
            cost: 50000, 
            amount: 1, 
            weight: 2000 
          },
          { 
            name: 'Мышь', 
            ware_key: 'MOUSE-001', 
            cost: 1000, 
            amount: 2, 
            weight: 100 
          },
        ],
      }],
    };

    console.log('✅ Данные заказа подготовлены:');
    console.log(`   Получатель: ${orderData.recipient.name}`);
    console.log(`   От: ${orderData.from_location.address}`);
    console.log(`   До: ${orderData.to_location.address}`);
    console.log(`   Количество товаров: ${orderData.packages[0].items.length}`);
    console.log(`   Общий вес: ${orderData.packages[0].weight} г`);

    // 6. Заявка на вызов курьера (пример без реального создания)
    console.log('\n🚚 Пример 6: Подготовка заявки на вызов курьера');
    const courierData = {
      intake_date: '2024-01-15',
      intake_time_from: '10:00',
      intake_time_to: '18:00',
      lunch_time_from: '13:00',
      lunch_time_to: '14:00',
      weight: 2000,
      length: 40,
      width: 30,
      height: 20,
      comment: 'Хрупкие предметы, обращаться осторожно',
      sender: {
        name: 'Менеджер склада',
        phones: [{ number: '+7 383 123-45-67' }],
        email: 'warehouse@example.com',
      },
      from_location: {
        code: 270,
        address: 'Новосибирск, ул. Складская, 10',
      },
      need_call: true,
    };

    console.log('✅ Данные заявки на курьера подготовлены:');
    console.log(`   Дата: ${courierData.intake_date}`);
    console.log(`   Время: ${courierData.intake_time_from} - ${courierData.intake_time_to}`);
    console.log(`   Отправитель: ${courierData.sender.name}`);
    console.log(`   Адрес: ${courierData.from_location.address}`);

    console.log('\n🎉 Продвинутый пример выполнен успешно!');
    console.log('💡 Для реального создания заказов и заявок на курьера замените учетные данные');
    console.log('⚠️  В тестовой среде некоторые операции могут быть недоступны');

  } catch (error) {
    console.error('❌ Ошибка при выполнении примера:', error instanceof Error ? error.message : String(error));
  }
}

advancedExample().catch(console.error); 