import { z } from "zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = z.object({
	task: z.string().min(1, "Informe a tarefa"),
	minutesAmount: z.number().min(1).max(60),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export function NewCycleForm() {
	const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: "",
			minutesAmount: 1,
		},
	});

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
