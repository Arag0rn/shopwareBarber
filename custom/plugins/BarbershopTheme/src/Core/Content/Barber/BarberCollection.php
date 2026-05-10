<?php declare(strict_types=1);

namespace BarbershopTheme\Core\Content\Barber;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void              add(BarberEntity $entity)
 * @method void              set(string $key, BarberEntity $entity)
 * @method BarberEntity[]    getIterator()
 * @method BarberEntity[]    getElements()
 * @method BarberEntity|null get(string $key)
 * @method BarberEntity|null first()
 * @method BarberEntity|null last()
 */
class BarberCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return BarberEntity::class;
    }
}
