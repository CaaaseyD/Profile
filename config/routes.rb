Rails.application.routes.draw do
  root to: "pages#home"
  get "projects", to: "pages#projects"
  get "snow", to: "pages#snow"
  get "minesweeper", to: "pages#minesweeper"
  get "task", to: "pages#task"
end
