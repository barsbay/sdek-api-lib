# 🤝 Contributing to CDEK API TypeScript SDK

Thank you for your interest in contributing to the CDEK API TypeScript SDK! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm or yarn
- Git

### Fork and Clone

1. Fork the repository: https://github.com/barsbay/sdek-api-lib
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sdek-api-lib.git
   cd sdek-api-lib
   ```

## ⚙️ Development Setup

### Install Dependencies

```bash
npm install
```

### Environment Setup

1. Copy the environment example:
   ```bash
   cp env.example .env
   ```

2. Add your CDEK API credentials to `.env`:
   ```bash
   CDEK_CLIENT_ID=your-client-id
   CDEK_CLIENT_SECRET=your-client-secret
   CDEK_BASE_URL=https://api.cdek.ru
   ```

### Available Scripts

```bash
# Build the project
npm run build

# Run tests
npm test

# Run examples
npm run example
npm run example:basic
npm run example:advanced

# Lint code
npm run lint

# Format code
npm run format

# Generate documentation
npm run docs

# Watch mode for development
npm run dev
```

## 📝 Code Style

### TypeScript Guidelines

- Use TypeScript strict mode
- Provide proper type annotations
- Use interfaces for object shapes
- Prefer `const` over `let` when possible
- Use async/await instead of Promises

### Code Formatting

We use Prettier for code formatting. Run:
```bash
npm run format
```

### Linting

We use ESLint for code linting. Run:
```bash
npm run lint
```

### JSDoc Comments

All public methods should have JSDoc comments:

```typescript
/**
 * Calculate delivery cost and time for a specific tariff
 * @param request - Calculation parameters
 * @returns Promise with tariff calculation result
 * @throws {Error} When API request fails
 */
async calculateTariff(request: TariffRequest): Promise<TariffResponse> {
  // Implementation
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Tests should be in the `tests/` directory
- Use descriptive test names
- Mock external API calls
- Test both success and error cases

Example test structure:

```typescript
describe('CdekApi', () => {
  describe('calculateTariff', () => {
    it('should calculate delivery cost successfully', async () => {
      // Test implementation
    });

    it('should handle API errors gracefully', async () => {
      // Error test implementation
    });
  });
});
```

### Test Coverage

We aim for high test coverage. Run coverage report:
```bash
npm test -- --coverage
```

## 🔄 Pull Request Process

### Before Submitting

1. **Fork and clone** the repository
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the code style guidelines
4. **Add tests** for new functionality
5. **Update documentation** if needed
6. **Run all checks**:
   ```bash
   npm run lint
   npm test
   npm run build
   ```

### Pull Request Guidelines

1. **Title**: Use clear, descriptive titles
2. **Description**: Explain what the PR does and why
3. **Tests**: Ensure all tests pass
4. **Documentation**: Update README or GUIDE if needed
5. **Examples**: Add examples for new features

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Test update

## Testing
- [ ] All tests pass
- [ ] New tests added for new functionality
- [ ] Examples updated

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 🐛 Reporting Issues

### Before Reporting

1. Check existing issues
2. Search the documentation
3. Try the examples

### Issue Template

```markdown
## Bug Description
Clear description of the issue

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Node.js version:
- npm version:
- OS:
- CDEK API credentials: [Yes/No]

## Code Example
```typescript
// Minimal code to reproduce
```

## Error Messages
Any error messages or stack traces
```

## 💡 Feature Requests

### Before Requesting

1. Check if the feature already exists
2. Review the CDEK API documentation
3. Consider if it fits the project scope

### Feature Request Template

```markdown
## Feature Description
Clear description of the requested feature

## Use Case
Why this feature is needed

## Proposed Implementation
How you think it should work

## Alternatives Considered
Other approaches you've considered

## Additional Context
Any other relevant information
```

## 📚 Documentation

### Updating Documentation

- Update README.md for major changes
- Update GUIDE.md for new features
- Add JSDoc comments for new methods
- Update examples if needed

### Documentation Guidelines

- Use clear, concise language
- Include code examples
- Provide step-by-step instructions
- Keep examples up-to-date

## 🏷️ Versioning

We follow [Semantic Versioning](https://semver.org/):

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes (backward compatible)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

## 📞 Getting Help

If you need help with contributing:

1. Check the documentation
2. Search existing issues
3. Create a new issue with the "question" label
4. Join discussions in GitHub Discussions

Thank you for contributing to CDEK API TypeScript SDK! 🚀 