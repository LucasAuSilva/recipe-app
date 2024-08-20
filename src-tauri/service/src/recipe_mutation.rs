use ::entity::{directions, ingredients, recipe};
use sea_orm::*;

pub struct RecipeMutation;

impl RecipeMutation {
    pub async fn create_recipe(
        db: &DbConn,
        recipe_data: recipe::Model,
        ingredients_data: ingredients::Model,
        directions_data: directions::Model
    ) -> Result<recipe::ActiveModel, DbErr> {
        let recipe_model = recipe::ActiveModel {
            id: Set(prelude::Uuid::new_v4().to_owned()),
            name: Set(recipe_data.name.to_owned()),
            number_of_serving: Set(recipe_data.number_of_serving.to_owned()),
            cook_duration: Set(recipe_data.cook_duration.to_owned()),
            category: Set(recipe_data.category.to_owned()),
            origin: Set(recipe_data.origin.to_owned()),
            video: Set(recipe_data.video.to_owned()),
            image: Set(recipe_data.image.to_owned())
        };
        recipe_model
            .save(db)
            .await
    }
}
