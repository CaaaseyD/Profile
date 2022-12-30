Rails.application.routes.draw do
  root to: "pages#home"
  get "projects", to: "pages#projects"
  get "elements", to: "pages#elements"
  get "contact", to: "pages#contact"
end
