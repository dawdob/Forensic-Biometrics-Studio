import { Command } from "./Command";
import { MarkingClass } from "@/lib/markings/MarkingClass";

interface MarkingActions {
    addOne: (marking: MarkingClass) => void;
    removeOneByLabel: (label: number) => void;
}

export class AddOrUpdateMarkingCommand implements Command {
    constructor(
        private actions: MarkingActions,
        private marking: MarkingClass, 
        private oldMarking?: MarkingClass 
    ) {}

    execute() {
        this.actions.addOne(this.marking);
    }

    unExecute() {
        if (this.oldMarking) {
            this.actions.addOne(this.oldMarking);
        } else {
            this.actions.removeOneByLabel(this.marking.label);
        }
    }
}

export class RemoveMarkingCommand implements Command {
    constructor(
        private actions: MarkingActions,
        private marking: MarkingClass 
    ) {}

    execute() {
        this.actions.removeOneByLabel(this.marking.label);
    }

    unExecute() {
        this.actions.addOne(this.marking);
    }
}