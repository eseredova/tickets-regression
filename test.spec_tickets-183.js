'use strict';

const assert = require('assert');
const webdriver = require('webdriverio');



describe('tickets-183: Экран расписания фильма - поиск', function () {
    it('should show header', function () {
        const browser = webdriver.remote({
            desiredCapabilities: {
                browserName: 'chrome'
            }
        });

        return browser
            .init()
            .url('https://widget.tickets.yandex.ru/w/events/44000?regionId=213&clientKey=bb40c7f4-11ee-4f00-9804-18ee56565c87')
            .waitForVisible('.input_field',15000)
            .setValue('.input_field','алмаз')
            .waitForVisible('.session-item-caption_title')
            .getHTML('.session-item-caption_title', true).then(res => {
                console.log(res);
            });     
    });
    
});