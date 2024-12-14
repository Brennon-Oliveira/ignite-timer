import { HandPalm, Play } from "phosphor-react";
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
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

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

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

	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPast : 0;

	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;

	const minutes = String(minutesAmount).padStart(2, "0");
	const seconds = String(secondsAmount).padStart(2, "0");

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`;
		}
	}, [minutes, seconds, activeCycle]);

	const task = watch("task");
	const isSubmitDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<NewCycleForm />
				<Countdown />
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
