use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct ResponseData<T> {
    pub kind: String,
    pub message: String,
    pub data: T
}

