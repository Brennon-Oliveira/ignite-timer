import { HistoryContainer, HistoryList, StautsContainer } from "./styles";

export function History() {
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
						<tr>
							<td>Tarefa</td>
							<td>20 minutos</td>
							<td>Há cerca de 2 meses</td>
							<td>
								<StautsContainer statusColor="green">Concluído</StautsContainer>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 minutos</td>
							<td>Há cerca de 2 meses</td>
							<td>
								<StautsContainer statusColor="green">Concluído</StautsContainer>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 minutos</td>
							<td>Há cerca de 2 meses</td>
							<td>
								<StautsContainer statusColor="green">Concluído</StautsContainer>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 minutos</td>
							<td>Há cerca de 2 meses</td>
							<td>
								<StautsContainer statusColor="green">Concluído</StautsContainer>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 minutos</td>
							<td>Há cerca de 2 meses</td>
							<td>
								<StautsContainer statusColor="green">Concluído</StautsContainer>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 minutos</td>
							<td>Há cerca de 2 meses</td>
							<td>
								<StautsContainer statusColor="yellow">
									Em andamento
								</StautsContainer>
							</td>
						</tr>
						<tr>
							<td>Tarefa</td>
							<td>20 minutos</td>
							<td>Há cerca de 2 meses</td>
							<td>
								<StautsContainer statusColor="red">
									Interrompido
								</StautsContainer>
							</td>
						</tr>
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
}
