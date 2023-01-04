import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="minesweeper"
export default class extends Controller {
  connect() {
    console.log("minesweeper connected")
    document.querySelector(".navbar").style.backgroundColor = "#155263";
    //generate and store a random "mine map" in the page
    //0 represent 0 mine, 1 represent 1 mine, for a 8*8, there would be 10 mines;
    document.querySelector("table").style.backgroundColor = "Gainsboro";
    const mines = document.querySelector("#minesweeper");
    const numberGame = 8;
    const minesNumber = 10;
    const GRID_SIZE = 8;
    const MINE_FREQUENCY = 0.15;
    // const arrMap = `<td class="unopened" data-column="${j}"></td>\t`.repeat(numberGame ** 2).split("\t");
    // const nums = new Set();
    // while(nums.size !== (minesNumber + 1)) {
    //   nums.add(Math.floor(Math.random() * (numberGame ** 2)) + 1);
    // }
    // nums.forEach(a => arrMap[a] = `<td class="unopened hiMine"></td>`);
    // let i = 0;
    // while(i < numberGame){
    //   let arrMines = arrMap.slice(i * numberGame, (i + 1) * numberGame - 1);
    //   let mineMap = arrMines.join("\n");
    //   mines.insertAdjacentHTML("beforeend", `<tr data-row="${i}">${mineMap}</tr>`);
    //   i++;
    // }
    for (let i = 0; i < GRID_SIZE; i += 1) {
      const row = document.createElement('tr');
      row.dataset.row = i;
      for (let j = 0; j < GRID_SIZE; j += 1) {
        row.insertAdjacentHTML('beforeend', `<td class="unopened" data-column="${j}"></td>`);
      }
      mines.append(row);
    }

    document.querySelectorAll('td').forEach((td) => {
      td.dataset.column = td.cellIndex;
      td.dataset.row = td.parentElement.rowIndex;
      if (Math.random() <= MINE_FREQUENCY) {
        td.classList.add('hiMine');
      }
    });
    //it is 1 if there is 1 mine surrounding it;
    const eachmine = document.querySelectorAll("#minesweeper tr td");
    function neighbour(td, offsetX, offsetY) {
      const column = td.cellIndex;
      const row = td.parentElement.rowIndex;
      return document.querySelector(`[data-column="${column + offsetX}"][data-row="${row + offsetY}"]`);
    }

    function incrementNeighbour(td, offsetX, offsetY) {
      const n = neighbour(td, offsetX, offsetY);
      if (n && n.classList.contains('hiMine')) {
        return 1;
      }
      return 0;
    }

    function open(tile) {
      let eachMines = 0;

      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          if (i !== 0 || j !== 0) {
            eachMines += incrementNeighbour(tile, i, j);
          }
        }
      }

      if (eachMines === 0) {
        tile.classList.add('opened');
      } else {
        tile.classList.add(`mine-neighbour-${eachMines}`);
      }
      tile.classList.remove('unopened');

      if (eachMines === 0) {
        for (let i = -1; i <= 1; i += 1) {
          for (let j = -1; j <= 1; j += 1) {
            if (i !== 0 || j !== 0) {
              const n = neighbour(tile, i, j);
              if (n && n.classList.contains('unopened')) {
                open(n);
              }
            }
          }
        }
      }

      return eachMines;
    }

    //timer
    let startBtn = document.getElementById('start');
    let resetBtn = document.getElementById('reset');
    let hour = 0;
    let minute = 0;
    let second = 0;
    let count = 0;
    let timer = false;
    startBtn.addEventListener('click', function () {
      document.querySelector("table").classList.remove("disabled");
      timer = true;
      stopWatch();
    });
    resetBtn.addEventListener('click', function () {
      document.location.reload();
    });
    function stopWatch() {
      if (timer) {
        count++;
        if (count == 100) {
          second++;
          count = 0;
        }
        if (second == 60) {
          minute++;
          second = 0;
        }
        if (minute == 60) {
          hour++;
          minute = 0;
          second = 0;
        }
        let minString = minute;
        let secString = second;
        let countString = count;
        if (minute < 10) {
          minString = "0" + minString;
        }
        if (second < 10) {
          secString = "0" + secString;
        }
        if (count < 10) {
          countString = "0" + countString;
        }
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
      }
    }
    //open a mine when left click
    //add flag mark when right click
    //add question mark when right click * 2
    //return to normal unopened when right click * 3
    //when we open all the not-mines, we win
    let mineSum = 0;
    eachmine.forEach(each => {
      if (each.classList.contains('hiMine')){
        mineSum += 1;
      }
      return mineSum;
    })
    // when we open a mine, we lose, it shows the mine map


    // function checkWin(){
    //   eachmine.forEach(each => {
    //   if(each.classList.contains("opened") || each.classList.contains("mine-neighbour-1") ||
    //     each.classList.contains("mine-neighbour-2") || each.classList.contains("mine-neighbour-3") ||
    //     each.classList.contains("mine-neighbour-4") || each.classList.contains("mine-neighbour-5") ||
    //     each.classList.contains("mine-neighbour-6") || each.classList.contains("mine-neighbour-7") ||
    //     each.classList.contains("mine-neighbour-8")){
    //     winSum += 1;
    //     //GRID_SIZE**2 - mineSum === winSum
    //     return winSum;}
    // });}

    eachmine.forEach(each => {
      each.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if(event.currentTarget.classList.contains('unopened')){
        if(event.currentTarget.classList.contains('flagged')){
          event.currentTarget.classList.remove("flagged");
          event.currentTarget.classList.add("question");
        } else if (event.currentTarget.classList.contains('question')){
          event.currentTarget.classList.remove("question");
        } else {
          event.currentTarget.classList.add("flagged");}
        }
      });

      each.addEventListener("click", event =>{
        const eachimineE = event.currentTarget;
        if (eachimineE.classList.contains("hiMine")) {
          document.querySelectorAll('.hiMine').forEach((e) => {
            e.classList.remove('hiMine', 'unopened');
            e.classList.add('mine');
          });
          timer = false;
          document.querySelector('#start').classList.add("disabled");
          document.querySelector("table").classList.add("disabled");
          document.querySelector('#emoji').innerText = "😈";
          let timeout;
          function myFunction() {
            timeout = setTimeout(alertFunc, 500);
          }
          function alertFunc() {
            alert("You've lost");
          }
          myFunction();
        } else {
          open(eachimineE);
          let winSum = 0;
          eachmine.forEach(each => {
              if(each.classList.contains("opened") || each.classList.contains("mine-neighbour-1") ||
                each.classList.contains("mine-neighbour-2") || each.classList.contains("mine-neighbour-3") ||
                each.classList.contains("mine-neighbour-4") || each.classList.contains("mine-neighbour-5") ||
                each.classList.contains("mine-neighbour-6") || each.classList.contains("mine-neighbour-7") ||
                each.classList.contains("mine-neighbour-8")){
                winSum += 1;}
              if(GRID_SIZE**2 - mineSum === winSum){
                alert("You WINNNNNNN!");
              }
            })
        }
      });
    });
  }
}
