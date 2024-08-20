use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        manager
            .create_table(
                Table::create()
                    .table(Directions::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Directions::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Directions::Order).small_unsigned().not_null())
                    .col(ColumnDef::new(Directions::Description).string().not_null())
                    .col(ColumnDef::new(Directions::Image).string().null())
                    .col(ColumnDef::new(Directions::RecipeId).uuid().not_null())
                    .foreign_key(
                        ForeignKeyCreateStatement::new()
                            .name("FK_recipe_direction")
                            .from(Directions::Table, Directions::RecipeId)
                            .to(Recipes::Table, Recipes::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade)
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        manager
            .drop_table(Table::drop().table(Directions::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Recipes {
    Table,
    Id
}

#[derive(DeriveIden)]
enum Directions {
    Table,
    Id,
    Order,
    Image,
    Description,
    #[sea_orm(iden = "id_recipe")]
    RecipeId,
}
