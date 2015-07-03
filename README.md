# Rabbit Epub Converter

Converter Zawgyi Epub to the Unicode and Unicode Epub to the Zawgyi.

## Install

```
npm install rabbit-epub
```

## Usages

```
rabbit-epub -i file.epub -t [uni|zg]

-i filename	input epub file
-t uni	to convert unicode from zawgyi
-t zg	to convert zg from unicode
```

### Example

```
cd /Users/myusername/uniepub/
rabbit-epub -i /Users/myusername/epub/zawgyi.epub -t uni
```

After that , you can find New_zawgyi.epub under the /Users/myusername/uniepub/

It will generate new epub under your current proessing folder.

## Credit

- Rabbit Converter
- Myanmar Cenus Font
- Zawgyi Font