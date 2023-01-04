import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="copy"
export default class extends Controller {
  static targets = ["copybutton"]
  connect() {
    console.log("copy my email address");
  }
  copyaction(){
    let copyText = document.getElementById("myemail");
    let content = copyText.textContent
    console.log(content)
    navigator.clipboard.writeText(content);
    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied";
  }

  show() {
    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Click to copy";
  }
}
