"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const TODO_FILE = "tasks.json";
// Chargement des tâches (ou initialisation)
let tasks = [];
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
    }
    else {
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. [${task.done ? "x" : " "}] ${task.text}`);
        });
    }
}
// Ajouter une tâche
function addTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const { task } = yield inquirer_1.default.prompt([
            {
                type: "input",
                name: "task",
                message: "Entre une nouvelle tâche : ",
            },
        ]);
        tasks.push({ text: task, done: false });
        saveTasks();
        console.log("Ok, à toi de jouer.");
    });
}
// Changer l'état d'une tâche
function completeTask() {
    return __awaiter(this, void 0, void 0, function* () {
        if (tasks.length === 0) {
            console.log("Aucune tâche à compléter.");
            return;
        }
        const { index } = yield inquirer_1.default.prompt([
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
    });
}
// Menu principal
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const { action } = yield inquirer_1.default.prompt([
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
    });
}
main();
