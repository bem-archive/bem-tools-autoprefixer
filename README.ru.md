# bem-tools-autoprefixer

Расширение для [bem-tools][bem-tools], использующее [autoprefixer][autoprefixer] во время процесса сборки.

## Использование

Устанавливается с помощью `npm`:

```
› npm install bem-tools-autoprefixer
```

Отредактируйте файл конфигурации вашего проекта `.bem/make.js` для использования `bem-tools-autoprefixer`:

```javascript
// .bem/make.js

require('bem-tools-autoprefixer').extendMake(MAKE);

MAKE.decl('BundleNode', {

    getTechs : function() {
        return ['bemdecl.js', 'deps.js', 'css', 'prefix.css'];
    },

    'create-prefix.css-node' : function(tech, bundle, magic) {
        return this.createDefaultTechNode.call(this, 'css', bundle, magic);
    },

    'create-prefix.css-optimizer-node' : function(tech, sourceNode, bundle) {
        var borschikCss = this['create-css-optimizer-node'];
        return borschikCss.apply(this, arguments).map(function(source) {
            var node = this.createAutoprefixerNode(tech, source, bundle);
            return borschikCss.call(this, tech, node, bundle);
        }, this);
    }

});

```

## Настройки

Вы можете указать, какие браузеры нужно поддерживать в вашем проекте.

```javascript
// make.js

MAKE.decl('AutoprefixerNode', {

    getBrowsers : function() {
        return [
            'last 2 versions',
            'firefox >= 20',
            'android 4'
        ];
    }

});
```

Для более подробной информации смотрите [документацию autoprefixer'а](https://github.com/ai/autoprefixer#browsers) по поддержке браузеров (на английском).

--
Autoprefixer парсит CSS и добавляет вендорные префиксы в CSS, используя значения с сайта [Can I Use][caniuse].

[bem-tools]: http://github.com/bem/bem-tools/
[autoprefixer]: http://github.com/ai/autoprefixer/
[caniuse]: http://caniuse.com/

