# Cookie-kezelés

## NAGYON FONTOS!!!
- A könnyebb tesztelhetőség érdekében az elkészített függvényeket és változókat 
exportálni kell!
- Függvények esetén egy példa:
```javascript
export default objectsMerge;
```
- Változók esetén egy példa:
```javascript
export {
  firstName,
  lastName,
  job,
};
```

## 1. feladat
- Fájl: `solutions/app1.js`
- Függvény neve: `setCookie`
- Export: a setCookie legyen a default export.
- A függvény meghívása esetén tárold el a függvénynek átadott string-et egy 
token nevű cookie-ba, amely 15 perc után lejár!
   
## 2. feladat
- Fájl: `solutions/app2.js`
- Objektum neve: `cookieHandler`
- Export: `export { cookieHandler };`
- Az alábbi cookie-k legyenek a böngésződben tárolva 
(az első feladatban szereplő setCookie függvénnyel hozd őket létre, egyszerűen
másold át a függvényt ebbe a feladatba is, és futtasd háromszor):
  - viewed: 5
  - uid: 354774631237
  - ssid: Bx55OWbHJ0Vt_IGIF
  
- A cookieHandler objektum az alábbi három metódust tartalmazza:
  - `getAll`: kiolvassa a sütik nevét és értékét, majd visszaadja őket egy 
objektumban, ahol a sütik neve a key és az értéke a value (pl. {viewed: 5}).
  - `toSessionStorage`: minden sütit egyenként elment a sessionStorage-ba az 
adott süti nevével és értékével.
  - `flush`: törli az összes sütit.
