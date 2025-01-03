import * as fs from "fs";
import inquirer from "inquirer";

const TODO_FILE = "tasks.json";

// Chargement des tâches (ou initialisation)
let tasks: { text: string; done: boolean }[] = [];

if (fs.existsSync(TODO_FILE)) {
  tasks = JSON.parse(fs.readFileSync(TODO_FILE, "utf-8"));
}

// Sauvegarde des tâches
function saveTasks() {
  fs.writeFileSync(TODO_FILE, JSON.stringify(tasks, null, 2));
}

// Visualiser des tâches
function listTasks() {
  console.log("\n==== TÂCHES ====");
  if (tasks.length === 0) {
    console.log("Aucune tâche pour le moment Coline. \n");
  } else {
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. [${task.done ? "x" : " "}] ${task.text}`);
    });
  }
}

// Ajouter une tâche
async function addTask() {
  const { task } = await inquirer.prompt([
    {
      type: "input",
      name: "task",
      message: "Entre une nouvelle tâche : ",
    },
  ]);
  tasks.push({ text: task, done: false });
  saveTasks();
  console.log("Ok, à toi de jouer.");
}

// Changer l'état d'une tâche
async function completeTask() {
  if (tasks.length === 0) {
    console.log("Aucune tâche à compléter.");
    return;
  }
  const { index } = await inquirer.prompt([
    {
      type: "list",
      name: "index",
      message: "Choisi la tâche qui est terminée : ",
      choices: tasks.map((task, i) => ({
        name: `${task.done ? "[x]" : "[ ]"} ${task.text}`,
        value: i,
      })),
    },
  ]);
  tasks[index].done = true;
  saveTasks();
  console.log("Ok, la tâche est terminée.");
}

// Menu principal
async function main() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Tu veux faire quoi ?",
        choices: [
          { name: "1. Voir les tâches", value: "list" },
          { name: "2. Ajouter une tâche", value: "add" },
          { name: "3. Terminer une tâche", value: "complete" },
          { name: "4. Quitter", value: "quit" },
        ],
      },
    ]);

    switch (action) {
      case "list":
        listTasks();
        break;
      case "add":
        addTask();
        break;
      case "complete":
        completeTask();
        break;
      case "quit":
        console.log("Ciao!");
        return;
    }
  }
}

main();
