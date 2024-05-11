// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/*
fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
*/

use tauri::{Manager, window::WindowBuilder, WindowUrl};
use tauri::ipc::RemoteDomainAccessScope;

fn main() {
  let port = portpicker::pick_unused_port().expect("failed to find unused port");

  tauri::Builder::default()
    .plugin(tauri_plugin_localhost::Builder::new(port).build())
    .setup(move |app| {
      app.ipc_scope().configure_remote_access(
        RemoteDomainAccessScope::new("localhost")
          .add_window("main")
      );

      let url = format!("http://localhost:{}", port).parse().unwrap();
      WindowBuilder::new(app, "pleasework".to_string(), WindowUrl::External(url))
        .title("Student Organization Manager")
        .build()?;
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}