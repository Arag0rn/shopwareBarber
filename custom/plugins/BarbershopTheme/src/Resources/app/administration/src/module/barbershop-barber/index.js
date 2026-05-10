import './page/barbershop-barber-list';
import './page/barbershop-barber-detail';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

const { Module } = Shopware;

Module.register('barbershop-barber', {
    type: 'plugin',
    name: 'Barbers',
    title: 'barbershop-barber.general.mainMenuItemGeneral',
    description: 'barbershop-barber.general.descriptionTextModule',
    color: '#ff6c00',
    icon: 'default-avatar-single',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        list: {
            component: 'barbershop-barber-list',
            path: 'list'
        },
        detail: {
            component: 'barbershop-barber-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'barbershop.barber.list'
            }
        },
        create: {
            component: 'barbershop-barber-detail',
            path: 'create',
            meta: {
                parentPath: 'barbershop.barber.list'
            }
        }
    },

    navigation: [{
        label: 'barbershop-barber.general.mainMenuItemGeneral',
        color: '#ff6c00',
        path: 'barbershop.barber.list',
        icon: 'default-avatar-single',
        parent: 'sw-catalogue',
        position: 100
    }]
});
