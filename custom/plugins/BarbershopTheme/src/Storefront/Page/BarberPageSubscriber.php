<?php declare(strict_types=1);

namespace BarbershopTheme\Storefront\Page;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Storefront\Page\Content\ContentPageLoadedEvent;
use Shopware\Storefront\Page\GenericPageLoadedEvent;
use Shopware\Storefront\Page\PageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class BarberPageSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly EntityRepository $barberRepository
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            GenericPageLoadedEvent::class => 'onPageLoaded',
            ContentPageLoadedEvent::class => 'onPageLoaded',
        ];
    }

    public function onPageLoaded(PageLoadedEvent $event): void
    {
        $criteria = new Criteria();
        $criteria->addAssociation('media');
        $criteria->addSorting(new FieldSorting('name'));

        $barbers = $this->barberRepository->search($criteria, $event->getContext())->getEntities();
        $event->getPage()->addExtension('barbershopBarbers', $barbers);
    }
}
