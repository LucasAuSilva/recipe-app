pub use sea_orm_migration::prelude::*;

mod m20240731_174231_create_ingredients_table;
mod m20240731_181644_create_recipes_table;
mod m20240731_190711_create_directions_table;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20240731_174231_create_ingredients_table::Migration),
            Box::new(m20240731_181644_create_recipes_table::Migration),
            Box::new(m20240731_190711_create_directions_table::Migration),
        ]
    }
}
