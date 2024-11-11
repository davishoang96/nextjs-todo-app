module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests/'],
    testMatch: ['**/test-*.ts'], // Custom pattern for test files
};