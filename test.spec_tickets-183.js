'use strict';

const assert = require('assert');
const webdriver = require('webdriverio');



describe('tickets-183: Экран расписания фильма - поиск', function () {
    let browser;

    before(async function () {
        browser = webdriver.remote({
            desiredCapabilities: {
                browserName: 'chrome'
            }
        });

        await browser.init();
        //Вот бы научиться выбирать event_id из api
        await browser.url('https://widget.tickets.yandex.ru/w/events/50433?regionId=213&clientKey=bb40c7f4-11ee-4f00-9804-18ee56565c87');
    });

    it('should show search field', async function () {
        await browser
        .waitForVisible('.input_field',15000);
    });

    it('should show searched place', async function () {
        await browser.waitForVisible('.input_field', 15000);
        await browser.setValue('.input_field', 'Балтика');
        await browser.waitForVisible('.session-item-caption_title')
        
        const res = await browser.getHTML('.session-item-caption_title', true);
        assert(((res.indexOf('Балтика') !== -1)), 'Нет искомого кинотеатра');
    });

    it('should show error message in case place not found', async function () {
        await browser
        .setValue('.input_field',' ')
        .waitForVisible('.message_title',15000)
        .getHTML('.message_title', true).then(res => {
            assert(((res.indexOf('Ничего не нашлось') !== -1)), 'Некорректный текст ошибки');
        });
    });

    it('should show sessions after filters reset', async function () {
        await browser
        .waitForVisible('.message_inner .fakelink',15000)
        .click('.message_inner .fakelink')
        .waitForVisible('.session-item-caption_title');
    });

    after(function() {
        return browser.end();
    });
});
