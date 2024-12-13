import { Play } from "phosphor-react";
import {
	CountdownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	StartCountdownButton,
	TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const newCycleFormValidationSchema = z.object({
	task: z.string().min(1, "Informe a tarefa"),
	minutesAmount: z.number().min(5).max(60),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
}

export function Home() {
	const [cycles, setCycle] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPast, setAmountSecondsPast] = useState(0);
	const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 5,
		},
	});

	function handleCreateNewCycle(data: NewCycleFormData) {
		const id = new Date().getTime().toString();

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
		};

		setCycle((state) => [...state, newCycle]);
		setActiveCycleId(id);

		reset();
	}

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPast : 0;

	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;

	const minutes = String(minutesAmount).padStart(2, "0");
	const seconds = String(secondsAmount).padStart(2, "0");

	const task = watch("task");
	const isSubmitDisabled = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormContainer>
					<label htmlFor="task">Vou trabalhar em</label>
					<TaskInput
						placeholder="Dê uma nome para o seu projeto"
						type="text"
						id="task"
						list="task-suggestions"
						{...register("task")}
					/>

					<datalist id="task-suggestions">
						<option value="Projeto 1" />
						<option value="Projeto 2" />
						<option value="Projeto 3" />
						<option value="Banana" />
					</datalist>

					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput
						placeholder="00"
						type="number"
						id="minutesAmount"
						step={5}
						min={5}
						max={60}
						{...register("minutesAmount", {
							valueAsNumber: true,
						})}
					/>

					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>{minutes[0]}</span>
					<span>{minutes[1]}</span>
					<Separator>:</Separator>
					<span>{seconds[0]}</span>
					<span>{seconds[1]}</span>
				</CountdownContainer>

				<StartCountdownButton disabled={isSubmitDisabled} type="submit">
					<Play size={"1.5rem"} />
					Começar
				</StartCountdownButton>
			</form>
		</HomeContainer>
	);
}
