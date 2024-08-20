use crate::{models::{CreateRecipe, ResponseData, ResponseRecipe}, AppState};

#[tauri::command]
pub async fn create_recipe(state: tauri::State<'_, AppState>, recipe: CreateRecipe) -> Result<ResponseData<ResponseRecipe>, ()> {
    println!("{}", recipe.name);
    let recipe = ResponseRecipe {
        name: "Cool".to_string(),
        id: todo!(),
        number_of_serving: todo!(),
        cook_duration: todo!(),
        category: todo!(),
        origin: todo!(),
        tags: todo!(),
        image: todo!(),
        video: todo!(),
        ingredients: todo!(),
        directions: todo!()
    };
    Ok(ResponseData {
        kind: "success".to_string(),
        message: "create with success".to_string(),
        data: recipe
    })
}

