# CDEK API TypeScript SDK

A comprehensive TypeScript library for working with CDEK API v2.0. This SDK provides full coverage of CDEK's delivery services API including order management, delivery calculations, pickup points, and more.

[![npm version](https://badge.fury.io/js/sdek-api-lib.svg)](https://badge.fury.io/js/sdek-api-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 📖 Description

This library provides a complete TypeScript wrapper for the CDEK API v2.0, making it easy to integrate CDEK delivery services into your applications. It includes comprehensive type definitions, automatic token management, error handling, and extensive examples.

### Key Features:
- **Full API Coverage** - All CDEK API v2.0 endpoints
- **TypeScript Support** - Complete type definitions for all requests and responses
- **Auto Token Management** - Automatic OAuth token refresh
- **Error Handling** - Comprehensive error handling with detailed messages
- **Test Coverage** - Full test suite with mocks
- **Documentation** - JSDoc comments for all methods
- **Examples** - Live examples with real API calls
- **Environment Support** - Easy switching between production and test environments

### What You Can Do:
- Calculate delivery costs and delivery times
- Create and manage delivery orders
- Search for pickup points and delivery locations
- Get city and region information
- Create courier pickup requests
- Subscribe to webhooks for order status updates
- Generate print forms and barcodes

## 🚀 Quick Start

### Installation

```bash
npm install sdek-api-lib
```

### Basic Usage

```typescript
import { CdekApi } from 'sdek-api-lib';

// Initialize client
const cdek = new CdekApi({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// Calculate delivery cost
const tariff = await cdek.calculateTariff({
  tariff_code: 136, // Package warehouse-to-warehouse
  from_location: { code: 44 }, // Moscow
  to_location: { code: 137 },  // Saint Petersburg
  packages: [{
    weight: 2000, // 2 kg
    length: 30,
    width: 20,
    height: 15,
  }],
});

console.log(`Delivery cost: ${tariff.delivery_sum} ${tariff.currency}`);
console.log(`Delivery time: ${tariff.period_min}-${tariff.period_max} days`);
```

## 📚 Documentation

- **[Complete Guide](./GUIDE.md)** - Detailed guide with examples and best practices
- **[API Reference](./docs/)** - Auto-generated API documentation
- **[Examples](./examples/)** - Working examples for different use cases

## 🔗 Links

- **Repository**: https://github.com/barsbay/sdek-api-lib
- **NPM Package**: https://www.npmjs.com/package/sdek-api-lib
- **CDEK API Documentation**: https://api.cdek.ru/v2/
- **CDEK Account**: https://api.cdek.ru/account

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Features

- ✅ **Full API Coverage** - All CDEK API v2.0 endpoints
- ✅ **TypeScript Support** - Complete type definitions
- ✅ **Auto Token Management** - Automatic OAuth token refresh
- ✅ **Error Handling** - Comprehensive error handling
- ✅ **Test Coverage** - Full test suite with mocks
- ✅ **Documentation** - JSDoc comments for all methods
- ✅ **Examples** - Live examples with real API calls

## Installation

```bash
npm install sdek-api-lib
```

## Quick Start

### Basic Usage

```typescript
import { CdekApi, TARIFF_CODES } from 'sdek-api-lib';

// Initialize client
const cdek = new CdekApi({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// Calculate delivery cost
const tariff = await cdek.calculateTariff({
  tariff_code: TARIFF_CODES.PACKAGE_WAREHOUSE_TO_WAREHOUSE,
  from_location: { code: 44 }, // Moscow
  to_location: { code: 137 },  // Saint Petersburg
  packages: [{
    weight: 2000, // 2 kg
    length: 30,
    width: 20,
    height: 15,
  }],
});

console.log(`Delivery cost: ${tariff.delivery_sum} ${tariff.currency}`);
console.log(`Delivery time: ${tariff.period_min}-${tariff.period_max} days`);
```

### Environment Variables

You can use environment variables for configuration:

```bash
# .env file
CDEK_CLIENT_ID=your-client-id
CDEK_CLIENT_SECRET=your-client-secret
CDEK_BASE_URL=https://api.cdek.ru
```

```typescript
import { CdekApi } from 'sdek-api-lib';

const cdek = new CdekApi({
  clientId: process.env.CDEK_CLIENT_ID!,
  clientSecret: process.env.CDEK_CLIENT_SECRET!,
  baseUrl: process.env.CDEK_BASE_URL,
});
```

## Live Example

Run the live example with real API calls:

```bash
npm run example
```

This will:
- Test both production and test environments
- Calculate delivery costs between cities
- Search for pickup points
- Get city and region information
- Calculate all available tariffs

## API Reference

### Configuration

```typescript
interface CdekConfig {
  clientId: string;           // Your CDEK client ID
  clientSecret: string;       // Your CDEK client secret
  baseUrl?: string;          // API base URL (default: test environment)
  timeout?: number;          // Request timeout in ms (default: 30000)
}
```

### Calculator Methods

#### Calculate Tariff
```typescript
async calculateTariff(request: TariffRequest): Promise<TariffResponse>
```

#### Calculate All Tariffs
```typescript
async calculateTariffList(request: TariffListRequest): Promise<TariffResponse[]>
```

### Order Management

#### Create Order
```typescript
async createOrder(order: OrderRequest): Promise<OrderResponse>
```

#### Get Order
```typescript
async getOrder(uuid: string): Promise<OrderInfo>
async getOrderByCdekNumber(cdekNumber: string): Promise<OrderInfo[]>
```

#### Update/Delete Order
```typescript
async updateOrder(uuid: string, order: Partial<OrderRequest>): Promise<OrderResponse>
async deleteOrder(uuid: string): Promise<OrderResponse>
```

### Location Services

#### Get Regions
```typescript
async getRegions(countryCodes?: string, size?: number, page?: number): Promise<any[]>
```

#### Get Cities
```typescript
async getCities(options: CitySearchOptions): Promise<any[]>
```

#### Get Delivery Points
```typescript
async getDeliveryPoints(filter: DeliveryPointFilter): Promise<DeliveryPoint[]>
```

### Courier Services

#### Create Courier Request
```typescript
async createCourierRequest(request: CourierRequest): Promise<CourierResponse>
```

#### Manage Courier Requests
```typescript
async getCourierRequest(uuid: string): Promise<CourierInfo>
async deleteCourierRequest(uuid: string): Promise<CourierResponse>
```

## Examples

### Basic Usage Example

```typescript
import { CdekApi, TARIFF_CODES } from 'sdek-api-lib';

const cdek = new CdekApi({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// Calculate delivery
const tariff = await cdek.calculateTariff({
  tariff_code: TARIFF_CODES.PACKAGE_WAREHOUSE_TO_WAREHOUSE,
  from_location: { code: 44 },
  to_location: { code: 137 },
  packages: [{ weight: 1000, length: 20, width: 15, height: 10 }],
});

// Create order
const order = await cdek.createOrder({
  tariff_code: TARIFF_CODES.PACKAGE_WAREHOUSE_TO_WAREHOUSE,
  recipient: {
    name: 'John Doe',
    phones: [{ number: '+7 123 456-78-90' }],
  },
  from_location: { code: 44 },
  to_location: { code: 137 },
  packages: [{
    number: '1',
    weight: 1000,
    items: [{
      name: 'Test Product',
      ware_key: 'test-001',
      cost: 1000,
      amount: 1,
    }],
  }],
});
```

### Advanced Usage Example

```typescript
// Search for pickup points
const points = await cdek.getDeliveryPoints({
  city_code: 44,
  have_cash: true,
  take_only: true,
});

// Get cities by name
const cities = await cdek.getCities({
  city: 'Moscow',
  size: 10,
});

// Get regions
const regions = await cdek.getRegions('RU', 100, 0);
```

## Development

### Setup

```bash
git clone <repository>
cd cdek-api-sdk
npm install
```

### Running Tests

```bash
npm test
```

### Running Examples

```bash
# Live example with real API
npm run example

# Basic usage example
npm run example:basic

# Advanced usage example
npm run example:advanced
```

### Building

```bash
npm run build
```

## Environment Configuration

### Production Environment
```typescript
const cdek = new CdekApi({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  baseUrl: 'https://api.cdek.ru', // Production
});
```

### Test Environment
```typescript
const cdek = new CdekApi({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  baseUrl: 'https://api.edu.cdek.ru', // Test
});
```

Or use the convenience methods:
```typescript
cdek.setProductionMode(); // Switch to production
cdek.setTestMode();       // Switch to test
```

## Error Handling

The SDK provides comprehensive error handling:

```typescript
try {
  const tariff = await cdek.calculateTariff(request);
} catch (error) {
  if (error.message.includes('401')) {
    console.log('Authentication failed');
  } else if (error.message.includes('400')) {
    console.log('Invalid request');
  } else {
    console.log('API error:', error.message);
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run tests: `npm test`
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- 📚 [CDEK API Documentation](https://api.cdek.ru/v2/)
- 🐛 [Report Issues](https://github.com/barsbay/sdek-api-lib/issues)
- 💬 [Discussions](https://github.com/barsbay/sdek-api-lib/discussions)
- 📖 [Complete Guide](./GUIDE.md)
- 🚀 [Repository](https://github.com/barsbay/sdek-api-lib)

## Changelog

### v1.0.0
- Initial release
- Full CDEK API v2.0 coverage
- TypeScript support
- Comprehensive test suite
- Live examples with real API 