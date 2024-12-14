import { HandPalm, Play } from "phosphor-react";
import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createContext, useContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CycleContext } from "../../contexts/CycleContext";

const newCycleFormValidationSchema = z.object({
	task: z.string().min(1, "Informe a tarefa"),
	minutesAmount: z.number().min(1).max(60),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const { createNewCycle, interruptCurrentCycle, activeCycle } =
		useContext(CycleContext);

	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 1,
		},
	});

	const { watch, reset, handleSubmit } = newCycleForm;

	function handleCreateNewCycle(data: NewCycleFormData) {
		createNewCycle(data);
		reset();
	}

	const task = watch("task");
	const isSubmitDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />
				{activeCycle ? (
					<StopCountdownButton type="button" onClick={interruptCurrentCycle}>
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
