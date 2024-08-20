use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        let _ = manager
            .create_table(
                Table::create()
                    .table(Recipes::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Recipes::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Recipes::Name).string().not_null())
                    .col(ColumnDef::new(Recipes::NumberOfServing).small_unsigned().not_null())
                    .col(ColumnDef::new(Recipes::CookDuration).small_unsigned().not_null())
                    .col(ColumnDef::new(Recipes::Category).string().not_null())
                    .col(ColumnDef::new(Recipes::Origin).string().not_null())
                    .col(ColumnDef::new(Recipes::Video).string().null())
                    .col(ColumnDef::new(Recipes::Image).string().null())
                    .to_owned(),
            )
            .await;

        manager
            .alter_table(
                Table::alter()
                    .table(Ingredients::Table)
                    .add_column_if_not_exists(ColumnDef::new(Ingredients::RecipeId).uuid().not_null())
                    .add_foreign_key(
                        TableForeignKey::new()
                            .name("FK_recipe_ingredient")
                            .from_tbl(Ingredients::Table)
                            .from_col(Ingredients::RecipeId)
                            .to_tbl(Recipes::Table)
                            .to_col(Recipes::Id)
                            .on_delete(ForeignKeyAction::Cascade)
                            .on_update(ForeignKeyAction::Cascade)
                    )
                    .to_owned()
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        if manager.has_column("ingredients", "recipe_id").await? {
            let _ = manager
                .alter_table(
                    Table::alter()
                        .table(Ingredients::Table)
                        .drop_foreign_key(Alias::new("FK_recipe_ingredient"))
                        .drop_column(Alias::new("recipe_id"))
                        .to_owned()
                )
                .await;
        }

        manager
            .drop_table(Table::drop().table(Recipes::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Ingredients {
    Table,
    #[sea_orm(iden = "recipe_id")]
    RecipeId
}

#[derive(DeriveIden)]
enum Recipes {
    Table,
    Id,
    Name,
    #[sea_orm(iden = "number_of_serving")]
    NumberOfServing,
    #[sea_orm(iden = "cook_duration")]
    CookDuration,
    Category,
    Origin,
    Image,
    Video,
}
