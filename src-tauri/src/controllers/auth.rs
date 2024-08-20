
#[tauri::command]
pub fn sign_up(email: &str) -> bool {
    if email == "lucassilva@dev.com" {
        return true
    }
    return false
}
