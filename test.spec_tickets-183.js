'use strict';

const assert = require('assert');
const webdriver = require('webdriverio');



describe('tickets-183: Экран расписания фильма - поиск', function () {
    before(function () {
        const browser = webdriver.remote({
            desiredCapabilities: {
                browserName: 'chrome'
            }
        });

        this.browser = browser
        .init()
        .url('https://widget.tickets.yandex.ru/w/events/44000?regionId=213&clientKey=bb40c7f4-11ee-4f00-9804-18ee56565c87');

        return this.browser;

    }); 

    it('should show search field', function () {
        return this.browser
        .waitForVisible('.input_field',15000);
    });

    it('should show searched place', function () {
        return this.browser
        .waitForVisible('.input_field',15000)
        .setValue('.input_field','Балтика')
        .waitForVisible('.session-item-caption_title')
        .getHTML('.session-item-caption_title', true).then(res => {
            assert(((res.indexOf('Балтика') !== -1)), 'Нет искомого кинотеатра');
                // if (res.indexOf('Химки') === -1) {
                //     throw new Error ('Нет искомого кинотеатра');
                // } else {
                //     console.log(res);
                // }
        });     
    });

    it('should show error message in case place not found', function () {
        return this.browser
        .setValue('.input_field',' ')
        .waitForVisible('.message_title',15000)
        .getHTML('.message_title', true).then(res => {
            assert(((res.indexOf('Ничего не нашлось') !== -1)), 'Некорректный тест ошибки');
        });     
    });

    it('should show error in place', function () {
        return this.browser
        .waitForVisible('.message_inner .fakelink',15000)
        .click('.message_inner .fakelink')
        .waitForVisible('.session-item-caption_title');     
    });

    after(function() {
        return this.browser.end();
    });
});