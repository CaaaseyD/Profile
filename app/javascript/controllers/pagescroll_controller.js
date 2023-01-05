import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="pagescroll"
export default class extends Controller {
  connect() {
    console.log("pagescroll connected")
  }
}
