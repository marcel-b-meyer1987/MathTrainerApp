import { Set } from "./Set.js";

export class ProgressDisplay {
    
    set;
    items;      // contains one object for each exercise in the set
    visible;

    constructor(set) {
        this.set = set;
        this.visible = true;
        this.items = [];

        // populate the items with the objects corresponding with the exercises
        this.generateItems(this.set);
    }

    generateItems(set) {
        set.exercises.forEach(ex => {
            let item = {};
            item.solved = ex.solved;
            item.solutionCorrect = ex.solutionCorrect;

            this.items.push(item);
        });
    }

    // reset(newSet) {
    //     this.set = newSet;
    //     this.items = [];
    //     this.generateItems(newSet);
    // }

    renderHTML() {
        let html = null; // null by default

        if (this.visible) {

            html = document.createElement("div");
            html.setAttribute("class", "progress-display");
            
            let itemHTML;

            this.set.exercises.forEach((exercise, index) => {
                itemHTML = document.createElement("div");
                itemHTML.setAttribute("id", `exercise-${index + 1}`);
                itemHTML.setAttribute("title", `Übung Nr. ${index + 1}`); 
                itemHTML.classList.add("progress-display-element");
                
                // add css classes depending on exercise state
                let solutionClass = "";
                let activeClass = "";
                let ex = this.set.exercises[index];

                if (ex.solved) {
                     solutionClass = ex.solutionCorrect ? "correct" : "incorrect";
                } else {
                    solutionClass = "pending";
                }

                if(this.set.exerciseIndex === index) {
                    activeClass = "active";
                    itemHTML.classList.add (activeClass);
                } 

                itemHTML.classList.add(solutionClass);

                // attach event listener to jump to selected exercise to each progress display item => deactivate for testing, 
                itemHTML.addEventListener("click", () => {
                    this.set.exerciseIndex = index;
                    this.set.showNextExercise(index);
                });

                html.appendChild(itemHTML);

            });

        }

        return html;

    }
}