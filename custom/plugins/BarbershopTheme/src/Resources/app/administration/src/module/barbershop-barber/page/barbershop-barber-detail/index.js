import template from './barbershop-barber-detail.html.twig';

const { Component, Mixin } = Shopware;

Component.register('barbershop-barber-detail', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('notification')
    ],

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    data() {
        return {
            barber: null,
            isLoading: false,
            processSuccess: false,
            repository: null
        };
    },

    computed: {
        isCreateMode() {
            return this.$route.name === 'barbershop.barber.create';
        }
    },

    created() {
        this.repository = this.repositoryFactory.create('barbershop_barber');
        this.getBarber();
    },

    methods: {
        getBarber() {
            if (this.isCreateMode) {
                this.barber = this.repository.create(Shopware.Context.api);
                return;
            }

            this.repository
                .get(this.$route.params.id, Shopware.Context.api)
                .then((entity) => {
                    this.barber = entity;
                });
        },

        onClickSave() {
            this.isLoading = true;

            this.repository
                .save(this.barber, Shopware.Context.api)
                .then(() => {
                    this.getBarber();
                    this.isLoading = false;
                    this.processSuccess = true;
                    this.createNotificationSuccess({
                        message: this.$tc('barbershop-barber.detail.saveSuccess')
                    });
                })
                .catch((exception) => {
                    this.isLoading = false;
                    this.createNotificationError({
                        message: this.$tc('barbershop-barber.detail.saveError')
                    });
                });
        },

        saveFinish() {
            this.processSuccess = false;
        },

        setMediaItem({ targetId } = {}) {
            if (!this.barber) {
                return;
            }

            this.barber.mediaId = targetId || null;
        },

        onUnlinkLogo() {
            if (!this.barber) {
                return;
            }

            this.barber.mediaId = null;
        },

        onOpenMediaModal() {
            // Keep handler defined for sw-media-upload-v2 event.
        },

        onClickCancel() {
            this.$router.push({ name: 'barbershop.barber.list' });
        }
    }
});
