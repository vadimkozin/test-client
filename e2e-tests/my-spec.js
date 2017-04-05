'use strict';
/*
Домашнее задание к лекции 5.2 «Тестируем клиент (Protractor)»

-Протестировать подсветку текущего пункта меню.
 (меню нет и тестировать нечего)
+Протестировать адрес /myaccount, убедиться что по нему открывается форма.
+Протестистировать обязательные поля в форме.
+Протестировать добавление покемона в корзину.
+Протестировать список покемонов. Убедиться что показано столько покемонов, сколько требуется.
*/

describe('Angular-modules', function() {

  describe('форма', () => {

    beforeAll(function() {
      browser.get('#!/myaccount');  
    });

    it('по адресу /myaccount открывается форма', function() {
      const nameForm = 'accountForm';      
      expect(browser.getLocationAbsUrl()).toMatch("/myaccount");
      expect(element(by.css("form[name*='" + nameForm + "']")).isPresent()).toBe(true);
    });

    it('обязательные поля в форме присутствуют', () => {
      const requiredFields = ['accountName', 'accountEmail'];
      const el = element.all(by.css("form input:required"));
      expect(el.getAttribute('name')).toEqual(requiredFields);
    });
  });
 
  describe('список', () => {
    const locatorFrom = 'singlePokemon in vm.pokemons',
          pokemons = element.all(by.repeater(locatorFrom)),
          POKEMONS_IN_LIST = 835; // допустим известно что должно быть именно столько

    beforeAll(function() {
      browser.get('#!/list');
    });

    it('количество покемонов в списке именно столько сколько нужно', () => {
        expect(pokemons.count()).toEqual(POKEMONS_IN_LIST);
    });

  });

  describe('добавление покемонов в корзину', () => {  
    const locatorFrom = 'singlePokemon in vm.pokemons',
          locatorTo = '(singlePokemonIndex, singlePokemonValue) in $ctrl.cartItems',
          pokemons = element.all(by.repeater(locatorFrom)),
          cart = element.all(by.repeater(locatorTo));

    beforeEach(function() {
      browser.get('#!/list');
    });

    /** 
     * Добавление покемона из списка в корзину
     * @param {number} index Индекс покемона в списке для добавления
     * @returns {ElementFinder} Выбранный покемон для добавления в корзину
    */
    function add(index) {
      const el = element(by.repeater(locatorFrom).row(index));
      const id = el.element(by.binding('singlePokemon.id'));
      el.element(by.tagName('button')).click();
      return id;
    }

    it('в корзину ничего не добавляли -> корзине пуста', ()=> {
      expect(cart.count()).toEqual(0);
    });

    it('в корзину добавили 2 покемона по 1 разу -> в корзине список из 2-х', ()=> {
      add(0);
      add(1);
      expect(cart.count()).toEqual(2);
    });

    it('в корзину добавили 3 покемона по 10 раз каждый -> в корзине список из 3-х покемонов', ()=> {
      const quantity = 10,        // количество заказов
            indexes = [0, 1, 20]; // индексы покемонов

      for(let n = 0; n < quantity; n++) {
        indexes.forEach((v) => add(v));
      }

      expect(cart.count()).toEqual(indexes.length);

    });

    it('в корзину добавили 1 покемона 11 раз -> в корзине 1 покемон с количеством заказов 11', ()=> {  
      const quantity = 11,  // количество заказов
            index = 25;     // индекс покемона в списке
      let   obj = null;     // добавленный объект в корзину из списка

      // добавили один и тот-же объект в корзину много раз
      for (let n = 0; n < quantity; n++) {
        obj = add(index);
      }

      // убедились что в корзине 1 объект
      expect(cart.count()).toEqual(1);

      // осталось убедиться, что в корзине именно тот объект который добавляли и что кол-во 
      // добавлений этого объекта = количеству заказов в корзине  
      obj.getText().then((id_added) => {
          const cart_quantity = cart.get(0).element(by.binding('singlePokemonValue.quantity'));

          cart_quantity.getText().then((val) => { 
          
            let [id, name,, q] = val.split(' ');  //  [id name X quantity]
        
            // убедились что id добавляемого объекта  =  id объекта в корзине
            expect(id_added.toString()).toEqual(id);
        
            // убедились что количество заказов соответствует количеству в корзине
            expect(quantity.toString()).toEqual(q);
          });
      });

    });

  });
  
});

