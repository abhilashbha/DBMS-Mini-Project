# Contributing to DBMS Mini Project

Thank you for your interest in contributing to the Digital Wallet Management System project! We welcome contributions from the community.

## How to Contribute

1. **Fork the repository** and clone it locally
2. **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`
3. **Make your changes** and test thoroughly
4. **Commit your changes** with clear, descriptive messages
5. **Push to your branch** and create a Pull Request

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL 5.7+
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/abhilashbha/DBMS-Mini-Project.git
cd DBMS-Mini-Project

# Install dependencies
npm install

# Setup database
mysql -u root -p < schema.sql
mysql -u root -p < triggers.sql
mysql -u root -p < view.sql
mysql -u root -p < sample_data.sql

# Start the server
node server.js
```

## Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Test your changes before submitting
- Update documentation if needed
- Ensure your code works with the existing database schema

## Bug Reports and Feature Requests

Please open an issue with:
- Clear description of the bug or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Environment details if relevant

## Questions?

Feel free to open an issue or contact the maintainers.

Thank you for contributing! 🎉
