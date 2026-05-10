<?php declare(strict_types=1);

namespace BarbershopTheme\Core\Content\Barber;

use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class BarberDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'barbershop_barber';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return BarberEntity::class;
    }

    public function getCollectionClass(): string
    {
        return BarberCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            (new StringField('name', 'name'))->addFlags(new Required()),
            new StringField('position', 'position'),
            new FkField('media_id', 'mediaId', MediaDefinition::class),
            new StringField('instagram', 'instagram'),
            new StringField('facebook', 'facebook'),
            new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class, 'id', false),
        ]);
    }
}
