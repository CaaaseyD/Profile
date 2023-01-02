Rails.application.routes.draw do
  root to: "pages#home"
  get "projects", to: "pages#projects"
  get "experiments", to: "pages#experiments"
  get "minesweeper", to: "pages#minesweeper"
end
