// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod controllers;
mod models;

use crate::controllers::create_recipe;
use crate::controllers::sign_up;

use service::sea_orm::{Database, DatabaseConnection};
use migration::{Migrator, MigratorTrait};
use serde::{Deserialize, Serialize};
use std::env;
use std::fs;

#[derive(Clone)]
pub struct AppState {
    pub conn: DatabaseConnection,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    
    // let db_url = "sqlite://".to_string() + data_dir.to_str().unwrap() + "/db.sqlite?mode=rwc";
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");

    let conn = Database::connect(db_url)
        .await
        .expect("Database connection failed");
    Migrator::up(&conn, None).await.unwrap();

    let state = AppState { conn };

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            greet,
            create_recipe,
            sign_up
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
