import { HandPalm, Play } from "phosphor-react";
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface CycleContextData {
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPast: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
}

export const CycleContext = createContext({} as CycleContextData);

const newCycleFormValidationSchema = z.object({
	task: z.string().min(1, "Informe a tarefa"),
	minutesAmount: z.number().min(1).max(60),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPast, setAmountSecondsPast] = useState(0);

	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 1,
		},
	});

	const { watch, reset, handleSubmit } = newCycleForm;

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	function handleCreateNewCycle(data: NewCycleFormData) {
		const id = new Date().getTime().toString();

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};

		setCycles((state) => [...state, newCycle]);
		setActiveCycleId(id);
		setAmountSecondsPast(0);

		reset();
	}

	function handleInterruptCycle() {
		setActiveCycleId(null);

		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptedDate: new Date() };
				}
				return cycle;
			}),
		);
	}

	function markCurrentCycleAsFinished() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptedDate: new Date() };
				}
				return cycle;
			}),
		);
	}

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPast(seconds);
	}

	const task = watch("task");
	const isSubmitDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<CycleContext.Provider
					value={{
						activeCycle,
						activeCycleId,
						amountSecondsPast,
						markCurrentCycleAsFinished,
						setSecondsPassed,
					}}
				>
					<FormProvider {...newCycleForm}>
						<NewCycleForm />
					</FormProvider>
					<Countdown />
				</CycleContext.Provider>
				{activeCycle ? (
					<StopCountdownButton type="button" onClick={handleInterruptCycle}>
						<HandPalm size={"1.5rem"} />
						Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton disabled={isSubmitDisabled} type="submit">
						<Play size={"1.5rem"} />
						Começar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	);
}
