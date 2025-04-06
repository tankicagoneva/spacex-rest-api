export default {
    import: ['test/e2e/dist/step-definitions/*.js'],
    paths: ['test/e2e/src/features/*.feature'],
    format: ['progress', 'html:reports/cucumber-report.html'],
}