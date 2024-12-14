import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { CycleContext } from "../../../../contexts/CycleContext";

export function NewCycleForm() {
	const { activeCycle } = useContext(CycleContext);
	const { register } = useFormContext();

	return (
		<FormContainer>
			<label htmlFor="task">Vou trabalhar em</label>
			<TaskInput
				placeholder="Dê uma nome para o seu projeto"
				type="text"
				id="task"
				list="task-suggestions"
				disabled={!!activeCycle}
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
				min={1}
				max={60}
				disabled={!!activeCycle}
				{...register("minutesAmount", {
					valueAsNumber: true,
				})}
			/>

			<span>minutos.</span>
		</FormContainer>
	);
}
