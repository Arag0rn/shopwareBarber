import template from './barbershop-barber-list.html.twig';

const { Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('barbershop-barber-list', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            repository: null,
            barbers: null
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    computed: {
        columns() {
            return [{
                property: 'name',
                dataIndex: 'name',
                label: this.$tc('barbershop-barber.list.columnName'),
                routerLink: 'barbershop.barber.detail',
                inlineEdit: 'string',
                allowResize: true,
                primary: true
            }, {
                property: 'position',
                dataIndex: 'position',
                label: this.$tc('barbershop-barber.list.columnPosition'),
                inlineEdit: 'string',
                allowResize: true
            }, {
                property: 'instagram',
                dataIndex: 'instagram',
                label: this.$tc('barbershop-barber.list.columnInstagram'),
                allowResize: true
            }, {
                property: 'facebook',
                dataIndex: 'facebook',
                label: this.$tc('barbershop-barber.list.columnFacebook'),
                allowResize: true
            }];
        }
    },

    created() {
        this.repository = this.repositoryFactory.create('barbershop_barber');
        this.getList();
    },

    methods: {
        getList() {
            const criteria = new Criteria();
            criteria.addAssociation('media');

            this.repository
                .search(criteria, Shopware.Context.api)
                .then((result) => {
                    this.barbers = result;
                });
        },

        onDelete(id) {
            this.repository
                .delete(id, Shopware.Context.api)
                .then(() => {
                    this.getList();
                    this.createNotificationSuccess({
                        message: this.$tc('barbershop-barber.list.deleteSuccess')
                    });
                });
        }
    }
});
