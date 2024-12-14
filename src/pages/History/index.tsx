import { useContext } from "react";
import { HistoryContainer, HistoryList, StautsContainer } from "./styles";
import { CycleContext } from "../../contexts/CycleContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function History() {
	const { cycles } = useContext(CycleContext);

	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>

			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{cycles.map((cycle) => {
							return (
								<tr key={cycle.id}>
									<td>{cycle.task}</td>
									<td>{cycle.minutesAmount} minutos</td>
									<td>
										{formatDistanceToNow(cycle.startDate, {
											addSuffix: true,
											locale: ptBR,
										})}
									</td>
									<td>
										{cycle.finishedDate && (
											<StautsContainer statusColor="green">
												Concluído
											</StautsContainer>
										)}
										{cycle.interruptedDate && (
											<StautsContainer statusColor="red">
												Interrompido
											</StautsContainer>
										)}
										{!cycle.interruptedDate && !cycle.finishedDate && (
											<StautsContainer statusColor="yellow">
												Em andamento
											</StautsContainer>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
}
