export default {
    import: ['test/e2e/features/step-definitions/**/*.ts'],
    paths: ['test/e2e/features/**/*.feature'],
    format: ['progress', 'html:reports/cucumber-report.html'],
};