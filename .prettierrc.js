module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  trailingComma: 'es5',
  singleQuote: true,
  arrowParens: 'always',
  importOrder: [
    '^react$',
    '^react-dom$',
    '^classnames$',
    '^@mui$',
    '<THIRD_PARTY_MODULES>',
    '^app/(.*)$',
    '^models/(.*)$',
    '^pages/(.*)$',
    '^layouts/(.*)$',
    '^widgets/(.*)$',
    '^features/(.*)$',
    '^entities/(.*)$',
    '^shared/(.*)$',
    '^../(?!.*.(scss|module.scss|css)$).*$',
    '^./(?!.*.(scss|module.scss|css)$).*$',
    '.*.(scss|module.scss|css)$',
  ],
  importOrderSeparation: true,
};