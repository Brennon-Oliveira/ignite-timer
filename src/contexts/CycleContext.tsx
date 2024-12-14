import {
	createContext,
	type ReactNode,
	useEffect,
	useReducer,
	useState,
} from "react";
import {
	cyclesReducer,
	type CyclesState,
	type Cycle,
} from "../reducers/cycles/reducer";
import { ActionTypes } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CycleContextData {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPast: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
	createNewCycle: (data: CreateCycleData) => void;
	interruptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CycleContextData);

interface CreateCycleData {
	task: string;
	minutesAmount: number;
}

interface CycleContextProviderProps {
	children: ReactNode;
}

export function CycleContextProvider({ children }: CycleContextProviderProps) {
	const [cyclesState, dispatch] = useReducer(
		cyclesReducer,
		{
			activeCycleId: null,
			cycles: [],
		} as CyclesState,
		(state) => {
			const storedStateAsJSON = localStorage.getItem(
				"@ignite-timer:cycles-state-1.0.0",
			);

			if (storedStateAsJSON) {
				return JSON.parse(storedStateAsJSON) as CyclesState;
			}
			return state;
		},
	);

	const { activeCycleId, cycles } = cyclesState;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const [amountSecondsPast, setAmountSecondsPast] = useState(() => {
		if (activeCycle) {
			return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
		}
		return 0;
	});

	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState);

		localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
	}, [cyclesState]);

	function createNewCycle(data: CreateCycleData) {
		const id = new Date().getTime().toString();

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		dispatch({
			type: ActionTypes.ADD_NEW_CYCLE,
			payload: {
				newCycle,
			},
		});
		setAmountSecondsPast(0);
	}

	function interruptCurrentCycle() {
		dispatch({
			type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
			payload: {
				activeCycleId,
			},
		});
	}

	function markCurrentCycleAsFinished() {
		dispatch({
			type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
			payload: {
				activeCycleId,
			},
		});
	}

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPast(seconds);
	}

	return (
		<CycleContext.Provider
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				amountSecondsPast,
				markCurrentCycleAsFinished,
				setSecondsPassed,
				createNewCycle,
				interruptCurrentCycle,
			}}
		>
			{children}
		</CycleContext.Provider>
	);
}
