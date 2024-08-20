use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Deserialize, Serialize)]
#[sea_orm(table_name = "recipes")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub id: Uuid,
    pub name: String,
    pub number_of_serving: u16,
    pub cook_duration: u16,
    pub category: String,
    pub origin: String,
    pub video: Option<String>,
    pub image: Option<String>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::ingredients::Entity")]
    Ingredients,
    #[sea_orm(has_many = "super::directions::Entity")]
    Directions,
}

impl Related<super::ingredients::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Ingredients.def();
        Relation::Directions.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
