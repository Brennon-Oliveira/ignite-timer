import type { Cycle } from "./reducer";

export enum ActionTypes {
	ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
	INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
	MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
}

interface AddNewCycleAction {
	type: ActionTypes.ADD_NEW_CYCLE;
	payload: {
		newCycle: Cycle;
	};
}

interface InterruptCurrentCycleAction {
	type: ActionTypes.INTERRUPT_CURRENT_CYCLE;
	payload: {
		activeCycleId: string | null;
	};
}

interface MarkCurrentCycleAsFinishedAction {
	type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED;
	payload: {
		activeCycleId: string | null;
	};
}

export type CylesActions =
	| AddNewCycleAction
	| InterruptCurrentCycleAction
	| MarkCurrentCycleAsFinishedAction;
