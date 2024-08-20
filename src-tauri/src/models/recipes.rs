use migration::sea_orm::prelude::Uuid;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct CreateDirection {
    pub order: u32,
    pub image: Option<String>,
    pub description: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Measure {
    pub kind: String,
    pub quantity: u32
}

#[derive(Deserialize, Serialize, Debug)]
pub struct CreateIngredient {
    pub measure: Measure,
    pub description: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct CreateRecipe {
    pub name: String,
    pub number_of_serving: u32,
    pub cook_duration: u32,
    pub category: String,
    pub origin: String,
    pub tags: Vec<String>,
    pub image: Option<String>,
    pub video: Option<String>,
    pub ingredients: Vec<CreateIngredient>,
    pub directions: Vec<CreateDirection>
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ResponseDirection {
    pub id: Uuid,
    pub order: u32,
    pub image: Option<String>,
    pub description: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ResponseIngredient {
    pub id: Uuid,
    pub measure: Measure,
    pub description: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ResponseRecipe {
    pub id: Uuid,
    pub name: String,
    pub number_of_serving: u32,
    pub cook_duration: u32,
    pub category: String,
    pub origin: String,
    pub tags: Vec<String>,
    pub image: Option<String>,
    pub video: Option<String>,
    pub ingredients: Vec<ResponseIngredient>,
    pub directions: Vec<ResponseDirection>
}

