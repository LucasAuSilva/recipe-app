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
                    .table(Ingredients::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Ingredients::Id)
                            .uuid()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Ingredients::MeasureKind).string().not_null())
                    .col(ColumnDef::new(Ingredients::MeasureQuantity).small_unsigned().not_null())
                    .col(ColumnDef::new(Ingredients::Description).string().not_null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // Replace the sample below with your own migration scripts
        manager
            .drop_table(Table::drop().table(Ingredients::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Ingredients {
    Table,
    Id,
    #[sea_orm(iden = "measure_kind")]
    MeasureKind,
    #[sea_orm(iden = "measure_quantity")]
    MeasureQuantity,
    Description,
}
