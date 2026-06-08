План исправления 404 на страницах вроде `/about` и `/contacts` при загрузке сайта с вашего хостинга:

1. Добавить файл `public/.htaccess` в проект.
2. Вписать в него правила Apache `mod_rewrite`, чтобы:
   - реальные файлы и папки (`assets`, картинки, favicon и т.д.) открывались как обычно;
   - все остальные адреса сайта перенаправлялись на `index.html`;
   - React Router уже внутри приложения показывал нужную страницу.
3. После этого вы сможете снова выполнить:
   ```bash
   npm install --legacy-peer-deps
   npm run build
   ```
4. На хостинг нужно загрузить всё содержимое папки `dist`, включая скрытый файл `.htaccess`.

Технически файл будет таким:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  RewriteRule . /index.html [L]
</IfModule>
```

Важно при загрузке на хостинг включить отображение скрытых файлов, потому что `.htaccess` начинается с точки и иногда не копируется через файловый менеджер или FTP по умолчанию.